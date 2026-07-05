'use client';
import React, { useState, useEffect } from 'react';
import type { Club } from '@/types';
import Image from 'next/image';
import { InteractiveMap } from '../map/InteractiveMap';
import { TabInfo } from './tabs/TabInfo';
import { TabPhotos } from './tabs/TabPhotos';
import { TabPhotosCarousel } from './tabs/TabPhotosCarousel';
import { TabRules } from './tabs/TabRules';
import { TabMembership } from './tabs/TabMembership';
import { TabReviews } from './tabs/TabReviews';
import { MapPin, Star, X, Heart } from 'lucide-react';

interface ProfileContentProps {
  club: Club;
}

const TABS = ['Todo', 'Flores', 'Club', 'Fotos', 'Reseñas'];

const FLOWERS_DATA = [
  { id: 1, name: "Gelato 41", type: "Híbrida", thc: "24%", cbd: "0.2%", flavor: "Dulce, Afrutado", effect: "Creativo", rating: "4.9", color: "text-purple-600" },
  { id: 2, name: "Amnesia Haze", type: "Sativa", thc: "21%", cbd: "0.5%", flavor: "Limón, Cítrico", effect: "Energético", rating: "4.8", color: "text-amber-600" },
  { id: 3, name: "OG Kush", type: "Índica", thc: "22%", cbd: "1.2%", flavor: "Pino, Terroso", effect: "Relajante", rating: "4.7", color: "text-emerald-600" },
  { id: 4, name: "Gorilla Glue", type: "Híbrida", thc: "26%", cbd: "0.1%", flavor: "Pino, Químico", effect: "Eufórico", rating: "5.0", color: "text-purple-600" },
  { id: 5, name: "Lemon Skunk", type: "Sativa", thc: "18%", cbd: "2%", flavor: "Limón, Ácido", effect: "Cerebral", rating: "4.6", color: "text-amber-600" },
  { id: 6, name: "Wedding Cake", type: "Híbrida", thc: "25%", cbd: "0.3%", flavor: "Vainilla, Dulce", effect: "Relajante", rating: "4.9", color: "text-purple-600" },
];

