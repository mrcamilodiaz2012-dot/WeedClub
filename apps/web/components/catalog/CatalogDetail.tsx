import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DemoNotice } from './DemoNotice';

interface CatalogDetailProps {
  backHref: string;
  eyebrow: string;
  title: string;
  image: string;
  description: string;
  meta?: string;
  children?: ReactNode;
}

export function CatalogDetail({
  backHref,
  eyebrow,
  title,
  image,
  description,
  meta,
  children,
}: CatalogDetailProps) {
  return (
    <main className="min-h-screen bg-white pb-28">
      <div className="relative h-[290px] md:h-[380px] overflow-hidden bg-background-secondary">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href={backHref} className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-black shadow-sm" aria-label="Volver">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/" className="bg-white/90 rounded-full px-3 py-1.5 shadow-sm" aria-label="Ir al inicio">
            <img src="/weed-maps.svg" alt="WeedClub" className="h-7 w-auto" />
          </Link>
        </div>
        <div className="absolute left-0 right-0 bottom-0 p-5 md:p-8 text-white max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 mb-2">{eyebrow}</p>
          <h1 className="text-[36px] md:text-[52px] font-display font-black tracking-tighter leading-[0.95] drop-shadow-md">{title}</h1>
          {meta && <p className="text-[14px] text-white/85 mt-3">{meta}</p>}
        </div>
      </div>

      <div className="relative -mt-5 bg-white rounded-t-[28px] px-4 pt-7 max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <DemoNotice compact />
          <p className="mt-6 text-[16px] leading-relaxed text-text-secondary">{description}</p>
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </main>
  );
}
