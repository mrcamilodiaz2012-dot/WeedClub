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
  LogOut,
  QrCode,
  Edit2
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="w-full min-h-screen pb-32 bg-white font-sans">
      
      {/* Header Profile Info - Spotify Style */}
      <div className="px-4 pt-16 pb-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F7] to-white relative">
        
        {/* Glow effect similar to Spotify's header gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-64 bg-emerald-100/40 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl shadow-black/10 mb-6 relative z-10 border-4 border-white">
          <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
        </div>
        
        <h1 className="text-[34px] font-display font-black tracking-tighter text-gray-900 leading-none text-center relative z-10">
          Andrés García
        </h1>
        
        <div className="flex items-center gap-2.5 mt-4 relative z-10">
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.15em]">
            Socio Activo
          </span>
          <span className="text-gray-500 text-sm font-medium">andres@example.com</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-8 w-full max-w-[280px] relative z-10">
          <button className="flex-1 bg-black text-white rounded-full py-3.5 flex items-center justify-center gap-2 font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20">
            <QrCode size={20} strokeWidth={2.5} />
            WeedClub ID
          </button>
          <button className="w-12 h-12 bg-white border border-gray-200 text-gray-900 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm">
            <Edit2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-5 mt-4 space-y-8">
        
        {/* Cuenta Section */}
        <div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Cuenta</h2>
          <div className="flex flex-col">
            <MenuItem icon={<User size={24} strokeWidth={1.5} />} title="Datos Personales" />
            <MenuItem icon={<ShieldCheck size={24} strokeWidth={1.5} />} title="Privacidad y Seguridad" />
            <MenuItem icon={<Bell size={24} strokeWidth={1.5} />} title="Notificaciones" />
          </div>
        </div>

        {/* Actividad Section */}
        <div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Actividad</h2>
          <div className="flex flex-col">
            <MenuItem icon={<Calendar size={24} strokeWidth={1.5} />} title="Mis Reservas" />
            <MenuItem icon={<Clock size={24} strokeWidth={1.5} />} title="Historial" />
          </div>
        </div>

        {/* Soporte Section */}
        <div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Soporte</h2>
          <div className="flex flex-col">
            <MenuItem icon={<HelpCircle size={24} strokeWidth={1.5} />} title="Ayuda y Soporte" />
            <MenuItem icon={<FileText size={24} strokeWidth={1.5} />} title="Términos y Condiciones" />
          </div>
        </div>

        {/* Logout */}
        <div className="pt-8 pb-12 flex justify-center">
          <button className="text-[15px] font-bold text-red-500 py-4 px-8 rounded-full border border-gray-200 hover:bg-red-50 active:scale-95 transition-all">
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center justify-between py-4 group cursor-pointer active:opacity-60 transition-opacity border-b border-gray-100/80 last:border-none">
      <div className="flex items-center gap-4">
        <div className="text-gray-400 group-hover:text-gray-900 transition-colors">
          {icon}
        </div>
        <span className="text-[17px] text-gray-900 font-medium tracking-tight">{title}</span>
      </div>
      <ChevronRight size={20} className="text-gray-300" strokeWidth={2} />
    </div>
  );
}
