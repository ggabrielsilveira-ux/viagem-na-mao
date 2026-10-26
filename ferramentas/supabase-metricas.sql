-- Beta do Viagem na Mão: estatísticas de uso SEM dados pessoais e painel dos testadores.
-- Rode uma vez no Supabase, depois de supabase-contas.sql: SQL Editor > New query > colar > Run.
--
-- O app manda no máximo uma vez por dia, por aparelho, só contagens (quantas viagens, cidades,
-- memórias e gastos) e a data. Nunca nomes de viagens, destinos, valores, fotos ou textos.
-- Ninguém lê a tabela direto (RLS sem regras de leitura): só o painel, para quem é administrador.

-- 1. Uso por aparelho (identificador aleatório criado no aparelho; não identifica a pessoa).
create table if not exists public.uso_app (
  aparelho uuid primary key,
  user_id uuid references auth.users (id) on delete set null,
  primeiro_uso timestamptz not null default now(),
  ultimo_uso timestamptz not null default now(),
  dias_de_uso integer not null default 1,
  viagens integer not null default 0,
  cidades integer not null default 0,
  memorias integer not null default 0,
  gastos integer not null default 0,
  instalado boolean not null default false,   -- app adicionado à tela inicial do celular
  versao text
);
alter table public.uso_app enable row level security;
-- Sem regras: ninguém lê nem grava direto; só pela função abaixo.

create or replace function public.registrar_uso(
  p_aparelho uuid, p_viagens integer, p_cidades integer, p_memorias integer, p_gastos integer, p_instalado boolean, p_versao text
) returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.uso_app (aparelho, user_id, viagens, cidades, memorias, gastos, instalado, versao)
  values (p_aparelho, auth.uid(), least(greatest(p_viagens, 0), 1000), least(greatest(p_cidades, 0), 5000),
          least(greatest(p_memorias, 0), 100000), least(greatest(p_gastos, 0), 100000), coalesce(p_instalado, false), left(p_versao, 20))
  on conflict (aparelho) do update set
    user_id = coalesce(auth.uid(), public.uso_app.user_id),
    dias_de_uso = public.uso_app.dias_de_uso + case when public.uso_app.ultimo_uso::date < now()::date then 1 else 0 end,
    ultimo_uso = now(),
    viagens = excluded.viagens, cidades = excluded.cidades, memorias = excluded.memorias, gastos = excluded.gastos,
    instalado = excluded.instalado, versao = excluded.versao;
end;
$$;
revoke all on function public.registrar_uso(uuid, integer, integer, integer, integer, boolean, text) from public;
grant execute on function public.registrar_uso(uuid, integer, integer, integer, integer, boolean, text) to anon, authenticated;

-- 2. Administradores do painel (e-mail de login). Troque ou acrescente e-mails aqui se quiser.
create table if not exists public.administradores (email text primary key);
alter table public.administradores enable row level security;
insert into public.administradores (email) values ('contato@viagemnamao.com') on conflict do nothing;

create or replace function public.eh_administrador() returns boolean
language sql security definer set search_path = '' stable as $$
  select exists (select 1 from public.administradores where email = lower(auth.jwt() ->> 'email'));
$$;

-- 3. Painel: números gerais (só para administradores).
create or replace function public.painel_resumo() returns json
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return json_build_object(
    'contas', (select count(*) from auth.users),
    'contas_7_dias', (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'aparelhos', (select count(*) from public.uso_app),
    'ativos_hoje', (select count(*) from public.uso_app where ultimo_uso > now() - interval '1 day'),
    'ativos_7_dias', (select count(*) from public.uso_app where ultimo_uso > now() - interval '7 days'),
    'ativos_30_dias', (select count(*) from public.uso_app where ultimo_uso > now() - interval '30 days'),
    'sem_conta', (select count(*) from public.uso_app where user_id is null),
    'com_viagem', (select count(*) from public.uso_app where viagens > 0),
    'viagens', (select coalesce(sum(viagens), 0) from public.uso_app),
    'memorias', (select coalesce(sum(memorias), 0) from public.uso_app),
    'instalados', (select count(*) from public.uso_app where instalado),
    'lista_espera', (select count(*) from public.lista_espera)
  );
end;
$$;

-- 4. Painel: um testador por linha (e-mail da conta e contagens; nada do conteúdo das viagens).
create or replace function public.painel_testadores()
returns table (email text, conta_criada timestamptz, ultimo_uso timestamptz, dias_de_uso integer, aparelhos integer, viagens integer, cidades integer, memorias integer, gastos integer, instalado boolean)
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return query
    select u.email::text, u.created_at, max(a.ultimo_uso), coalesce(max(a.dias_de_uso), 0)::integer, count(a.aparelho)::integer,
           coalesce(max(a.viagens), 0)::integer, coalesce(max(a.cidades), 0)::integer, coalesce(max(a.memorias), 0)::integer,
           coalesce(max(a.gastos), 0)::integer, coalesce(bool_or(a.instalado), false)
    from auth.users u left join public.uso_app a on a.user_id = u.id
    group by u.id, u.email, u.created_at
    order by max(a.ultimo_uso) desc nulls last, u.created_at desc;
end;
$$;

revoke all on function public.painel_resumo() from public, anon;
revoke all on function public.painel_testadores() from public, anon;
grant execute on function public.painel_resumo() to authenticated;
grant execute on function public.painel_testadores() to authenticated;
