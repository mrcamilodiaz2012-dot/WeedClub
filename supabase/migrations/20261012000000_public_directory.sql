-- Public directory and club-owner workflow.
-- Consumer accounts (favorites, user profiles and user-authored reviews) are
-- intentionally not exposed by the current product UI.

ALTER TABLE public.clubs
  ADD COLUMN IF NOT EXISTS whatsapp TEXT,
  ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- WeedClub no longer uses paid plans or Stripe. Remove provider-specific and
-- plan-specific state after dropping the old RPC that returned that column.
DROP FUNCTION IF EXISTS public.get_nearby_clubs(FLOAT, FLOAT, FLOAT);
ALTER TABLE public.clubs
  DROP COLUMN IF EXISTS stripe_customer_id,
  DROP COLUMN IF EXISTS subscription_tier;

-- A profile owner may edit presentation fields, but must never be able to
-- promote their own role. Role changes happen only inside the reviewed claim
-- function below.
REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (username, avatar_url) ON public.profiles TO authenticated;

CREATE UNIQUE INDEX IF NOT EXISTS club_claims_one_pending_per_user
  ON public.club_claims (club_id, user_id)
  WHERE status = 'pending';

DROP POLICY IF EXISTS "Users can insert claims." ON public.club_claims;
CREATE POLICY "Representatives can claim unowned clubs."
  ON public.club_claims FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'pending'
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.id = club_claims.club_id
        AND c.status = 'active'
        AND c.owner_id IS NULL
    )
  );

-- One stable public shape for every frontend. Related records are aggregated
-- here so pages do not need to invent fields that do not exist in `clubs`.
CREATE OR REPLACE VIEW public.club_directory
WITH (security_invoker = true)
AS
SELECT
  c.id,
  c.name,
  c.slug,
  c.description,
  c.logo_url,
  c.cover_image_url,
  CASE WHEN c.location IS NULL THEN NULL ELSE extensions.ST_Y(c.location) END AS lat,
  CASE WHEN c.location IS NULL THEN NULL ELSE extensions.ST_X(c.location) END AS lng,
  c.address,
  c.city,
  c.province,
  c.postal_code,
  c.phone,
  c.email,
  c.whatsapp,
  c.instagram_url,
  c.website AS website_url,
  c.status::TEXT AS status,
  c.owner_id IS NOT NULL AS is_claimed,
  COALESCE(
    (
      SELECT ARRAY_AGG(ci.image_url ORDER BY ci.display_order, ci.created_at)
      FROM public.club_images ci
      WHERE ci.club_id = c.id
    ),
    ARRAY[]::TEXT[]
  ) AS photos,
  COALESCE(
    (
      SELECT ROUND(AVG(r.rating)::NUMERIC, 1)::DOUBLE PRECISION
      FROM public.reviews r
      WHERE r.club_id = c.id
    ),
    0::DOUBLE PRECISION
  ) AS rating,
  (
    SELECT COUNT(*)::INTEGER
    FROM public.reviews r
    WHERE r.club_id = c.id
  ) AS review_count,
  COALESCE(
    (
      SELECT ARRAY_AGG(a.slug ORDER BY a.name)
      FROM public.club_amenities ca
      JOIN public.amenities a ON a.id = ca.amenity_id
      WHERE ca.club_id = c.id
    ),
    ARRAY[]::TEXT[]
  ) AS amenities,
  COALESCE(
    (
      SELECT JSONB_OBJECT_AGG(
        CASE h.day_of_week
          WHEN 0 THEN 'domingo'
          WHEN 1 THEN 'lunes'
          WHEN 2 THEN 'martes'
          WHEN 3 THEN 'miércoles'
          WHEN 4 THEN 'jueves'
          WHEN 5 THEN 'viernes'
          WHEN 6 THEN 'sábado'
        END,
        CASE
          WHEN h.is_closed THEN 'cerrado'
          ELSE TO_CHAR(h.open_time, 'HH24:MI') || '-' || TO_CHAR(h.close_time, 'HH24:MI')
        END
      )
      FROM public.club_hours h
      WHERE h.club_id = c.id
    ),
    '{}'::JSONB
  ) AS opening_hours,
  c.created_at,
  c.updated_at
FROM public.clubs c
WHERE c.status = 'active';

GRANT SELECT ON public.club_directory TO anon, authenticated;

