"use client";

import React from "react";
import { HeroCard } from "@/components/ui/HeroCard";
import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, ChevronRight, Heart } from "lucide-react";

export function AppStoreHome() {
  return (
    <div className="w-full h-full pb-32 overflow-y-auto bg-background-base">
      {/* Top Header (Not Sticky) */}
      <div className="px-5 pt-12 pb-2 bg-background-base flex items-center justify-between relative">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="/logo2.svg" alt="WeedClub Logo" className="w-8 h-8" />
        </div>
        
        <h1 className="text-xl font-display font-black tracking-[0.2em] text-text-primary text-center absolute left-1/2 -translate-x-1/2">
          CLUBS
        </h1>

        <button className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-[#00AA6C] hover:bg-gray-200 transition-colors">
          <Heart size={20} strokeWidth={2.5} className="fill-[#00AA6C]" />
        </button>
      </div>

      {/* Search Bar (Sticky) */}
      <div className="px-5 py-3 sticky top-0 bg-background-base/95 backdrop-blur-xl z-40 border-b border-border-subtle/50">
        <div className="w-full h-[52px] bg-background-secondary rounded-[20px] flex items-center px-4 gap-3 shadow-sm border border-border-subtle/40">
          <Search size={22} className="text-text-secondary" />
          <input 
            type="text" 
            placeholder="Buscar Clubs en tu zona" 
            className="bg-transparent border-none outline-none text-base text-text-primary w-full placeholder:text-text-secondary/80 font-medium"
            readOnly
          />
        </div>
      </div>

      <div className="pt-6 px-5">
        {/* 1. Hero */}
        <HeroCard
          subtitle="DESTACADO"
          title="Descubre WeedClub"
          clubName="WeedClub España"
          clubSubtitle="La comunidad líder en Europa"
          imageSrc="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2000&auto=format&fit=crop"
        />
      </div>

      {/* 2. Clubes destacados */}
      <Carousel title="Clubes Destacados" subtitle="Selección especial para ti">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-[280px] shrink-0 snap-start">
            <div className="w-full h-[200px] bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
               <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-accent to-emerald-400 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold">Green Leaf Club {i}</span>
                 <span className="text-xs text-text-secondary">Club Social Privado</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 3. Ciudades populares */}
      <Carousel title="Ciudades Populares" subtitle="Explora por ubicación">
        {["Barcelona", "Madrid", "Valencia", "Alicante"].map((city, idx) => (
          <div key={idx} className="w-[140px] shrink-0 snap-start">
            <div className="w-full h-[180px] bg-background-secondary rounded-2xl overflow-hidden relative shadow-sm">
               <img src={`https://images.unsplash.com/photo-1559815024-11f81dfca8d4?q=80&w=400&auto=format&fit=crop&sig=${idx}`} className="w-full h-full object-cover" alt={city} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{city}</span>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 4. Nuevos clubes */}
      <Carousel title="Nuevos Clubes" subtitle="Recién añadidos">
        {[4, 5, 6].map((i) => (
          <div key={i} className="w-[280px] shrink-0 snap-start">
            <div className="w-full h-[200px] bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
               <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold">Canna {i}</span>
                 <span className="text-xs text-text-secondary">Apertura reciente</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 5. Mejor valorados */}
      <div className="px-5 mt-8 mb-4">
        <div className="flex items-end justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Mejor valorados
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <AppListItem title="The Green House" subtitle="Asociación Cannábica" verified />
          <AppListItem title="CannaClub BCN" subtitle="Club de fumadores" />
          <AppListItem title="Weed Lovers Madrid" subtitle="Asociación Privada" verified />
          <AppListItem title="High Society" subtitle="Experiencia Premium" />
        </div>
      </div>

      {/* 6. Explorar por categorías */}
      <div className="px-5 mt-10 mb-6">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Explorar por categorías
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["Sativa", "Indica", "Híbridas", "Extractos", "Comestibles", "Eventos"].map((cat) => (
            <div key={cat} className="bg-background-secondary rounded-xl py-3 px-4 flex items-center justify-between shadow-sm active:scale-95 transition-transform">
              <span className="font-semibold text-text-primary text-sm">{cat}</span>
              <ChevronRight size={16} className="text-text-secondary" />
            </div>
          ))}
        </div>
      </div>

      {/* 7. Mapa */}
      <div className="px-5 mt-10 mb-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Mapa
          </h2>
        </div>
        <div className="w-full h-[250px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-md border border-border-subtle">
          {/* Mocked Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white text-text-primary font-bold text-sm px-6 py-3 rounded-full uppercase tracking-wide shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
              <MapIcon size={18} />
              Abrir Mapa
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
