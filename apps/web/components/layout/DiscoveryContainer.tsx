'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useClubsMap } from '@/lib/hooks/useClubsMap';
import { InteractiveMap } from '../map/InteractiveMap';
import { BottomSheet } from './BottomSheet';
import type { Club } from '@/types';

interface DiscoveryContainerProps {
  initialLat: number;
  initialLon: number;
  initialZoom?: number;
}

export function DiscoveryContainer({ initialLat, initialLon, initialZoom = 13 }: DiscoveryContainerProps) {
  const searchParams = useSearchParams();
  
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [selectedClubId, setSelectedClubId] = React.useState<string | null>(null);

  const [viewport, setViewport] = React.useState({
    latitude: initialLat,
    longitude: initialLon,
    zoom: initialZoom
  });

  const radiusKm = Math.max(1, 40000 / Math.pow(2, viewport.zoom)); 
  const { clubs, isLoading } = useClubsMap(viewport.latitude, viewport.longitude, radiusKm, searchParams.get('amenity'));

  const handleViewportChange = React.useCallback((newViewport: { latitude: number, longitude: number, zoom: number }) => {
    setViewport(newViewport);
  }, []);

  const handleSelectClub = React.useCallback((id: string) => {
    setSelectedClubId(id);
    const club = clubs.find((c: Club) => c.id === id);
    if (club) {
      setViewport({ ...viewport, latitude: club.lat, longitude: club.lng, zoom: 15 });
    }
  }, [clubs, viewport]);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100 relative">
      
      {/* 100% Full Screen Map Background */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <InteractiveMap 
          clubs={clubs}
          selectedClubId={selectedClubId}
          hoveredClubId={null}
          onSelectClub={handleSelectClub}
          onHoverClub={() => {}}
          viewport={viewport}
          onViewportChange={handleViewportChange}
        />
      </div>

      {/* Floating Apple Maps style Bottom Sheet */}
      <BottomSheet 
        clubs={clubs}
        isLoading={isLoading}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onSelectClub={handleSelectClub}
      />
      
    </div>
  );
}
