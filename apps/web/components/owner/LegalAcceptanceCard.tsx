'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export function LegalAcceptanceCard() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const confirm = async () => {
    if (!accepted) {
      setError('Debes marcar la casilla para continuar.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await createClient().rpc('accept_current_legal_terms', {
      p_terms_version: TERMS_VERSION,
      p_privacy_version: PRIVACY_VERSION,
    });
    if (result.error) {
      setError('No pudimos registrar la aceptación. Inténtalo de nuevo.');
      setLoading(false);
      return;
    }
    router.refresh();
  };

  return (
    <section className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-6 md:p-8">
      <div className="flex items-start gap-3">
        <span className="rounded-2xl bg-white p-3 text-amber-700"><Scale size={22} /></span>
        <div><h2 className="text-xl font-black">Actualización legal pendiente</h2><p className="mt-1 text-sm leading-6 text-amber-950/70">Antes de reclamar o editar una ficha necesitamos registrar tu aceptación de las condiciones vigentes.</p></div>
      </div>
      <label className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700">
        <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
        <span>He leído y acepto los <Link href="/terminos" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">términos</Link> y confirmo haber leído la <Link href="/privacidad" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">política de privacidad</Link>.</span>
      </label>
      {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
      <button type="button" disabled={loading} onClick={confirm} className="mt-4 rounded-full bg-black px-5 py-3 text-sm font-black text-white disabled:opacity-50">{loading ? 'Registrando…' : 'Aceptar y continuar'}</button>
    </section>
  );
}
