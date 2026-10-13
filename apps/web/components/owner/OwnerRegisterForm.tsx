'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Mail, UserRound } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export function OwnerRegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!legalAccepted) {
      setError('Debes aceptar los términos y confirmar que has leído la política de privacidad.');
      return;
    }
    setLoading(true);
    setError('');
    const supabase = createClient();
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: name,
          account_purpose: 'club_management',
          legal_acceptance: true,
          terms_version: TERMS_VERSION,
          privacy_version: PRIVACY_VERSION,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/club/panel')}`,
      },
    });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="mt-8 rounded-[24px] bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto text-emerald-600" size={34} />
        <h2 className="mt-3 text-xl font-black">Revisa tu correo</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-900/70">Te hemos enviado el enlace de confirmación. Después podrás reclamar o gestionar tu club.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <Field label="Nombre del representante" icon={<UserRound size={18} />}><input required value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent outline-none" /></Field>
      <Field label="Correo profesional" icon={<Mail size={18} />}><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent outline-none" /></Field>
      <Field label="Contraseña" icon={<Lock size={18} />}><input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Mínimo 8 caracteres" /></Field>
      <label className="flex items-start gap-3 rounded-2xl border border-black/10 p-4 text-sm leading-6 text-gray-600">
        <input type="checkbox" required checked={legalAccepted} onChange={(event) => setLegalAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
        <span>He leído y acepto los <Link href="/terminos" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">términos de uso</Link> y confirmo haber leído la <Link href="/privacidad" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">política de privacidad</Link>. Declaro que soy representante autorizado de un club.</span>
      </label>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="h-13 w-full rounded-2xl bg-black font-bold text-white transition hover:bg-gray-800 disabled:opacity-50">{loading ? 'Creando acceso…' : 'Crear acceso para mi club'}</button>
      <p className="text-center text-sm text-gray-500">¿Ya tienes acceso? <Link href="/club/acceso" className="font-bold text-black hover:underline">Iniciar sesión</Link></p>
    </form>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <label className="block rounded-2xl border border-black/10 px-4 py-3 focus-within:border-emerald-600"><span className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">{icon}{label}</span>{children}</label>;
}
