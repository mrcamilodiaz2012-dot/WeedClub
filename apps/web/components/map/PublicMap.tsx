'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, LocateFixed, MapPin, Search, Star } from 'lucide-react';
import type { Club } from '@/types';
import { InteractiveMap } from './InteractiveMap';

export function PublicMap({ clubs }: { clubs: Club[] }) {
  const mappedClubs = useMemo(() => clubs.filter((club) => club.lat != null && club.lng != null), [clubs]);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(mappedClubs[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const [locationError, setLocationError] = useState('');
  const [viewport, setViewport] = useState({ latitude: 40.2, longitude: -3.5, zoom: 5.2 });

  const visibleClubs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return mappedClubs;
    return mappedClubs.filter((club) => [club.name, club.city, club.province].some((value) => value?.toLowerCase().includes(term)));
  }, [mappedClubs, query]);

  const locateUser = () => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no permite obtener la ubicación.');
      return;
    }
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setViewport({ latitude: coords.latitude, longitude: coords.longitude, zoom: 12 }),
      () => setLocationError('No pudimos acceder a tu ubicación. Puedes seguir navegando por el mapa.'),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const selectClub = (id: string) => {
    const club = mappedClubs.find((item) => item.id === id);
    setSelectedClubId(id);
    if (club?.lat != null && club.lng != null) {
      setViewport((current) => ({ ...current, latitude: club.lat as number, longitude: club.lng as number, zoom: Math.max(current.zoom, 13) }));
    }
  };

  return (
    <div className="relative h-[calc(100dvh-57px)] min-h-[520px] overflow-hidden bg-gray-100">
      <div className="absolute inset-0">
        <InteractiveMap
          clubs={visibleClubs}
          selectedClubId={selectedClubId}
          hoveredClubId={null}
          onSelectClub={selectClub}
          onHoverClub={() => undefined}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4 md:p-5">
        <div className="pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 rounded-[22px] bg-white/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          <Link href="/" aria-label="Volver" className="rounded-2xl p-3 transition hover:bg-gray-100">
            <ArrowLeft size={21} />
          </Link>
          <label className="flex flex-1 items-center gap-2 px-2">
            <Search size={19} className="text-gray-400" />
            <span className="sr-only">Filtrar mapa</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en el mapa" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400" />
          </label>
          <button type="button" onClick={locateUser} className="flex items-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-800">
            <LocateFixed size={17} /> <span className="hidden sm:inline">Mi ubicación</span>
          </button>
        </div>
        {locationError && <p className="pointer-events-auto mx-auto mt-2 max-w-xl rounded-full bg-white px-4 py-2 text-center text-xs font-semibold text-red-600 shadow">{locationError}</p>}
      </div>

      <div className="absolute inset-x-0 bottom-3 z-20 md:bottom-5">
        {visibleClubs.length > 0 ? (
          <div className="flex snap-x gap-3 overflow-x-auto px-[8vw] pb-2 hide-scrollbar md:px-[calc((100vw-720px)/2)]">
            {visibleClubs.map((club) => (
              <MapClubCard key={club.id} club={club} selected={selectedClubId === club.id} onSelect={() => selectClub(club.id)} />
            ))}
          </div>
        ) : (
          <div className="mx-auto w-fit rounded-full bg-white px-5 py-3 text-sm font-bold shadow-lg">No hay clubes con ubicación para mostrar.</div>
        )}
      </div>
    </div>
  );
}

function MapClubCard({ club, selected, onSelect }: { club: Club; selected: boolean; onSelect: () => void }) {
  return (
    <article onClick={onSelect} className={`w-[78vw] max-w-[340px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[22px] border bg-white shadow-xl transition ${selected ? 'border-black ring-2 ring-black/10' : 'border-white'}`}>
      <div className="flex gap-3 p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={club.cover_image_url ?? club.photos[0] ?? '/portadas/cannabis.jpg'} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1 py-1">
          <h2 className="truncate text-lg font-black tracking-tight">{club.name}</h2>
          <p className="mt-1 flex items-center gap-1 truncate text-xs font-medium text-gray-500"><MapPin size={13} /> {club.city ?? 'Ubicación disponible'}</p>
          {club.review_count > 0 && <p className="mt-2 flex items-center gap-1 text-xs font-bold"><Star size={13} className="fill-amber-400 text-amber-400" /> {club.rating.toFixed(1)} · {club.review_count} reseñas</p>}
          <Link href={`/clubs/${club.slug}`} onClick={(event) => event.stopPropagation()} className="mt-2 inline-block text-xs font-black text-emerald-700 hover:underline">Ver perfil</Link>
        </div>
      </div>
    </article>
  );
}
