'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react';
import type { Club } from '@/types';
import { ClubTile } from '@/components/layout/AppStoreHome';

function normalized(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function SearchDirectory({ clubs, initialQuery = '' }: { clubs: Club[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState('');
  const [amenity, setAmenity] = useState('');
  const [sort, setSort] = useState<'name' | 'rating'>('name');

  const cities = useMemo(
    () => [...new Set(clubs.map((club) => club.city).filter((item): item is string => Boolean(item)))].sort(),
    [clubs]
  );
  const amenities = useMemo(
    () => [...new Set(clubs.flatMap((club) => club.amenities))].sort(),
    [clubs]
  );

  const results = useMemo(() => {
    const term = normalized(query);
    return clubs
      .filter((club) => {
        const haystack = normalized([club.name, club.city, club.province, club.address, ...club.amenities].filter(Boolean).join(' '));
        return (!term || haystack.includes(term))
          && (!city || club.city === city)
          && (!amenity || club.amenities.includes(amenity));
      })
      .sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.name.localeCompare(b.name, 'es'));
  }, [amenity, city, clubs, query, sort]);

  return (
    <div className="min-h-screen bg-[#f7f7f5] pb-28">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-full p-2 transition hover:bg-gray-100" aria-label="Volver al inicio">
              <ArrowLeft size={22} />
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Directorio</p>
              <h1 className="text-2xl font-black tracking-tight">Buscar clubes</h1>
            </div>
          </div>

          <label className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-gray-50 px-4 focus-within:border-emerald-500 focus-within:bg-white">
            <Search size={20} className="text-gray-400" />
            <span className="sr-only">Buscar</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nombre, zona o servicio"
              className="w-full bg-transparent font-medium outline-none placeholder:text-gray-400"
              autoFocus
            />
          </label>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <FilterSelect label="Ciudad" value={city} onChange={setCity} options={cities} />
            <FilterSelect label="Servicio" value={amenity} onChange={setAmenity} options={amenities} />
            <label className="relative flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={(event) => setSort(event.target.value as 'name' | 'rating')} className="appearance-none bg-transparent pr-3 outline-none">
                <option value="name">Nombre</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </label>
            {(city || amenity || query) && (
              <button type="button" onClick={() => { setQuery(''); setCity(''); setAmenity(''); }} className="shrink-0 px-3 text-sm font-bold text-gray-500 hover:text-black">
                Limpiar
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</p>
          <Link href="/mapa" className="text-sm font-bold text-emerald-700 hover:text-emerald-800">Ver en el mapa</Link>
        </div>
        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((club) => <ClubTile key={club.id} club={club} />)}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-gray-300 bg-white py-20 text-center">
            <Search className="mx-auto text-gray-300" size={36} />
            <h2 className="mt-4 text-lg font-bold">No hay resultados</h2>
            <p className="mt-2 text-sm text-gray-500">Cambia la búsqueda o elimina alguno de los filtros.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="relative flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold">
      <Filter size={15} />
      <select value={value} onChange={(event) => onChange(event.target.value)} className="appearance-none bg-transparent pr-3 outline-none">
        <option value="">{label}: todos</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
