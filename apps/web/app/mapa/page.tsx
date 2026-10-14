import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { MapDirectory } from '@/components/catalog/MapDirectory';
import { getActiveClubs } from '@/lib/clubs';

export const metadata: Metadata = { title: 'Mapa | WeedClub' };

export default async function MapPage() {
  const clubs = (await getActiveClubs()).filter(
    (club) => typeof club.lat === 'number' && typeof club.lng === 'number',
  );

  return (
    <main className="min-h-screen bg-background-base pb-24">
      <DirectoryHeader
        eyebrow="MAPA"
        title="Ubica las fichas del directorio"
        description="Selecciona un marcador para abrir su ficha. Las posiciones de demostración son aproximadas."
      />
      <MapDirectory clubs={clubs} />
    </main>
  );
}
