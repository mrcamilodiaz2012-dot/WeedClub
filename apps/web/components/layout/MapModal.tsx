'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveMap } from '../map/InteractiveMap';
import { ClubCard } from '../clubs/ClubCard';
import { X } from 'lucide-react';
import type { Club } from '@/types';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: Club[];
  viewport: any;
  onViewportChange: (vp: any) => void;
}

export function MapModal({ isOpen, onClose, clubs, viewport, onViewportChange }: MapModalProps) {
  const [selectedClubId, setSelectedClubId] = React.useState<string | null>(null);

  // When a map pin is clicked
  const handleSelectClub = (id: string) => {
    setSelectedClubId(id);
    const index = clubs.findIndex(c => c.id === id);
    if (index !== -1) {
      // Scroll to card in carousel
      const carousel = document.getElementById('map-carousel');
      if (carousel) {
        const cardWidth = 300; // approximate width of card + gap
        carousel.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-safe pb-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none flex justify-between items-start mt-4">
            <div className="pointer-events-auto">
               <button 
                 onClick={onClose}
                 className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 active:scale-95 transition-transform"
               >
                 <X size={24} />
               </button>
            </div>
            {/* Opcional: Filtros rápidos flotando sobre el mapa */}
            <div className="pointer-events-auto bg-white rounded-full px-4 py-2 shadow-lg text-sm font-medium">
              Buscar en esta zona
            </div>
          </div>

          {/* Map Layer */}
          <div className="flex-1 w-full relative">
            <InteractiveMap 
              clubs={clubs}
              selectedClubId={selectedClubId}
              hoveredClubId={null}
              onSelectClub={handleSelectClub}
              onHoverClub={() => {}}
              viewport={viewport}
              onViewportChange={onViewportChange}
            />
          </div>

          {/* Bottom Carousel (Google Maps Style) */}
          <div className="absolute bottom-6 left-0 right-0 z-10 pointer-events-none">
            <div 
              id="map-carousel"
              className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory pointer-events-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {clubs.map((club) => (
                <div key={club.id} className="snap-center shrink-0 w-[280px]">
                  <ClubCard 
                    club={club} 
                    isSelected={selectedClubId === club.id}
                    onClick={() => {
                      setSelectedClubId(club.id);
                      onViewportChange({ ...viewport, latitude: club.lat, longitude: club.lng, zoom: 14 });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
