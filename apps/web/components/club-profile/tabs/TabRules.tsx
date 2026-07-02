import React from 'react';
import type { Club } from '@/types';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function TabRules({ club }: { club: Club }) {
  const rules = [
    "Prohibida la entrada a menores de 21 años",
    "Uso exclusivo para socios registrados",
    "No se permite sacar productos del club",
    "Prohibido el uso de teléfonos móviles en la zona de dispensario",
    "Mantener un comportamiento respetuoso con el resto de socios",
    "Obligatorio presentar documento de identidad y carnet de socio al entrar"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-indigo-600 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Normativa del Club</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Para garantizar un entorno seguro y agradable para todos nuestros socios, es imprescindible cumplir con las siguientes normas del establecimiento.
            </p>
            <ul className="space-y-3">
              {rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Aviso importante:</strong> El incumplimiento reiterado de las normas del club puede resultar en la suspensión temporal o permanente de la condición de socio.
        </p>
      </div>
    </div>
  );
}
