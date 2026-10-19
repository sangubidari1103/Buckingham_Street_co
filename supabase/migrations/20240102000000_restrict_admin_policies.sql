-- Migration: Restrict RLS and Storage policies to admin user only
-- Run this AFTER creating the admin user in Supabase Auth
-- Then update the admin_user_id below with the actual admin user's UUID from auth.users

-- 1. Add user_id column to new_arrivals (nullable for existing records)
ALTER TABLE public.new_arrivals
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS idx_new_arrivals_user_id ON public.new_arrivals(user_id);

-- 3. Drop existing broad write policies
DROP POLICY IF EXISTS "Admins can insert new arrivals" ON public.new_arrivals;
DROP POLICY IF EXISTS "Admins can update new arrivals" ON public.new_arrivals;
DROP POLICY IF EXISTS "Admins can delete new arrivals" ON public.new_arrivals;

-- 4. Create new restrictive policies using auth.uid()
-- Only the record owner (admin) can insert
CREATE POLICY "Admin can insert own new arrivals"
  ON public.new_arrivals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Only the record owner (admin) can update
CREATE POLICY "Admin can update own new arrivals"
  ON public.new_arrivals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Only the record owner (admin) can delete
CREATE POLICY "Admin can delete own new arrivals"
  ON public.new_arrivals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Drop existing broad storage policies
DROP POLICY IF EXISTS "Admins can upload new arrivals images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update new arrivals images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete new arrivals images" ON storage.objects;

-- 6. Create new restrictive storage policies
-- Files are stored under the admin's user_id folder: {user_id}/{filename}
-- Only the admin can upload to their own folder
CREATE POLICY "Admin can upload own new arrivals images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'new-arrivals'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Only the admin can update their own files
CREATE POLICY "Admin can update own new arrivals images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'new-arrivals'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'new-arrivals'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Only the admin can delete their own files
CREATE POLICY "Admin can delete own new arrivals images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'new-arrivals'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 7. Optional: Backfill existing records with admin user_id
-- RUN THIS SEPARATELY after obtaining the admin user's UUID:
-- UPDATE public.new_arrivals
-- SET user_id = '<ADMIN_USER_UUID_FROM_AUTH_USERS>'
-- WHERE user_id IS NULL;

-- 8. After backfill, make user_id NOT NULL (run separately after backfill):
-- ALTER TABLE public.new_arrivals ALTER COLUMN user_id SET NOT NULL;