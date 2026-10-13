import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileHero } from '@/components/club-profile/ProfileHero';
import { ProfileContent } from '@/components/club-profile/ProfileContent';
import { ClaimClubBanner } from '@/components/club-profile/ClaimClubBanner';
import { getPublicClub } from '@/lib/clubs';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const club = await getPublicClub(slug);
  if (!club) return { title: 'Club no encontrado | WeedClub' };

  const location = [club.city, club.province].filter(Boolean).join(', ');
  return {
    title: `${club.name}${location ? ` en ${location}` : ''} | WeedClub`,
    description: club.description?.slice(0, 155) ?? `Información, ubicación, servicios y contacto de ${club.name}.`,
    openGraph: {
      title: club.name,
      description: club.description?.slice(0, 155) ?? `Consulta el perfil público de ${club.name}.`,
      images: club.cover_image_url ? [club.cover_image_url] : undefined,
    },
  };
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getPublicClub(slug);
  if (!club) notFound();

  return (
    <main className="min-h-screen bg-white">
      <ProfileHero club={club} />
      <ProfileContent club={club} />
      {!club.is_claimed && <ClaimClubBanner clubId={club.id} />}
    </main>
  );
}