export function ProfileContent({ club }: ProfileContentProps) {
  const [viewport, setViewport] = useState({
    latitude: club.lat || 40.4168,
    longitude: club.lng || -3.7038,
    zoom: 14
  });

  const [activeTab, setActiveTab] = useState('Todo');
  const [selectedFlowerId, setSelectedFlowerId] = useState<number | null>(null);
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [likedFlowers, setLikedFlowers] = useState<Set<number>>(new Set());

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedFlowers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // When modal opens, set the active ID
  useEffect(() => {
    if (selectedFlowerId !== null) {
      setActiveModalId(selectedFlowerId);
    } else {
      setActiveModalId(null);
    }
  }, [selectedFlowerId]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedFlowerId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFlowerId]);

  // Scroll to selected flower when modal opens
  useEffect(() => {
    if (selectedFlowerId !== null) {
      const el = document.getElementById(`flower-modal-${selectedFlowerId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedFlowerId]);

  return (
    <div className="w-full pb-20 relative">
      {/* Tabs Carousel */}
      <div className="w-full border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-md z-30 pt-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar w-full">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
        
        {activeTab === 'Todo' && (
          <div className="space-y-10">
            {/* Variedades Disponibles Section (Preview) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Variedades destacadas
                </h2>
                <button 
                  onClick={() => setActiveTab('Flores')}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Ver todas
                </button>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
                {FLOWERS_DATA.slice(0, 5).map((varie) => (
                  <div 
                    key={varie.id} 
                    onClick={() => setSelectedFlowerId(varie.id)}
                    className="w-[220px] shrink-0 bg-white rounded-[24px] border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="w-full h-[170px] flex items-center justify-center pt-4 relative bg-gradient-to-b from-gray-50/50 to-white">
                      <Image 
                        src="/iconos/flor.webp" 
                        alt={varie.name} 
                        width={120} 
                        height={120} 
                        className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] animate-float-slow group-hover:scale-110 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.4)] transition-all duration-500" 
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

                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fotos Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Galería
                </h2>
              </div>
              <TabPhotosCarousel club={club} />
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

            {/* Reseñas de Google Maps Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                    Reseñas
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">4.8</span>
                    <span className="text-gray-500 text-sm">de 124 opiniones</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-blue-600">G</div>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
                {[
                  { name: "Carlos M.", text: "El mejor ambiente de la ciudad, música chill y calidad top. Recomendado 100%.", time: "hace 2 semanas" },
                  { name: "Laura G.", text: "Sitio súper acogedor para trabajar con el portátil. El staff es súper amable.", time: "hace 1 mes" },
                  { name: "David R.", text: "Gran variedad de flores y extracciones. El local está increíblemente diseñado.", time: "hace 2 meses" },
                ].map((review, i) => (
                  <div key={i} className="w-[280px] shrink-0 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-500">{review.time}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Otros clubs en la zona Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-gray-900" />
                  Otros clubs en la zona
                </h2>
                <button className="text-sm font-semibold text-gray-500 hover:text-gray-900">Ver todos</button>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-[240px] shrink-0 flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all cursor-pointer group">
                    <div className="w-[56px] h-[56px] bg-gray-100 rounded-[14px] shrink-0 relative overflow-hidden shadow-sm">
                      <Image 
                        src={`/portadas/portada${i === 1 ? '1' : '1'}.jpg`} // Fallback to portada1 for mock
                        alt={`Club ${i}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=400&h=300&random=${i + 20}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className="font-display font-bold text-gray-900 text-[16px] leading-tight truncate group-hover:text-black transition-colors">Club Local {i}</h4>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-[12px] font-medium text-gray-500">A {(0.5 * i).toFixed(1)} km</p>
                        <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded-md">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[11px] font-bold text-gray-700">4.{9 - i}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Flores Section */}
        {activeTab === 'Flores' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Variedades disponibles
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {FLOWERS_DATA.map((varie) => (
                <div 
                  key={varie.id} 
                  onClick={() => setSelectedFlowerId(varie.id)}
                  className="w-full bg-white rounded-[20px] md:rounded-[24px] border border-black/[0.04] shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col"
                >
                  <div className="w-full h-[140px] md:h-[180px] flex items-center justify-center pt-2 relative bg-gradient-to-b from-gray-50/80 to-white">
                    <Image 
                      src="/iconos/flor.webp" 
                      alt={varie.name} 
                      width={120} 
                      height={120} 
                      className="object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] transition-all duration-500 w-[100px] md:w-[130px]" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`bg-white/90 backdrop-blur-md text-[8px] md:text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm ${varie.color}`}>
                        {varie.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-white/90 backdrop-blur-md px-1.5 py-1 rounded-md shadow-sm">
                      <span className="text-[9px] md:text-[11px] font-bold text-gray-700 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 fill-yellow-500" />
                        {varie.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-5 pt-2 flex flex-col gap-2 flex-1 justify-between border-t border-gray-50/50">
                    <h3 className="font-display font-bold text-gray-900 text-sm md:text-lg leading-tight line-clamp-1">{varie.name}</h3>
                    
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="flex items-center gap-1 bg-gray-50 rounded px-1.5 py-0.5 md:px-2 md:py-1">
                        <span className="text-[8px] md:text-[10px] font-bold text-gray-400">THC</span>
                        <span className="text-[10px] md:text-xs font-bold text-gray-800">{varie.thc}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50 rounded px-1.5 py-0.5 md:px-2 md:py-1">
                        <span className="text-[8px] md:text-[10px] font-bold text-gray-400">CBD</span>
                        <span className="text-[10px] md:text-xs font-bold text-gray-800">{varie.cbd}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Club Section */}
        {activeTab === 'Club' && (
          <div className="space-y-10">
            <section>
              <TabInfo club={club} />
            </section>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Membresía
                </h2>
              </div>
              <TabMembership club={club} />
            </section>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Normas Generales de Clubs
                </h2>
              </div>
              <TabRules club={club} />
            </section>
          </div>
        )}

        {/* Fotos Section */}
        {activeTab === 'Fotos' && (
          <section>
            <TabPhotos club={club} />
          </section>
        )}

        {/* Reseñas Section */}
        {activeTab === 'Reseñas' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Reseñas y Opiniones
              </h2>
            </div>
            <TabReviews club={club} />
          </section>
        )}

      </div>

      {/* Flower Details Modal Carousel */}
      {selectedFlowerId !== null && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col justify-center animate-in fade-in duration-300">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedFlowerId(null)}
          />
          {/* Close Button */}
          <button 
            onClick={() => setSelectedFlowerId(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Carousel Container */}
          <div 
            className="w-full relative z-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar flex items-center px-[10vw] md:px-[30vw] py-10 gap-4 md:gap-6"
            onScroll={(e) => {
              const container = e.currentTarget;
              const scrollLeft = container.scrollLeft;
              const itemWidth = container.scrollWidth / FLOWERS_DATA.length;
              const newIndex = Math.round(scrollLeft / itemWidth);
              const activeFlower = FLOWERS_DATA[newIndex];
              if (activeFlower && activeFlower.id !== activeModalId) {
                setActiveModalId(activeFlower.id);
              }
            }}
          >
            {FLOWERS_DATA.map((flower, idx) => {
              const isActive = flower.id === activeModalId;
              const glowColor = flower.type === 'Sativa' ? 'bg-amber-400' : flower.type === 'Índica' ? 'bg-emerald-400' : 'bg-purple-400';
              
              return (
                <div 
                  key={flower.id} 
                  id={`flower-modal-${flower.id}`}
                  onClick={() => {
                    if (!isActive) {
                      const el = document.getElementById(`flower-modal-${flower.id}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }
                    }
                  }}
                  className={`w-[80vw] md:w-[400px] shrink-0 snap-center rounded-[32px] overflow-hidden relative transition-all duration-500 ${
                    isActive ? 'scale-100 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)]' : 'scale-90 opacity-40 shadow-none cursor-pointer hover:opacity-60'
                  }`}
                >
                  {/* Premium Light Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fafafa] to-[#f4f4f5]" />
                  
                  {/* Atmospheric Glow */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[80px] opacity-25 transition-colors duration-700 ${glowColor}`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header Tags */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                      <div className="flex items-center gap-2">
                        <span className={`bg-white/80 border border-black/5 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full shadow-sm ${flower.color}`}>
                          {flower.type}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => toggleLike(e, flower.id)}
                        className="bg-white/80 border border-black/5 backdrop-blur-md w-8 h-8 rounded-full shadow-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-colors ${
                            likedFlowers.has(flower.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Modal Image Header */}
                    <div className="w-full h-[320px] relative flex items-center justify-center pt-8">
                      <Image 
                        src="/iconos/flor.webp" 
                        alt={flower.name} 
                        width={240} 
                        height={240} 
                        className={`object-contain transition-all duration-700 ease-out ${isActive ? 'drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)] animate-float-slow scale-110' : 'drop-shadow-none scale-90'}`} 
                      />
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 md:p-8 pt-0 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-3xl text-gray-900 mb-6 tracking-tight">
                        {flower.name}
                      </h3>
                      
                      <div className="space-y-4">
                        {/* THC / CBD Glass Panel */}
                        <div className="bg-white/60 border border-white/80 backdrop-blur-xl rounded-[24px] p-5 flex items-center justify-around shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">THC</span>
                            <span className="text-xl font-display font-bold text-gray-900">{flower.thc}</span>
                          </div>
                          <div className="w-px h-10 bg-gray-200" />
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">CBD</span>
                            <span className="text-xl font-display font-bold text-gray-900">{flower.cbd}</span>
                          </div>
                        </div>

                        {/* Flavor / Effect Panels */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50/80 border border-gray-100 hover:bg-gray-100/80 transition-colors rounded-[20px] p-4 flex flex-col gap-1 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">Sabor</span>
                            <span className="text-sm font-medium text-gray-800">{flower.flavor}</span>
                          </div>
                          <div className="bg-gray-50/80 border border-gray-100 hover:bg-gray-100/80 transition-colors rounded-[20px] p-4 flex flex-col gap-1 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">Efecto</span>
                            <span className="text-sm font-medium text-gray-800">{flower.effect}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pagination Dots */}
          <div className="absolute bottom-12 md:bottom-16 left-0 right-0 flex justify-center gap-2.5 z-10 pointer-events-none">
            {FLOWERS_DATA.map((flower) => (
              <div 
                key={flower.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  flower.id === activeModalId ? 'bg-white scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
