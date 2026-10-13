// Shared Types
export type UserRole = 'user' | 'club_admin' | 'super_admin';

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export type ClubStatus = 'pending' | 'active' | 'suspended';

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
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  instagram_url: string | null;
  website_url: string | null;
  status: ClubStatus;
  is_claimed: boolean;
  photos: string[];
  rating: number;
  review_count: number;
  amenities: string[];
  opening_hours: Record<string, string>;
  distance_km?: number | null;
  created_at: string;
  updated_at: string;
}

export type ClubClaimStatus = 'pending' | 'approved' | 'rejected';

export interface ClubClaim {
  id: string;
  club_id: string;
  user_id: string;
  status: ClubClaimStatus;
  evidence_text: string | null;
  evidence_url: string | null;
  created_at: string;
  updated_at: string;
}
