INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('club_assets', 'club_assets', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Club assets are publicly accessible."
  ON storage.objects FOR SELECT
  USING (bucket_id = 'club_assets');

CREATE POLICY "Anyone can upload club assets."
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'club_assets' AND auth.role() = 'authenticated');
