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
export type SubscriptionTier = 'free' | 'premium';

export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  // location is a geometry point, usually returned as string or GeoJSON object from PostGIS
  location: any; 
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  status: ClubStatus;
  subscription_tier: SubscriptionTier;
  stripe_customer_id: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}
