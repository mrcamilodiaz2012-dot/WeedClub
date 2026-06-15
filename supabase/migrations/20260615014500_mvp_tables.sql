-- Cities
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Amenities
CREATE TABLE public.amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Club Amenities
CREATE TABLE public.club_amenities (
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (club_id, amenity_id)
);

-- Club Hours
CREATE TABLE public.club_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 1 = Monday...
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT FALSE,
  UNIQUE(club_id, day_of_week)
);

-- Club Claims
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.club_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status claim_status DEFAULT 'pending'::claim_status NOT NULL,
  evidence_text TEXT,
  evidence_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Modify Clubs to link City
ALTER TABLE public.clubs ADD COLUMN city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL;

-- Enable RLS for new tables
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_claims ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Cities are viewable by everyone." ON public.cities FOR SELECT USING (true);
CREATE POLICY "Amenities are viewable by everyone." ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Club amenities are viewable by everyone." ON public.club_amenities FOR SELECT USING (true);
CREATE POLICY "Club hours are viewable by everyone." ON public.club_hours FOR SELECT USING (true);

-- Owners can manage their club amenities and hours
CREATE POLICY "Owners manage club amenities" ON public.club_amenities FOR ALL USING (
  EXISTS (SELECT 1 FROM public.clubs WHERE id = club_amenities.club_id AND owner_id = auth.uid())
);
CREATE POLICY "Owners manage club hours" ON public.club_hours FOR ALL USING (
  EXISTS (SELECT 1 FROM public.clubs WHERE id = club_hours.club_id AND owner_id = auth.uid())
);

-- Claims: users can insert, view their own.
CREATE POLICY "Users can insert claims." ON public.club_claims FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own claims." ON public.club_claims FOR SELECT USING (auth.uid() = user_id);

-- Updated at trigger for claims
CREATE TRIGGER handle_claims_updated_at
  BEFORE UPDATE ON public.club_claims
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
