import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogDetail } from '@/components/catalog/CatalogDetail';
import { EVENTS, findEvent } from '@/lib/catalog';

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = findEvent((await params).slug);
  return { title: event ? `${event.title} | WeedClub` : 'Evento | WeedClub' };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = findEvent((await params).slug);
  if (!event) notFound();

  return (
    <CatalogDetail
      backHref="/eventos"
      eyebrow="EVENTO · DEMO"
      title={event.title}
      image={event.image}
      description={event.description}
      meta={`${event.city} · ${event.dateLabel}`}
    >
      <div className="max-w-2xl rounded-[22px] bg-background-secondary p-5">
        <p className="text-[11px] font-black uppercase tracking-wider text-text-secondary">Resumen</p>
        <p className="text-[15px] leading-relaxed mt-2">{event.summary}</p>
      </div>
    </CatalogDetail>
  );
}
