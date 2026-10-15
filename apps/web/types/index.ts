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

  // Solo para contenido local de demostración. Nunca implica verificación real.
  is_demo?: boolean;
  verification_status?: 'verified' | 'unverified' | 'demo';

  // Datos opcionales de fichas públicas todavía no reclamadas por el club.
  locality?: string | null;
  minimum_age?: number | null;
  membership_note?: string | null;
  google_maps_url?: string | null;
  public_data_updated_at?: string | null;
  media_status?: 'club' | 'reference';
}
