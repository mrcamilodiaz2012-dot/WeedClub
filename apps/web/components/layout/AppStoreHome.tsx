"use client";

import React from "react";
import Link from "next/link";

import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, MapPin, Heart, ChevronRight, ChevronDown, Bell, UserCircle } from "lucide-react";
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
        <div className="flex items-center gap-1.5 z-10">
          <img src="/logo2.svg" alt="WeedClub" className="h-8 w-auto" />
          <span className="text-[25px] font-display font-bold tracking-tight text-text-primary leading-none" style={{ letterSpacing: '-0.03em' }}>Clubs</span>
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
          <button className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-text-primary hover:bg-black/10 transition-colors">
            <UserCircle size={20} strokeWidth={2} />
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

      {/* 1. Categorías (Stories) */}
      <div className="px-5 pt-4 pb-6 w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-start gap-4 w-max">
          {[
            { name: "Ciudades", color: "bg-sky-300", icon: <img src="/iconos/Ciudad.webp" alt="Ciudades" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Top Clubs", color: "bg-orange-300", icon: <img src="/iconos/fuego.webp" alt="Top Clubs" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Flores", color: "bg-emerald-300", icon: <img src="/iconos/flor.webp" alt="Flores" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Eventos", color: "bg-purple-300", icon: <img src="/iconos/eventos.webp" alt="Eventos" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Grow Shops", color: "bg-lime-300", icon: <img src="/iconos/grow.webp" alt="Grow Shops" className="w-11 h-11 object-contain opacity-90" /> }
          ].map((cat, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group">
              <div className={`w-[68px] h-[68px] rounded-full ${cat.color} flex items-center justify-center text-2xl overflow-hidden group-active:scale-95 transition-transform shadow-sm`}>
                {cat.icon}
              </div>
              <span className="text-[12px] font-medium text-text-primary">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Cerca de Ti (Rectángulos Verticales 4:5) */}
      <Carousel title="Cerca de Ti">
        {filteredClubs.length > 0 ? filteredClubs.map((club) => (
          <Link key={club.id} href={`/clubs/${club.id}`} className="w-[280px] shrink-0 snap-start block">
            <div className="w-full flex flex-col bg-white rounded-[24px] overflow-hidden shadow-lg shadow-black/5 border border-border-subtle/40">
               
               {/* Mitad Superior: Imagen */}
               <div className="w-full h-[150px] relative overflow-hidden group">
                 <img src={club.id === 1 ? `/portadas/cannabis2.jpg` : club.id === 3 ? `/portadas/cannabis3.jpg` : `/portadas/cannabis.jpg`} className="w-full h-full object-cover group-active:scale-105 transition-transform duration-700" alt="" />
                 <div className="absolute inset-0 bg-black/10"></div>
                 
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-text-primary text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <MapIcon size={11} strokeWidth={2.5} /> 1.2 km
                 </div>

                 <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-text-primary p-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all">
                   <Heart size={13} strokeWidth={2.5} />
                 </button>

                 {/* Soft Blur Overlay */}
                 <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)] z-10" />
                 
                 {/* Name & Location */}
                 <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col">
                   <span className="text-[20px] font-black tracking-tighter text-white leading-tight mb-0.5">{club.name}</span>
                   <span className="text-[13px] text-white/90 flex items-center gap-1.5 font-medium">
                     <MapPin size={14} className="opacity-90" /> {club.city}
                   </span>
                 </div>
               </div>

               {/* Mitad Inferior: Sección Blanca */}
               <div className="w-full flex flex-col pt-4 pb-5 bg-white relative">
                 
                 <div className="px-6 mb-2">
                   <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">En Stock</span>
                 </div>

                 {/* Productos en Stock (Distribución Estática) */}
                 <div className="flex justify-between w-full px-6 pb-1">
                    {[
                      { id: 1, name: "Purple Exotica", image: "/weed/Colores%20Exoticos/E1.webp" },
                      { id: 2, name: "Neon Sativa", image: "/weed/Colores%20Exoticos/E2.webp" },
                      { id: 3, name: "Amnesia Haze", image: "/weed/Colores%20Naturales/N3.webp" }
                    ].map((flower) => (
                      <div key={flower.id} className="flex flex-col items-center gap-1.5 shrink-0 w-[52px] group/icon cursor-pointer">
                        <div className="w-[52px] h-[52px] bg-background-base rounded-[16px] flex items-center justify-center p-1 shadow-sm border border-border-subtle group-active/icon:scale-95 transition-transform overflow-hidden">
                           <img src={flower.image} className="w-full h-full object-contain drop-shadow-sm scale-[1.15]" alt={flower.name} />
                        </div>
                        <span className="text-[10px] font-medium text-text-primary text-center leading-tight truncate w-full px-0.5 tracking-wide">{flower.name}</span>
                      </div>
                    ))}
                    
                    <div className="flex flex-col items-center gap-1.5 shrink-0 w-[52px] group/icon cursor-pointer">
                      <div className="w-[52px] h-[52px] bg-background-secondary rounded-[16px] flex items-center justify-center border border-border-subtle group-active/icon:scale-95 transition-transform">
                         <span className="text-[15px] font-bold text-text-primary">+12</span>
                      </div>
                      <span className="text-[10px] font-medium text-text-secondary text-center leading-tight w-full px-0.5 tracking-wide">Ver más</span>
                    </div>
                 </div>
               </div>
            </div>
          </Link>
        )) : (
          <div className="w-full text-center py-8 text-text-secondary text-sm">
            No se encontraron clubes cerca de ti.
          </div>
        )}
      </Carousel>

      {/* 3. Ciudades Populares (Cuadrados 1:1) */}
      <Carousel title="Ciudades Populares">
        {[
          { name: "Barcelona", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=400&auto=format&fit=crop" },
          { name: "Madrid", img: "https://images.unsplash.com/photo-1539037116277-4db20d075e40?q=80&w=400&auto=format&fit=crop" },
          { name: "Valencia", img: "https://images.unsplash.com/photo-1558642084-fd28399589d9?q=80&w=400&auto=format&fit=crop" },
          { name: "Alicante", img: "https://images.unsplash.com/photo-1562922151-51ee6e16fdf0?q=80&w=400&auto=format&fit=crop" }
        ].map((city, idx) => (
          <div key={idx} className="w-[200px] shrink-0 snap-start">
            <div className="w-full aspect-square bg-background-secondary rounded-2xl overflow-hidden relative group">
               <img src={city.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city.name} />
               
               {/* Soft Blur Overlay at bottom */}
               <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)] z-10" />
               
               {/* City Name */}
               <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex items-end">
                 <span className="text-white font-display font-bold text-[22px] tracking-wide leading-tight drop-shadow-md">{city.name}</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 4. Flores Populares */}
      <Carousel title="Flores Populares">
        {[
          { id: 1, name: "Purple Exotica 1", type: "ÍNDICA", thc: "24%", cbd: "0.2%", color: "text-purple-600", bg: "bg-purple-50 border border-purple-100", image: "/weed/Colores%20Exoticos/E1.webp" },
          { id: 2, name: "Neon Sativa 2", type: "SATIVA", thc: "26%", cbd: "0.1%", color: "text-orange-500", bg: "bg-orange-50 border border-orange-100", image: "/weed/Colores%20Exoticos/E2.webp" },
          { id: 3, name: "Amnesia Haze", type: "HÍBRIDA", thc: "22%", cbd: "0.5%", color: "text-emerald-600", bg: "bg-emerald-50 border border-emerald-100", image: "/weed/Colores%20Naturales/N3.webp" },
          { id: 4, name: "Gelato 33", type: "ÍNDICA", thc: "25%", cbd: "0.1%", color: "text-purple-600", bg: "bg-purple-50 border border-purple-100", image: "/weed/Colores%20Exoticos/E3.webp" }
        ].map((flower) => (
          <div key={flower.id} className="w-[180px] shrink-0 snap-start">
            <div className="w-full bg-white border border-border-subtle/60 rounded-[20px] p-3 relative flex flex-col shadow-sm">
              <div className="flex justify-between items-start z-10">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${flower.color} ${flower.bg}`}>{flower.type}</span>
                <button className="w-7 h-7 rounded-full border border-border-subtle/60 flex items-center justify-center text-text-secondary hover:text-red-500 hover:border-red-500 transition-colors bg-white">
                  <Heart size={14} />
                </button>
              </div>
              
              {/* Product Image */}
              <div className="w-full aspect-square flex justify-center items-center py-2 -mt-2">
                <img src={flower.image} alt={flower.name} className="h-[120%] object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col gap-1.5 mt-2">
                <h4 className="font-display font-bold text-[16px] text-text-primary leading-tight truncate">{flower.name}</h4>
                <div className="flex gap-1.5">
                  <div className="bg-background-secondary rounded-md px-1.5 py-1 flex gap-1 items-center">
                    <span className="text-[10px] font-semibold text-text-secondary">THC</span>
                    <span className="text-[11px] font-black text-text-primary">{flower.thc}</span>
                  </div>
                  <div className="bg-background-secondary rounded-md px-1.5 py-1 flex gap-1 items-center">
                    <span className="text-[10px] font-semibold text-text-secondary">CBD</span>
                    <span className="text-[11px] font-black text-text-primary">{flower.cbd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 4. Banner para Propietarios (Edge-to-edge Pattern Breaker) */}
      <div className="w-full bg-brand-primary text-white mt-8 mb-10 py-10 px-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col items-start gap-3">
          <h3 className="text-[22px] font-display font-bold leading-tight">¿Tienes un<br/>Club Cannábico?</h3>
          <p className="text-white/90 text-[13px] max-w-[220px] mb-2 leading-relaxed">Únete a WeedClub y llega a miles de usuarios activos en tu ciudad de forma segura.</p>
          <button className="bg-white text-brand-primary font-bold text-sm px-6 py-3 rounded-full shadow-lg active:scale-95 transition-transform">
            Dar de alta mi club
          </button>
        </div>
      </div>

      {/* 5. Clubes Destacados (Billboards 16:9 apilados verticalmente) */}
      <div className="px-5 mt-2 mb-8">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Clubes Destacados
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {featuredClubs.length > 0 ? featuredClubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.id}`} className="w-full group cursor-pointer active:scale-[0.98] transition-transform block">
              <div className="w-full aspect-video bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
                 <img src={club.id === 1 ? `/portadas/cannabis2.jpg` : club.id === 3 ? `/portadas/cannabis3.jpg` : `/portadas/cannabis.jpg`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                 <div className="absolute top-3 right-3 bg-brand-accent text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-md shadow-md">
                   Destacado
                 </div>
              </div>
              <div className="flex items-start justify-between px-1">
                 <div className="flex flex-col">
                   <span className="text-lg font-black tracking-tighter text-text-primary mb-0.5">{club.name}</span>
                   <span className="text-[13px] text-text-secondary">Club Social Privado • {club.city}</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center">
                   <ChevronRight size={18} className="text-text-secondary" />
                 </div>
              </div>
            </Link>
          )) : null}
        </div>
      </div>

      {/* 6. Mejor valorados (Listado denso) */}
      <div className="px-5 mt-10 mb-8">
        <div className="flex items-end justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Mejor valorados
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          {filteredRated.length > 0 ? filteredRated.map(club => (
            <Link key={club.id} href={`/clubs/${club.id}`} className="block">
              <AppListItem title={club.title} subtitle={`${club.subtitle} • ${club.city}`} verified={club.verified} />
            </Link>
          )) : (
            <div className="w-full text-center py-4 text-text-secondary text-sm">
              No hay clubes valorados aquí aún.
            </div>
          )}
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
