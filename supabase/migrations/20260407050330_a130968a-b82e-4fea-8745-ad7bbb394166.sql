
-- Create the public media bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  104857600, -- 100MB limit for videos
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'video/mp4', 'video/webm']
);

-- Public read access
CREATE POLICY "Public media read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Authenticated upload access
CREATE POLICY "Authenticated media upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');
