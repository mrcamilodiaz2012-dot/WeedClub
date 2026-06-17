'use client';

import * as React from 'react';
import { motion, useAnimation, useDragControls, PanInfo } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ClubCard, ClubCardSkeleton } from '../clubs/ClubCard';
import { cn } from '@/utils/cn';
import type { Club } from '@/types';

interface BottomSheetProps {
  clubs: Club[];
  isLoading: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onSelectClub: (id: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'popular', label: 'Populares' },
  { id: 'work', label: 'Para Trabajar' },
  { id: 'events', label: 'Eventos' },
];

export function BottomSheet({ clubs, isLoading, activeCategory, setActiveCategory, onSelectClub }: BottomSheetProps) {
  const controls = useAnimation();
  const dragControls = useDragControls();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const snapPoints = {
    collapsed: 200, // Alto mínimo visible (solo buscador y filtros)
    expanded: typeof window !== 'undefined' ? window.innerHeight - 80 : 700 // Casi toda la pantalla
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Si la velocidad hacia arriba es alta o pasamos el umbral, expandimos
    if (info.velocity.y < -500 || info.offset.y < -100) {
      setIsExpanded(true);
      controls.start({ height: snapPoints.expanded, transition: { type: 'spring', damping: 25, stiffness: 300 } });
    } else if (info.velocity.y > 500 || info.offset.y > 100) {
      setIsExpanded(false);
      controls.start({ height: snapPoints.collapsed, transition: { type: 'spring', damping: 25, stiffness: 300 } });
    } else {
      // Volver a la posición actual si no hay suficiente fuerza
      controls.start({ height: isExpanded ? snapPoints.expanded : snapPoints.collapsed, transition: { type: 'spring', damping: 25, stiffness: 300 } });
    }
  };

  React.useEffect(() => {
    controls.start({ height: snapPoints.collapsed });
  }, [controls, snapPoints.collapsed]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl overflow-hidden flex flex-col mx-auto max-w-2xl"
      initial={{ height: snapPoints.collapsed }}
      animate={controls}
    >
      {/* Drag Handle Area */}
      <div 
        className="w-full flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none shrink-0"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <motion.div 
          drag="y"
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 h-16" 
        />
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      {/* Header / Search Area (Always visible) */}
      <div className="px-4 pb-4 shrink-0 relative z-40 bg-transparent">
        {/* Search Bar - Apple Maps Style */}
        <div className="relative mb-3 flex items-center shadow-sm">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar en Maps..." 
            className="w-full pl-11 pr-12 py-3.5 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
          />
          <button className="absolute right-3 p-1.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Categories Pills */}
        <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
                activeCategory === cat.id 
                  ? "bg-blue-500 text-white" 
                  : "bg-white/60 text-gray-700 hover:bg-white/90 border border-gray-200/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content (Visible only when expanded or scrolling inside) */}
      <div className="flex-1 overflow-y-auto px-4 pb-12 overscroll-contain relative z-30">
        <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider pl-1">
          Clubes Sugeridos
        </h2>
        
        {isLoading ? (
           <div className="flex flex-col gap-4">
             <ClubCardSkeleton />
             <ClubCardSkeleton />
           </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No hay clubes en esta zona.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {clubs.map((club: Club) => (
              <div key={club.id} className="w-full" onClick={() => onSelectClub(club.id)}>
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
