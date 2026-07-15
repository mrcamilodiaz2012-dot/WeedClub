"use client";

import React from "react";
import { 
  User, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Calendar,
  Clock,
  FileText,
  LogOut
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-[#F5F5F7] font-sans">
      
      {/* Header Profile Info */}
      <div className="px-4 pt-16 pb-10 flex flex-col items-center justify-center">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-[3px] border-white bg-white">
          <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[30px] font-semibold tracking-tight text-[#1C1C1E] leading-tight">
          Andrés García
        </h1>
        <p className="text-[16px] text-[#8E8E93] mt-1 font-normal">
          andres@example.com
        </p>
      </div>

      <div className="px-4 space-y-7">
        
        {/* Cuenta Section */}
        <section>
          <h2 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2.5 ml-4">Cuenta</h2>
          <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
            <MenuItem 
              icon={<User size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#007AFF]" 
              title="Datos Personales" 
            />
            <MenuItem 
              icon={<ShieldCheck size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#34C759]" 
              title="Privacidad y Seguridad" 
            />
            <MenuItem 
              icon={<Bell size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#FF9500]" 
              title="Notificaciones" 
              hideBorder 
            />
          </div>
        </section>

        {/* Actividad Section */}
        <section>
          <h2 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2.5 ml-4">Actividad</h2>
          <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
            <MenuItem 
              icon={<Calendar size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#5856D6]" 
              title="Mis Reservas" 
            />
            <MenuItem 
              icon={<Clock size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#FF2D55]" 
              title="Historial" 
              hideBorder 
            />
          </div>
        </section>

        {/* Soporte Section */}
        <section>
          <h2 className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2.5 ml-4">Soporte</h2>
          <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
            <MenuItem 
              icon={<HelpCircle size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#007AFF]" 
              title="Ayuda y Soporte" 
            />
            <MenuItem 
              icon={<FileText size={18} className="text-white" strokeWidth={2.5} />} 
              iconBg="bg-[#8E8E93]" 
              title="Términos y Condiciones" 
              hideBorder 
            />
          </div>
        </section>

        {/* Discreed Logout Button */}
        <div className="pt-2 pb-6 flex justify-center">
          <button className="flex items-center space-x-2 text-[#8E8E93] hover:text-[#FF3B30] transition-colors px-6 py-3 rounded-full active:bg-gray-100/50">
            <LogOut size={18} strokeWidth={2} />
            <span className="text-[16px] font-medium">Cerrar sesión</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center pb-8">
          <span className="text-[13px] text-[#C7C7CC]">WeedClub App v1.0.0</span>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, iconBg, title, hideBorder = false }: { icon: React.ReactNode, iconBg: string, title: string, hideBorder?: boolean }) {
  return (
    <div className="flex items-center bg-white hover:bg-[#F9F9F9] transition-colors cursor-pointer active:bg-[#F2F2F7] pl-4">
      <div className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center mr-4 ${iconBg} shadow-sm`}>
        {icon}
      </div>
      <div className={`flex-1 flex items-center justify-between py-3.5 pr-4 ${hideBorder ? '' : 'border-b border-[#E5E5EA]'}`}>
        <span className="text-[17px] text-[#1C1C1E] font-normal tracking-tight">{title}</span>
        <ChevronRight size={20} className="text-[#C7C7CC]" strokeWidth={2.5} />
      </div>
    </div>
  );
}
