import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { FlowerDirectoryCard } from '@/components/catalog/CatalogCards';
import { FLOWERS } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Flores | WeedClub' };

export default function FlowersPage() {
  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="CATÁLOGO INFORMATIVO"
        title="Flores y variedades"
        description="Fichas visuales para consultar información orientativa. No muestran stock ni venta y sus datos actuales son demostrativos."
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <DemoNotice />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {FLOWERS.map((flower) => <FlowerDirectoryCard key={flower.id} flower={flower} />)}
        </div>
      </div>
    </main>
  );
}
