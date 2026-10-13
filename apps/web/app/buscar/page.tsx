import type { Metadata } from 'next';
import { SearchDirectory } from '@/components/directory/SearchDirectory';
import { getPublicClubs } from '@/lib/clubs';

export const metadata: Metadata = {
  title: 'Buscar clubes | WeedClub',
  description: 'Busca clubes por nombre, ciudad y servicios disponibles.',
};

export const dynamic = 'force-dynamic';

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [clubs, params] = await Promise.all([getPublicClubs(500), searchParams]);
  return <SearchDirectory clubs={clubs} initialQuery={params.q ?? ''} />;
}
