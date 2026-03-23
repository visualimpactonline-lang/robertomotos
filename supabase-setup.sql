create extension if not exists pgcrypto;

create table if not exists public.motos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  modelo text not null,
  marca text not null,
  preco numeric not null default 0,
  ano integer not null default 0,
  quilometragem integer not null default 0,
  combustivel text,
  tipo text,
  status text not null default 'disponível',
  descricao text,
  imagens text[] not null default '{}',
  featured_home boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

DROP TRIGGER IF EXISTS motos_set_updated_at ON public.motos;
create trigger motos_set_updated_at
before update on public.motos
for each row execute function public.handle_updated_at();

alter table public.motos enable row level security;

create policy "Public can read motos"
on public.motos
for select
using (true);

create policy "Public can insert motos"
on public.motos
for insert
with check (true);

create policy "Public can update motos"
on public.motos
for update
using (true)
with check (true);

create policy "Public can delete motos"
on public.motos
for delete
using (true);

insert into storage.buckets (id, name, public)
values ('motos', 'motos', true)
on conflict (id) do update set public = true;

create policy "Public can view moto images"
on storage.objects
for select
using (bucket_id = 'motos');

create policy "Public can upload moto images"
on storage.objects
for insert
with check (bucket_id = 'motos');

create policy "Public can update moto images"
on storage.objects
for update
using (bucket_id = 'motos')
with check (bucket_id = 'motos');

create policy "Public can delete moto images"
on storage.objects
for delete
using (bucket_id = 'motos');
