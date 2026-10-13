import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, ExternalLink, Flag } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { ContentReportReview } from '@/components/admin/ContentReportReview';

export const metadata: Metadata = { title: 'Reportes de contenido | WeedClub' };
export const dynamic = 'force-dynamic';

const CATEGORY_LABELS: Record<string, string> = {
  illegal_activity: 'Actividad o contenido ilícito',
  personal_data: 'Privacidad o datos personales',
  intellectual_property: 'Propiedad intelectual o marca',
  impersonation: 'Suplantación',
  incorrect_information: 'Información incorrecta',
  minors_or_safety: 'Menores o seguridad',
  other: 'Otro motivo',
};

export default async function ContentReportsAdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/club/acceso?next=/admin/reportes');

  const profile = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (profile.data?.role !== 'super_admin') redirect('/club/panel');

  const result = await supabase
    .from('content_reports')
    .select('id,reporter_name,reporter_email,target_url,category,details,status,decision_reason,created_at,reviewed_at')
    .order('created_at', { ascending: true });
  const reports = result.data ?? [];

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
      <div className="mx-auto max-w-4xl">
        <Link href="/club/panel" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black"><ArrowLeft size={17} /> Panel</Link>
        <header className="mt-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Administración</p><h1 className="mt-1 text-3xl font-black tracking-tight">Reportes de contenido</h1><p className="mt-2 text-sm leading-6 text-gray-500">Revisa la URL y los derechos afectados, documenta la motivación y comunica la decisión al denunciante y al titular del contenido cuando proceda.</p></header>
        <nav className="mt-5 flex gap-2 text-sm font-bold"><Link href="/admin/reclamaciones" className="rounded-full border border-black/10 bg-white px-4 py-2">Reclamaciones</Link><span className="rounded-full bg-black px-4 py-2 text-white">Reportes</span></nav>

        <div className="mt-8 space-y-4">
          {reports.length > 0 ? reports.map((report) => (
            <article key={report.id} className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><div className="flex flex-wrap items-center gap-2"><h2 className="font-black">{CATEGORY_LABELS[report.category] ?? report.category}</h2><Status value={report.status} /></div><p className="mt-1 text-xs text-gray-400">Ref. {report.id.slice(0, 8).toUpperCase()} · {new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(report.created_at))}</p></div>
                <a href={report.target_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-2 text-xs font-bold">Abrir contenido <ExternalLink size={14} /></a>
              </div>
              <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-700 whitespace-pre-wrap">{report.details}</div>
              <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-gray-500"><span>Notificante: <strong className="text-gray-700">{report.reporter_name}</strong></span><a href={`mailto:${report.reporter_email}?subject=${encodeURIComponent(`Decisión sobre aviso ${report.id.slice(0, 8).toUpperCase()}`)}`} className="font-bold text-emerald-700 underline">{report.reporter_email}</a></div>
              {report.status === 'pending' ? <ContentReportReview reportId={report.id} /> : report.decision_reason && <div className="mt-5 border-t border-black/5 pt-4 text-sm leading-6"><strong>Motivación:</strong> {report.decision_reason}</div>}
            </article>
          )) : <div className="rounded-[26px] border border-dashed border-gray-300 bg-white py-20 text-center"><Flag className="mx-auto text-gray-300" size={36} /><h2 className="mt-3 font-bold">No hay reportes</h2></div>}
        </div>
      </div>
    </main>
  );
}

function Status({ value }: { value: string }) {
  const labels: Record<string, string> = { pending: 'Pendiente', resolved: 'Atendido', rejected: 'Rechazado' };
  const colors: Record<string, string> = { pending: 'bg-amber-100 text-amber-800', resolved: 'bg-emerald-100 text-emerald-800', rejected: 'bg-red-100 text-red-700' };
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${colors[value] ?? 'bg-gray-100'}`}>{labels[value] ?? value}</span>;
}
