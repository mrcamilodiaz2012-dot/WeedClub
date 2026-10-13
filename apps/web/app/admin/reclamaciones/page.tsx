import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { ClaimReviewButtons } from '@/components/admin/ClaimReviewButtons';

export const metadata: Metadata = { title: 'Moderación de reclamaciones | WeedClub' };
export const dynamic = 'force-dynamic';

export default async function ClaimsAdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/club/acceso?next=/admin/reclamaciones');

  const profile = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (profile.data?.role !== 'super_admin') redirect('/club/panel');

  const claimsResult = await supabase
    .from('club_claims')
    .select('id,status,evidence_text,evidence_url,created_at,clubs(id,name,slug,city),profiles(username)')
    .order('created_at', { ascending: true });
  const claims = claimsResult.data ?? [];

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
      <div className="mx-auto max-w-4xl">
        <Link href="/club/panel" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black"><ArrowLeft size={17} /> Panel</Link>
        <header className="mt-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Administración</p><h1 className="mt-1 text-3xl font-black tracking-tight">Reclamaciones de clubes</h1><p className="mt-2 text-sm text-gray-500">Aprobar una solicitud asigna el club al representante y rechaza las demás solicitudes pendientes del mismo club.</p></header>
        <nav className="mt-5 flex gap-2 text-sm font-bold"><span className="rounded-full bg-black px-4 py-2 text-white">Reclamaciones</span><Link href="/admin/reportes" className="rounded-full border border-black/10 bg-white px-4 py-2">Reportes</Link></nav>
        <div className="mt-8 space-y-4">
          {claims.length > 0 ? claims.map((claim) => {
            const club = Array.isArray(claim.clubs) ? claim.clubs[0] : claim.clubs;
            const person = Array.isArray(claim.profiles) ? claim.profiles[0] : claim.profiles;
            return (
              <article key={claim.id} className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><div className="flex items-center gap-2"><h2 className="text-xl font-black">{club?.name ?? 'Club'}</h2><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${claim.status === 'pending' ? 'bg-amber-100 text-amber-800' : claim.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>{claim.status}</span></div><p className="mt-1 text-sm text-gray-500">Solicitante: {person?.username ?? 'Sin nombre'} · {club?.city ?? 'Sin ciudad'}</p></div>
                  {claim.status === 'pending' && <ClaimReviewButtons claimId={claim.id} />}
                </div>
                <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-700 whitespace-pre-wrap">{claim.evidence_text || 'Sin explicación.'}</div>
                <p className="mt-3 text-xs text-gray-400">Enviada {new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(claim.created_at))}</p>
              </article>
            );
          }) : <div className="rounded-[26px] border border-dashed border-gray-300 bg-white py-20 text-center"><ClipboardCheck className="mx-auto text-gray-300" size={36} /><h2 className="mt-3 font-bold">No hay reclamaciones</h2></div>}
        </div>
      </div>
    </main>
  );
}
