DROP FUNCTION IF EXISTS public.get_nearby_clubs(float, float, float);

CREATE OR REPLACE FUNCTION public.get_nearby_clubs(lat float, lon float, radius_km float)
RETURNS TABLE (
  id uuid, 
  name text, 
  slug text, 
  description text, 
  logo_url text, 
  cover_image_url text,
  address text, 
  city text, 
  province text, 
  status text, 
  subscription_tier text,
  lat float, 
  lng float
) AS $$
  SELECT 
    id, name, slug, description, logo_url, cover_image_url, 
    address, city, province, status, subscription_tier,
    extensions.ST_Y(location::extensions.geometry) as lat, 
    extensions.ST_X(location::extensions.geometry) as lng
  FROM public.clubs
  WHERE status = 'active' AND extensions.ST_DWithin(
    location,
    extensions.ST_SetSRID(extensions.ST_MakePoint(lon, lat), 4326),
    radius_km * 1000
  )
$$ LANGUAGE sql STABLE;
