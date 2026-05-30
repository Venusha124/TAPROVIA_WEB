-- Migration to fix RLS for custom auth (Allow public uploads to marketing bucket)

-- 1. Drop existing restrictive policy if it exists
drop policy if exists "Admins can upload Marketing Images" on storage.objects;

-- 2. Create permissive policy for the 'marketing' bucket
-- Since we handle admin authentication in the Next.js server action/middleware,
-- we can allow the application (using anon key) to upload to this specific bucket.
create policy "Public Uploads to Marketing" on storage.objects
for insert with check ( bucket_id = 'marketing' );

-- Ensure select is still public
drop policy if exists "Marketing Images are public" on storage.objects;
create policy "Marketing Images are public" on storage.objects
for select using ( bucket_id = 'marketing' );
