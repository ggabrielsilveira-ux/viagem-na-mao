-- Opiniões dos testadores do Viagem na Mão (botão "Enviar opinião" no app).
-- Rode uma vez no Supabase, depois de supabase-perfis.sql: SQL Editor > New query > colar > Run.
-- Qualquer pessoa do app pode ENVIAR; ninguém lê pelo app. Só o painel mostra, para os administradores.

create table if not exists public.opinioes (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete set null,
  aparelho uuid,                                  -- o mesmo identificador aleatório da estatística de uso
  tipo text not null check (tipo in ('ideia', 'problema', 'elogio', 'outro')),
  texto text not null check (char_length(texto) between 3 and 2000),
  tela text check (char_length(tela) <= 40),      -- onde a pessoa estava (ex.: descobrir, roteiro)
  versao text check (char_length(versao) <= 20),
  criado_em timestamptz not null default now()
);
alter table public.opinioes enable row level security;

-- Enviar: sem conta (user_id vazio) ou com a própria conta. Sem regra de leitura.
drop policy if exists "qualquer um envia opinião" on public.opinioes;
create policy "qualquer um envia opinião" on public.opinioes
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));
grant insert on public.opinioes to anon, authenticated;

-- Painel: as opiniões mais recentes, com quem enviou (só administradores).
create or replace function public.painel_opinioes()
returns table (criado_em timestamptz, tipo text, texto text, tela text, nome text, email text)
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return query
    select o.criado_em, o.tipo, o.texto, o.tela, p.nome, u.email::text
    from public.opinioes o
    left join auth.users u on u.id = o.user_id
    left join public.perfis p on p.user_id = o.user_id
    order by o.criado_em desc
    limit 500;
end;
$$;
revoke all on function public.painel_opinioes() from public, anon;
grant execute on function public.painel_opinioes() to authenticated;

-- Lista de testadores ganha a contagem de opiniões (base para escolher quem mais ajudou).
drop function if exists public.painel_testadores();
create function public.painel_testadores()
returns table (email text, nome text, whatsapp text, aniversario text, aceita_novidades boolean, conta_criada timestamptz, ultimo_uso timestamptz, dias_de_uso integer, aparelhos integer, viagens integer, cidades integer, memorias integer, gastos integer, instalado boolean, opinioes integer)
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return query
    select u.email::text, p.nome, p.whatsapp, p.aniversario, coalesce(p.aceita_novidades, false), u.created_at,
           max(a.ultimo_uso), coalesce(max(a.dias_de_uso), 0)::integer, count(distinct a.aparelho)::integer,
           coalesce(max(a.viagens), 0)::integer, coalesce(max(a.cidades), 0)::integer, coalesce(max(a.memorias), 0)::integer,
           coalesce(max(a.gastos), 0)::integer, coalesce(bool_or(a.instalado), false),
           (select count(*) from public.opinioes o where o.user_id = u.id)::integer
    from auth.users u
    left join public.perfis p on p.user_id = u.id
    left join public.uso_app a on a.user_id = u.id
    group by u.id, u.email, u.created_at, p.nome, p.whatsapp, p.aniversario, p.aceita_novidades
    order by max(a.ultimo_uso) desc nulls last, u.created_at desc;
end;
$$;
revoke all on function public.painel_testadores() from public, anon;
grant execute on function public.painel_testadores() to authenticated;

-- Números gerais ganham o total de opiniões.
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
    'lista_espera', (select count(*) from public.lista_espera),
    'opinioes', (select count(*) from public.opinioes),
    'opinioes_7_dias', (select count(*) from public.opinioes where criado_em > now() - interval '7 days')
  );
end;
$$;
