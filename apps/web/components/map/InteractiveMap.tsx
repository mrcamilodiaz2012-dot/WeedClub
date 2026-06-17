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
      onClick={(e: any) => {
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
          className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-white border border-gray-200"
          animate={{
            scale: active ? 1.2 : 1,
            backgroundColor: isSelected ? '#3B82F6' : '#FFFFFF', // Apple Maps Blue for selected
            borderColor: active ? 'transparent' : '#E5E7EB',
          }}
        >
          {/* Inner colored dot */}
          <motion.div 
            className="w-2.5 h-2.5 rounded-full"
            animate={{
              backgroundColor: isSelected ? '#FFFFFF' : '#EF4444' // Apple Maps Red for unselected points of interest
            }}
          />
          
          {/* Tooltip for hover/active */}
          <AnimatePresence>
            {active && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute bottom-full mb-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 whitespace-nowrap z-50 pointer-events-none"
              >
                <span className="text-xs font-semibold text-gray-900">{club.name.substring(0, 20)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
