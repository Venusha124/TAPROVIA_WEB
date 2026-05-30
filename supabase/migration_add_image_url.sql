-- Migration to add image_url to newsletters if table already exists

-- 1. Add image_url column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'newsletters' AND column_name = 'image_url') THEN
        ALTER TABLE public.newsletters ADD COLUMN image_url text;
    END IF;
END $$;

-- 2. Ensure Storage Bucket exists
insert into storage.buckets (id, name, public) values ('marketing', 'marketing', true) on conflict do nothing;

-- 3. Ensure Storage Policies exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Marketing Images are public' AND tablename = 'objects' AND schemaname = 'storage') THEN
        create policy "Marketing Images are public" on storage.objects for select using ( bucket_id = 'marketing' );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can upload Marketing Images' AND tablename = 'objects' AND schemaname = 'storage') THEN
        create policy "Admins can upload Marketing Images" on storage.objects for insert with check ( bucket_id = 'marketing' and (select role from public.profiles where id = auth.uid()) = 'admin' );
    END IF;
END $$;
