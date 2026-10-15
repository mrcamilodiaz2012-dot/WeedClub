import React from 'react';
import type { Club } from '@/types';
import { ShieldAlert, Fingerprint, MapPinOff, ScrollText, UserCheck, CheckCircle2 } from 'lucide-react';

export function TabRules({ club }: { club: Club }) {
  const ageRule = club.minimum_age
    ? `Edad mínima publicada: ${club.minimum_age} años`
    : 'Acceso exclusivo para personas adultas';
  const rules = [
    { text: ageRule, icon: ShieldAlert },
    { text: "Uso exclusivo para socios registrados", icon: UserCheck },
    { text: "El acceso está sujeto a la admisión del club", icon: CheckCircle2 },
    { text: "Consulta y acepta las normas internas", icon: ScrollText },
    { text: "No consumas ni portes cannabis en espacios públicos", icon: MapPinOff },
    { text: "Comportamiento respetuoso con otros socios", icon: CheckCircle2 },
    { text: "Presenta una identificación válida al registrarte", icon: Fingerprint }
  ];

  return (
    <div className="space-y-6">
      <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
        Estas son pautas generales de acceso responsable. Cada asociación establece sus propios requisitos y normas internas.
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
          <strong className="font-bold text-red-900">Importante:</strong> Confirma las condiciones directamente con el club. La información pública puede cambiar y no sustituye sus estatutos ni la normativa aplicable.
        </p>
      </div>
    </div>
  );
}
