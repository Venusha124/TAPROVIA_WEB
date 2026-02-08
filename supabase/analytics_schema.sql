-- Analytics Schema
create extension if not exists "uuid-ossp";

create table public.web_traffic (
  id uuid default uuid_generate_v4() primary key,
  page_path text not null,
  country text,       -- 'US', 'LK', etc.
  city text,
  device_type text,   -- 'mobile', 'desktop', 'tablet'
  visitor_id text,    -- Hashed identifier for session/user
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.web_traffic enable row level security;

-- Public can insert (via server action which uses service role or anon key with policy)
-- Actually, if we use a server action, the backend can insert directly. 
-- But if we use client-side insert (not recommended), we need a policy.
-- Let's stick to Server Actions.
-- We still need policies for viewing by Admin.

create policy "Admins can view web_traffic." on public.web_traffic for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Allow insert from application (if using Anon key directly, which we might for simple logging)
create policy "Public can record traffic" on public.web_traffic for insert with check (true);
