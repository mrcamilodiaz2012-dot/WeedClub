'use client';

import { Search, Home, Heart, User } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BottomNavigationBarProps {
  activeTab: 'explore' | 'saved' | 'profile' | 'map';
  onTabChange: (tab: 'explore' | 'saved' | 'profile' | 'map') => void;
}

export function BottomNavigationBar({ activeTab, onTabChange }: BottomNavigationBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-white/85 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full md:hidden">
      <div className="flex items-center justify-between px-6 py-2.5">
        <button 
          onClick={() => onTabChange('explore')}
          className={cn("flex flex-col items-center gap-1 transition-colors", activeTab === 'explore' ? "text-blue-600" : "text-gray-400 hover:text-gray-600")}
        >
          <Home size={22} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Explorar</span>
        </button>

        <button 
          onClick={() => onTabChange('saved')}
          className={cn("flex flex-col items-center gap-1 transition-colors", activeTab === 'saved' ? "text-blue-600" : "text-gray-400 hover:text-gray-600")}
        >
          <Heart size={22} strokeWidth={activeTab === 'saved' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Guardados</span>
        </button>

        {/* Center Search Button (Apple Style) */}
        <button 
          onClick={() => onTabChange('map')}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white shadow-md active:scale-95 transition-transform"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onTabChange('profile')}
          className={cn("flex flex-col items-center gap-1 transition-colors", activeTab === 'profile' ? "text-blue-600" : "text-gray-400 hover:text-gray-600")}
        >
          <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Perfil</span>
        </button>
      </div>
    </div>
  );
}
