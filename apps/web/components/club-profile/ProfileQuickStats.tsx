import React from 'react';
import { Star, Image as ImageIcon, Calendar } from 'lucide-react';

interface ProfileQuickStatsProps {
  city?: string;
}

export function ProfileQuickStats({ city }: ProfileQuickStatsProps) {
  return (
    <div className="w-full mt-4 mb-2 px-4 md:px-6 max-w-4xl mx-auto flex overflow-x-auto hide-scrollbar gap-3 pb-2">
      {/* Reseñas */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
        <Star className="w-5 h-5 text-[#00C853] fill-[#00C853]" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">4.8</span>
          <span className="text-[11px] text-gray-500 font-medium">120 reseñas</span>
        </div>
      </div>

      {/* Fotos */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
        <ImageIcon className="w-5 h-5 text-gray-600" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">Fotos</span>
          <span className="text-[11px] text-gray-500 font-medium">+30 publicadas</span>
        </div>
      </div>

      {/* Eventos */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
        <Calendar className="w-5 h-5 text-gray-600" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">Eventos</span>
          <span className="text-[11px] text-gray-500 font-medium">2 Próximos</span>
        </div>
      </div>
    </div>
  );
}
