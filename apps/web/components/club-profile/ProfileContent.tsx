'use client';
import React, { useState } from 'react';
import type { Club } from '@/types';
import Image from 'next/image';
import { InteractiveMap } from '../map/InteractiveMap';

interface ProfileContentProps {
  club: Club;
}

export function ProfileContent({ club }: ProfileContentProps) {
  const [viewport, setViewport] = useState({
    latitude: club.lat || 40.4168,
    longitude: club.lng || -3.7038,
    zoom: 14
  });

  return (
    <div className="w-full mt-4 pb-20">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-12">
        
        {/* Variedades Disponibles Section */}
        <section>
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Variedades disponibles
          </h2>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5 md:mx-0 md:px-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                <div className="w-[84px] h-[84px] rounded-[22px] bg-emerald-50 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-emerald-100/50 group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/iconos/flor.webp" 
                    alt="Flor" 
                    width={48} 
                    height={48} 
                    className="object-contain opacity-90 drop-shadow-sm" 
                  />
                </div>
                <span className="text-[13px] font-semibold text-gray-700">Variedad {i}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mapa Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
              Ubicación
            </h2>
          </div>
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] relative">
            <InteractiveMap 
              clubs={[club]} 
              selectedClubId={club.id}
              hoveredClubId={null}
              onSelectClub={() => {}}
              onHoverClub={() => {}}
              viewport={viewport}
              onViewportChange={setViewport}
            />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
          </div>
        </section>

      </div>
    </div>
  );
}
