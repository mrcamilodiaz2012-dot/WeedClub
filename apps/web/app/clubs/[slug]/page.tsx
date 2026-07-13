import * as React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import type { Club } from '@/types';

import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';

export const revalidate = 3600;

// Clubs mock para desarrollo — sin tocar Supabase
const MOCK_IDS = ['1', '2', '3', '4', '5', '6'];
const MOCK_SLUGS = [
  'green-leaf-club-1',
  'green-leaf-club-2',
  'canna-valencia',
  'canna-sevilla',
  'canna-bilbao',
  'canna-malaga' // matches `names` fallback but in lower kebab case. wait, let's just make it simple.
];

function getMockClub(identifier: string): Club {
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga'];
  const names = ['Green Leaf Club 1', 'Green Leaf Club 2', 'Canna Valencia', 'Canna Sevilla', 'Canna Bilbao', 'Canna Málaga'];
  const covers: Record<string, string> = {
    '1': '/portadas/cannabis2.jpg',
    '3': '/portadas/cannabis3.jpg',
  };
  
  let id = identifier;
  if (!MOCK_IDS.includes(id)) {
    // try to find by slug
    const index = MOCK_SLUGS.indexOf(id);
    if (index !== -1) {
      id = String(index + 1);
    }
  }

  const idx = Number(id) - 1;
  return {
    id,
    name: names[idx] ?? `Club ${id}`,
    slug: MOCK_SLUGS[idx] ?? `mock-club-${id}`,
    description: `Bienvenido al Club ${id}. Este es un perfil generado dinámicamente para probar la nueva arquitectura de perfil.`,
    logo_url: '/logo2.svg',
    cover_image_url: covers[id] ?? '/portadas/cannabis.jpg',
    lat: 40.4168,
    lng: -3.7038,
    address: 'Calle Falsa 123',
    city: cities[idx] ?? 'Madrid',
    province: 'Provincia',
    status: 'active',
    subscription_tier: 'premium',
    phone: null,
    whatsapp: null,
    instagram_url: null,
    website_url: null,
    opening_hours: null,
    photos: null,
    rating: 4.8,
    review_count: 124,
    amenities: ['wifi', 'gaming', 'cafeteria'],
    membership_standard_price: 20,
    membership_premium_price: 50,
  };
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Short-circuit para clubs mock — cero llamadas a Supabase
  if (MOCK_IDS.includes(slug) || MOCK_SLUGS.includes(slug)) {
    const club = getMockClub(slug);
    return (
      <main className="w-full min-h-screen bg-white">
        <ProfileHero club={club} />
        <ProfileContent club={club} />
      </main>
    );
  }

  // Para clubs reales: buscar por slug primero, luego por id (compatibilidad)
  const supabase = createClient();
  const { data: club, error } = await supabase
    .from('clubs')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .single();

  if (error || !club) {
    notFound();
  }

  const isClaimed = club.subscription_tier !== 'unclaimed';

  return (
    <main className="w-full min-h-screen bg-white">
      <ProfileHero club={club as Club} />
      <ProfileContent club={club as Club} />
      {!isClaimed && <ClaimClubBanner />}
    </main>
  );
}
