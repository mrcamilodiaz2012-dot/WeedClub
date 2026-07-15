"use client";

import React from "react";
import { 
  User, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight, 
  QrCode
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-[#F2F2F7] font-sans">
      
      {/* Header Profile Info - iOS Contacts Style */}
      <div className="px-4 pt-14 pb-8 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-sm border border-gray-200 bg-white">
          <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[28px] font-semibold tracking-tight text-black leading-tight">
          Andrés García
        </h1>
        <p className="text-[15px] text-[#8E8E93] mt-1 font-medium">
          andres@example.com
        </p>
      </div>

      <div className="px-4 space-y-6">
        
        {/* Virtual Card / Apple Wallet Style */}
        <section>
          <div className="w-full bg-[#1C1C1E] rounded-[14px] p-5 relative overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mb-1">WeedClub Pass</span>
                <span className="text-white font-mono text-[20px] tracking-widest">WC-2026-8941</span>
              </div>
              <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm">
                <QrCode className="w-6 h-6 text-black" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <span className="text-white/50 text-[13px] font-medium">Socio Activo</span>
            </div>
          </div>
        </section>

        {/* Options Menu - iOS Inset Grouped Table View */}
        <section className="bg-white rounded-[10px] overflow-hidden shadow-sm">
          <MenuItem 
            icon={<User size={16} className="text-white" strokeWidth={2.5} />} 
            iconBg="bg-[#007AFF]" 
            title="Datos Personales" 
          />
          <MenuItem 
            icon={<Bell size={16} className="text-white" strokeWidth={2.5} />} 
            iconBg="bg-[#FF9500]" 
            title="Notificaciones" 
          />
          <MenuItem 
            icon={<ShieldCheck size={16} className="text-white" strokeWidth={2.5} />} 
            iconBg="bg-[#34C759]" 
            title="Privacidad y Seguridad" 
          />
          <MenuItem 
            icon={<HelpCircle size={16} className="text-white" strokeWidth={2.5} />} 
            iconBg="bg-[#8E8E93]" 
            title="Ayuda y Soporte" 
            hideBorder 
          />
        </section>

        {/* Logout Button - iOS Style */}
        <section className="bg-white rounded-[10px] overflow-hidden shadow-sm">
          <button className="w-full bg-white py-3.5 flex items-center justify-center text-[#FF3B30] text-[17px] font-normal transition-colors active:bg-gray-100">
            Cerrar Sesión
          </button>
        </section>

        {/* Footer info */}
        <div className="text-center pt-2 pb-8">
          <span className="text-[13px] text-[#8E8E93]">WeedClub App v1.0.0</span>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, iconBg, title, hideBorder = false }: { icon: React.ReactNode, iconBg: string, title: string, hideBorder?: boolean }) {
  return (
    <div className="flex items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-200 pl-4">
      <div className={`w-[28px] h-[28px] rounded-[6px] flex items-center justify-center mr-3.5 shadow-sm ${iconBg}`}>
        {icon}
      </div>
      <div className={`flex-1 flex items-center justify-between py-3 pr-4 ${hideBorder ? '' : 'border-b border-[#C6C6C8]'}`}>
        <span className="text-[17px] text-black font-normal tracking-tight">{title}</span>
        <ChevronRight size={20} className="text-[#C7C7CC]" strokeWidth={2.5} />
      </div>
    </div>
  );
}
