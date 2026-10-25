-- Contas do app Viagem na Mão: dados de cada pessoa, fotos e assinatura.
-- Rode uma vez no Supabase: SQL Editor > New query > colar > Run.
-- Segurança: Row Level Security (RLS) em tudo. Cada pessoa só lê e grava o que é dela.

-- 1. Dados do app (viagens, roteiros, custos, memórias) de cada pessoa.
create table if not exists public.estado_usuario (
  user_id uuid primary key references auth.users (id) on delete cascade,
  dados jsonb not null,
  versao_app text,
  atualizado_em timestamptz not null default now()
);
alter table public.estado_usuario enable row level security;

drop policy if exists "dono lê o próprio estado" on public.estado_usuario;
create policy "dono lê o próprio estado" on public.estado_usuario
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "dono cria o próprio estado" on public.estado_usuario;
create policy "dono cria o próprio estado" on public.estado_usuario
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "dono atualiza o próprio estado" on public.estado_usuario;
create policy "dono atualiza o próprio estado" on public.estado_usuario
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "dono apaga o próprio estado" on public.estado_usuario;
create policy "dono apaga o próprio estado" on public.estado_usuario
  for delete to authenticated using ((select auth.uid()) = user_id);

-- 2. Assinatura: o app só LÊ. Quem grava é o servidor (pagamento, com a chave secreta).
create table if not exists public.assinaturas (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plano text not null default 'teste',          -- teste | mensal | anual
  status text not null default 'ativa',         -- ativa | cancelada | expirada
  valido_ate timestamptz,                       -- vazio = sem prazo (teste fechado)
  provedor text,                                -- ex.: stripe, mercadopago (futuro)
  referencia_externa text,                      -- id da assinatura no provedor (futuro)
  atualizado_em timestamptz not null default now()
);
alter table public.assinaturas enable row level security;
drop policy if exists "dono lê a própria assinatura" on public.assinaturas;
create policy "dono lê a própria assinatura" on public.assinaturas
  for select to authenticated using ((select auth.uid()) = user_id);
-- Sem regra de insert/update/delete para usuários: só a chave secreta altera.

-- Toda pessoa criada ganha o plano "teste" automaticamente.
create or replace function public.criar_assinatura_teste()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.assinaturas (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;
drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.criar_assinatura_teste();
-- Quem já existia antes deste script também ganha o plano teste.
insert into public.assinaturas (user_id) select id from auth.users on conflict (user_id) do nothing;

-- 3. Fotos das memórias: armazenamento privado, uma pasta por pessoa (<user_id>/<foto>.jpg).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos', 'fotos', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "dono lê as próprias fotos" on storage.objects;
create policy "dono lê as próprias fotos" on storage.objects
  for select to authenticated using (bucket_id = 'fotos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "dono envia as próprias fotos" on storage.objects;
create policy "dono envia as próprias fotos" on storage.objects
  for insert to authenticated with check (bucket_id = 'fotos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "dono atualiza as próprias fotos" on storage.objects;
create policy "dono atualiza as próprias fotos" on storage.objects
  for update to authenticated using (bucket_id = 'fotos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "dono apaga as próprias fotos" on storage.objects;
create policy "dono apaga as próprias fotos" on storage.objects
  for delete to authenticated using (bucket_id = 'fotos' and (storage.foldername(name))[1] = (select auth.uid())::text);
