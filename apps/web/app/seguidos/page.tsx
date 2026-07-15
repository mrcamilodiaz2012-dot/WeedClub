"use client";

import React, { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import type { Club } from "@/types";

// Mock Data
const LIKED_CLUBS: Club[] = [
  {
    id: "club-1",
    name: "Green Leaf Club 1",
    slug: "green-leaf-1",
    city: "Madrid",
    status: "active",
    subscription_tier: "premium",
    cover_image_url: "/portadas/cannabis.jpg",
    // placeholders
    description: null, logo_url: null, lat: null, lng: null, address: null, province: null,
    phone: null, whatsapp: null, instagram_url: null, website_url: null,
    opening_hours: null, photos: null, rating: 4.8, review_count: 120,
    amenities: null, membership_standard_price: null, membership_premium_price: null,
  },
  {
    id: "club-2",
    name: "Green Leaf Club 2",
    slug: "green-leaf-2",
    city: "Barcelona",
    status: "active",
    subscription_tier: "standard",
    cover_image_url: "/portadas/cannabis2.jpg",
    // placeholders
    description: null, logo_url: null, lat: null, lng: null, address: null, province: null,
    phone: null, whatsapp: null, instagram_url: null, website_url: null,
    opening_hours: null, photos: null, rating: 4.9, review_count: 240,
    amenities: null, membership_standard_price: null, membership_premium_price: null,
  }
];

const LIKED_FLOWERS = [
  { id: 1, name: "Purple Exotica", type: "ÍNDICA", thc: "24%", cbd: "0.2%", flavor: "Uva, Dulce", effect: "Relajante", color: "text-purple-600", bg: "bg-purple-50 border border-purple-100", image: "/weed/Colores%20Exoticos/E1.webp" },
  { id: 3, name: "Amnesia Haze", type: "HÍBRIDA", thc: "22%", cbd: "0.5%", flavor: "Cítrico, Pino", effect: "Creativo", color: "text-emerald-600", bg: "bg-emerald-50 border border-emerald-100", image: "/weed/Colores%20Naturales/N3.webp" },
];

export default function SeguidosPage() {
  const [activeTab, setActiveTab] = useState<'Todo' | 'Clubs' | 'Flores'>('Todo');

  return (
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-background-base">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 bg-background-base sticky top-0 z-40">
        <h1 className="text-[28px] font-display font-black tracking-tight text-text-primary leading-none mb-4">
          Tu Biblioteca
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-background-secondary p-1.5 rounded-full border border-border-subtle/50 mb-2">
          {(['Todo', 'Clubs', 'Flores'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-full transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-white text-text-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)]' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 flex flex-col gap-8">
        {(activeTab === 'Todo' || activeTab === 'Clubs') && (
          <section>
            {(activeTab === 'Todo' && LIKED_CLUBS.length > 0) && (
              <h2 className="text-[20px] font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                Clubs Guardados
              </h2>
            )}
            {LIKED_CLUBS.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {LIKED_CLUBS.map((club) => (
                  <Link key={club.id} href={`/clubs/${club.slug || club.id}`} prefetch={true} className="w-full block group cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                    <div className="w-full aspect-square bg-background-secondary rounded-[24px] overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-border-subtle/20 transition-all duration-300">
                       
                       {/* Imagen completa de fondo */}
                       <img src={club.cover_image_url ?? '/portadas/cannabis.jpg'} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={club.name} />
                       
                       {/* Gradiente oscuro inferior para legibilidad */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent/10 pointer-events-none"></div>
                       
                       {/* Top Badge (Distancia) - Sólido gris claro */}
                       <div className="absolute top-3 left-3 bg-[#EBEBEB] text-black text-[10px] font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1 shadow-sm">
                         <MapPin size={10} strokeWidth={2.5} /> 1.2 km
                       </div>

                       {/* Botón Heart (Arriba derecha) */}
                       <div 
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                         }} 
                         className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10 hover:scale-105 transition-transform cursor-pointer shadow-sm"
                       >
                         <Heart size={14} className="fill-white text-white" strokeWidth={2} />
                       </div>

                       {/* Contenido inferior */}
                       <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col">
                         <span className="text-[17px] font-display font-black tracking-tighter text-white leading-tight truncate drop-shadow-md mb-1">{club.name}</span>
                         
                         <div className="flex items-center gap-1.5 text-[11px] font-light text-white/90 drop-shadow-sm">
                           <div className="flex items-center gap-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                             <span className="tracking-wide font-medium text-white">Abierto</span>
                           </div>
                           <span className="opacity-40 text-[8px]">•</span>
                           <div className="flex items-center gap-1 truncate">
                             <span className="tracking-wide truncate">{club.city}</span>
                           </div>
                         </div>
                       </div>
                       
                       {/* Sutil brillo interior para realzar premiumness */}
                       <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState title="No sigues ningún club aún" subtitle="Explora la sección de clubes y guarda tus favoritos para tenerlos siempre a mano." />
            )}
          </section>
        )}

        {(activeTab === 'Todo' || activeTab === 'Flores') && (
          <section>
            {(activeTab === 'Todo' && LIKED_FLOWERS.length > 0) && (
              <h2 className="text-[20px] font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                Flores Favoritas
              </h2>
            )}
            {LIKED_FLOWERS.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {LIKED_FLOWERS.map((flower) => (
                  <div key={flower.id} className="w-full">
                    <div className="w-full bg-[#F5F5F7] border border-border-subtle/40 rounded-[24px] p-4 relative flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.015)] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300">
                      
                      {/* Background Glow */}
                      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
                        <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[35px] opacity-25 transition-colors duration-700 ${flower.type === 'SATIVA' ? 'bg-amber-400' : flower.type === 'ÍNDICA' ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                      </div>

                      <div className="flex justify-between items-start z-10 relative">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${flower.color} ${flower.bg}`}>{flower.type}</span>
                        <button className="w-[30px] h-[30px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)] border border-border-subtle/40 flex items-center justify-center text-red-500 transition-colors z-20">
                          <Heart className="fill-red-500 text-red-500" size={15} strokeWidth={2} />
                        </button>
                      </div>
                      
                      {/* Product Image */}
                      <div className="w-full h-[140px] flex justify-center items-center py-2 -mt-1 pointer-events-none">
                        <img src={flower.image} alt={flower.name} className="h-[135%] object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500" />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex flex-col gap-1 mt-1 pointer-events-none">
                        <h4 className="font-display font-black text-[16px] tracking-tighter text-text-primary leading-tight truncate">{flower.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <div className="bg-transparent border border-border-subtle/50 rounded-md px-2 py-0.5 flex gap-1 items-center">
                            <span className="text-[9px] font-medium text-text-tertiary">THC</span>
                            <span className="text-[10px] font-bold text-text-secondary">{flower.thc}</span>
                          </div>
                          <div className="bg-transparent border border-border-subtle/50 rounded-md px-2 py-0.5 flex gap-1 items-center">
                            <span className="text-[9px] font-medium text-text-tertiary">CBD</span>
                            <span className="text-[10px] font-bold text-text-secondary">{flower.cbd}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No has guardado ninguna flor" subtitle="Guarda tus flores favoritas dándole me gusta a los productos." />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-background-secondary rounded-[24px] border border-border-subtle/30 border-dashed text-center">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-border-subtle/50">
        <Heart className="text-gray-300 w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-[18px] font-display font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed">{subtitle}</p>
    </div>
  );
}
