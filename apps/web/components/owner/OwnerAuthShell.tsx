import Link from 'next/link';

export function OwnerAuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4f6f2] px-5 py-10 pb-28">
      <div className="mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center" aria-label="Volver a WeedClub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/weed-maps.svg" alt="WeedClub" className="h-11 w-auto" />
        </Link>
        <div className="mt-8 rounded-[30px] border border-black/5 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Área de clubes</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
