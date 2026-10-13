"use client";

import React from "react";
import { Building2, Home, Map, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomTabBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/club/acceso') || pathname.startsWith('/club/registro') || pathname.startsWith('/admin')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav aria-label="Navegación principal" className="fixed bottom-0 left-0 right-0 w-full z-50 flex items-center justify-around px-6 h-[calc(57px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-white border-t-[0.5px] border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
      <TabItem icon={<Home size={30} />} label="Inicio" href="/" active={isActive("/")} />
      <TabItem icon={<Search size={30} />} label="Buscar" href="/buscar" active={isActive("/buscar")} />
      <TabItem icon={<Map size={30} />} label="Mapa" href="/mapa" active={isActive("/mapa")} />
      <TabItem icon={<Building2 size={30} />} label="Mi club" href="/club/panel" active={isActive("/club")} />
    </nav>
  );
}

function TabItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  const iconWithProps = React.cloneElement(icon as React.ReactElement<{ strokeWidth?: number }>, {
    strokeWidth: active ? 1.8 : 1.5,
  });

  return (
    <Link href={href} prefetch={true} className={`flex flex-col items-center gap-[3px] w-14 transition-colors ${active ? 'text-[#00C853]' : 'text-gray-700 hover:text-black'}`}>
      <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'scale-100'}`}>
        {iconWithProps}
      </div>
      <span className="text-[10px] font-medium tracking-tight">
        {label}
      </span>
    </Link>
  );
}
