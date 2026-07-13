import { AppStoreHome } from '@/components/layout/AppStoreHome';
import { createClient } from '@supabase/supabase-js';
import type { Club } from '@/types';

export const revalidate = 300; // Refrescar clubs cada 5 minutos

// Clubs mock para cuando no hay datos en Supabase (desarrollo)
const MOCK_CLUBS: Club[] = [
  {
    id: '1', name: 'Green Leaf Club 1', slug: 'green-leaf-club-1',
    description: null, logo_url: '/logo2.svg',
    cover_image_url: '/portadas/cannabis2.jpg',
    lat: 40.4168, lng: -3.7038, address: 'Calle Falsa 123', city: 'Madrid',
    province: 'Madrid', status: 'active', subscription_tier: 'premium',
    phone: null, whatsapp: null, instagram_url: null, website_url: null,
    opening_hours: null, photos: null, rating: 4.8, review_count: 124,
    amenities: ['wifi', 'gaming', 'cafeteria'],
    membership_standard_price: 20, membership_premium_price: 50,
  },
  {
    id: '2', name: 'Green Leaf Club 2', slug: 'green-leaf-club-2',
    description: null, logo_url: '/logo2.svg',
    cover_image_url: '/portadas/cannabis.jpg',
    lat: 41.3851, lng: 2.1734, address: 'Carrer Falsa 456', city: 'Barcelona',
    province: 'Barcelona', status: 'active', subscription_tier: 'basic',
    phone: null, whatsapp: null, instagram_url: null, website_url: null,
    opening_hours: null, photos: null, rating: 4.6, review_count: 87,
    amenities: ['wifi', 'cafeteria'],
    membership_standard_price: 20, membership_premium_price: 50,
  },
  {
    id: '3', name: 'Canna Valencia', slug: 'canna-valencia',
    description: null, logo_url: '/logo2.svg',
    cover_image_url: '/portadas/cannabis3.jpg',
    lat: 39.4699, lng: -0.3763, address: 'Carrer de Falsa 789', city: 'Valencia',
    province: 'Valencia', status: 'active', subscription_tier: 'basic',
    phone: null, whatsapp: null, instagram_url: null, website_url: null,
    opening_hours: null, photos: null, rating: 4.7, review_count: 63,
    amenities: ['wifi'],
    membership_standard_price: null, membership_premium_price: null,
  },
];

export default async function Home() {
  let clubs: Club[] = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from('clubs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(20);

    clubs = (data as Club[]) ?? [];
  } catch {
    // Si Supabase no está disponible, usamos mock
    clubs = [];
  }

  // Fallback a mock si no hay clubs en DB todavía
  const displayClubs = clubs.length > 0 ? clubs : MOCK_CLUBS;

  return (
    <main className="w-full h-screen overflow-hidden bg-background-base">
      <AppStoreHome clubs={displayClubs} />
    </main>
  );
}
