"use client";

import React from "react";
import { 
  User, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  QrCode,
  Star
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="w-full h-full min-h-screen pb-32 overflow-y-auto bg-background-base">
      {/* Header Profile Info */}
      <div className="px-4 pt-10 pb-6 bg-background-base">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-emerald-300 p-1 shadow-sm">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
              <img src="/portadas/cannabis2.jpg" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-[26px] font-display font-black tracking-tight text-text-primary leading-tight">
              Andrés García
            </h1>
            <p className="text-sm font-medium text-text-secondary mt-0.5">
              andres@example.com
            </p>
            <div className="inline-flex items-center gap-1 mt-2 bg-emerald-100/50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-sm">
              <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Miembro Activo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        
        {/* Virtual Card / QR Code */}
        <section>
          <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[24px] p-5 relative overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15)] group cursor-pointer active:scale-[0.98] transition-all duration-300 border border-gray-800">
            {/* Background texture/glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">WeedClub ID</span>
                <span className="text-white font-mono text-[20px] font-medium tracking-widest drop-shadow-md">WC-2026-8941</span>
              </div>
              <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-[14px] flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-white transition-all duration-300">
                <QrCode className="w-7 h-7 text-gray-900" strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-8 flex justify-between items-end relative z-10">
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Miembro desde</span>
                <span className="text-white/90 text-[13px] font-medium">Julio 2026</span>
              </div>
              <span className="text-brand-accent text-[12px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver QR <ChevronRight size={14} strokeWidth={3} />
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-subtle/40 active:scale-[0.98] transition-transform cursor-pointer">
            <span className="text-[28px] font-display font-black text-text-primary leading-none mb-1">4</span>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Clubs Asociados</span>
          </div>
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-subtle/40 active:scale-[0.98] transition-transform cursor-pointer">
            <span className="text-[28px] font-display font-black text-text-primary leading-none mb-1">12</span>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Tus Reseñas</span>
          </div>
        </section>

        {/* Options Menu */}
        <section className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-border-subtle/40 overflow-hidden">
          <MenuItem icon={<User className="text-sky-500" />} title="Mis Datos" subtitle="Edita tu información personal" />
          <MenuItem icon={<CreditCard className="text-purple-500" />} title="Suscripciones" subtitle="Gestiona tus cuotas y pagos" />
          <MenuItem icon={<Bell className="text-amber-500" />} title="Notificaciones" subtitle="Configura tus alertas" />
          <MenuItem icon={<ShieldCheck className="text-emerald-500" />} title="Privacidad" subtitle="Contraseña y seguridad" />
          <MenuItem icon={<HelpCircle className="text-gray-400" />} title="Soporte" subtitle="Preguntas frecuentes y contacto" hideBorder />
        </section>

        {/* Logout Button */}
        <button className="w-full bg-white hover:bg-red-50 text-red-500 border border-border-subtle/50 rounded-[20px] p-4 flex items-center justify-center gap-2 font-bold transition-colors active:scale-[0.98] shadow-sm">
          <LogOut size={18} strokeWidth={2.5} />
          Cerrar Sesión
        </button>

        <div className="text-center pt-2">
          <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">WeedClub App v1.0.0</span>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, title, subtitle, hideBorder = false }: { icon: React.ReactNode, title: string, subtitle: string, hideBorder?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100 ${hideBorder ? '' : 'border-b border-border-subtle/40'}`}>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
          {React.cloneElement(icon as React.ReactElement, { size: 20, strokeWidth: 2 })}
        </div>
        <div className="flex flex-col">
          <span className="text-[16px] font-display font-bold text-text-primary tracking-tight">{title}</span>
          <span className="text-[12px] font-medium text-text-secondary">{subtitle}</span>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-300" strokeWidth={2} />
    </div>
  );
}
