-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis SCHEMA extensions;

-- Custom Types
CREATE TYPE user_role AS ENUM ('user', 'club_admin', 'super_admin');
CREATE TYPE club_status AS ENUM ('pending', 'active', 'suspended');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium');

-- Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Clubs Table
CREATE TABLE public.clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  location extensions.geometry(Point, 4326),
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  status club_status DEFAULT 'pending'::club_status NOT NULL,
  subscription_tier subscription_tier DEFAULT 'free'::subscription_tier NOT NULL,
  stripe_customer_id TEXT,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Club Images
CREATE TABLE public.club_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(club_id, user_id)
);

-- Favorites
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(club_id, user_id)
);

-- Indexes for Geo and Performance
CREATE INDEX idx_clubs_location ON public.clubs USING GIST (location);
CREATE INDEX idx_clubs_slug ON public.clubs (slug);
CREATE INDEX idx_reviews_club_id ON public.reviews (club_id);

-- RPC for Geo Search
CREATE OR REPLACE FUNCTION public.get_nearby_clubs(lat float, lon float, radius_km float)
RETURNS SETOF public.clubs AS $$
  SELECT * FROM public.clubs
  WHERE status = 'active' AND extensions.ST_DWithin(
    location,
    extensions.ST_SetSRID(extensions.ST_MakePoint(lon, lat), 4326),
    radius_km * 1000
  )
$$ LANGUAGE sql STABLE;

-- RLS Configuration

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Clubs: Public read active, owner read/write all
CREATE POLICY "Active clubs viewable by everyone." ON public.clubs FOR SELECT USING (status = 'active');
CREATE POLICY "Owners can view own clubs." ON public.clubs FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can update own clubs." ON public.clubs FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert own clubs." ON public.clubs FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Club Images: Public read, owner manage
CREATE POLICY "Club images viewable by everyone." ON public.club_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.clubs WHERE id = club_images.club_id AND (status = 'active' OR owner_id = auth.uid()))
);
CREATE POLICY "Owners can manage club images" ON public.club_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.clubs WHERE id = club_images.club_id AND owner_id = auth.uid())
);

-- Reviews: Public read, owner manage
CREATE POLICY "Reviews viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews." ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews." ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews." ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Favorites: Private read/write
CREATE POLICY "Users can view own favorites." ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites." ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites." ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_clubs_updated_at
  BEFORE UPDATE ON public.clubs
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();
