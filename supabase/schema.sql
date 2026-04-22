create table if not exists public.athr_products (
  id bigint primary key,
  name text not null,
  subtitle text default '',
  description text default '',
  price numeric not null default 0,
  size text default '',
  category text default '',
  badges text[] default '{}',
  image text default '',
  visible boolean not null default true,
  top_notes text[] default '{}',
  middle_notes text[] default '{}',
  base_notes text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.athr_orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  city text not null,
  payment_method text not null,
  total numeric not null default 0,
  status text not null default 'new',
  date text not null,
  items jsonb not null default '[]'::jsonb,
  notes text default '',
  internal_notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.athr_store_settings (
  id bigint primary key,
  store_name text not null default 'أثر',
  whatsapp text not null default '966500000000',
  email text not null default 'hello@athr-perfumes.com',
  working_hours text not null default 'السبت إلى الخميس: 9 ص - 10 م',
  instapay boolean not null default true,
  vodafone_cash boolean not null default true,
  bank_transfer boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.athr_store_settings (id, store_name, whatsapp, email, working_hours, instapay, vodafone_cash, bank_transfer)
values (1, 'أثر', '966500000000', 'hello@athr-perfumes.com', 'السبت إلى الخميس: 9 ص - 10 م', true, true, true)
on conflict (id) do update set
  store_name = excluded.store_name,
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  working_hours = excluded.working_hours,
  instapay = excluded.instapay,
  vodafone_cash = excluded.vodafone_cash,
  bank_transfer = excluded.bank_transfer,
  updated_at = now();

alter table public.athr_products enable row level security;
alter table public.athr_orders enable row level security;
alter table public.athr_store_settings enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'athr_products_public_read') then
    create policy athr_products_public_read on public.athr_products for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'athr_products_auth_write') then
    create policy athr_products_auth_write on public.athr_products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'athr_orders_public_insert') then
    create policy athr_orders_public_insert on public.athr_orders for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'athr_orders_auth_read_write') then
    create policy athr_orders_auth_read_write on public.athr_orders for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'athr_settings_public_read') then
    create policy athr_settings_public_read on public.athr_store_settings for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'athr_settings_auth_write') then
    create policy athr_settings_auth_write on public.athr_store_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
  end if;
end $$;
