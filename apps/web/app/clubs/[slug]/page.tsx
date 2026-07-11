import * as React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

// Nuevos componentes de la arquitectura Premium
import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';

export const revalidate = 3600;

// Clubs mock para desarrollo — sin tocar Supabase
const MOCK_IDS = ['1', '2', '3', '4', '5', '6'];

function getMockClub(slug: string) {
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga'];
  const names = ['Green Leaf Club 1', 'Green Leaf Club 2', 'Canna Valencia', 'Canna Sevilla', 'Canna Bilbao', 'Canna Málaga'];
  const covers: Record<string, string> = {
    '1': '/portadas/cannabis2.jpg',
    '3': '/portadas/cannabis3.jpg',
  };
  const idx = Number(slug) - 1;
  return {
    id: slug,
    name: names[idx] ?? `Club ${slug}`,
    slug: `mock-club-${slug}`,
    description: `Bienvenido al Club ${slug}. Este es un perfil generado dinámicamente para probar la nueva arquitectura de perfil.`,
    logo_url: '/logo2.svg',
    cover_image_url: covers[slug] ?? '/portadas/cannabis.jpg',
    lat: 40.4168,
    lng: -3.7038,
    address: 'Calle Falsa 123',
    city: cities[idx] ?? 'Madrid',
    province: 'Provincia',
    status: 'active',
    subscription_tier: 'premium',
  } as any;
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // ⚡ Short-circuit para clubs mock — cero llamadas a Supabase
  if (MOCK_IDS.includes(slug)) {
    const club = getMockClub(slug);
    return (
      <main className="w-full min-h-screen bg-white">
        <ProfileHero club={club} />
        <ProfileContent club={club} />
      </main>
    );
  }

  // Solo llegamos aquí para clubs reales en la base de datos
  const supabase = createClient();
  const { data: club, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', slug)
    .single();

  if (error || !club) {
    notFound();
  }

  const isClaimed = true;

  return (
    <main className="w-full min-h-screen bg-white">
      <ProfileHero club={club} />
      <ProfileContent club={club} />
      {!isClaimed && <ClaimClubBanner />}
    </main>
  );
}
