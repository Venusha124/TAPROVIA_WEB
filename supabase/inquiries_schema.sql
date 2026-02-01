create table public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  appellation text check (appellation in ('Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Rev.')),
  full_name text not null,
  email text not null,
  classification text check (classification in ('Wholesale Acquisition', 'Private Label', 'Export Logistics', 'Media/Press', 'General Inquiry')),
  narrative text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.inquiries enable row level security;

-- Allow anonymous inserts (for the contact form)
create policy "Allow anonymous inserts"
  on public.inquiries for insert
  with check (true);

-- Allow admins to view all inquiries (assuming admin role or public for now/custom auth bypasses RLS if using service role, but for client fetching we need policy)
-- Since we are using server actions with Supabase Client (likely service role or auth context), we might need policy. 
-- For now, allow public select for simplicity during dev, or restrict if auth is fully set up.
-- Given custom auth logic is server-side with direct DB access, RLS might be bypassed if using service key, but standard client needs policy.
create policy "Allow public select for dev"
  on public.inquiries for select
  using (true);

create policy "Allow public delete for dev" 
  on public.inquiries for delete
  using (true);
