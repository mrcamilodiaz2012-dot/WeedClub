"use client";

import React from "react";
import Link from "next/link";

import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { Search, Map as MapIcon, MapPin, Heart, ChevronRight, ChevronDown, Bell, UserCircle, X, BadgeCheck, Clock, Navigation } from "lucide-react";
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
    { id: 1, name: "Purple Exotica 1", type: "ÍNDICA", thc: "24%", cbd: "0.2%", flavor: "Uva, Dulce", effect: "Relajante", color: "text-[#7B858B]", bg: "bg-[#7B858B]/10 border border-[#7B858B]/20", image: "/weed/Colores%20Exoticos/E1.webp" },
    { id: 2, name: "Neon Sativa 2", type: "SATIVA", thc: "26%", cbd: "0.1%", flavor: "Tropical", effect: "Energético", color: "text-[#8BA08D]", bg: "bg-[#8BA08D]/10 border border-[#8BA08D]/20", image: "/weed/Colores%20Exoticos/E2.webp" },
    { id: 3, name: "Amnesia Haze", type: "HÍBRIDA", thc: "22%", cbd: "0.5%", flavor: "Cítrico, Pino", effect: "Creativo", color: "text-[#959C88]", bg: "bg-[#959C88]/10 border border-[#959C88]/20", image: "/weed/Colores%20Naturales/N3.webp" },
    { id: 4, name: "Gelato 33", type: "ÍNDICA", thc: "25%", cbd: "0.1%", flavor: "Fresa, Vainilla", effect: "Felicidad", color: "text-[#7B858B]", bg: "bg-[#7B858B]/10 border border-[#7B858B]/20", image: "/weed/Colores%20Exoticos/E3.webp" }
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
  const MOCK_GROW_SHOPS = [
    { id: 101, title: "Green Care GrowShop", subtitle: "Semillas y Cultivo", rating: 4.8, city: "Barcelona", img: "/portadas/cannabis.jpg" },
    { id: 102, title: "Urban Cultivation", subtitle: "Todo para tu huerto", rating: 4.9, city: "Barcelona", img: "/portadas/cannabis2.jpg" },
    { id: 103, title: "Seed Point Madrid", subtitle: "Especialistas en genética", rating: 4.7, city: "Madrid", img: "/portadas/cannabis3.jpg" },
    { id: 104, title: "The Plant Store", subtitle: "Fertilizantes y más", rating: 4.6, city: "Valencia", img: "/portadas/cannabis.jpg" },
  ];
  
  const filteredGrowShops = selectedLocation
    ? MOCK_GROW_SHOPS.filter(c => c.city.toLowerCase() === selectedLocation.name.toLowerCase() || c.city.toLowerCase() === selectedLocation.province?.toLowerCase())
    : MOCK_GROW_SHOPS;

  return (
    <div className="w-full h-full pb-32 overflow-y-auto bg-background-base">
      {/* Top Header (Not Sticky) */}
      <div className="px-4 pt-4 pb-2 bg-background-base grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <img src="/logo2.svg" alt="WeedClub" className="h-8 w-auto" />
          <span className="text-[25px] font-display font-bold tracking-tight text-text-primary leading-none" style={{ letterSpacing: '-0.03em' }}>Clubs</span>
        </div>

        {/* Location Selector (Centered) */}
        <div className="flex items-center justify-center">
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="h-[32px] px-4 bg-black/5 hover:bg-black/10 transition-colors rounded-full flex items-center gap-2 text-text-primary"
          >
            <span className="font-bold text-[14px]">{selectedLocation ? selectedLocation.name : "Ubicación"}</span>
            <ChevronDown size={16} strokeWidth={2} className="text-text-primary" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button className="w-[32px] h-[32px] rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center text-text-primary">
            <Bell size={16} strokeWidth={2} />
          </button>
          <button className="w-[32px] h-[32px] rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center text-text-primary">
            <UserCircle size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Search Bar (Sticky) */}
      <div className="px-4 py-4 sticky top-0 bg-background-base z-40">
        <div className="w-full h-[54px] bg-background-secondary rounded-full flex items-center px-4 gap-4 border border-transparent focus-within:border-border-subtle transition-colors">
          <Search size={22} className="text-text-secondary shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar Clubs, productos..." 
            className="bg-transparent border-none outline-none text-[17px] text-text-primary w-full placeholder:text-text-secondary font-medium"
          />
        </div>
      </div>

      {/* 1. Categorías (Stories) */}
      <div className="pt-4 pb-4 w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-start gap-4 px-4 after:content-[''] after:w-[1px] after:shrink-0">
          {[
            { name: "Ciudades", color: "bg-sky-300", icon: <img src="/iconos/Ciudad.webp" alt="Ciudades" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Top Clubs", color: "bg-orange-300", icon: <img src="/iconos/fuego.webp" alt="Top Clubs" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Flores", color: "bg-emerald-300", icon: <img src="/iconos/flor.webp" alt="Flores" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Eventos", color: "bg-purple-300", icon: <img src="/iconos/eventos.webp" alt="Eventos" className="w-11 h-11 object-contain opacity-90" /> },
            { name: "Grow Shops", color: "bg-lime-300", icon: <img src="/iconos/grow.webp" alt="Grow Shops" className="w-11 h-11 object-contain opacity-90" /> }
          ].map((cat, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group">
              <div className={`w-[68px] h-[68px] rounded-full ${cat.color} flex items-center justify-center text-2xl overflow-hidden group-hover:-translate-y-0.5 group-active:scale-95 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.02)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]`}>
                {cat.icon}
              </div>
              <span className="text-[12px] font-medium text-text-secondary tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>


      {/* 2. Cerca de Ti (Rectángulos Verticales 4:5) */}
      <Carousel title="📍 Cerca de Ti">
        {filteredClubs.length > 0 ? filteredClubs.map((club) => (
          <Link key={club.id} href={`/clubs/${club.id}`} className="w-[246px] shrink-0 snap-start block h-full">
            <div className="w-full h-full flex flex-col bg-[#F5F5F7] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-shadow duration-300 border border-border-subtle/40">
               
               {/* Mitad Superior: Imagen */}
               <div className="w-full h-[150px] relative overflow-hidden group">
                 <img src={club.id === 1 ? `/portadas/cannabis2.jpg` : club.id === 3 ? `/portadas/cannabis3.jpg` : `/portadas/cannabis.jpg`} className="w-full h-full object-cover group-active:scale-105 transition-transform duration-700" alt="" />
                 <div className="absolute inset-0 bg-black/10"></div>
                 
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-text-primary text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <MapIcon size={11} strokeWidth={2} /> 1.2 km
                 </div>

                 <button className="absolute top-4 right-4 w-[32px] h-[32px] bg-white/90 backdrop-blur-md text-text-primary rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                   <Heart size={16} strokeWidth={2} />
                 </button>

                 {/* Soft Blur Overlay */}
                 <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)] z-10" />
                 
                 {/* Name & Location */}
                 <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col">
                   <span className="text-[22px] font-black tracking-tighter text-white leading-tight mb-0">{club.name}</span>
                   <span className="text-[13px] text-white/70 flex items-center gap-2 font-light">
                     <MapPin size={14} className="opacity-70" /> {club.city}
                   </span>
                 </div>
               </div>

               {/* Mitad Inferior: Sección Blanca */}
               <div className="w-full flex flex-col pt-6 pb-6 bg-[#F5F5F7] relative">
                 
                 <div className="px-4 mb-2">
                   <span className="text-[10px] font-bold text-text-tertiary/80 uppercase tracking-[0.15em]">Podrías encontrar...</span>
                 </div>

                 {/* Productos en Stock (Distribución Estática) */}
                 <div className="flex justify-between w-full px-4 pb-2">
                    {[
                      { id: 1, name: "Purple Exotica", image: "/weed/Colores%20Exoticos/E1.webp" },
                      { id: 2, name: "Neon Sativa", image: "/weed/Colores%20Exoticos/E2.webp" },
                      { id: 3, name: "Amnesia Haze", image: "/weed/Colores%20Naturales/N3.webp" }
                    ].map((flower) => (
                      <div key={flower.id} className="flex flex-col items-center gap-2 shrink-0 w-[52px] group/icon cursor-pointer">
                        <div className="w-[52px] h-[52px] bg-background-base rounded-[16px] flex items-center justify-center p-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-border-subtle group-active/icon:scale-95 transition-transform overflow-hidden">
                           <img src={flower.image} className="w-full h-full object-contain drop-shadow-sm scale-[1.15]" alt={flower.name} />
                        </div>
                        <span className="text-[9.5px] font-normal text-text-secondary text-center leading-tight truncate w-full px-0.5 tracking-wide">{flower.name}</span>
                      </div>
                    ))}
                    
                    <div className="flex flex-col items-center gap-2 shrink-0 w-[52px] group/icon cursor-pointer">
                      <div className="w-[52px] h-[52px] bg-background-secondary rounded-[16px] flex items-center justify-center border border-border-subtle group-active/icon:scale-95 transition-transform">
                         <span className="text-[15px] font-bold text-text-primary">+12</span>
                      </div>
                      <span className="text-[9.5px] font-normal text-text-tertiary text-center leading-tight w-full px-0.5 tracking-wide">Ver más</span>
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
      <Carousel title="🌍 Ciudades">
        {[
          { name: "Barcelona", img: "/portadas-ciudades/barcelona.webp" },
          { name: "Madrid", img: "/portadas-ciudades/madrid.webp" },
          { name: "Valencia", img: "/portadas-ciudades/valencia.webp" },
          { name: "Alicante", img: "/portadas-ciudades/alicante.webp" }
        ].map((city, idx) => (
          <div key={idx} className="w-[165px] shrink-0 snap-start cursor-pointer group hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 h-full">
            <div className="w-full h-full aspect-square bg-[#F5F5F7] border border-border-subtle/40 rounded-[24px] overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.015)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
               <img src={city.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city.name} />
               
               {/* Pequeña opacidad oscura para que resalte el texto sin usar blur */}
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
               
               {/* Sombra interior 3D */}
               <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_24px_rgba(0,0,0,0.08)] pointer-events-none"></div>
               
               {/* Nombre de la Ciudad en el Centro */}
               <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                 <span className="text-white font-display font-black tracking-tighter text-[24px] leading-tight drop-shadow-md text-center">{city.name}</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>


      {/* 4. Flores Populares */}
      <Carousel title="🔥 Flores Populares">
        {POPULAR_FLOWERS.map((flower) => (
          <div key={flower.id} className="w-[180px] shrink-0 snap-start h-full">
            <div 
              className="w-full h-full bg-[#F5F5F7] border border-border-subtle/40 rounded-[24px] p-4 relative flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.015)] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => setSelectedFlowerId(flower.id)}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
                <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[35px] opacity-20 transition-colors duration-700 ${flower.type === 'SATIVA' ? 'bg-[#8BA08D]' : flower.type === 'ÍNDICA' ? 'bg-[#7B858B]' : 'bg-[#959C88]'}`} />
              </div>

              <div className="flex justify-between items-start z-10 relative">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${flower.color} ${flower.bg}`}>{flower.type}</span>
                <button 
                  onClick={(e) => toggleLike(e, flower.id)}
                  className="w-[32px] h-[32px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)] border border-border-subtle/40 flex items-center justify-center text-text-secondary hover:text-red-500 transition-colors z-20"
                >
                  <Heart className={likedFlowers.has(flower.id) ? 'text-red-500 fill-red-500' : ''} size={16} strokeWidth={2} />
                </button>
              </div>
              
              {/* Product Image */}
              <div className="w-full h-[170px] flex justify-center items-center py-2 -mt-2 pointer-events-none">
                <img src={flower.image} alt={flower.name} className="h-[145%] object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col gap-2 mt-2 pointer-events-none">
                <h4 className="font-display font-black text-[18px] tracking-tighter text-text-primary leading-tight truncate">{flower.name}</h4>
                <div className="flex gap-2">
                  <div className="bg-transparent border border-border-subtle/50 rounded-md px-2 py-1 flex gap-1 items-center">
                    <span className="text-[9px] font-medium text-text-tertiary">THC</span>
                    <span className="text-[10px] font-bold text-text-secondary">{flower.thc}</span>
                  </div>
                  <div className="bg-transparent border border-border-subtle/50 rounded-md px-2 py-1 flex gap-1 items-center">
                    <span className="text-[9px] font-medium text-text-tertiary">CBD</span>
                    <span className="text-[10px] font-bold text-text-secondary">{flower.cbd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>


      {/* 5. Clubes Destacados (Posters Verticales) */}
      <div>
        <Carousel title="🔝 Clubes Destacados">
          {filteredClubs.length > 0 ? filteredClubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.id}`} className="w-[184px] shrink-0 snap-start block group cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 h-full">
              <div className="w-full h-full aspect-[4/5] bg-[#F5F5F7] rounded-[24px] overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.015)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-border-subtle/40 transition-shadow duration-300">
                 <img src={club.id === 1 ? `/portadas/cannabis2.jpg` : club.id === 3 ? `/portadas/cannabis3.jpg` : `/portadas/cannabis.jpg`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={club.name} />
                 
                 {/* Gradiente elegante inferior */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent/10 pointer-events-none"></div>
                 


                 {/* Top Badge (Distancia) */}
                 <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-1">
                   <Navigation size={9} className="opacity-90" /> 1.2 km
                 </div>

                 {/* Contenido inferior */}
                 <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-[18px] font-black tracking-tighter text-white leading-tight truncate drop-shadow-md">{club.name}</span>
                     <BadgeCheck className="w-[11px] h-[11px] text-[#829986] shrink-0 drop-shadow-md translate-y-[0.5px]" fill="currentColor" stroke="white" strokeWidth={2} />
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                       <span className="bg-[#829986]/20 border border-[#829986]/30 backdrop-blur-md text-[#829986] text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1">
                         <Clock size={9} /> ABIERTO
                       </span>
                     </div>
                     <div className="flex items-center gap-1 text-[11px] font-light text-white/70 drop-shadow-sm">
                       <MapPin size={11} className="opacity-70" /> {club.city}
                     </div>
                   </div>
                 </div>
                 
                 {/* Sutil brillo interior para realzar premiumness */}
                 <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>
              </div>
            </Link>
          )) : null}
        </Carousel>
      </div>


      {/* 6. Grow Shops (Listado mejorado) */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-[26px] font-display font-black text-text-primary flex items-center gap-2 tracking-tight leading-none">
            🌱 Grow Shops
          </h2>
          <span className="text-[15px] font-semibold text-brand-accent cursor-pointer hover:opacity-80 transition-opacity">Ver Todos</span>
        </div>
        
        <div className="flex flex-col gap-4">
          {filteredGrowShops.length > 0 ? filteredGrowShops.map(shop => (
            <Link key={shop.id} href={`/shops/${shop.id}`} className="block group active:scale-[0.98] transition-transform">
              <div className="w-full flex items-center p-4 bg-[#F5F5F7] border border-border-subtle/40 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] group-hover:-translate-y-0.5 transition-all duration-300">
                {/* Img */}
                <div className="w-[64px] h-[64px] shrink-0 rounded-[12px] overflow-hidden relative shadow-inner bg-background-secondary">
                  <img src={shop.img} alt={shop.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none rounded-[12px]"></div>
                </div>
                
                {/* Info */}
                <div className="ml-4 flex flex-col flex-1">
                  <h3 className="text-[16px] font-black tracking-tighter text-text-primary leading-tight mb-1">{shop.title}</h3>
                  <span className="text-[12px] font-normal text-text-tertiary line-clamp-1">{shop.subtitle}</span>
                  <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-text-tertiary">
                    <span className="flex items-center gap-1 text-[#BBA882] bg-[#BBA882]/15 px-2 py-1 rounded-md"><span className="text-[10px]">★</span> {shop.rating}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} className="text-text-secondary/70" /> {shop.city}</span>
                  </div>
                </div>
                
                {/* Action button */}
                <div className="shrink-0 ml-2">
                  <button className="h-[32px] px-4 bg-black/5 hover:bg-black/10 transition-colors duration-300 text-brand-accent text-[14px] font-bold rounded-full flex items-center justify-center">
                    Visitar
                  </button>
                </div>
              </div>
            </Link>
          )) : (
            <div className="w-full text-center py-8 text-text-secondary text-[13px] font-medium bg-white rounded-2xl border border-border-subtle/40 shadow-sm">
              No hay grow shops en tu zona.
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
              const glowColor = flower.type === 'SATIVA' ? 'bg-[#8BA08D]' : flower.type === 'ÍNDICA' ? 'bg-[#7B858B]' : 'bg-[#959C88]';
              
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
                        <span className={`bg-white/80 border border-black/5 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm ${flower.color}`}>
                          {flower.type}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => toggleLike(e, flower.id)}
                        className="bg-white/80 border border-black/5 backdrop-blur-md w-8 h-8 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                      >
                        <Heart 
                          strokeWidth={2}
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
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">THC</span>
                            <span className="text-xl font-display font-bold text-gray-900">{flower.thc}</span>
                          </div>
                          <div className="w-px h-10 bg-gray-200" />
                          <div className="flex flex-col items-center gap-2">
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
          <div className="absolute bottom-12 md:bottom-16 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
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
