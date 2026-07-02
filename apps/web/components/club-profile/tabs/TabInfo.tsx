import React from 'react';
import type { Club } from '@/types';
import { MapPin, Clock, Globe, Camera, Phone, Gamepad2, Coffee, Wifi } from 'lucide-react';

export function TabInfo({ club }: { club: Club }) {
  return (
    <div className="space-y-10">
      {/* Hours */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Horarios</h3>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm">
          <ul className="space-y-3">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, i) => {
              const isToday = i === new Date().getDay() - 1; // Simplificación
              return (
                <li key={day} className={`flex justify-between items-center text-sm ${isToday ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                  <span className="flex items-center gap-2">
                    {isToday && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                    {day}
                  </span>
                  <span>10:00 - 23:00</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Amenities */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Servicios e Instalaciones</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Gamepad2 className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium">Zona Gaming</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Coffee className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium">Cafetería</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Wifi className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium">Wi-Fi Gratis</span>
          </div>
        </div>
      </section>

      {/* Contact & Links */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
        <div className="flex flex-wrap gap-3">
          <a href="#" className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors">
            <Camera className="w-4 h-4" />
            Instagram
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors">
            <Globe className="w-4 h-4" />
            Sitio Web
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors">
            <Phone className="w-4 h-4" />
            Llamar
          </a>
        </div>
      </section>
    </div>
  );
}
