import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { EventDirectoryCard } from '@/components/catalog/CatalogCards';
import { EVENTS } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Eventos | WeedClub' };

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="EVENTOS"
        title="Actividades y encuentros"
        description="La sección ya está conectada y preparada para publicar eventos reales cuando exista una fuente verificada."
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <DemoNotice />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {EVENTS.map((event) => <EventDirectoryCard key={event.id} event={event} />)}
        </div>
      </div>
    </main>
  );
}
