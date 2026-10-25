-- Tabela da lista de espera do site Viagem na Mão.
-- Rode uma vez no Supabase: menu SQL Editor > New query > colar > Run.
create table if not exists public.lista_espera (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  nome text check (char_length(nome) <= 80),
  origem text check (char_length(origem) <= 40),
  consentimento_em timestamptz not null default now(),
  criado_em timestamptz not null default now()
);

-- Segurança: com RLS ligado e nenhuma regra pública, só a função da Vercel
-- (que usa a chave secreta service_role) consegue gravar e ler.
alter table public.lista_espera enable row level security;
