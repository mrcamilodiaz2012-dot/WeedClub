import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Building2, ChevronRight, Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { getPublicClub, getPublicClubs } from '@/lib/clubs';
import { ClaimClubForm } from '@/components/owner/ClaimClubForm';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Reclamar un club | WeedClub' };
export const dynamic = 'force-dynamic';

export default async function ClaimClubPage({ searchParams }: { searchParams: Promise<{ club?: string }> }) {
  const params = await searchParams;
  const nextPath = params.club ? `/club/reclamar?club=${encodeURIComponent(params.club)}` : '/club/reclamar';
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/club/acceso?next=${encodeURIComponent(nextPath)}`);
  const profile = await supabase.from('profiles').select('terms_accepted_at,terms_version,privacy_version').eq('id', user.id).maybeSingle();
  if (!profile.data?.terms_accepted_at || profile.data.terms_version !== TERMS_VERSION || profile.data.privacy_version !== PRIVACY_VERSION) redirect('/club/panel');

  if (params.club) {
    const club = await getPublicClub(params.club);
    if (!club || club.is_claimed) redirect('/club/reclamar');
    return (
      <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
        <div className="mx-auto max-w-2xl">
          <Link href="/club/reclamar" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black"><ArrowLeft size={17} /> Elegir otro club</Link>
          <h1 className="mt-6 text-3xl font-black tracking-tight">Reclamar perfil</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">La publicación no se transferirá hasta que un administrador revise la solicitud.</p>
          <div className="mt-7"><ClaimClubForm clubId={club.id} clubName={club.name} userId={user.id} /></div>
        </div>
      </main>
    );
  }

  const clubs = (await getPublicClubs(500)).filter((club) => !club.is_claimed);
  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
      <div className="mx-auto max-w-3xl">
        <Link href="/club/panel" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black"><ArrowLeft size={17} /> Panel</Link>
        <div className="mt-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Verificación</p><h1 className="mt-1 text-3xl font-black tracking-tight">¿Qué club representas?</h1><p className="mt-2 text-sm leading-6 text-gray-500">Selecciona un perfil sin propietario. Si no aparece, primero deberá incorporarse al directorio.</p></div>
        <div className="mt-7 overflow-hidden rounded-[26px] border border-black/5 bg-white">
          {clubs.length > 0 ? clubs.map((club) => <Link key={club.id} href={`/club/reclamar?club=${club.id}`} className="flex items-center gap-4 border-b border-black/5 p-4 transition last:border-b-0 hover:bg-gray-50"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100"><Building2 size={20} /></span><span className="min-w-0 flex-1"><span className="block truncate font-black">{club.name}</span><span className="block text-sm text-gray-500">{[club.city, club.province].filter(Boolean).join(', ') || 'Ubicación no indicada'}</span></span><ChevronRight size={18} className="text-gray-300" /></Link>) : <div className="p-12 text-center"><Search className="mx-auto text-gray-300" size={32} /><h2 className="mt-3 font-bold">No hay clubes pendientes de reclamar</h2></div>}
        </div>
      </div>
    </main>
  );
}
