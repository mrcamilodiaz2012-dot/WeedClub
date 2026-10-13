'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Building2, ChevronDown, Compass, Map as MapIcon, MapPin, Search, Star } from 'lucide-react';
import type { Club } from '@/types';
import { LocationModal, type Location } from '@/components/ui/LocationModal';

interface AppStoreHomeProps {
  clubs: Club[];
}

const CITY_IMAGES: Record<string, string> = {
  barcelona: '/portadas-ciudades/barcelona.webp',
  madrid: '/portadas-ciudades/madrid.webp',
  valencia: '/portadas-ciudades/valencia.webp',
  alicante: '/portadas-ciudades/alicante.webp',
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function AppStoreHome({ clubs }: AppStoreHomeProps) {
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);

  const filteredClubs = useMemo(() => {
    const normalizedQuery = normalize(query);
    const selectedCity = selectedLocation ? normalize(selectedLocation.name) : null;

    return clubs.filter((club) => {
      const matchesCity = !selectedCity || normalize(club.city ?? '') === selectedCity;
      const searchable = normalize(
        [club.name, club.city, club.province, club.address, ...club.amenities].filter(Boolean).join(' ')
      );
      return matchesCity && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [clubs, query, selectedLocation]);

  const cities = useMemo(() => {
    const counts = new Map<string, number>();
    clubs.forEach((club) => {
      if (club.city) counts.set(club.city, (counts.get(club.city) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [clubs]);

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="WeedClub, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/weed-maps.svg" alt="WeedClub" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/mapa"
              className="hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 sm:flex"
            >
              <MapIcon size={17} /> Ver mapa
            </Link>
            <Link
              href="/club/panel"
              className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Building2 size={17} /> Gestionar club
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-black/5 bg-[#f5f7f4]">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute -bottom-44 left-1/4 h-80 w-80 rounded-full bg-lime-100 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
                <Compass size={14} /> Directorio independiente
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-gray-950 md:text-6xl">
                Encuentra clubes cerca de ti.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                Explora asociaciones, consulta su información y elige con criterio antes de desplazarte.
              </p>
            </div>

            <div className="mt-9 grid max-w-3xl gap-3 rounded-[26px] bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,0.08)] md:grid-cols-[1fr_auto]">
              <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-gray-50 px-4">
                <Search className="shrink-0 text-gray-400" size={21} />
                <span className="sr-only">Buscar clubes</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nombre, ciudad o servicio"
                  className="w-full bg-transparent text-base font-medium outline-none placeholder:text-gray-400"
                />
              </label>
              <button
                type="button"
                onClick={() => setLocationOpen(true)}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                <MapPin size={18} />
                {selectedLocation?.name ?? 'Todas las ciudades'}
                <ChevronDown size={16} />
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {filteredClubs.length === 1 ? '1 club disponible' : `${filteredClubs.length} clubes disponibles`}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
          {cities.length > 0 && !query && !selectedLocation && (
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Explorar</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight">Ciudades con clubes</h2>
                </div>
                <Link href="/buscar" className="text-sm font-bold text-gray-600 hover:text-black">Ver directorio</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {cities.map(([city, count]) => {
                  const image = CITY_IMAGES[normalize(city)];
                  return (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setSelectedLocation({ id: city, name: city, province: city, lat: 0, lng: 0 })}
                      className="relative h-44 w-52 shrink-0 overflow-hidden rounded-[24px] bg-gray-900 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p className="text-xl font-black tracking-tight">{city}</p>
                        <p className="mt-1 text-xs text-white/75">{count} {count === 1 ? 'club' : 'clubes'}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  {selectedLocation ? selectedLocation.name : 'Directorio'}
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  {query ? 'Resultados de búsqueda' : 'Clubes para descubrir'}
                </h2>
              </div>
              {(query || selectedLocation) && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setSelectedLocation(null); }}
                  className="text-sm font-bold text-gray-500 hover:text-black"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {filteredClubs.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => <ClubTile key={club.id} club={club} />)}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
                <MapPin className="mx-auto mb-4 text-gray-300" size={34} />
                <h3 className="text-lg font-bold">No encontramos clubes con esos filtros</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                  Prueba con otra ciudad o un término más general. Si el directorio está vacío, aplica primero las migraciones y carga los datos de desarrollo.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <LocationModal
        isOpen={locationOpen}
        onClose={() => setLocationOpen(false)}
        onLocationSelect={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}

export function ClubTile({ club }: { club: Club }) {
  const cover = club.cover_image_url ?? club.photos[0] ?? '/portadas/cannabis.jpg';

  return (
    <Link href={`/clubs/${club.slug}`} className="group overflow-hidden rounded-[26px] border border-black/5 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={club.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        {club.distance_km != null && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold shadow-sm">
            {club.distance_km.toFixed(1)} km
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-2xl font-black tracking-tight">{club.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <MapPin size={14} /> {[club.city, club.province].filter(Boolean).join(', ') || 'Ubicación pendiente'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-700">
            {club.amenities.length > 0 ? club.amenities.slice(0, 3).join(' · ') : 'Consulta la información del club'}
          </p>
          <p className="mt-1 text-xs text-gray-400">{club.is_claimed ? 'Perfil gestionado' : 'Perfil por reclamar'}</p>
        </div>
        {club.review_count > 0 && (
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800">
            <Star size={13} className="fill-amber-400 text-amber-400" /> {club.rating.toFixed(1)}
          </div>
        )}
      </div>
    </Link>
  );
}
