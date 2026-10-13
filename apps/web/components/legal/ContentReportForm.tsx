'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Flag, Send } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { CONTENT_POLICY_VERSION, PRIVACY_VERSION } from '@/lib/legal';

const CATEGORIES = [
  ['illegal_activity', 'Actividad o contenido presuntamente ilícito'],
  ['personal_data', 'Privacidad o datos personales'],
  ['intellectual_property', 'Propiedad intelectual o marca'],
  ['impersonation', 'Suplantación o ficha reclamada sin autorización'],
  ['incorrect_information', 'Información falsa o desactualizada'],
  ['minors_or_safety', 'Menores, amenazas o riesgo para la seguridad'],
  ['other', 'Otro motivo'],
] as const;

export function ContentReportForm({ initialUrl = '' }: { initialUrl?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetUrl, setTargetUrl] = useState(initialUrl);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number][0]>('illegal_activity');
  const [details, setDetails] = useState('');
  const [goodFaith, setGoodFaith] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialUrl.startsWith('/')) setTargetUrl(`${window.location.origin}${initialUrl}`);
  }, [initialUrl]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!goodFaith) {
      setError('Debes confirmar que la notificación se presenta de buena fe.');
      return;
    }

    setLoading(true);
    const id = crypto.randomUUID();

    if (honeypot) {
      setReference(id.slice(0, 8).toUpperCase());
      setLoading(false);
      return;
    }

    const result = await createClient().from('content_reports').insert({
      id,
      reporter_name: name.trim(),
      reporter_email: email.trim().toLowerCase(),
      target_url: targetUrl.trim(),
      category,
      details: details.trim(),
      declaration_good_faith: true,
      legal_notice_version: CONTENT_POLICY_VERSION,
      privacy_notice_version: PRIVACY_VERSION,
    });

    if (result.error) {
      setError('No pudimos registrar el aviso. Revisa los campos e inténtalo de nuevo.');
      setLoading(false);
      return;
    }

    setReference(id.slice(0, 8).toUpperCase());
    setLoading(false);
  };

  if (reference) {
    return (
      <div className="rounded-[26px] border border-emerald-200 bg-emerald-50 p-7 text-center">
        <CheckCircle2 className="mx-auto text-emerald-700" size={38} />
        <h2 className="mt-4 text-2xl font-black text-gray-950">Aviso registrado</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-950/75">Referencia <strong>{reference}</strong>. Revisaremos el contenido y utilizaremos el correo indicado para comunicar la decisión cuando proceda.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
        <Flag className="mt-0.5 shrink-0 text-emerald-700" size={20} />
        <p className="text-sm leading-6 text-gray-600">Identifica contenido concreto. No incluyas documentos de identidad, datos de salud ni información innecesaria. Para una emergencia o un delito en curso, contacta con las autoridades.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo"><input required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className="legal-input" autoComplete="name" /></Field>
        <Field label="Correo de contacto"><input required type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="legal-input" autoComplete="email" /></Field>
      </div>

      <Field label="URL exacta del contenido">
        <input required type="url" maxLength={1000} value={targetUrl} onChange={(event) => setTargetUrl(event.target.value)} placeholder="https://…" className="legal-input" />
      </Field>

      <Field label="Motivo">
        <select value={category} onChange={(event) => setCategory(event.target.value as typeof category)} className="legal-input">
          {CATEGORIES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </Field>

      <Field label="Explicación y fundamento">
        <textarea required minLength={40} maxLength={4000} rows={8} value={details} onChange={(event) => setDetails(event.target.value)} className="legal-input resize-y" placeholder="Explica qué contenido consideras ilícito o contrario a las normas, dónde aparece y por qué. Si actúas por un derecho propio, indícalo." />
        <span className="mt-1 block text-right text-xs text-gray-400">{details.length}/4000</span>
      </Field>

      <label className="hidden" aria-hidden="true">No rellenar<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></label>

      <label className="flex items-start gap-3 rounded-2xl border border-black/10 p-4 text-sm leading-6 text-gray-700">
        <input required type="checkbox" checked={goodFaith} onChange={(event) => setGoodFaith(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
        <span>Declaro de buena fe que la información de este aviso es exacta y completa según mi conocimiento. He leído la <Link href="/privacidad" className="font-bold text-emerald-700 underline">política de privacidad</Link>.</span>
      </label>

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-sm font-black text-white disabled:opacity-50"><Send size={17} /> {loading ? 'Registrando…' : 'Enviar aviso'}</button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm font-bold text-gray-950">{label}</span><span className="mt-2 block">{children}</span></label>;
}
