-- Create storage bucket for partner logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can view partner logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-logos');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload partner logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update partner logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete partner logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');
