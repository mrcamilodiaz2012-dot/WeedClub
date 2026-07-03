import React from 'react';
import type { Club } from '@/types';
import { ShieldAlert, Fingerprint, Smartphone, Backpack, UserCheck, CheckCircle2 } from 'lucide-react';

export function TabRules({ club }: { club: Club }) {
  // Mapping rules to specific icons for a more visual, modern look
  const rules = [
    { text: "Prohibida la entrada a menores de 21 años", icon: ShieldAlert },
    { text: "Uso exclusivo para socios registrados", icon: UserCheck },
    { text: "No se permite sacar productos del club", icon: Backpack },
    { text: "Prohibido el uso de móviles en dispensario", icon: Smartphone },
    { text: "Comportamiento respetuoso con otros socios", icon: CheckCircle2 },
    { text: "Obligatorio presentar DNI y carnet al entrar", icon: Fingerprint }
  ];

  return (
    <div className="space-y-6">
      <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
        Para garantizar un entorno seguro y agradable para todos nuestros socios, es imprescindible cumplir con las siguientes normas del establecimiento.
      </p>

      {/* Modern Grid Layout for Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {rules.map((rule, i) => {
          const Icon = rule.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-4 rounded-[20px] bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gray-900" strokeWidth={2.5} />
              </div>
              <p className="text-[14px] font-semibold text-gray-800 pt-2.5 leading-snug">{rule.text}</p>
            </div>
          );
        })}
      </div>
      
      {/* Clean Warning Banner */}
      <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-red-50/50 border border-red-100/50">
        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[13px] text-red-900/80 leading-relaxed">
          <strong className="font-bold text-red-900">Aviso:</strong> El incumplimiento reiterado de las normas puede resultar en la suspensión temporal o permanente de la condición de socio.
        </p>
      </div>
    </div>
  );
}
