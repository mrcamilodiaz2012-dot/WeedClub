export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  lat: number | null;
  lng: number | null;
  address: string | null;
  city: string | null;
  province: string | null;
  status: string;
  subscription_tier: string;

  // Contacto
  phone: string | null;
  whatsapp: string | null;
  instagram_url: string | null;
  website_url: string | null;

  // Horarios: { "lunes": "10:00-23:00", "martes": "10:00-23:00", ... }
  opening_hours: Record<string, string> | null;

  // Galería: URLs de Supabase Storage
  photos: string[] | null;

  // Valoraciones
  rating: number | null;
  review_count: number | null;

  // Servicios: ["wifi", "gaming", "cafeteria", "parking", "terraza"]
  amenities: string[] | null;

  // Membresía
  membership_standard_price: number | null;
  membership_premium_price: number | null;
}