-- EPSG:4326 geometry uses degrees. Casting to geography makes ST_DWithin and
-- ST_Distance operate in metres, which is what radius_km requires.
CREATE OR REPLACE FUNCTION public.get_nearby_clubs(
  p_lat FLOAT,
  p_lon FLOAT,
  p_radius_km FLOAT DEFAULT 25
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  instagram_url TEXT,
  website_url TEXT,
  status TEXT,
  is_claimed BOOLEAN,
  photos TEXT[],
  rating DOUBLE PRECISION,
  review_count INTEGER,
  amenities TEXT[],
  opening_hours JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  distance_km DOUBLE PRECISION
)
LANGUAGE SQL
STABLE
AS $$
  SELECT
    d.id,
    d.name,
    d.slug,
    d.description,
    d.logo_url,
    d.cover_image_url,
    d.lat,
    d.lng,
    d.address,
    d.city,
    d.province,
    d.postal_code,
    d.phone,
    d.email,
    d.whatsapp,
    d.instagram_url,
    d.website_url,
    d.status,
    d.is_claimed,
    d.photos,
    d.rating,
    d.review_count,
    d.amenities,
    d.opening_hours,
    d.created_at,
    d.updated_at,
    extensions.ST_Distance(
      c.location::extensions.geography,
      extensions.ST_SetSRID(extensions.ST_MakePoint(p_lon, p_lat), 4326)::extensions.geography
    ) / 1000.0 AS distance_km
  FROM public.club_directory d
  JOIN public.clubs c ON c.id = d.id
  WHERE c.location IS NOT NULL
    AND extensions.ST_DWithin(
      c.location::extensions.geography,
      extensions.ST_SetSRID(extensions.ST_MakePoint(p_lon, p_lat), 4326)::extensions.geography,
      GREATEST(p_radius_km, 0) * 1000
    )
  ORDER BY distance_km ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_nearby_clubs(FLOAT, FLOAT, FLOAT) TO anon, authenticated;

-- Owner edits are intentionally limited to profile content. Publication,
-- ownership and moderation remain server/admin responsibilities.
REVOKE UPDATE ON public.clubs FROM authenticated;
GRANT UPDATE (
  name,
  description,
  logo_url,
  cover_image_url,
  address,
  city,
  province,
  postal_code,
  phone,
  email,
  website,
  whatsapp,
  instagram_url,
  location
) ON public.clubs TO authenticated;

DROP POLICY IF EXISTS "Anyone can upload club assets." ON storage.objects;

CREATE POLICY "Owners can upload club assets."
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'club_assets'
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.owner_id = auth.uid()
        AND c.id::TEXT = (storage.foldername(name))[1]
    )
  );

CREATE POLICY "Owners can update club assets."
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'club_assets'
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.owner_id = auth.uid()
        AND c.id::TEXT = (storage.foldername(name))[1]
    )
  )
  WITH CHECK (
    bucket_id = 'club_assets'
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.owner_id = auth.uid()
        AND c.id::TEXT = (storage.foldername(name))[1]
    )
  );

CREATE POLICY "Owners can delete club assets."
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'club_assets'
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.owner_id = auth.uid()
        AND c.id::TEXT = (storage.foldername(name))[1]
    )
  );

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'super_admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

CREATE POLICY "Super admins view all claims."
  ON public.club_claims FOR SELECT TO authenticated
  USING (public.is_super_admin());

CREATE POLICY "Super admins update claims."
  ON public.club_claims FOR UPDATE TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE OR REPLACE FUNCTION public.review_club_claim(
  p_claim_id UUID,
  p_approve BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  selected_claim public.club_claims%ROWTYPE;
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT * INTO selected_claim
  FROM public.club_claims
  WHERE id = p_claim_id
  FOR UPDATE;

  IF selected_claim.id IS NULL THEN
    RAISE EXCEPTION 'Claim not found';
  END IF;

  IF selected_claim.status <> 'pending' THEN
    RAISE EXCEPTION 'Claim already reviewed';
  END IF;

  IF p_approve THEN
    -- Lock the club as well as the claim. This prevents two admins from
    -- approving competing claims for the same club at the same time.
    PERFORM 1
    FROM public.clubs
    WHERE id = selected_claim.club_id
      AND owner_id IS NULL
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Club is already owned';
    END IF;

    UPDATE public.clubs
      SET owner_id = selected_claim.user_id
      WHERE id = selected_claim.club_id
        AND owner_id IS NULL;

    UPDATE public.profiles
      SET role = 'club_admin'
      WHERE id = selected_claim.user_id;

    UPDATE public.club_claims
      SET status = 'approved'
      WHERE id = selected_claim.id;

    UPDATE public.club_claims
      SET status = 'rejected'
      WHERE club_id = selected_claim.club_id
        AND id <> selected_claim.id
        AND status = 'pending';
  ELSE
    UPDATE public.club_claims
      SET status = 'rejected'
      WHERE id = selected_claim.id;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.review_club_claim(UUID, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.review_club_claim(UUID, BOOLEAN) TO authenticated;
