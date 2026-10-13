'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/aviso-legal', 'Aviso legal'],
  ['/terminos', 'Términos'],
  ['/privacidad', 'Privacidad'],
  ['/cookies', 'Cookies'],
  ['/reportar-contenido', 'Reportar contenido'],
] as const;

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === '/mapa') return null;

  return (
    <footer className="border-t border-black/5 bg-white px-5 py-8 pb-24">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
        <p>WeedClub · Directorio informativo para mayores de 18 años</p>
        <nav aria-label="Información legal" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
          {LINKS.map(([href, label]) => <Link key={href} href={href} className="hover:text-black">{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
