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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
              Variedades disponibles
            </h2>
            <button className="text-sm font-semibold text-[#007AFF] hover:opacity-80 transition-opacity">Ver todas</button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
            {[
              { id: 1, name: "Gelato 41", type: "Híbrida", thc: "24%", cbd: "< 1%", price: "12€/g", color: "text-purple-600" },
              { id: 2, name: "Amnesia Haze", type: "Sativa", thc: "21%", cbd: "0.5%", price: "10€/g", color: "text-amber-600" },
              { id: 3, name: "OG Kush", type: "Índica", thc: "22%", cbd: "1.2%", price: "11€/g", color: "text-emerald-600" },
              { id: 4, name: "Gorilla Glue", type: "Híbrida", thc: "26%", cbd: "0.1%", price: "14€/g", color: "text-purple-600" },
              { id: 5, name: "Lemon Skunk", type: "Sativa", thc: "18%", cbd: "2%", price: "9€/g", color: "text-amber-600" },
            ].map((varie) => (
              <div key={varie.id} className="w-[170px] shrink-0 bg-white rounded-[24px] border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="w-full h-[140px] flex items-center justify-center pt-4 relative bg-gradient-to-b from-gray-50/50 to-white">
                  <Image 
                    src="/iconos/flor.webp" 
                    alt={varie.name} 
                    width={96} 
                    height={96} 
                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full shadow-sm ${varie.color}`}>
                      {varie.type}
                    </span>
                  </div>
                </div>
                <div className="p-4 pt-1 flex flex-col gap-1">
                  <h3 className="font-display font-bold text-gray-900 text-lg leading-tight truncate">{varie.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5">
                      <span className="text-[10px] font-bold text-gray-500">THC</span>
                      <span className="text-xs font-bold text-gray-900">{varie.thc}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{varie.price}</span>
                  </div>
                </div>
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
