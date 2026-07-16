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
  QrCode
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-background-base font-sans">
      
      {/* Top Header */}
      <div className="px-4 pt-6 pb-2 sticky top-0 z-40 bg-background-base/90 backdrop-blur-md">
        <h1 className="text-[28px] font-display font-black tracking-tight text-text-primary leading-none mb-4">
          Perfil
        </h1>
      </div>

      <div className="px-4 space-y-5">
        
        {/* User Card & QR */}
        <div className="bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-border-subtle/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[30px] pointer-events-none -mr-10 -mt-10" />
          
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-gray-100 shrink-0 relative z-10">
            <img src="/portadas/cannabis2.jpg" alt="Andrés García" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col relative z-10">
            <h2 className="text-[19px] font-display font-bold text-text-primary leading-tight tracking-tight">Andrés García</h2>
            <p className="text-[13px] text-text-secondary font-medium mt-0.5">andres@example.com</p>
          </div>
          <div className="ml-auto relative z-10">
            <button className="w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform hover:bg-black">
              <QrCode size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Cuenta Section */}
        <div>
          <h3 className="text-[12px] font-bold text-text-tertiary uppercase tracking-widest mb-2 ml-2">Cuenta</h3>
          <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-border-subtle/50 p-1.5">
            <MenuItem icon={<User size={18} />} title="Datos Personales" />
            <MenuItem icon={<ShieldCheck size={18} />} title="Privacidad y Seguridad" />
            <MenuItem icon={<Bell size={18} />} title="Notificaciones" hideBorder />
          </div>
        </div>

        {/* Actividad Section */}
        <div>
          <h3 className="text-[12px] font-bold text-text-tertiary uppercase tracking-widest mb-2 ml-2">Actividad</h3>
          <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-border-subtle/50 p-1.5">
            <MenuItem icon={<Calendar size={18} />} title="Mis Reservas" />
            <MenuItem icon={<Clock size={18} />} title="Historial" hideBorder />
          </div>
        </div>

        {/* Soporte Section */}
        <div>
          <h3 className="text-[12px] font-bold text-text-tertiary uppercase tracking-widest mb-2 ml-2">Soporte</h3>
          <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-border-subtle/50 p-1.5">
            <MenuItem icon={<HelpCircle size={18} />} title="Ayuda y Soporte" />
            <MenuItem icon={<FileText size={18} />} title="Términos y Condiciones" hideBorder />
          </div>
        </div>

        {/* Logout */}
        <div className="pt-2">
          <button className="w-full bg-white hover:bg-red-50 text-red-500 border border-border-subtle/50 rounded-[20px] p-4 flex items-center justify-center gap-2 font-bold transition-colors active:scale-[0.98] shadow-sm">
            <LogOut size={18} strokeWidth={2.5} />
            Cerrar Sesión
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center pb-8 pt-2">
          <span className="text-[11px] text-text-tertiary font-medium uppercase tracking-widest">WeedClub App v1.0.0</span>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, title, hideBorder = false }: { icon: React.ReactNode, title: string, hideBorder?: boolean }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-center px-3 py-3 hover:bg-gray-50 rounded-[14px] transition-colors active:bg-gray-100">
        <div className="w-8 h-8 rounded-full bg-background-base flex items-center justify-center mr-3 text-text-primary border border-border-subtle/40 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <span className="text-[15px] text-text-primary font-semibold tracking-tight">{title}</span>
          <ChevronRight size={18} className="text-text-tertiary group-hover:text-text-secondary transition-colors" strokeWidth={2.5} />
        </div>
      </div>
      {!hideBorder && <div className="h-[1px] bg-border-subtle/30 mx-4" />}
    </div>
  );
}
