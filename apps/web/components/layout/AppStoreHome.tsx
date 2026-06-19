"use client";

import React from "react";

import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, ChevronRight, ChevronDown, Bell, UserCircle, Leaf, Droplets, Beaker, Cookie } from "lucide-react";
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
        <div className="flex items-center z-10">
          <img src="/logo4.svg" alt="WeedClub" className="h-[34px] w-auto" />
        </div>

        {/* Location Selector (Centered) */}
        <div className="absolute left-0 right-0 top-12 bottom-2 flex items-center justify-center pointer-events-none">
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="pointer-events-auto flex items-center gap-1 text-text-primary hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-[16px]">{selectedLocation ? selectedLocation.name : "Ubicación"}</span>
            <ChevronDown size={20} className="text-text-primary mt-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button className="flex items-center justify-center text-text-primary hover:opacity-80 transition-opacity">
            <Bell size={24} strokeWidth={2} />
          </button>
          <button className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-text-primary hover:bg-[#2C2C2E] transition-colors">
            <UserCircle size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* 1. Buscador (Search Bar) */}
      <div className="px-5 py-3 sticky top-0 bg-background-base z-40">
        <div className="w-full h-[50px] bg-background-secondary/80 backdrop-blur-md rounded-2xl flex items-center px-4 gap-3">
          <Search size={20} className="text-text-secondary shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar clubes en tu zona" 
            className="bg-transparent border-none outline-none text-[17px] text-text-primary w-full placeholder:text-text-secondary font-medium"
          />
        </div>
      </div>

      {/* 2. Pills Horizontales */}
      <div className="px-5 pt-2 pb-6 w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 w-max">
          {[
            { name: "Cerca de ti", active: true },
            { name: "Destacados", active: false },
            { name: "Premium", active: false },
            { name: "Tendencia", active: false },
            { name: "Mejor valorados", active: false }
          ].map((pill, i) => (
            <button 
              key={i} 
              className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-colors ${pill.active ? 'bg-brand-primary text-white' : 'bg-background-secondary text-text-primary hover:bg-[#333]'}`}
            >
              {pill.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Carrusel "Cerca de ti" */}
      <div className="px-5 mb-8">
        <div className="mb-4">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Cerca de ti
          </h2>
          <p className="text-[15px] text-text-secondary mt-0.5">Clubes próximos a tu ubicación</p>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 gap-4">
          {filteredClubs.length > 0 ? filteredClubs.map((club) => (
            <div key={club.id} className="w-[280px] shrink-0 snap-start">
              <div className="w-full h-[200px] bg-background-secondary rounded-xl overflow-hidden mb-3 relative group">
                 <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${club.imgSig}`} className="w-full h-full object-cover" alt="" />
                 <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                   <MapIcon size={12} /> 1.2 km
                 </div>
              </div>
              <div className="flex flex-col px-1">
                <span className="text-[17px] font-semibold text-text-primary leading-tight mb-1">{club.name}</span>
                <span className="text-[14px] text-text-secondary">{club.city}</span>
              </div>
            </div>
          )) : (
            <div className="w-full text-center py-8 text-text-secondary text-sm">
              No se encontraron clubes cerca de ti.
            </div>
          )}
        </div>
      </div>

      {/* 4. Ciudades Populares */}
      <div className="px-5 mb-10">
        <div className="mb-4">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Explora por ciudad
          </h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 gap-3">
          {["Barcelona", "Madrid", "Valencia", "Málaga", "Alicante", "Las Palmas", "Arrecife", "Playa Blanca"].map((city, idx) => (
            <div key={idx} className="w-[120px] shrink-0 snap-start">
              <div className="w-full aspect-square bg-background-secondary rounded-xl overflow-hidden relative mb-2">
                 <img src={`https://images.unsplash.com/photo-1559815024-11f81dfca8d4?q=80&w=400&auto=format&fit=crop&sig=${idx}`} className="w-full h-full object-cover" alt={city} />
                 <div className="absolute inset-0 bg-black/20" />
              </div>
              <span className="text-[14px] font-medium text-text-primary px-1 block">{city}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Clubes Destacados */}
      <div className="px-5 mb-10">
        <div className="mb-5 border-t border-border-subtle pt-6">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Destacados de la comunidad
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {featuredClubs.length > 0 ? featuredClubs.map((club) => (
            <div key={club.id} className="w-full group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-background-secondary rounded-xl overflow-hidden mb-3 relative">
                 <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=800&auto=format&fit=crop&sig=${club.imgSig + 10}`} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex flex-col px-1">
                <span className="text-brand-primary text-[12px] uppercase font-bold tracking-wide mb-1">Patrocinado</span>
                <span className="text-[19px] font-semibold text-text-primary mb-0.5">{club.name}</span>
                <span className="text-[15px] text-text-secondary">Club Social Privado • {club.city}</span>
              </div>
            </div>
          )) : null}
        </div>
      </div>

      {/* 6. Mejor valorados */}
      <div className="px-5 mb-10">
        <div className="mb-4 border-t border-border-subtle pt-6">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Los favoritos de los usuarios
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

      {/* 7. Nuevos clubes */}
      <div className="px-5 mb-10">
        <div className="mb-4 border-t border-border-subtle pt-6">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Recientemente añadidos
          </h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 gap-4">
          {filteredClubs.slice(1, 4).map((club) => (
            <div key={club.id} className="w-[220px] shrink-0 snap-start">
              <div className="w-full h-[150px] bg-background-secondary rounded-xl overflow-hidden mb-2 relative">
                 <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${club.imgSig + 5}`} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex flex-col px-1">
                <span className="text-[15px] font-semibold text-text-primary leading-tight mb-0.5">{club.name}</span>
                <span className="text-[13px] text-text-secondary">Apertura reciente</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Explorar por categoría */}
      <div className="px-5 mb-12">
        <div className="mb-4 border-t border-border-subtle pt-6">
          <h2 className="text-[22px] font-bold text-text-primary tracking-tight">
            Explorar por categoría
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { name: "Flores", icon: <Leaf size={20} /> },
            { name: "Extractos", icon: <Beaker size={20} /> },
            { name: "Edibles", icon: <Cookie size={20} /> },
            { name: "CBD", icon: <Droplets size={20} /> }
          ].map((cat, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0 active:opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-text-primary">
                  {cat.icon}
                </div>
                <span className="text-[17px] font-medium text-text-primary">{cat.name}</span>
              </div>
              <ChevronRight size={20} className="text-text-secondary/50" />
            </div>
          ))}
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

