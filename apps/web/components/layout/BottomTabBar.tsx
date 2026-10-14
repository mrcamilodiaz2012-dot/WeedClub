"use client";

import React from "react";
import { Home, Map, Heart, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[calc(57px+env(safe-area-inset-bottom))] w-full items-center justify-between rounded-t-[30px] border border-b-0 border-gray-100 bg-white px-6 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_rgba(0,0,0,0.05)]">
      <TabItem icon={<Home size={30} />} label="Inicio" href="/" active={isActive("/")} />
      <TabItem icon={<Search size={30} />} label="Buscar" href="/buscar" active={isActive("/buscar")} />
      <TabItem icon={<Map size={30} />} label="Mapa" href="/mapa" active={isActive("/mapa")} />
      <TabItem icon={<Heart size={30} />} label="Seguidos" href="/seguidos" active={isActive("/seguidos")} />
      <TabItem icon={<User size={30} />} label="Perfil" href="/perfil" active={isActive("/perfil")} />
    </div>
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
