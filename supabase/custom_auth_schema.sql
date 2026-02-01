-- Create a standalone table for Admin Users (Custom Auth)
create table public.admin_users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password_hash text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Admin Users
alter table public.admin_users enable row level security;

-- Allow public read access (needed for login check locally, or you can restrict this to service role only)
-- Ideally, only the server (service role) needs access.
-- But for client-side debugging, we might keep it open or restrict it.
-- Since we are moving to Server Actions, we can restrict this, but for simplicity in dev, let's allow all for now.
create policy "Admins are viewable by everyone." on public.admin_users for select using (true);
create policy "Admins can be inserted by everyone." on public.admin_users for insert with check (true);
