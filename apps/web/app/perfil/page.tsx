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
    <div className="w-full h-[100dvh] overflow-hidden bg-[#FAFAFA] font-sans flex flex-col relative pb-20">
      
      {/* Header Profile Info */}
      <div className="px-4 pt-10 pb-4 flex flex-col items-center justify-center shrink-0">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm ring-2 ring-white bg-white">
            <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
          Andrés García
        </h1>
        <p className="text-[13px] text-gray-500 mt-0.5 font-medium">
          andres@example.com
        </p>
      </div>

      <div className="px-5 space-y-4 max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Cuenta Section */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <MenuItem 
            icon={<User size={18} className="text-blue-600" strokeWidth={2} />} 
            iconBg="bg-blue-50" 
            title="Datos Personales" 
          />
          <MenuItem 
            icon={<ShieldCheck size={18} className="text-emerald-600" strokeWidth={2} />} 
            iconBg="bg-emerald-50" 
            title="Privacidad y Seguridad" 
          />
          <MenuItem 
            icon={<Bell size={18} className="text-amber-500" strokeWidth={2} />} 
            iconBg="bg-amber-50" 
            title="Notificaciones" 
            hideBorder 
          />
        </section>

        {/* Actividad Section */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <MenuItem 
            icon={<Calendar size={18} className="text-indigo-600" strokeWidth={2} />} 
            iconBg="bg-indigo-50" 
            title="Mis Reservas" 
          />
          <MenuItem 
            icon={<Clock size={18} className="text-rose-500" strokeWidth={2} />} 
            iconBg="bg-rose-50" 
            title="Historial" 
            hideBorder 
          />
        </section>

        {/* Soporte Section */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <MenuItem 
            icon={<HelpCircle size={18} className="text-blue-600" strokeWidth={2} />} 
            iconBg="bg-blue-50" 
            title="Ayuda y Soporte" 
          />
          <MenuItem 
            icon={<FileText size={18} className="text-gray-600" strokeWidth={2} />} 
            iconBg="bg-gray-100" 
            title="Términos y Condiciones" 
            hideBorder 
          />
        </section>

        {/* Discrete Logout Button */}
        <div className="pt-2 flex justify-center shrink-0">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors px-4 py-2 rounded-full hover:bg-red-50 active:scale-95">
            <LogOut size={16} strokeWidth={2} />
            <span className="text-[14px] font-medium">Cerrar sesión</span>
          </button>
        </div>

      </div>
      
      {/* Footer info */}
      <div className="absolute bottom-24 left-0 right-0 text-center shrink-0 z-0">
        <span className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">WeedClub App v1.0.0</span>
      </div>
    </div>
  );
}

function MenuItem({ icon, iconBg, title, hideBorder = false }: { icon: React.ReactNode, iconBg: string, title: string, hideBorder?: boolean }) {
  return (
    <div className="group cursor-pointer relative z-10">
      <div className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${iconBg} group-active:scale-95 transition-transform`}>
          {icon}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <span className="text-[14px] text-gray-700 font-medium">{title}</span>
          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" strokeWidth={2.5} />
        </div>
      </div>
      {!hideBorder && <div className="h-[1px] bg-gray-100 ml-14 mr-4" />}
    </div>
  );
}
