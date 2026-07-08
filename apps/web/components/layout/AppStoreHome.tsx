"use client";

import React from "react";
import Link from "next/link";

import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, MapPin, Heart, ChevronRight, ChevronDown, Bell, UserCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { type Location } from "@/components/ui/LocationSearch";
import { LocationModal } from "@/components/ui/LocationModal";
import Image from "next/image";

export function AppStoreHome() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
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

  useEffect(() => {
    if (selectedFlowerId !== null) {
      setActiveModalId(selectedFlowerId);
      document.body.style.overflow = 'hidden';
      // Scroll to selected flower
      setTimeout(() => {
        const el = document.getElementById(`home-flower-modal-${selectedFlowerId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' });
        }
      }, 10);
    } else {
      setActiveModalId(null);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFlowerId]);

  const POPULAR_FLOWERS = [
    { id: 1, name: "Purple Exotica 1", type: "ÍNDICA", thc: "24%", cbd: "0.2%", flavor: "Uva, Dulce", effect: "Relajante", color: "text-purple-600", bg: "bg-purple-50 border border-purple-100", image: "/weed/Colores%20Exoticos/E1.webp" },
    { id: 2, name: "Neon Sativa 2", type: "SATIVA", thc: "26%", cbd: "0.1%", flavor: "Tropical", effect: "Energético", color: "text-orange-500", bg: "bg-orange-50 border border-orange-100", image: "/weed/Colores%20Exoticos/E2.webp" },
    { id: 3, name: "Amnesia Haze", type: "HÍBRIDA", thc: "22%", cbd: "0.5%", flavor: "Cítrico, Pino", effect: "Creativo", color: "text-emerald-600", bg: "bg-emerald-50 border border-emerald-100", image: "/weed/Colores%20Naturales/N3.webp" },
    { id: 4, name: "Gelato 33", type: "ÍNDICA", thc: "25%", cbd: "0.1%", flavor: "Fresa, Vainilla", effect: "Felicidad", color: "text-purple-600", bg: "bg-purple-50 border border-purple-100", image: "/weed/Colores%20Exoticos/E3.webp" }
  ];

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
      <div className="px-5 pt-4 pb-2 bg-background-base flex items-center justify-between relative">
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
          <Link key={club.id} href={`/clubs/${club.id}`} className="w-[250px] shrink-0 snap-start block">
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
                 
                 <div className="px-3.5 mb-2">
                   <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">En Stock</span>
                 </div>

                 {/* Productos en Stock (Distribución Estática) */}
                 <div className="flex justify-between w-full px-3.5 pb-1">
                    {[
                      { id: 1, name: "Purple Exotica", image: "/weed/Colores%20Exoticos/E1.webp" },
                      { id: 2, name: "Neon Sativa", image: "/weed/Colores%20Exoticos/E2.webp" },
                      { id: 3, name: "Amnesia Haze", image: "/weed/Colores%20Naturales/N3.webp" }
                    ].map((flower) => (
                      <div key={flower.id} className="flex flex-col items-center gap-1.5 shrink-0 w-[52px] group/icon cursor-pointer">
                        <div className="w-[52px] h-[52px] bg-background-base rounded-[16px] flex items-center justify-center p-1 shadow-sm border border-border-subtle group-active/icon:scale-95 transition-transform overflow-hidden">
                           <img src={flower.image} className="w-full h-full object-contain drop-shadow-sm scale-[1.15]" alt={flower.name} />
                        </div>
                        <span className="text-[9.5px] font-medium text-text-primary text-center leading-tight truncate w-full px-0.5 tracking-wide">{flower.name}</span>
                      </div>
                    ))}
                    
                    <div className="flex flex-col items-center gap-1.5 shrink-0 w-[52px] group/icon cursor-pointer">
                      <div className="w-[52px] h-[52px] bg-background-secondary rounded-[16px] flex items-center justify-center border border-border-subtle group-active/icon:scale-95 transition-transform">
                         <span className="text-[15px] font-bold text-text-primary">+12</span>
                      </div>
                      <span className="text-[9.5px] font-medium text-text-secondary text-center leading-tight w-full px-0.5 tracking-wide">Ver más</span>
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

      {/* 3. Ciudades Populares (Círculos) */}
      <Carousel title="Ciudades Populares">
        {[
          { name: "Barcelona", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=400&auto=format&fit=crop" },
          { name: "Madrid", img: "https://images.unsplash.com/photo-1539037116277-4db20d075e40?q=80&w=400&auto=format&fit=crop" },
          { name: "Valencia", img: "https://images.unsplash.com/photo-1558642084-fd28399589d9?q=80&w=400&auto=format&fit=crop" },
          { name: "Alicante", img: "https://images.unsplash.com/photo-1562922151-51ee6e16fdf0?q=80&w=400&auto=format&fit=crop" }
        ].map((city, idx) => (
          <div key={idx} className="w-[150px] shrink-0 snap-start cursor-pointer group active:scale-[0.98] transition-transform">
            <div className="w-full aspect-square bg-background-secondary rounded-full overflow-hidden relative shadow-md shadow-black/5 ring-1 ring-border-subtle group-hover:ring-brand-accent/50 transition-all duration-300">
               <img src={city.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city.name} />
               
               {/* Ligero blur y capa oscura */}
               <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px] group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
               
               {/* Sombra interior 3D */}
               <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.4)] pointer-events-none"></div>
               
               {/* Nombre de la Ciudad en el Centro */}
               <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                 <span className="text-white font-display font-bold text-[22px] tracking-wide leading-tight drop-shadow-lg text-center">{city.name}</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 4. Flores Populares */}
      <Carousel title="Flores Populares">
        {POPULAR_FLOWERS.map((flower) => (
          <div key={flower.id} className="w-[180px] shrink-0 snap-start">
            <div 
              className="w-full bg-white border border-border-subtle/60 rounded-[20px] p-3 relative flex flex-col shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedFlowerId(flower.id)}
            >
              <div className="flex justify-between items-start z-10">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${flower.color} ${flower.bg}`}>{flower.type}</span>
                <button 
                  onClick={(e) => toggleLike(e, flower.id)}
                  className="w-7 h-7 rounded-full border border-border-subtle/60 flex items-center justify-center text-text-secondary hover:text-red-500 hover:border-red-500 transition-colors bg-white z-20"
                >
                  <Heart className={likedFlowers.has(flower.id) ? 'text-red-500 fill-red-500' : ''} size={14} />
                </button>
              </div>
              
              {/* Product Image */}
              <div className="w-full aspect-square flex justify-center items-center py-2 -mt-2 pointer-events-none">
                <img src={flower.image} alt={flower.name} className="h-[120%] object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col gap-1.5 mt-2 pointer-events-none">
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



      {/* 5. Clubes Destacados (Posters Verticales) */}
      <div className="mt-8">
        <Carousel title="Clubes Destacados">
          {filteredClubs.length > 0 ? filteredClubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.id}`} className="w-[160px] shrink-0 snap-start block group cursor-pointer active:scale-[0.98] transition-transform">
              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden relative shadow-md shadow-black/5 border border-border-subtle/50 bg-background-secondary">
                 <img src={club.id === 1 ? `/portadas/cannabis2.jpg` : club.id === 3 ? `/portadas/cannabis3.jpg` : `/portadas/cannabis.jpg`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={club.name} />
                 
                 {/* Gradiente elegante inferior */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                 
                 {/* Top Badge */}
                 <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-text-primary text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow-sm z-10 flex items-center gap-1">
                   <img src="/iconos/fuego.webp" className="w-2.5 h-2.5" alt="hot" />
                   Top
                 </div>

                 {/* Contenido inferior */}
                 <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col">
                   <span className="text-[18px] font-black tracking-tight text-white mb-1 leading-tight line-clamp-2 drop-shadow-md">{club.name}</span>
                   <span className="text-[12px] font-medium text-white/90 flex items-center gap-1.5 drop-shadow-sm">
                     <MapPin size={12} className="opacity-80" /> {club.city}
                   </span>
                 </div>
                 
                 {/* Sutil brillo interior para realzar premiumness */}
                 <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>
              </div>
            </Link>
          )) : null}
        </Carousel>
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
              const itemWidth = container.scrollWidth / POPULAR_FLOWERS.length;
              const newIndex = Math.round(scrollLeft / itemWidth);
              const activeFlower = POPULAR_FLOWERS[newIndex];
              if (activeFlower && activeFlower.id !== activeModalId) {
                setActiveModalId(activeFlower.id);
              }
            }}
          >
            {POPULAR_FLOWERS.map((flower, idx) => {
              const isActive = flower.id === activeModalId;
              const glowColor = flower.type === 'SATIVA' ? 'bg-amber-400' : flower.type === 'ÍNDICA' ? 'bg-purple-400' : 'bg-emerald-400';
              
              return (
                <div 
                  key={flower.id} 
                  id={`home-flower-modal-${flower.id}`}
                  onClick={() => {
                    if (!isActive) {
                      const el = document.getElementById(`home-flower-modal-${flower.id}`);
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
                        src={flower.image} 
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
            {POPULAR_FLOWERS.map((flower) => (
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
