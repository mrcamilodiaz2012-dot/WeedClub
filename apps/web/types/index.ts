export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  cover_image_url: string | null;
  lat: number;
  lng: number;
  address: string;
  city: string;
  province: string;
  status: string;
  subscription_tier: string;
}
