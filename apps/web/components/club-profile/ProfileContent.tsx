'use client';
import React, { useState, useEffect } from 'react';
import type { Club } from '@/types';
import Image from 'next/image';
import { InteractiveMap } from '../map/InteractiveMap';
import { TabInfo } from './tabs/TabInfo';
import { TabPhotos } from './tabs/TabPhotos';
import { TabRules } from './tabs/TabRules';
import { TabMembership } from './tabs/TabMembership';

interface ProfileContentProps {
  club: Club;
}

const TABS = ['Flores', 'Club', 'Fotos', 'Reglas', 'Membresía'];

export function ProfileContent({ club }: ProfileContentProps) {
  const [viewport, setViewport] = useState({
    latitude: club.lat || 40.4168,
    longitude: club.lng || -3.7038,
    zoom: 14
  });

  const [activeTab, setActiveTab] = useState('Flores');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const element = document.getElementById(tab.toLowerCase());
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for the sticky header
      
      for (let i = TABS.length - 1; i >= 0; i--) {
        const tab = TABS[i];
        if (!tab) continue;
        const element = document.getElementById(tab.toLowerCase());
        if (element && element.offsetTop <= scrollPosition) {
          setActiveTab(tab);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full pb-20 relative">
      {/* Tabs Carousel */}
      <div className="w-full border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-md z-30 pt-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar w-full">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className="flex-1 min-w-[80px] hover:bg-gray-200/50 transition-colors flex justify-center pt-4"
              >
                <div className="relative pb-4 flex flex-col items-center justify-center">
                  <span className={`text-[15px] ${activeTab === tab ? 'font-bold text-black' : 'font-medium text-gray-500'}`}>
                    {tab}
                  </span>
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-black rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-6 flex flex-col gap-10">
        
        {/* Variedades Disponibles Section */}
        <div id="flores">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Variedades disponibles
              </h2>
              <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Ver todas</button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
              {[
                { id: 1, name: "Gelato 41", type: "Híbrida", thc: "24%", cbd: "0.2%", price: "12€/g", flavor: "Dulce, Afrutado", effect: "Creativo", rating: "4.9", color: "text-purple-600" },
                { id: 2, name: "Amnesia Haze", type: "Sativa", thc: "21%", cbd: "0.5%", price: "10€/g", flavor: "Limón, Cítrico", effect: "Energético", rating: "4.8", color: "text-amber-600" },
                { id: 3, name: "OG Kush", type: "Índica", thc: "22%", cbd: "1.2%", price: "11€/g", flavor: "Pino, Terroso", effect: "Relajante", rating: "4.7", color: "text-emerald-600" },
                { id: 4, name: "Gorilla Glue", type: "Híbrida", thc: "26%", cbd: "0.1%", price: "14€/g", flavor: "Pino, Químico", effect: "Eufórico", rating: "5.0", color: "text-purple-600" },
                { id: 5, name: "Lemon Skunk", type: "Sativa", thc: "18%", cbd: "2%", price: "9€/g", flavor: "Limón, Ácido", effect: "Cerebral", rating: "4.6", color: "text-amber-600" },
              ].map((varie) => (
                <div key={varie.id} className="w-[220px] shrink-0 bg-white rounded-[24px] border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="w-full h-[170px] flex items-center justify-center pt-4 relative bg-gradient-to-b from-gray-50/50 to-white">
                    <Image 
                      src="/iconos/flor.webp" 
                      alt={varie.name} 
                      width={112} 
                      height={112} 
                      className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm ${varie.color}`}>
                        {varie.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
                      <span className="text-[10px] font-bold text-gray-700">★ {varie.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 pt-2 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-bold text-gray-900 text-[19px] leading-tight truncate">{varie.name}</h3>
                    </div>
                    
                    {/* Stats Row 1: THC/CBD */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5">
                        <span className="text-[10px] font-bold text-gray-500">THC</span>
                        <span className="text-xs font-bold text-gray-900">{varie.thc}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5">
                        <span className="text-[10px] font-bold text-gray-500">CBD</span>
                        <span className="text-xs font-bold text-gray-900">{varie.cbd}</span>
                      </div>
                    </div>
                    
                    {/* Stats Row 2: Flavor and Effect */}
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                         <span className="opacity-60 text-[10px] uppercase tracking-wider font-bold w-12">Sabor</span>
                         <span className="font-medium truncate">{varie.flavor}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                         <span className="opacity-60 text-[10px] uppercase tracking-wider font-bold w-12">Efecto</span>
                         <span className="font-medium truncate">{varie.effect}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                      <span className="text-[13px] font-semibold text-gray-500">Aportación</span>
                      <span className="text-[15px] font-bold text-[#34C759]">{varie.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Club Section */}
        <div id="club" className="space-y-10 pt-4">
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
          <TabInfo club={club} />
        </div>

        {/* Fotos Section */}
        <div id="fotos" className="pt-4">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Galería
              </h2>
            </div>
            <TabPhotos club={club} />
          </section>
        </div>

        {/* Reglas Section */}
        <div id="reglas" className="pt-4">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Normativa
              </h2>
            </div>
            <TabRules club={club} />
          </section>
        </div>

        {/* Membresía Section */}
        <div id="membresía" className="pt-4">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Membresía
              </h2>
            </div>
            <TabMembership club={club} />
          </section>
        </div>

      </div>
    </div>
  );
}
