import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { ClubDirectoryCard } from '@/components/catalog/CatalogCards';
import { getActiveClubs } from '@/lib/clubs';

export const metadata: Metadata = {
  title: 'Clubes | WeedClub',
  description: 'Directorio de clubes disponibles en WeedClub.',
};

export default async function ClubsPage() {
  const clubs = await getActiveClubs();
  const hasDemoContent = clubs.some((club) => club.is_demo);

  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="CLUBES"
        title="Explora las fichas del directorio"
        description="Consulta la información disponible y entra en cada perfil sin salir de la experiencia de WeedClub."
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {hasDemoContent && <DemoNotice />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {clubs.map((club) => <ClubDirectoryCard key={club.id} club={club} />)}
        </div>
      </div>
    </main>
  );
}
