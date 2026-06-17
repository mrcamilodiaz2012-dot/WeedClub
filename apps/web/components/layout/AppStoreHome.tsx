"use client";

import React from "react";
import { HeroCard } from "@/components/ui/HeroCard";
import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search } from "lucide-react";

export function AppStoreHome() {
  return (
    <div className="w-full h-full pb-32 overflow-y-auto bg-background-base">
      <div className="px-5 pt-12 pb-4 sticky top-0 bg-background-base/80 backdrop-blur-md z-40 flex items-center justify-between border-b border-border-subtle/50">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="/logo2.svg" alt="WeedClub Logo" className="w-8 h-8" />
        </div>
        
        <h1 className="text-xl font-display font-black tracking-[0.2em] text-text-primary text-center absolute left-1/2 -translate-x-1/2">
          CLUBS
        </h1>

        <button className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-text-primary hover:bg-gray-200 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="px-5">
        <HeroCard
          subtitle="DESTACADO"
          title="Descubre WeedClub"
          clubName="WeedClub España"
          clubSubtitle="La comunidad líder en Europa"
          imageSrc="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2000&auto=format&fit=crop"
        />

        <HeroCard
          subtitle="EXPLORAR"
          title="Encuentra tu club ideal cerca de ti"
          clubName="Radar de Clubes"
          clubSubtitle="Locales verificados y exclusivos"
          imageSrc="https://images.unsplash.com/photo-1559815024-11f81dfca8d4?q=80&w=2000&auto=format&fit=crop"
        />
      </div>

      <Carousel title="Clubes Destacados" subtitle="Selección especial para ti">
        {[1, 2, 3, 4].map((i) => (
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

      <div className="px-5 mt-8 mb-4">
        <div className="flex items-end justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Populares en tu zona
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <AppListItem title="The Green House" subtitle="Asociación Cannábica" verified />
          <AppListItem title="CannaClub BCN" subtitle="Club de fumadores" />
          <AppListItem title="Weed Lovers Madrid" subtitle="Asociación Privada" verified />
          <AppListItem title="High Society" subtitle="Experiencia Premium" />
        </div>
      </div>
    </div>
  );
}
