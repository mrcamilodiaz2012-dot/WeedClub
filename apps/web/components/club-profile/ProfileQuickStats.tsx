import React from 'react';
import { Star, MessageCircle, Camera, MapPin, Clock } from 'lucide-react';

interface ProfileQuickStatsProps {
  city: string;
}

export function ProfileQuickStats({ city }: ProfileQuickStatsProps) {
  // Datos mockeados para los stats por ahora
  const stats = [
    { icon: <Star className="w-4 h-4 fill-current" />, text: "4.8", highlight: true },
    { icon: <MessageCircle className="w-4 h-4" />, text: "124 reseñas" },
    { icon: <Camera className="w-4 h-4" />, text: "42 fotos" },
    { icon: <MapPin className="w-4 h-4" />, text: city || "Ubicación" },
    { icon: <Clock className="w-4 h-4" />, text: "Abierto hasta 23:00" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 mb-8">
      {/* Scrollable container for mobile, flex wrap for desktop */}
      <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap text-gray-800">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-70 ${
              stat.highlight ? 'text-gray-900 font-bold' : 'text-gray-600'
            }`}
          >
            <span className={stat.highlight ? 'text-[#00C853]' : 'text-gray-400'}>{stat.icon}</span>
            <span className="text-[14px] font-medium">{stat.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
