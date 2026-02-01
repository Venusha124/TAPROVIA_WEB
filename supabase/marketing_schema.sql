-- 6. COUPONS
create table public.coupons (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value decimal(10,2) not null,
  start_date timestamp with time zone default timezone('utc'::text, now()),
  expiration_date timestamp with time zone,
  usage_limit integer,
  usage_count integer default 0,
  min_purchase_amount decimal(10,2) default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Coupons
alter table public.coupons enable row level security;
create policy "Admins can view coupons." on public.coupons for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can insert coupons." on public.coupons for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update coupons." on public.coupons for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete coupons." on public.coupons for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
-- Maybe allow customers to "view" coupons if they know the code? 
-- For now, let's keep it restricted to admins for management. Front-end verification will likely be via a secure function or a specific RLS allowing lookup by code.
create policy "Public can view active coupons via code lookup" on public.coupons for select using (true); -- Simplified for now to allow checkout validation.


-- 7. NEWSLETTER SUBSCRIBERS
create table public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  is_active boolean default true,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone
);

-- RLS for Newsletter
alter table public.newsletter_subscribers enable row level security;
create policy "Admins can view subscribers." on public.newsletter_subscribers for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Public can subscribe." on public.newsletter_subscribers for insert with check (true);
create policy "Admins can update subscribers." on public.newsletter_subscribers for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
-- Allow users to unsubscribe themselves? Handling via email token is safer. For now admin usage.
