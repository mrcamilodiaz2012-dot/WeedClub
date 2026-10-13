-- Legal acceptance evidence, privacy hardening and content notice workflow.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS terms_version TEXT,
  ADD COLUMN IF NOT EXISTS privacy_version TEXT;

-- Profiles contain account data and legal acceptance evidence. They must not
-- be readable by anonymous visitors or unrelated authenticated accounts.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users view own profile." ON public.profiles;
DROP POLICY IF EXISTS "Super admins view profiles." ON public.profiles;

CREATE POLICY "Users view own profile."
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Super admins view profiles."
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_super_admin());

-- Capture the accepted legal versions at account creation. These columns are
-- not included in the user's UPDATE grant, so the evidence cannot be changed
-- later from the browser.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  accepted BOOLEAN := COALESCE((new.raw_user_meta_data->>'legal_acceptance')::BOOLEAN, FALSE);
  account_purpose TEXT := new.raw_user_meta_data->>'account_purpose';
  accepted_terms_version TEXT := NULLIF(new.raw_user_meta_data->>'terms_version', '');
  accepted_privacy_version TEXT := NULLIF(new.raw_user_meta_data->>'privacy_version', '');
BEGIN
  IF account_purpose = 'club_management'
    AND (NOT accepted OR accepted_terms_version IS NULL OR accepted_privacy_version IS NULL) THEN
    RAISE EXCEPTION 'Legal acceptance is required for club accounts';
  END IF;

  INSERT INTO public.profiles (
    id,
    username,
    avatar_url,
    role,
    terms_accepted_at,
    terms_version,
    privacy_version
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', 'user_' || substr(new.id::text, 1, 8)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    'user',
    CASE WHEN accepted THEN new.created_at ELSE NULL END,
    CASE WHEN accepted THEN accepted_terms_version ELSE NULL END,
    CASE WHEN accepted THEN accepted_privacy_version ELSE NULL END
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER TABLE public.club_claims
  ADD COLUMN IF NOT EXISTS declaration_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS terms_version TEXT,
  ADD COLUMN IF NOT EXISTS privacy_version TEXT;

DROP POLICY IF EXISTS "Representatives can claim unowned clubs." ON public.club_claims;
CREATE POLICY "Representatives can claim unowned clubs."
  ON public.club_claims FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'pending'
    AND declaration_accepted_at IS NOT NULL
    AND NULLIF(terms_version, '') IS NOT NULL
    AND NULLIF(privacy_version, '') IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.terms_accepted_at IS NOT NULL
    )
    AND EXISTS (
      SELECT 1
      FROM public.clubs c
      WHERE c.id = club_claims.club_id
        AND c.status = 'active'
        AND c.owner_id IS NULL
    )
  );

ALTER TABLE public.clubs
  ADD COLUMN IF NOT EXISTS content_certified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS content_terms_version TEXT;

GRANT UPDATE (content_certified_at, content_terms_version) ON public.clubs TO authenticated;

-- Product-oriented tags turn an informational directory into something much
-- closer to a catalogue. Remove them from existing data and from the editor.
DELETE FROM public.club_amenities
WHERE amenity_id IN (
  SELECT id FROM public.amenities WHERE slug IN ('extractos', 'comestibles', 'dab-bar')
);
DELETE FROM public.amenities WHERE slug IN ('extractos', 'comestibles', 'dab-bar');

CREATE TYPE content_report_status AS ENUM ('pending', 'resolved', 'rejected');

CREATE TABLE public.content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name TEXT NOT NULL CHECK (char_length(btrim(reporter_name)) BETWEEN 2 AND 120),
  reporter_email TEXT NOT NULL CHECK (char_length(reporter_email) <= 254 AND position('@' IN reporter_email) > 1),
  target_url TEXT NOT NULL CHECK (char_length(target_url) BETWEEN 10 AND 1000 AND target_url ~* '^https?://'),
  category TEXT NOT NULL CHECK (category IN (
    'illegal_activity',
    'personal_data',
    'intellectual_property',
    'impersonation',
    'incorrect_information',
    'minors_or_safety',
    'other'
  )),
  details TEXT NOT NULL CHECK (char_length(btrim(details)) BETWEEN 40 AND 4000),
  declaration_good_faith BOOLEAN NOT NULL CHECK (declaration_good_faith),
  legal_notice_version TEXT NOT NULL,
  privacy_notice_version TEXT NOT NULL,
  status content_report_status NOT NULL DEFAULT 'pending',
  decision_reason TEXT,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX content_reports_status_created_idx
  ON public.content_reports (status, created_at);

ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a content report."
  ON public.content_reports FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND decision_reason IS NULL
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
  );

CREATE POLICY "Super admins view content reports."
  ON public.content_reports FOR SELECT TO authenticated
  USING (public.is_super_admin());

REVOKE ALL ON public.content_reports FROM anon, authenticated;
GRANT INSERT (
  id,
  reporter_name,
  reporter_email,
  target_url,
  category,
  details,
  declaration_good_faith,
  legal_notice_version,
  privacy_notice_version
) ON public.content_reports TO anon, authenticated;
GRANT SELECT ON public.content_reports TO authenticated;

CREATE TRIGGER handle_content_reports_updated_at
  BEFORE UPDATE ON public.content_reports
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.review_content_report(
  p_report_id UUID,
  p_status content_report_status,
  p_decision_reason TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF p_status NOT IN ('resolved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid final status';
  END IF;

  IF char_length(btrim(COALESCE(p_decision_reason, ''))) < 10 THEN
    RAISE EXCEPTION 'A reason of at least 10 characters is required';
  END IF;

  UPDATE public.content_reports
  SET
    status = p_status,
    decision_reason = btrim(p_decision_reason),
    reviewed_by = auth.uid(),
    reviewed_at = NOW()
  WHERE id = p_report_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Report not found or already reviewed';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.review_content_report(UUID, content_report_status, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.review_content_report(UUID, content_report_status, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.accept_current_legal_terms(
  p_terms_version TEXT,
  p_privacy_version TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_terms_version <> '2026-10-13' OR p_privacy_version <> '2026-10-13' THEN
    RAISE EXCEPTION 'Unsupported legal version';
  END IF;

  UPDATE public.profiles
  SET
    terms_accepted_at = NOW(),
    terms_version = p_terms_version,
    privacy_version = p_privacy_version
  WHERE id = auth.uid();
END;
$$;

REVOKE ALL ON FUNCTION public.accept_current_legal_terms(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.accept_current_legal_terms(TEXT, TEXT) TO authenticated;
