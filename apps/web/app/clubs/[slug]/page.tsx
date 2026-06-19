import * as React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

// Nuevos componentes de la arquitectura Premium
import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileBio } from '@/components/club-profile/ProfileBio';
import { ProfileQuickStats } from '@/components/club-profile/ProfileQuickStats';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { SimilarClubs } from '@/components/club-profile/SimilarClubs';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';

export const revalidate = 3600;

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = createClient();
  const resolvedParams = await params;
  
  // Asumimos que el slug es el ID por ahora
  const { data: club, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', resolvedParams.slug)
    .single();

  if (error || !club) {
    notFound();
  }

  // Mock property para probar la vista condicional del banner
  const isClaimed = true; // Set to true usually, but logic should check database

  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero Header (Identidad Principal) */}
      <ProfileHero club={club} />

      {/* 2. Bio & Contexto */}
      <ProfileBio description={club.description} />

      {/* 3. Quick Stats (Pills) */}
      <ProfileQuickStats city={club.city} />

      {/* 4 & 5. Sticky Navigation y Contenido de Tabs */}
      <ProfileContent club={club} />

      {/* 6. Clubes Similares (Carrusel) */}
      <SimilarClubs />

      {/* 7. Call to Action: Reclamar Club (Solo si no está reclamado) */}
      {!isClaimed && <ClaimClubBanner />}
    </main>
  );
}

