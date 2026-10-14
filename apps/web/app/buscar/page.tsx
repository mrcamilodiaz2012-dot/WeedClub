import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import {
  CityDirectoryCard,
  ClubDirectoryCard,
  EventDirectoryCard,
  FlowerDirectoryCard,
  GrowShopDirectoryCard,
} from '@/components/catalog/CatalogCards';
import { CITIES, EVENTS, FLOWERS, GROW_SHOPS } from '@/lib/catalog';
import { getActiveClubs } from '@/lib/clubs';

export const metadata: Metadata = { title: 'Buscar | WeedClub' };

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function includesQuery(values: Array<string | null | undefined>, query: string) {
  return values.some((value) => value && normalize(value).includes(query));
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const rawQuery = (await searchParams).q?.trim() ?? '';
  const query = normalize(rawQuery);
  const clubs = await getActiveClubs();

  const clubResults = query ? clubs.filter((club) => includesQuery([club.name, club.city, club.province, club.description], query)) : [];
  const cityResults = query ? CITIES.filter((city) => includesQuery([city.name, city.province, city.description], query)) : [];
  const flowerResults = query ? FLOWERS.filter((flower) => includesQuery([flower.name, flower.type, flower.flavor, flower.effect], query)) : [];
  const shopResults = query ? GROW_SHOPS.filter((shop) => includesQuery([shop.title, shop.subtitle, shop.city, ...shop.specialties], query)) : [];
  const eventResults = query ? EVENTS.filter((event) => includesQuery([event.title, event.city, event.summary], query)) : [];
  const total = clubResults.length + cityResults.length + flowerResults.length + shopResults.length + eventResults.length;

  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="BUSCADOR"
        title="Encuentra cada sección"
        description="Busca clubes, ciudades, flores, eventos y grow shops desde un único lugar."
        searchHref="/buscar"
      />

      <div className="max-w-5xl mx-auto px-4 py-5">
        <form action="/buscar" className="sticky top-2 z-30 bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-border-subtle flex items-center gap-3 px-4 h-[56px]">
          <Search size={21} className="text-text-secondary shrink-0" />
          <input
            name="q"
            defaultValue={rawQuery}
            autoFocus={!rawQuery}
            placeholder="Buscar clubs, ciudades, flores..."
            className="w-full bg-transparent outline-none text-[16px] font-medium placeholder:text-text-secondary"
          />
          <button type="submit" className="bg-black text-white rounded-full px-4 py-2 text-[12px] font-bold">Buscar</button>
        </form>

        {!query ? (
          <div className="py-10">
            <p className="text-[12px] font-black tracking-[0.18em] text-emerald-700 mb-4">EXPLORA POR CATEGORÍA</p>
            <div className="grid grid-cols-2 gap-3">
              {([
                ['Clubes', '/clubs'],
                ['Ciudades', '/ciudades'],
                ['Flores', '/flores'],
                ['Eventos', '/eventos'],
                ['Grow Shops', '/grow-shops'],
              ] as const).map(([label, href]) => (
                <Link key={href} href={href} className="rounded-[20px] bg-background-secondary p-5 font-display font-black text-[18px] active:scale-[0.98] transition-transform">{label}</Link>
              ))}
            </div>
          </div>
        ) : total === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[22px] font-display font-black">Sin resultados</p>
            <p className="text-[14px] text-text-secondary mt-2">No encontramos coincidencias para “{rawQuery}”.</p>
          </div>
        ) : (
          <div className="space-y-10 py-8">
            <p className="text-[13px] text-text-secondary">{total} {total === 1 ? 'resultado' : 'resultados'} para “{rawQuery}”</p>

            {clubResults.length > 0 && <ResultSection title="Clubes"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{clubResults.map((club) => <ClubDirectoryCard key={club.id} club={club} />)}</div></ResultSection>}
            {cityResults.length > 0 && <ResultSection title="Ciudades"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{cityResults.map((city) => <CityDirectoryCard key={city.slug} city={city} />)}</div></ResultSection>}
            {flowerResults.length > 0 && <ResultSection title="Flores"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{flowerResults.map((flower) => <FlowerDirectoryCard key={flower.id} flower={flower} />)}</div></ResultSection>}
            {shopResults.length > 0 && <ResultSection title="Grow Shops"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{shopResults.map((shop) => <GrowShopDirectoryCard key={shop.id} shop={shop} />)}</div></ResultSection>}
            {eventResults.length > 0 && <ResultSection title="Eventos"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{eventResults.map((event) => <EventDirectoryCard key={event.id} event={event} />)}</div></ResultSection>}
          </div>
        )}
      </div>
    </main>
  );
}

function ResultSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[25px] font-display font-black tracking-tighter mb-4">{title}</h2>
      {children}
    </section>
  );
}
