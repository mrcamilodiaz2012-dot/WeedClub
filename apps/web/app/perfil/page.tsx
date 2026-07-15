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
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-[#FAFAFA] font-sans">
      
      {/* Header Profile Info */}
      <div className="px-4 pt-16 pb-12 flex flex-col items-center justify-center">
        <div className="relative mb-5">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-md ring-4 ring-white bg-white">
            <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">
          Andrés García
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          andres@example.com
        </p>
      </div>

      <div className="px-5 space-y-8 max-w-lg mx-auto">
        
        {/* Cuenta Section */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 ml-1">Cuenta</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={<User size={20} className="text-blue-600" strokeWidth={2} />} 
              iconBg="bg-blue-50" 
              title="Datos Personales" 
            />
            <MenuItem 
              icon={<ShieldCheck size={20} className="text-emerald-600" strokeWidth={2} />} 
              iconBg="bg-emerald-50" 
              title="Privacidad y Seguridad" 
            />
            <MenuItem 
              icon={<Bell size={20} className="text-amber-500" strokeWidth={2} />} 
              iconBg="bg-amber-50" 
              title="Notificaciones" 
              hideBorder 
            />
          </div>
        </section>

        {/* Actividad Section */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 ml-1">Actividad</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={<Calendar size={20} className="text-indigo-600" strokeWidth={2} />} 
              iconBg="bg-indigo-50" 
              title="Mis Reservas" 
            />
            <MenuItem 
              icon={<Clock size={20} className="text-rose-500" strokeWidth={2} />} 
              iconBg="bg-rose-50" 
              title="Historial" 
              hideBorder 
            />
          </div>
        </section>

        {/* Soporte Section */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3 ml-1">Soporte</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={<HelpCircle size={20} className="text-blue-600" strokeWidth={2} />} 
              iconBg="bg-blue-50" 
              title="Ayuda y Soporte" 
            />
            <MenuItem 
              icon={<FileText size={20} className="text-gray-600" strokeWidth={2} />} 
              iconBg="bg-gray-100" 
              title="Términos y Condiciones" 
              hideBorder 
            />
          </div>
        </section>

        {/* Discrete Logout Button */}
        <div className="pt-4 pb-6 flex justify-center">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors px-6 py-3 rounded-full hover:bg-red-50 active:scale-95">
            <LogOut size={18} strokeWidth={2} />
            <span className="text-sm font-semibold">Cerrar sesión</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center pb-8">
          <span className="text-xs text-gray-400 font-medium">WeedClub App v1.0.0</span>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, iconBg, title, hideBorder = false }: { icon: React.ReactNode, iconBg: string, title: string, hideBorder?: boolean }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${iconBg} group-active:scale-95 transition-transform`}>
          {icon}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <span className="text-[15px] text-gray-700 font-medium">{title}</span>
          <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-400 transition-colors" strokeWidth={2.5} />
        </div>
      </div>
      {!hideBorder && <div className="h-[1px] bg-gray-100 ml-16 mr-4" />}
    </div>
  );
}
