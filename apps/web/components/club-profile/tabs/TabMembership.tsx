import React from 'react';
import type { Club } from '@/types';
import { Check, Sparkles } from 'lucide-react';

export function TabMembership({ club }: { club: Club }) {
  const standardPrice = club.membership_standard_price;
  const premiumPrice = club.membership_premium_price;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-gray-500 text-sm">
          Actualmente {club.name} acepta nuevos socios bajo las siguientes condiciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cuota Standard */}
        <div className="border border-gray-200 rounded-3xl p-6 flex flex-col relative bg-white shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Socio Standard</h3>
          <div className="flex items-baseline gap-1 mb-6">
            {standardPrice != null ? (
              <>
                <span className="text-3xl font-black text-gray-900">{standardPrice}€</span>
                <span className="text-gray-500 font-medium">/ año</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-400 italic">Consultar precio</span>
            )}
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              Acceso a las instalaciones
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              Catálogo completo
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              Eventos estándar
            </li>
          </ul>
          <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors">
            Solicitar Información
          </button>
        </div>

        {/* Cuota Premium */}
        <div className="border border-black rounded-3xl p-6 flex flex-col relative bg-black text-white shadow-xl">
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] uppercase font-black tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" /> Popular
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Socio Premium</h3>
          <div className="flex items-baseline gap-1 mb-6">
            {premiumPrice != null ? (
              <>
                <span className="text-3xl font-black text-white">{premiumPrice}€</span>
                <span className="text-gray-400 font-medium">/ año</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-400 italic">Consultar precio</span>
            )}
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <Check className="w-5 h-5 text-green-400" />
              Todo lo del plan Standard
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <Check className="w-5 h-5 text-green-400" />
              Acceso prioritario a novedades
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <Check className="w-5 h-5 text-green-400" />
              Descuentos exclusivos
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <Check className="w-5 h-5 text-green-400" />
              1 invitado al mes
            </li>
          </ul>
          <button className="w-full py-3 px-4 bg-white text-black hover:bg-gray-100 font-bold rounded-xl transition-colors">
            Solicitar Información
          </button>
        </div>
      </div>
    </div>
  );
}
