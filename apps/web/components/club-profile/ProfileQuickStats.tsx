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
    <div className="max-w-4xl mx-auto px-5 md:px-8 mt-6">
      {/* Scrollable container for mobile, flex wrap for desktop */}
      <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
              stat.highlight 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-700 border-gray-200 shadow-sm hover:border-gray-300'
            }`}
          >
            {stat.icon}
            <span className="font-semibold text-sm">{stat.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
