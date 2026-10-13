import * as React from 'react';
import { MapPin, Clock, Wifi, Coffee, Users, Leaf, Accessibility } from 'lucide-react';
import type { Club } from '@/types';
import { Badge } from '../ui/Badge';

export function ClubInfo({ club }: { club: Club }) {
  const isOpen = club.status === 'active'; // Lógica simulada

  const amenities = [
    { name: 'WiFi Gratis', icon: Wifi },
    { name: 'Snacks & Bebidas', icon: Coffee },
    { name: 'Eventos', icon: Users },
    { name: 'Vaporizadores', icon: Leaf },
    { name: 'Accesible', icon: Accessibility },
  ];

  return (
    <div className="py-6 border-b border-border-subtle">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">{club.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-text-secondary text-sm md:text-base">
            <span className="flex items-center font-semibold text-text-primary"><Star className="w-4 h-4 text-brand-primary fill-brand-primary mr-1" /> 4.8</span>
            <span>•</span>
            <span className="underline cursor-pointer">120 reseñas</span>
            <span>•</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {club.city}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isOpen ? (
             <Badge variant="outline" className="bg-brand-accent/20 text-brand-primary border-brand-accent/30 font-semibold px-3 py-1">
               Abierto Ahora
             </Badge>
           ) : (
             <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-medium px-3 py-1">
               Cerrado
             </Badge>
           )}
           <span className="text-sm font-medium text-text-secondary flex items-center"><Clock className="w-4 h-4 mr-1" /> 10:00 - 23:00</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Acerca de este club</h3>
        <p className="text-text-secondary leading-relaxed">
          {club.description || 'Un club social premium ubicado en el corazón de la ciudad. Ofrecemos una experiencia exclusiva, ambiente relajado y los más altos estándares de calidad para nuestros miembros. Nuestro espacio está diseñado para el confort, el trabajo y la socialización.'}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Servicios e Instalaciones</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
          {amenities.map((amenity, i) => (
            <div key={i} className="flex items-center gap-3 text-text-primary">
              <amenity.icon className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-sm md:text-base">{amenity.name}</span>
            </div>
          ))}
        </div>
        <button className="mt-6 font-semibold underline text-text-primary hover:text-brand-primary transition">
          Ver las 12 instalaciones
        </button>
      </div>
    </div>
  );
}

// Para usar Star dentro del mismo archivo si no se importó arriba
import { Star } from 'lucide-react';
