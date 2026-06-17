'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useClubsMap } from '@/lib/hooks/useClubsMap';
import { ClubCard, ClubCardSkeleton } from '../clubs/ClubCard';
import { BottomNavigationBar } from './BottomNavigationBar';
import { MapModal } from './MapModal';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DiscoveryContainerProps {
  initialLat: number;
  initialLon: number;
  initialZoom?: number;
}

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'popular', label: 'Populares' },
  { id: 'work', label: 'Para Trabajar' },
  { id: 'events', label: 'Eventos' },
];

export function DiscoveryContainer({ initialLat, initialLon, initialZoom = 13 }: DiscoveryContainerProps) {
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = React.useState<'explore' | 'saved' | 'profile' | 'map'>('explore');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const [viewport, setViewport] = React.useState({
    latitude: initialLat,
    longitude: initialLon,
    zoom: initialZoom
  });

  const radiusKm = Math.max(1, 40000 / Math.pow(2, viewport.zoom)); 
  const { clubs, isLoading, isError } = useClubsMap(viewport.latitude, viewport.longitude, radiusKm, searchParams.get('amenity'));

  const handleViewportChange = React.useCallback((newViewport: { latitude: number, longitude: number, zoom: number }) => {
    setViewport(newViewport);
    // Para simplificar, no actualizamos la URL constantemente al mover el mapa modal
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background-base pb-[80px]">
      
      {/* App Hero / Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 pt-safe">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-2xl font-display font-bold tracking-tight text-black">Explorar</h1>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Search Bar - TripAdvisor Style */}
        <div className="relative mb-4 mt-2">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="¿A dónde quieres ir?" 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow shadow-inner"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === cat.id 
                  ? "bg-black text-white" 
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content List */}
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <ClubCardSkeleton />
             <ClubCardSkeleton />
             <ClubCardSkeleton />
           </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">Error al cargar clubes.</div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No hay clubes en esta zona.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4 flex items-center text-gray-900">
               <MapPin className="w-5 h-5 mr-1.5 text-brand-accent" />
               Clubes cerca de ti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map(club => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigationBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Map Modal */}
      <MapModal 
        isOpen={activeTab === 'map'} 
        onClose={() => setActiveTab('explore')}
        clubs={clubs}
        viewport={viewport}
        onViewportChange={handleViewportChange}
      />
      
    </div>
  );
}
