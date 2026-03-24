INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for documents" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'documents');