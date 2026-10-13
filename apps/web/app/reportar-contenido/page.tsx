import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentReportForm } from '@/components/legal/ContentReportForm';

export const metadata: Metadata = { title: 'Reportar contenido | WeedClub' };

export default async function ReportContentPage({ searchParams }: { searchParams: Promise<{ url?: string }> }) {
  const { url } = await searchParams;
  const initialUrl = typeof url === 'string' && (url.startsWith('/') || url.startsWith('https://') || url.startsWith('http://')) ? url.slice(0, 1000) : '';
  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-10 pb-32">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-black/5 bg-white p-7 shadow-sm md:p-10">
        <Link href="/" className="text-sm font-bold text-emerald-700 hover:underline">← Volver a WeedClub</Link>
        <header className="mt-7 border-b border-black/5 pb-7">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Notificación y actuación</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Reportar contenido</h1>
          <p className="mt-4 text-sm leading-6 text-gray-600">Usa este canal para señalar una URL concreta que consideres ilícita, inexacta o contraria a las normas de publicación. Cada aviso recibe una referencia y queda en la cola de revisión.</p>
        </header>
        <div className="mt-8"><ContentReportForm initialUrl={initialUrl} /></div>
        <p className="mt-7 text-xs leading-5 text-gray-400">El uso abusivo o manifiestamente infundado del canal puede dar lugar a la suspensión de su tramitación, previa advertencia. Consulta los <Link href="/terminos" className="font-bold underline">términos</Link> y las <Link href="/normas-publicacion" className="font-bold underline">normas de moderación</Link>.</p>
      </div>
    </main>
  );
}
