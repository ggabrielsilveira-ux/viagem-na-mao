-- Cadastro dos testadores do Viagem na Mão: nome, WhatsApp, aniversário (dia e mês) e aceite de novidades.
-- Rode uma vez no Supabase, depois de supabase-metricas.sql: SQL Editor > New query > colar > Run.
-- Cada pessoa só lê e grava o próprio cadastro (RLS). O painel mostra para os administradores.

create table if not exists public.perfis (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nome text not null check (char_length(nome) between 2 and 120),
  whatsapp text check (whatsapp is null or whatsapp ~ '^[0-9]{10,15}$'),   -- só dígitos, com DDD (e DDI, se de fora)
  aniversario text check (aniversario is null or aniversario ~ '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])$'),  -- DD/MM, sem o ano
  aceita_novidades boolean not null default false,
  aceite_novidades_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
alter table public.perfis enable row level security;

drop policy if exists "dono lê o próprio perfil" on public.perfis;
create policy "dono lê o próprio perfil" on public.perfis
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "dono cria o próprio perfil" on public.perfis;
create policy "dono cria o próprio perfil" on public.perfis
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "dono atualiza o próprio perfil" on public.perfis;
create policy "dono atualiza o próprio perfil" on public.perfis
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "dono apaga o próprio perfil" on public.perfis;
create policy "dono apaga o próprio perfil" on public.perfis
  for delete to authenticated using ((select auth.uid()) = user_id);

-- O painel passa a mostrar o cadastro junto com as contagens de uso.
drop function if exists public.painel_testadores();
create function public.painel_testadores()
returns table (email text, nome text, whatsapp text, aniversario text, aceita_novidades boolean, conta_criada timestamptz, ultimo_uso timestamptz, dias_de_uso integer, aparelhos integer, viagens integer, cidades integer, memorias integer, gastos integer, instalado boolean)
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return query
    select u.email::text, p.nome, p.whatsapp, p.aniversario, coalesce(p.aceita_novidades, false), u.created_at,
           max(a.ultimo_uso), coalesce(max(a.dias_de_uso), 0)::integer, count(a.aparelho)::integer,
           coalesce(max(a.viagens), 0)::integer, coalesce(max(a.cidades), 0)::integer, coalesce(max(a.memorias), 0)::integer,
           coalesce(max(a.gastos), 0)::integer, coalesce(bool_or(a.instalado), false)
    from auth.users u
    left join public.perfis p on p.user_id = u.id
    left join public.uso_app a on a.user_id = u.id
    group by u.id, u.email, u.created_at, p.nome, p.whatsapp, p.aniversario, p.aceita_novidades
    order by max(a.ultimo_uso) desc nulls last, u.created_at desc;
end;
$$;
revoke all on function public.painel_testadores() from public, anon;
grant execute on function public.painel_testadores() to authenticated;
