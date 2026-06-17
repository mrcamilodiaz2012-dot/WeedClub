'use client';

import { Search, Map, Home, Heart, User } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BottomNavigationBarProps {
  activeTab: 'explore' | 'saved' | 'profile' | 'map';
  onTabChange: (tab: 'explore' | 'saved' | 'profile' | 'map') => void;
}

export function BottomNavigationBar({ activeTab, onTabChange }: BottomNavigationBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex items-center justify-around px-2 py-3 h-[72px] pb-safe relative">
        <button 
          onClick={() => onTabChange('explore')}
          className={cn("flex flex-col items-center gap-1 min-w-[64px]", activeTab === 'explore' ? "text-black" : "text-gray-400")}
        >
          <Home size={24} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Explorar</span>
        </button>

        <button 
          onClick={() => onTabChange('saved')}
          className={cn("flex flex-col items-center gap-1 min-w-[64px]", activeTab === 'saved' ? "text-black" : "text-gray-400")}
        >
          <Heart size={24} strokeWidth={activeTab === 'saved' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Guardados</span>
        </button>

        {/* Center Map FAB */}
        <div className="relative -top-6">
          <button 
            onClick={() => onTabChange('map')}
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full shadow-float transition-transform active:scale-95",
              activeTab === 'map' ? "bg-black text-white" : "bg-[#00AA6C] text-white"
            )}
          >
            {activeTab === 'map' ? <Search size={28} /> : <Map size={28} />}
          </button>
        </div>

        <button 
          onClick={() => onTabChange('profile')}
          className={cn("flex flex-col items-center gap-1 min-w-[64px]", activeTab === 'profile' ? "text-black" : "text-gray-400")}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
