-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create new_arrivals table
CREATE TABLE IF NOT EXISTS public.new_arrivals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.new_arrivals ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published new arrivals
CREATE POLICY "Public can read new arrivals"
  ON public.new_arrivals
  FOR SELECT
  USING (true);

-- Policy: Only authenticated admins can insert
CREATE POLICY "Admins can insert new arrivals"
  ON public.new_arrivals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated admins can update
CREATE POLICY "Admins can update new arrivals"
  ON public.new_arrivals
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated admins can delete
CREATE POLICY "Admins can delete new arrivals"
  ON public.new_arrivals
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for new arrivals images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'new-arrivals',
  'new-arrivals',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Public can read images
CREATE POLICY "Public can view new arrivals images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'new-arrivals');

-- Authenticated admins can upload
CREATE POLICY "Admins can upload new arrivals images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'new-arrivals');

-- Authenticated admins can update
CREATE POLICY "Admins can update new arrivals images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'new-arrivals')
  WITH CHECK (bucket_id = 'new-arrivals');

-- Authenticated admins can delete
CREATE POLICY "Admins can delete new arrivals images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'new-arrivals');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updated_at
CREATE TRIGGER new_arrivals_updated_at
  BEFORE UPDATE ON public.new_arrivals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();