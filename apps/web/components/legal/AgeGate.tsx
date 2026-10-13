'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'weedclub_age_confirmed';
const STORAGE_DURATION_MS = 365 * 24 * 60 * 60 * 1000;
const LEGAL_PATHS = ['/aviso-legal', '/terminos', '/privacidad', '/cookies', '/reportar-contenido'];

export function AgeGate() {
  const pathname = usePathname();
  const [state, setState] = useState<'checking' | 'open' | 'accepted' | 'denied'>('checking');

  useEffect(() => {
    if (LEGAL_PATHS.some((path) => pathname.startsWith(path))) {
      setState('accepted');
      return;
    }
    const expiresAt = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isFinite(expiresAt) && expiresAt > Date.now()) setState('accepted');
    else {
      window.localStorage.removeItem(STORAGE_KEY);
      setState('open');
    }
  }, [pathname]);

  if (state === 'checking' || state === 'accepted') return null;

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + STORAGE_DURATION_MS));
    setState('accepted');
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-gray-950/95 p-5" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="w-full max-w-md rounded-[30px] bg-white p-7 text-center shadow-2xl md:p-9">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><ShieldCheck size={27} /></span>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Acceso restringido</p>
        <h2 id="age-title" className="mt-2 text-3xl font-black tracking-tight">Solo para mayores de 18 años</h2>
        {state === 'denied' ? (
          <>
            <p className="mt-4 text-sm leading-6 text-gray-600">No puedes acceder al directorio. Puedes consultar información pública de prevención y salud.</p>
            <a href="https://pnsd.sanidad.gob.es/ciudadanos/informacion/" className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm font-black text-white">Información del Ministerio de Sanidad</a>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-gray-600">WeedClub es un directorio informativo. No vende ni facilita cannabis, no gestiona altas de socios y no garantiza el acceso a ningún club.</p>
            <div className="mt-7 grid gap-3">
              <button type="button" onClick={accept} className="rounded-2xl bg-black px-5 py-3.5 text-sm font-black text-white">Confirmo que tengo 18 años o más</button>
              <button type="button" onClick={() => setState('denied')} className="rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold text-gray-600">Soy menor de 18 años</button>
            </div>
            <p className="mt-5 text-xs leading-5 text-gray-400">Al continuar aceptas los <Link href="/terminos" className="font-bold underline">términos de uso</Link>. Esta confirmación se guarda localmente durante 12 meses.</p>
          </>
        )}
      </div>
    </div>
  );
}
