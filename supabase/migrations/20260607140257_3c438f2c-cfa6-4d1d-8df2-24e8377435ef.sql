
-- public-media: anyone can read, admins can write
CREATE POLICY "anyone read public-media" ON storage.objects FOR SELECT
  USING (bucket_id = 'public-media');
CREATE POLICY "admin upload public-media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'public-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update public-media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'public-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete public-media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'public-media' AND public.has_role(auth.uid(),'admin'));

-- documents: same pattern
CREATE POLICY "anyone read documents" ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');
CREATE POLICY "admin upload documents" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update documents" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete documents" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(),'admin'));
