-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'customer' check (role in ('admin', 'customer')),
  encrypted_password text, -- Mirrored from auth.users
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role, encrypted_password)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    'admin', 
    new.encrypted_password
  ); 
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  cost_per_item decimal(10,2),
  sku text,
  inventory_quantity integer default 0,
  status text default 'draft' check (status in ('active', 'draft', 'archived')),
  images text[], -- Array of image URLs
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Products
alter table public.products enable row level security;
create policy "Products are viewable by everyone." on public.products for select using (true);
create policy "Admins can insert products." on public.products for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update products." on public.products for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete products." on public.products for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 3. CUSTOMERS
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  first_name text,
  last_name text,
  email text unique not null,
  phone text,
  total_spent decimal(10,2) default 0.00,
  orders_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.customers enable row level security;
create policy "Admins can view customers." on public.customers for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 4. ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id),
  order_number serial,
  status text default 'pending' check (status in ('pending', 'paid', 'fulfillment', 'shipped', 'cancelled')),
  total_price decimal(10,2) default 0.00,
  currency text default 'USD',
  payment_status text default 'unpaid',
  fulfillment_status text default 'unfulfilled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;
create policy "Admins can view all orders." on public.orders for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 5. ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  variant_title text,
  quantity integer default 1,
  price decimal(10,2) not null
);

alter table public.order_items enable row level security;
create policy "Admins can view order items." on public.order_items for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
