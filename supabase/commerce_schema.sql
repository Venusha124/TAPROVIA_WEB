-- CUSTOMERS TABLE
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  total_orders int default 0,
  total_spent decimal(10, 2) default 0.00,
  last_order_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDERS TABLE
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  total_price decimal(10, 2) not null,
  status text check (status in ('Pending', 'Fulfillment', 'Shipped', 'Completed', 'Cancelled')) default 'Pending',
  payment_status text check (payment_status in ('Paid', 'Pending', 'Refunded')) default 'Pending',
  items_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.customers enable row level security;
alter table public.orders enable row level security;

create policy "Allow public select customers" on public.customers for select using (true);
create policy "Allow public insert customers" on public.customers for insert with check (true);
create policy "Allow public update customers" on public.customers for update using (true);

create policy "Allow public select orders" on public.orders for select using (true);
create policy "Allow public insert orders" on public.orders for insert with check (true);
create policy "Allow public update orders" on public.orders for update using (true);
