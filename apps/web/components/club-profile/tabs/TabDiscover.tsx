import React from 'react';
import type { Club } from '@/types';
import { MapPin, ShoppingBag, Star } from 'lucide-react';

export function TabDiscover({ club }: { club: Club }) {
  return (
    <div className="space-y-10">
      {/* Clubes Cercanos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Clubes cercanos
          </h3>
          <button className="text-sm font-semibold text-gray-500 hover:text-gray-900">Ver todos</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-20 h-20 bg-gray-200 rounded-xl shrink-0"></div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-gray-900">Green Valley Club {i}</h4>
                <p className="text-sm text-gray-500 mt-1">A {0.5 * i} km de distancia</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-700">4.{9 - i}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grow Shops */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Grow Shops
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Grow Shop {i}</h4>
                  <p className="text-xs text-gray-500">Accesorios y parafernalia</p>
                </div>
              </div>
              <div className="text-xs font-semibold bg-white px-2 py-1 rounded-lg shadow-sm">
                -10% dto
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recomendaciones */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5" />
          Recomendaciones locales
        </h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 md:p-6 border border-green-100">
          <h4 className="font-bold text-green-900 mb-2">¡Explora la zona!</h4>
          <p className="text-sm text-green-800 leading-relaxed mb-4">
            Después de tu visita, te recomendamos dar un paseo por el parque cercano o visitar algunos de los restaurantes mejor valorados de la zona para completar tu experiencia.
          </p>
          <button className="bg-white text-green-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">
            Ver guía de la zona
          </button>
        </div>
      </section>
    </div>
  );
}
