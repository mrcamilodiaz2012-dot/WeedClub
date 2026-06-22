import * as React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

// Nuevos componentes de la arquitectura Premium
import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { SimilarClubs } from '@/components/club-profile/SimilarClubs';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';

export const revalidate = 3600;

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = createClient();
  const resolvedParams = await params;
  
  // Asumimos que el slug es el ID por ahora
  let { data: club, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', resolvedParams.slug)
    .single();

  if (error || !club) {
    // FALLBACK A MOCK CLUB PARA PRUEBAS (Permite clickear los del home y verlos)
    const isMock = ['1', '2', '3', '4', '5', '6'].includes(resolvedParams.slug);
    
    if (isMock) {
      club = {
        id: resolvedParams.slug,
        name: `Mock Club ${resolvedParams.slug}`,
        slug: `mock-club-${resolvedParams.slug}`,
        description: `Bienvenido al Club ${resolvedParams.slug}. Este es un perfil generado dinámicamente para probar la nueva arquitectura de perfil.`,
        logo_url: `https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&auto=format&fit=crop&sig=${resolvedParams.slug}`,
        cover_image_url: '/portadas/portada2.jpg',
        lat: 40.4168,
        lng: -3.7038,
        address: 'Calle Falsa 123',
        city: ['Madrid', 'Barcelona', 'Valencia'][Number(resolvedParams.slug) % 3],
        province: 'Provincia',
        status: 'active',
        subscription_tier: 'premium'
      } as any;
    } else {
      notFound();
    }
  }

  // Mock property para probar la vista condicional del banner
  const isClaimed = true; // Set to true usually, but logic should check database

  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero Header (Identidad Principal) */}
      <ProfileHero club={club} />

      {/* 2. Sticky Navigation y Contenido de Tabs */}
      <ProfileContent club={club} />

      {/* 6. Clubes Similares (Carrusel) */}
      <SimilarClubs />

      {/* 7. Call to Action: Reclamar Club (Solo si no está reclamado) */}
      {!isClaimed && <ClaimClubBanner />}
    </main>
  );
}

