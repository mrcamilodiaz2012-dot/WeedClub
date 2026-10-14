import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { CityDirectoryCard } from '@/components/catalog/CatalogCards';
import { CITIES } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Ciudades | WeedClub',
  description: 'Directorio de ciudades de WeedClub.',
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="CIUDADES"
        title="Elige una ciudad"
        description="Cada ciudad conecta con sus clubes y mantiene las imágenes que ya forman parte del diseño actual."
      />
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {CITIES.map((city) => <CityDirectoryCard key={city.slug} city={city} />)}
      </div>
    </main>
  );
}
