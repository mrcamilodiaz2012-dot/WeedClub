import React from 'react';
import type { Club } from '@/types';
import { Globe, Camera, Phone, Gamepad2, Coffee, Wifi, ParkingSquare, Trees } from 'lucide-react';

const DAYS: { key: string; label: string }[] = [
  { key: 'lunes', label: 'Lunes' },
  { key: 'martes', label: 'Martes' },
  { key: 'miércoles', label: 'Miércoles' },
  { key: 'jueves', label: 'Jueves' },
  { key: 'viernes', label: 'Viernes' },
  { key: 'sábado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
];

// Horario de fallback cuando el club aún no lo ha configurado
const DEFAULT_HOURS: Record<string, string> = {
  lunes: '10:00 - 23:00',
  martes: '10:00 - 23:00',
  miércoles: '10:00 - 23:00',
  jueves: '10:00 - 23:00',
  viernes: '10:00 - 23:00',
  sábado: '10:00 - 23:00',
  domingo: 'Cerrado',
};

const AMENITY_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  gaming: { label: 'Zona Gaming', icon: <Gamepad2 className="w-5 h-5 text-gray-700" /> },
  cafeteria: { label: 'Cafetería', icon: <Coffee className="w-5 h-5 text-gray-700" /> },
  wifi: { label: 'Wi-Fi Gratis', icon: <Wifi className="w-5 h-5 text-gray-700" /> },
  parking: { label: 'Parking', icon: <ParkingSquare className="w-5 h-5 text-gray-700" /> },
  terraza: { label: 'Terraza', icon: <Trees className="w-5 h-5 text-gray-700" /> },
};

export function TabInfo({ club }: { club: Club }) {
  const hours = club.opening_hours ?? DEFAULT_HOURS;
  const todayKey = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.key ?? 'lunes';
  const amenities = club.amenities ?? ['gaming', 'cafeteria', 'wifi'];

  return (
    <div className="space-y-10">

      {/* Descripción (si existe) */}
      {club.description && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sobre el club</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{club.description}</p>
        </section>
      )}

      {/* Horarios */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Horarios</h3>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm">
          <ul className="space-y-3">
            {DAYS.map(({ key, label }) => {
              const isToday = key === todayKey;
              const dayHours = hours[key] ?? 'Consultar';
              const isClosed = dayHours.toLowerCase() === 'cerrado';
              return (
                <li
                  key={key}
                  className={`flex justify-between items-center text-sm ${
                    isToday ? 'font-bold text-gray-900' : 'text-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    )}
                    {label}
                  </span>
                  <span className={isClosed ? 'text-red-400 font-medium' : ''}>
                    {dayHours}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Servicios e Instalaciones */}
      {amenities.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Servicios e Instalaciones</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((key) => {
              const amenity = AMENITY_MAP[key];
              if (!amenity) return null;
              return (
                <div key={key} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  {amenity.icon}
                  <span className="text-sm font-medium">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Contacto y Redes */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
        <div className="flex flex-wrap gap-3">
          {club.instagram_url && (
            <a
              href={club.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
            >
              <Camera className="w-4 h-4" />
              Instagram
            </a>
          )}
          {club.website_url && (
            <a
              href={club.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
            >
              <Globe className="w-4 h-4" />
              Sitio Web
            </a>
          )}
          {club.phone && (
            <a
              href={`tel:${club.phone}`}
              className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Llamar
            </a>
          )}
          {/* Fallback si no hay ningún dato de contacto */}
          {!club.instagram_url && !club.website_url && !club.phone && (
            <p className="text-sm text-gray-400 italic">Este club aún no ha añadido datos de contacto.</p>
          )}
        </div>
      </section>

    </div>
  );
}
