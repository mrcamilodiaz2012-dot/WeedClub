'use client';

import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Club } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface InteractiveMapProps {
  clubs: Club[];
  selectedClubId: string | null;
  hoveredClubId: string | null;
  onSelectClub: (id: string, fromList?: boolean) => void;
  onHoverClub: (id: string | null) => void;
  viewport: { latitude: number; longitude: number; zoom: number };
  onViewportChange: (viewport: { latitude: number; longitude: number; zoom: number }) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Componente Memoizado del Pin para evitar re-renders por hover si no le afecta
const PinMarker = React.memo(({ club, isSelected, isHovered, onSelect, onHover }: any) => {
  const active = isSelected || isHovered;
  
  return (
    <Marker
      longitude={club.lng}
      latitude={club.lat}
      anchor="bottom"
      onClick={e => {
        e.originalEvent.stopPropagation();
        onSelect(club.id);
      }}
    >
      <motion.div 
        className="relative group cursor-pointer z-10"
        initial={false}
        animate={{
          scale: active ? 1.15 : 1,
          zIndex: active ? 30 : 10
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onMouseEnter={() => onHover(club.id)}
        onMouseLeave={() => onHover(null)}
      >
        <motion.div 
          className="px-2 py-1 rounded-full shadow-md font-medium text-sm whitespace-nowrap transition-colors"
          animate={{
            backgroundColor: isSelected ? '#18181B' : isHovered ? '#143D30' : '#FFFFFF',
            color: active ? '#C4F042' : '#18181B',
            borderColor: active ? 'transparent' : '#E4E4E7',
            borderWidth: 1
          }}
        >
          <span className="flex items-center space-x-1.5">
            <motion.span 
              className="w-2 h-2 rounded-full"
              animate={{ backgroundColor: active ? '#C4F042' : '#143D30' }}
            />
            <span className={active ? 'inline-block' : 'hidden group-hover:inline-block ml-1'}>
              {club.name.substring(0, 16)}
            </span>
          </span>
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          animate={{
            backgroundColor: isSelected ? '#18181B' : isHovered ? '#143D30' : '#FFFFFF',
            borderColor: active ? 'transparent' : '#E4E4E7',
            borderBottomWidth: active ? 0 : 1,
            borderRightWidth: active ? 0 : 1
          }}
        />
      </motion.div>
    </Marker>
  );
});
PinMarker.displayName = 'PinMarker';

export function InteractiveMap({ clubs, selectedClubId, hoveredClubId, onSelectClub, onHoverClub, viewport, onViewportChange }: InteractiveMapProps) {
  return (
    <div className="w-full h-full relative bg-gray-100">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN !== 'tu-mapbox-token' ? MAPBOX_TOKEN : undefined}
        {...viewport}
        onMove={(evt: any) => onViewportChange(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        reuseMaps
      >
        <NavigationControl position="top-right" />
        
        {clubs.map(club => (
          <PinMarker 
            key={club.id}
            club={club}
            isSelected={selectedClubId === club.id}
            isHovered={hoveredClubId === club.id}
            onSelect={(id: string) => {
              trackEvent('club_pin_click', { club_id: id });
              onSelectClub(id, false);
            }}
            onHover={onHoverClub}
          />
        ))}
      </Map>
    </div>
  );
}
