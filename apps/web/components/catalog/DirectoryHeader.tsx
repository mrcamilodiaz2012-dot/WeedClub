import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

interface DirectoryHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  backHref?: string;
  searchHref?: string;
}

export function DirectoryHeader({
  eyebrow = 'DIRECTORIO',
  title,
  description,
  backHref = '/',
  searchHref = '/buscar',
}: DirectoryHeaderProps) {
  return (
    <header className="px-4 pt-5 pb-6 bg-white border-b border-border-subtle/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-7">
          <Link
            href={backHref}
            className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-text-primary active:scale-95 transition-transform"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </Link>
          <Link href="/" aria-label="Ir al inicio">
            <img src="/weed-maps.svg" alt="WeedClub" className="h-9 w-auto" />
          </Link>
          <Link
            href={searchHref}
            className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-text-primary active:scale-95 transition-transform"
            aria-label="Buscar"
          >
            <Search size={19} />
          </Link>
        </div>

        <p className="text-[12px] font-black tracking-[0.2em] text-emerald-700 mb-2">
          {eyebrow}
        </p>
        <h1 className="text-[36px] md:text-[48px] font-display font-black tracking-tighter leading-[0.96] text-text-primary max-w-3xl">
          {title}
        </h1>
        <p className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-text-secondary max-w-2xl">
          {description}
        </p>
      </div>
    </header>
  );
}
