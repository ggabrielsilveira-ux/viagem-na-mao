-- Painel: mostra quem confirmou o código do e-mail (o Supabase cria a conta quando a pessoa PEDE o código,
-- antes de ela digitar; quem nunca digitou aparece como "não confirmou o código").
-- Rode uma vez no Supabase, depois de supabase-opinioes.sql: SQL Editor > New query > colar > Run.
-- Só muda a lista do painel (para administradores); nenhuma tabela nem dado é alterado.

drop function if exists public.painel_testadores();
create function public.painel_testadores()
returns table (email text, nome text, whatsapp text, aniversario text, aceita_novidades boolean, conta_criada timestamptz, ultimo_uso timestamptz, dias_de_uso integer, aparelhos integer, viagens integer, cidades integer, memorias integer, gastos integer, instalado boolean, opinioes integer, email_confirmado timestamptz, ultimo_login timestamptz)
language plpgsql security definer set search_path = '' stable as $$
begin
  if not public.eh_administrador() then raise exception 'acesso negado'; end if;
  return query
    select u.email::text, p.nome, p.whatsapp, p.aniversario, coalesce(p.aceita_novidades, false), u.created_at,
           max(a.ultimo_uso), coalesce(max(a.dias_de_uso), 0)::integer, count(distinct a.aparelho)::integer,
           coalesce(max(a.viagens), 0)::integer, coalesce(max(a.cidades), 0)::integer, coalesce(max(a.memorias), 0)::integer,
           coalesce(max(a.gastos), 0)::integer, coalesce(bool_or(a.instalado), false),
           (select count(*) from public.opinioes o where o.user_id = u.id)::integer,
           u.email_confirmed_at, u.last_sign_in_at
    from auth.users u
    left join public.perfis p on p.user_id = u.id
    left join public.uso_app a on a.user_id = u.id
    group by u.id, u.email, u.created_at, u.email_confirmed_at, u.last_sign_in_at, p.nome, p.whatsapp, p.aniversario, p.aceita_novidades
    order by max(a.ultimo_uso) desc nulls last, u.created_at desc;
end;
$$;
revoke all on function public.painel_testadores() from public, anon;
grant execute on function public.painel_testadores() to authenticated;
