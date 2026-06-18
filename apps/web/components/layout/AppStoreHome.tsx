"use client";

import React from "react";
import { HeroCard } from "@/components/ui/HeroCard";
import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, ChevronRight, ChevronDown, Heart, UserCircle } from "lucide-react";
import { useState } from "react";
import { type Location } from "@/components/ui/LocationSearch";
import { LocationModal } from "@/components/ui/LocationModal";

export function AppStoreHome() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const MOCK_CLUBS = [
    { id: 1, name: "Green Leaf Club 1", city: "Madrid", imgSig: 1 },
    { id: 2, name: "Green Leaf Club 2", city: "Barcelona", imgSig: 2 },
    { id: 3, name: "Green Leaf Club 3", city: "Valencia", imgSig: 3 },
    { id: 4, name: "Canna 4", city: "Madrid", imgSig: 4 },
    { id: 5, name: "Canna 5", city: "Sevilla", imgSig: 5 },
    { id: 6, name: "Canna 6", city: "Barcelona", imgSig: 6 },
  ];

  const filteredClubs = selectedLocation 
    ? MOCK_CLUBS.filter(c => c.city.toLowerCase() === selectedLocation.name.toLowerCase() || c.city.toLowerCase() === selectedLocation.province?.toLowerCase())
    : MOCK_CLUBS;

  const featuredClubs = filteredClubs.slice(0, 3);
  const newClubs = filteredClubs.slice(3, 6);

  const MOCK_RATED = [
    { id: 1, title: "The Green House", subtitle: "Asociación Cannábica", verified: true, city: "Barcelona" },
    { id: 2, title: "CannaClub BCN", subtitle: "Club de fumadores", verified: false, city: "Barcelona" },
    { id: 3, title: "Weed Lovers Madrid", subtitle: "Asociación Privada", verified: true, city: "Madrid" },
    { id: 4, title: "High Society", subtitle: "Experiencia Premium", verified: false, city: "Valencia" },
  ];
  
  const filteredRated = selectedLocation
    ? MOCK_RATED.filter(c => c.city.toLowerCase() === selectedLocation.name.toLowerCase() || c.city.toLowerCase() === selectedLocation.province?.toLowerCase())
    : MOCK_RATED;

  return (
    <div className="w-full h-full pb-32 overflow-y-auto bg-background-base">
      {/* Top Header (Not Sticky) */}
      <div className="px-5 pt-12 pb-2 bg-background-base flex items-center justify-between relative">
        <div className="flex items-center gap-1.5 z-10">
          <img src="/logo2.svg" alt="WeedClub" className="w-[28px] h-[28px] mt-0.5" />
          <span className="font-display font-black text-[28px] tracking-tighter text-white">
            Club
          </span>
        </div>

        {/* Location Selector (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center pt-10 pointer-events-none">
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="pointer-events-auto flex items-center gap-1 text-text-primary hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-[17px]">{selectedLocation ? selectedLocation.name : "Ubicación"}</span>
            <ChevronDown size={20} className="text-text-primary mt-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-4 z-10">
          <button className="flex items-center justify-center text-[#00E676] hover:opacity-80 transition-opacity">
            <Heart size={30} strokeWidth={2.5} className="fill-[#00E676]" />
          </button>
          <button className="w-9 h-9 rounded-full bg-background-secondary flex items-center justify-center text-text-primary hover:bg-[#2C2C2E] transition-colors">
            <UserCircle size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Search Bar (Sticky) */}
      <div className="px-5 py-3 sticky top-0 bg-background-base z-40">
        <div className="w-full h-[54px] bg-background-secondary rounded-full flex items-center px-5 gap-3 border border-transparent focus-within:border-border-subtle transition-colors">
          <Search size={22} className="text-text-secondary shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar Clubs, productos..." 
            className="bg-transparent border-none outline-none text-[17px] text-text-primary w-full placeholder:text-text-secondary font-medium"
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
        {featuredClubs.length > 0 ? featuredClubs.map((club) => (
          <div key={club.id} className="w-[280px] shrink-0 snap-start">
            <div className="w-full h-[200px] bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
               <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${club.imgSig}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-accent to-emerald-400 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold">{club.name}</span>
                 <span className="text-xs text-text-secondary">Club Social Privado • {club.city}</span>
               </div>
            </div>
          </div>
        )) : (
          <div className="w-full text-center py-8 text-text-secondary text-sm">
            No se encontraron clubes en esta zona.
          </div>
        )}
      </Carousel>

      {/* 3. Ciudades populares */}
      <Carousel title="Ciudades Populares" subtitle="Explora por ubicación">
        {["Barcelona", "Madrid", "Valencia", "Alicante"].map((city, idx) => (
          <div key={idx} className="w-[140px] shrink-0 snap-start">
            <div className="w-full h-[180px] bg-background-secondary rounded-2xl overflow-hidden relative">
               <img src={`https://images.unsplash.com/photo-1559815024-11f81dfca8d4?q=80&w=400&auto=format&fit=crop&sig=${idx}`} className="w-full h-full object-cover" alt={city} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{city}</span>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 4. Nuevos clubes */}
      <Carousel title="Nuevos Clubes" subtitle="Recién añadidos">
        {newClubs.length > 0 ? newClubs.map((club) => (
          <div key={club.id} className="w-[280px] shrink-0 snap-start">
            <div className="w-full h-[200px] bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
               <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${club.imgSig}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold">{club.name}</span>
                 <span className="text-xs text-text-secondary">Apertura reciente • {club.city}</span>
               </div>
            </div>
          </div>
        )) : (
          <div className="w-full text-center py-8 text-text-secondary text-sm">
            No se encontraron nuevos clubes.
          </div>
        )}
      </Carousel>

      {/* 5. Mejor valorados */}
      <div className="px-5 mt-8 mb-4">
        <div className="flex items-end justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Mejor valorados
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          {filteredRated.length > 0 ? filteredRated.map(club => (
            <AppListItem key={club.id} title={club.title} subtitle={`${club.subtitle} • ${club.city}`} verified={club.verified} />
          )) : (
            <div className="w-full text-center py-4 text-text-secondary text-sm">
              No hay clubes valorados aquí aún.
            </div>
          )}
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
            <div key={cat} className="bg-background-secondary rounded-xl py-3 px-4 flex items-center justify-between active:scale-95 transition-transform">
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
        <div className="w-full h-[250px] bg-background-secondary rounded-3xl overflow-hidden relative">
          {/* Mocked Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#2C2C2E] text-white font-bold text-sm px-6 py-3 rounded-full uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform">
              <MapIcon size={18} />
              Abrir Mapa
            </button>
          </div>
        </div>
      </div>

      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
    </div>
  );
}
