'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Building2, Lock, Mail } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export function OwnerAccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    searchParams.get('error') === 'oauth' ? 'No pudimos completar el acceso con Google. Inténtalo de nuevo.' : ''
  );

  const next = searchParams.get('next');
  const destination = next?.startsWith('/') && !next.startsWith('//') ? next : '/club/panel';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      setError('No pudimos iniciar sesión. Revisa el correo y la contraseña.');
      setLoading(false);
      return;
    }
    router.replace(destination);
    router.refresh();
  };

  const google = async () => {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(destination)}` },
    });
    if (result.error) {
      setError('Google no está disponible en este momento.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <FormField label="Correo" icon={<Mail size={18} />}>
        <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent outline-none" placeholder="club@ejemplo.com" />
      </FormField>
      <FormField label="Contraseña" icon={<Lock size={18} />}>
        <input type="password" required minLength={6} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Tu contraseña" />
      </FormField>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-black font-bold text-white transition hover:bg-gray-800 disabled:opacity-50">
        {loading ? 'Accediendo…' : <>Entrar al panel <ArrowRight size={18} /></>}
      </button>
      <button type="button" onClick={google} disabled={loading} className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white font-bold transition hover:bg-gray-50 disabled:opacity-50">
        Continuar con Google
      </button>
      <p className="pt-2 text-center text-sm text-gray-500">
        ¿Representas a un club? <Link href="/club/registro" className="font-bold text-black hover:underline">Crear acceso</Link>
      </p>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400"><Building2 size={13} /> Este acceso es exclusivamente para propietarios o representantes.</p>
    </form>
  );
}

function FormField({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl border border-black/10 px-4 py-3 focus-within:border-emerald-600">
      <span className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">{icon}{label}</span>
      {children}
    </label>
  );
}
