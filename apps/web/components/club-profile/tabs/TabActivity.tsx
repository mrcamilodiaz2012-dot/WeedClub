import React from 'react';
import type { Club } from '@/types';
import { Sparkles, Calendar, ImageIcon } from 'lucide-react';

export function TabActivity({ club }: { club: Club }) {
  // Mock data for the activity feed
  const feed = [
    {
      id: 1,
      type: 'update',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: 'Nueva Variedad Disponible',
      content: 'Acabamos de añadir Gelato 41 a nuestro menú. ¡Ven a probarla!',
      time: 'Hace 2 horas',
    },
    {
      id: 2,
      type: 'event',
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      title: 'Torneo de FIFA 24',
      content: 'Este viernes a las 18:00 organizamos nuestro torneo mensual. Apúntate en recepción.',
      time: 'Ayer',
    },
    {
      id: 3,
      type: 'gallery',
      icon: <ImageIcon className="w-5 h-5 text-purple-500" />,
      title: 'Nueva Galería: Fiesta de Verano',
      content: 'Ya hemos subido las fotos de la última fiesta.',
      time: 'Hace 3 días',
    }
  ];

  return (
    <div className="space-y-6">
      {feed.map((item) => (
        <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <span className="text-xs text-gray-400">• {item.time}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
            </div>
          </div>
        </div>
      ))}

      {feed.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay actividad reciente.</p>
        </div>
      )}
    </div>
  );
}
