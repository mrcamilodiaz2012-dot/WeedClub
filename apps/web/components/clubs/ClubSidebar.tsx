'use client';

import * as React from 'react';
import { ClubCard, ClubCardSkeleton } from './ClubCard';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Club } from '@/types';

interface ClubSidebarProps {
  clubs: Club[];
  isLoading: boolean;
  selectedClubId: string | null;
  hoveredClubId: string | null;
  onSelectClub: (id: string, fromList?: boolean) => void;
  onHoverClub: (id: string | null) => void;
}

export function ClubSidebar({ clubs, isLoading, selectedClubId, hoveredClubId, onSelectClub, onHoverClub }: ClubSidebarProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: isLoading ? 6 : clubs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320, // Altura estimada de la card
    overscan: 3,
  });

  return (
    // Desktop: Sidebar Fija, Mobile: Absolute Bottom Sheet style
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full md:w-[420px] h-[50vh] md:h-full bg-white md:bg-background-secondary border-t md:border-t-0 md:border-r border-border-subtle flex flex-col z-40 md:z-10 absolute md:relative bottom-0 rounded-t-3xl md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-float"
    >
      {/* Handle for Mobile Drag (Visual only for now) */}
      <div className="w-full h-6 flex md:hidden items-center justify-center shrink-0">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      {/* Header Fijo */}
      <div className="px-5 py-3 md:pt-6 bg-white shrink-0 z-10 border-b border-gray-100">
        <h2 className="font-display font-bold text-2xl mb-4 text-text-primary hidden md:block">Explorar</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar ubicación o club..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
            />
          </div>
          <button className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lista Virtualizada */}
      <div 
        ref={parentRef} 
        className="flex-1 overflow-y-auto bg-gray-50/50 p-4 scroll-smooth"
      >
        {!isLoading && clubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">Sin resultados</h3>
            <p className="text-sm text-text-secondary">Intenta buscar en otra zona o ajustar los filtros.</p>
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoader = isLoading;
              const club = clubs[virtualRow.index];
              
              return (
                <div
                  key={virtualRow.index}
                  id={!isLoader && club ? `card-${club.id}` : undefined}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    paddingBottom: '16px'
                  }}
                >
                  {isLoader || !club ? (
                    <ClubCardSkeleton />
                  ) : (
                    <ClubCard 
                      club={club} 
                      isSelected={selectedClubId === club.id}
                      isHovered={hoveredClubId === club.id}
                      onClick={() => onSelectClub(club.id, true)}
                      onMouseEnter={() => onHoverClub(club.id)}
                      onMouseLeave={() => onHoverClub(null)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
