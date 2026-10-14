import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { ClubDirectoryCard } from '@/components/catalog/CatalogCards';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { CITIES, findCity } from '@/lib/catalog';
import { getActiveClubs } from '@/lib/clubs';

export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = findCity(slug);
  return { title: city ? `${city.name} | WeedClub` : 'Ciudad | WeedClub' };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();

  const clubs = (await getActiveClubs()).filter(
    (club) => club.city?.toLocaleLowerCase('es') === city.name.toLocaleLowerCase('es'),
  );

  return (
    <main className="min-h-screen bg-white pb-28">
      <section className="relative h-[330px] md:h-[420px] overflow-hidden">
        <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />
        <Link href="/ciudades" className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-black" aria-label="Volver a ciudades">
          <ArrowLeft size={20} />
        </Link>
        <div className="absolute left-0 right-0 bottom-0 p-5 md:p-8 max-w-5xl mx-auto text-white">
          <p className="text-[11px] font-black tracking-[0.2em] text-emerald-300 mb-2">CIUDAD</p>
          <h1 className="text-[46px] md:text-[64px] font-display font-black tracking-tighter leading-none">{city.name}</h1>
          <p className="mt-3 text-[14px] text-white/85 flex items-center gap-1.5"><MapPin size={15} /> {city.province}</p>
        </div>
      </section>

      <section className="relative -mt-5 bg-white rounded-t-[28px] px-4 pt-7 max-w-5xl mx-auto">
        <p className="text-[16px] leading-relaxed text-text-secondary max-w-2xl">{city.description}</p>
        {clubs.some((club) => club.is_demo) && <div className="mt-5"><DemoNotice /></div>}
        <div className="flex items-end justify-between mt-8 mb-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] text-emerald-700">DIRECTORIO</p>
            <h2 className="text-[27px] font-display font-black tracking-tighter">Clubes en {city.name}</h2>
          </div>
          <span className="text-[12px] text-text-secondary">{clubs.length} {clubs.length === 1 ? 'ficha' : 'fichas'}</span>
        </div>
        {clubs.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map((club) => <ClubDirectoryCard key={club.id} club={club} />)}
          </div>
        ) : (
          <div className="rounded-[24px] bg-background-secondary p-7 text-center text-text-secondary text-sm">
            Todavía no hay fichas publicadas para esta ciudad.
          </div>
        )}
      </section>
    </main>
  );
}
