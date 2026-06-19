import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function ClaimClubBanner() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 pb-12">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-gray-400 shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">¿Eres el propietario de este club?</h4>
            <p className="text-sm text-gray-500">Reclama esta página para gestionar tu perfil, actualizar información y añadir fotos.</p>
          </div>
        </div>
        <button className="whitespace-nowrap px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-colors text-sm w-full md:w-auto">
          Reclamar Club
        </button>
      </div>
    </div>
  );
}
