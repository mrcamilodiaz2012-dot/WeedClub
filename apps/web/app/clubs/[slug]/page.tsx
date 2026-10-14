import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { DEMO_CLUBS } from '@/lib/catalog';
import { getClubByIdentifier } from '@/lib/clubs';

export const revalidate = 3600;

export function generateStaticParams() {
  return DEMO_CLUBS.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const club = await getClubByIdentifier((await params).slug);
  return { title: club ? `${club.name} | WeedClub` : 'Club | WeedClub' };
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const club = await getClubByIdentifier((await params).slug);
  if (!club) notFound();

  const isClaimed = club.subscription_tier !== 'unclaimed' && !club.is_demo;

  return (
    <main className="w-full min-h-screen bg-white">
      <ProfileHero club={club} />
      {club.is_demo && <div className="px-4 pt-4 max-w-4xl mx-auto"><DemoNotice /></div>}
      <ProfileContent club={club} />
      {!isClaimed && <ClaimClubBanner />}
    </main>
  );
}
