'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, FileCheck2, Send } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export function ClaimClubForm({ clubId, clubName, userId }: { clubId: string; clubName: string; userId: string }) {
  const router = useRouter();
  const [evidence, setEvidence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!declarationAccepted) {
      setError('Debes confirmar la declaración de representación y veracidad.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await createClient().from('club_claims').insert({
      club_id: clubId,
      user_id: userId,
      evidence_text: evidence.trim(),
      declaration_accepted_at: new Date().toISOString(),
      terms_version: TERMS_VERSION,
      privacy_version: PRIVACY_VERSION,
    });
    if (result.error) {
      setError(result.error.code === '23505' ? 'Ya existe una reclamación pendiente para este club.' : 'No pudimos enviar la reclamación. Inténtalo de nuevo.');
      setLoading(false);
      return;
    }
    setCompleted(true);
    router.refresh();
  };

  if (completed) return <div className="rounded-[26px] bg-emerald-50 p-8 text-center"><CheckCircle2 className="mx-auto text-emerald-600" size={38} /><h2 className="mt-4 text-2xl font-black">Reclamación enviada</h2><p className="mt-2 text-sm leading-6 text-emerald-900/70">Revisaremos la relación con {clubName}. Puedes consultar el estado desde el panel.</p><button type="button" onClick={() => router.push('/club/panel')} className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white">Volver al panel</button></div>;

  return (
    <form onSubmit={submit} className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-start gap-3"><span className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><FileCheck2 size={22} /></span><div><h2 className="text-xl font-black">Acredita tu relación con {clubName}</h2><p className="mt-1 text-sm leading-6 text-gray-500">Describe tu cargo, cómo podemos verificarlo y un medio de contacto profesional. No incluyas documentos sensibles en este campo.</p></div></div>
      <label className="mt-6 block"><span className="text-sm font-bold">Información para la revisión</span><textarea required minLength={30} maxLength={1500} rows={7} value={evidence} onChange={(event) => setEvidence(event.target.value)} className="mt-2 w-full resize-y rounded-2xl border border-black/10 p-4 text-sm leading-6 outline-none focus:border-emerald-600" placeholder="Soy responsable de… Podemos verificarlo mediante…" /><span className="mt-1 block text-right text-xs text-gray-400">{evidence.length}/1500</span></label>
      <p className="mt-3 rounded-2xl bg-gray-50 p-4 text-xs leading-5 text-gray-500"><strong>Privacidad:</strong> usamos esta información para verificar tu representación, prevenir suplantaciones y gestionar la ficha. No adjuntes DNI, datos de salud, antecedentes ni documentación sensible. Consulta la <Link href="/privacidad" target="_blank" rel="noopener noreferrer" className="font-bold underline">política de privacidad</Link>.</p>
      <label className="mt-4 flex items-start gap-3 rounded-2xl border border-black/10 p-4 text-sm leading-6 text-gray-700"><input required type="checkbox" checked={declarationAccepted} onChange={(event) => setDeclarationAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" /><span>Declaro que estoy autorizado para representar a {clubName}, que la información es veraz y que respetaré los <Link href="/terminos" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">términos</Link> y las <Link href="/normas-publicacion" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">normas de publicación</Link>.</span></label>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-sm font-black text-white disabled:opacity-50">{loading ? 'Enviando…' : <><Send size={17} /> Enviar reclamación</>}</button>
    </form>
  );
}
