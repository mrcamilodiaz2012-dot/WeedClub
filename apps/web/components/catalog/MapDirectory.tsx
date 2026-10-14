'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Club } from '@/types';

const InteractiveMap = dynamic(
  () => import('@/components/map/InteractiveMap').then((module) => module.InteractiveMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-background-secondary animate-pulse" /> },
);

export function MapDirectory({ clubs }: { clubs: Club[] }) {
  const [selectedClubId, setSelectedClubId] = useState<string | null>(clubs[0]?.id ?? null);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [viewport, setViewport] = useState({ latitude: 40.4168, longitude: -3.7038, zoom: 5.2 });
  const selectedClub = useMemo(() => clubs.find((club) => club.id === selectedClubId), [clubs, selectedClubId]);

  const selectClub = (id: string) => {
    setSelectedClubId(id);
    const club = clubs.find((item) => item.id === id);
    if (club?.lat != null && club.lng != null) {
      setViewport({ latitude: club.lat, longitude: club.lng, zoom: 13 });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-5">
      <div className="h-[52vh] min-h-[390px] rounded-[28px] overflow-hidden border border-border-subtle shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <InteractiveMap
          clubs={clubs}
          selectedClubId={selectedClubId}
          hoveredClubId={hoveredClubId}
          onSelectClub={selectClub}
          onHoverClub={setHoveredClubId}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>

      {selectedClub && (
        <Link href={`/clubs/${selectedClub.slug || selectedClub.id}`} className="block -mt-8 mx-4 relative z-10 bg-white rounded-[22px] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-border-subtle active:scale-[0.98] transition-transform">
          <div className="flex items-center gap-4">
            <img src={selectedClub.cover_image_url ?? '/portadas/cannabis.jpg'} alt={selectedClub.name} className="w-20 h-20 rounded-[16px] object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-[20px] tracking-tighter truncate">{selectedClub.name}</h2>
                {selectedClub.is_demo && <span className="text-[8px] font-black uppercase bg-amber-100 text-amber-900 rounded-full px-2 py-1">Demo</span>}
              </div>
              <p className="text-[12px] text-text-secondary mt-1 flex items-center gap-1"><MapPin size={12} /> {selectedClub.city}</p>
              <p className="text-[12px] font-bold text-emerald-700 mt-2">Ver ficha</p>
            </div>
          </div>
        </Link>
      )}

      <div className="flex gap-3 overflow-x-auto hide-scrollbar py-6">
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => selectClub(club.id)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[12px] font-bold border transition-colors ${selectedClubId === club.id ? 'bg-black text-white border-black' : 'bg-white text-text-primary border-border-subtle'}`}
          >
            {club.name}
          </button>
        ))}
      </div>
    </div>
  );
}
