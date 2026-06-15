import * as React from 'react';

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden z-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-text-primary text-lg">20€ <span className="text-sm font-normal text-text-secondary">/ año</span></p>
          <p className="text-sm text-brand-primary font-medium underline">Cuota de Socio</p>
        </div>
        <button className="bg-brand-primary text-white font-semibold py-3 px-8 rounded-xl shadow-float active:scale-95 transition-transform">
          Solicitar Ingreso
        </button>
      </div>
    </div>
  );
}
