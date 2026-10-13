import type { Metadata } from 'next';
import { PublicMap } from '@/components/map/PublicMap';
import { getPublicClubs } from '@/lib/clubs';

export const metadata: Metadata = {
  title: 'Mapa de clubes | WeedClub',
  description: 'Explora clubes y asociaciones en el mapa.',
};

export const dynamic = 'force-dynamic';

export default async function MapaPage() {
  const clubs = await getPublicClubs(500);
  return <PublicMap clubs={clubs} />;
}
