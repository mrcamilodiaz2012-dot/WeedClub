import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Building2, ChevronRight, ClipboardCheck, ExternalLink, Plus, ShieldCheck } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { OwnerSignOut } from '@/components/owner/OwnerSignOut';
import { LegalAcceptanceCard } from '@/components/owner/LegalAcceptanceCard';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Panel del club | WeedClub' };
export const dynamic = 'force-dynamic';

export default async function OwnerPanelPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/club/acceso?next=/club/panel');

  const [clubsResult, claimsResult, profileResult] = await Promise.all([
    supabase.from('clubs').select('id,name,slug,status,cover_image_url,city,updated_at').eq('owner_id', user.id).order('updated_at', { ascending: false }),
    supabase.from('club_claims').select('id,status,created_at,clubs(id,name,slug)').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('profiles').select('username,role,terms_accepted_at,terms_version,privacy_version').eq('id', user.id).maybeSingle(),
  ]);

  const clubs = clubsResult.data ?? [];
  const claims = claimsResult.data ?? [];
  const profile = profileResult.data;
  const hasCurrentLegalAcceptance = profile?.terms_accepted_at
    && profile.terms_version === TERMS_VERSION
    && profile.privacy_version === PRIVACY_VERSION;

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Área de clubes</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Hola, {profile?.username || user.email}</h1>
          </div>
          <div className="flex items-center gap-2">
            {profile?.role === 'super_admin' && <><Link href="/admin/reclamaciones" className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">Reclamaciones</Link><Link href="/admin/reportes" className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">Reportes</Link></>}
            <OwnerSignOut />
          </div>
        </header>

        {!hasCurrentLegalAcceptance && <LegalAcceptanceCard />}

        <section className="mt-8 rounded-[28px] bg-gray-950 p-6 text-white md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-400"><ShieldCheck size={20} /><span className="text-xs font-black uppercase tracking-[0.14em]">Gestión gratuita</span></div>
              <h2 className="mt-3 text-2xl font-black">Mantén la información de tu club actualizada</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">No hay pagos ni planes. Los cambios de contenido quedan asociados al propietario verificado.</p>
            </div>
            {hasCurrentLegalAcceptance && <Link href="/club/reclamar" className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black"><Plus size={17} /> Reclamar otro club</Link>}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-black"><Building2 size={20} /> Mis clubes</h2>
          {clubs.length > 0 ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {clubs.map((club) => (
                <article key={club.id} className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div><h3 className="text-xl font-black">{club.name}</h3><p className="mt-1 text-sm text-gray-500">{club.city || 'Sin ciudad'} · {club.status}</p></div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${club.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{club.status}</span>
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    {hasCurrentLegalAcceptance ? <Link href={`/club/panel/${club.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white">Editar <ChevronRight size={16} /></Link> : <span className="flex flex-1 items-center justify-center rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-bold text-gray-400">Acepta las condiciones para editar</span>}
                    {club.status === 'active' && <Link href={`/clubs/${club.slug}`} className="rounded-xl border border-black/10 p-2.5" aria-label="Abrir perfil público"><ExternalLink size={18} /></Link>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[24px] border border-dashed border-gray-300 bg-white p-10 text-center"><Building2 className="mx-auto text-gray-300" size={34} /><h3 className="mt-3 font-bold">Todavía no gestionas ningún club</h3><p className="mt-2 text-sm text-gray-500">Busca el perfil existente y envía una reclamación.</p><Link href="/club/reclamar" className="mt-5 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white">Empezar reclamación</Link></div>
          )}
        </section>

        {claims.length > 0 && (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-black"><ClipboardCheck size={20} /> Reclamaciones</h2>
            <div className="mt-4 overflow-hidden rounded-[24px] border border-black/5 bg-white">
              {claims.map((claim) => {
                const relatedClub = Array.isArray(claim.clubs) ? claim.clubs[0] : claim.clubs;
                return <div key={claim.id} className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4 last:border-b-0"><div><p className="font-bold">{relatedClub?.name ?? 'Club'}</p><p className="text-xs text-gray-400">Enviada {new Intl.DateTimeFormat('es-ES').format(new Date(claim.created_at))}</p></div><ClaimStatus status={claim.status} /></div>;
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ClaimStatus({ status }: { status: string }) {
  const labels: Record<string, string> = { pending: 'Pendiente', approved: 'Aprobada', rejected: 'Rechazada' };
  const colors: Record<string, string> = { pending: 'bg-amber-100 text-amber-800', approved: 'bg-emerald-100 text-emerald-800', rejected: 'bg-red-100 text-red-700' };
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${colors[status] ?? 'bg-gray-100'}`}>{labels[status] ?? status}</span>;
}
