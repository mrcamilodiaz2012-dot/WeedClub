'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useClubsMap } from '@/lib/hooks/useClubsMap';
import { InteractiveMap } from '../map/InteractiveMap';
import { ClubSidebar } from '../clubs/ClubSidebar';

interface DiscoveryContainerProps {
  initialLat: number;
  initialLon: number;
  initialZoom?: number;
}

export function DiscoveryContainer({ initialLat, initialLon, initialZoom = 13 }: DiscoveryContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const urlLat = searchParams.get('lat');
  const urlLng = searchParams.get('lng');
  const urlClub = searchParams.get('club');

  const [viewport, setViewport] = React.useState({
    latitude: urlLat ? parseFloat(urlLat) : initialLat,
    longitude: urlLng ? parseFloat(urlLng) : initialLon,
    zoom: initialZoom
  });

  const [selectedClubId, setSelectedClubId] = React.useState<string | null>(urlClub || null);
  const [hoveredClubId, setHoveredClubId] = React.useState<string | null>(null);

  const radiusKm = Math.max(1, 40000 / Math.pow(2, viewport.zoom)); 
  const { clubs, isLoading, isError } = useClubsMap(viewport.latitude, viewport.longitude, radiusKm, searchParams.get('amenity'));

  const handleViewportChange = React.useCallback((newViewport: any) => {
    setViewport(newViewport);
    const params = new URLSearchParams(searchParams.toString());
    params.set('lat', newViewport.latitude.toFixed(4));
    params.set('lng', newViewport.longitude.toFixed(4));
    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleSelectClub = React.useCallback((id: string, fromList = false) => {
    setSelectedClubId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set('club', id);
    router.replace(`/?${params.toString()}`, { scroll: false });

    if (!fromList) {
      // Auto-scroll list if clicked from map
      const cardEl = document.getElementById(`card-${id}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // Center map if clicked from list
      const club = clubs.find(c => c.id === id);
      if (club) {
        handleViewportChange({ ...viewport, latitude: club.lat, longitude: club.lng });
      }
    }
  }, [router, searchParams, clubs, viewport, handleViewportChange]);

  const handleHoverClub = React.useCallback((id: string | null) => {
    setHoveredClubId(id);
  }, []);

  if (isError) {
    return <div className="w-full h-full flex items-center justify-center p-4 bg-status-error text-white">Error cargando el mapa: {isError.message}</div>;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen overflow-hidden bg-background-base relative">
      
      {/* Sidebar (Resultados) - Desktop Only, Mobile uses Bottom Sheet inside Sidebar component */}
      <ClubSidebar 
        clubs={clubs} 
        isLoading={isLoading} 
        selectedClubId={selectedClubId} 
        hoveredClubId={hoveredClubId}
        onSelectClub={handleSelectClub} 
        onHoverClub={handleHoverClub}
      />

      {/* Main Map Area */}
      <div className="flex-1 relative h-full">
        <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center pointer-events-none">
           <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-float pointer-events-auto flex items-center gap-2">
             <div className="w-6 h-6 rounded-md bg-brand-primary flex items-center justify-center text-brand-accent font-bold text-xs">W</div>
             <h1 className="font-display font-bold text-brand-primary text-xl tracking-tight hidden sm:block">WeedClub</h1>
           </div>
           <div className="pointer-events-auto">
             <button className="bg-brand-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-float hover:bg-brand-primary/90 transition-transform active:scale-95">
               Soy Propietario
             </button>
           </div>
        </div>

        <InteractiveMap 
          clubs={clubs} 
          selectedClubId={selectedClubId} 
          hoveredClubId={hoveredClubId}
          onSelectClub={handleSelectClub} 
          onHoverClub={handleHoverClub}
          viewport={viewport} 
          onViewportChange={handleViewportChange} 
        />
      </div>
    </div>
  );
}
