import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { legalIdentityIsComplete } from '@/lib/legal';

export function LegalPage({
  title,
  description,
  version,
  children,
}: {
  title: string;
  description: string;
  version: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-10 pb-32">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-black/5 bg-white p-7 shadow-sm md:p-11">
        <Link href="/" className="text-sm font-bold text-emerald-700 hover:underline">← Volver a WeedClub</Link>
        <header className="mt-7 border-b border-black/5 pb-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Información legal</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">{description}</p>
          <p className="mt-4 text-xs font-semibold text-gray-400">Versión vigente: {version}</p>
        </header>

        {!legalIdentityIsComplete && (
          <div role="alert" className="mt-7 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <AlertTriangle className="mt-0.5 shrink-0" size={19} />
            <p><strong>Publicación aún no preparada:</strong> faltan datos obligatorios del titular. Los campos marcados como pendientes deben completarse antes de abrir la web al público.</p>
          </div>
        )}

        <div className="legal-copy mt-9 space-y-9 text-[15px] leading-7 text-gray-700">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-black tracking-tight text-gray-950">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-emerald-600">{children}</ul>;
}
