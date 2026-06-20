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
    <div className="fixed bottom-6 left-4 right-4 h-[68px] z-50 flex items-center justify-between px-6 bg-white/85 backdrop-blur-2xl rounded-[34px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <TabItem icon={<Home size={28} />} label="Inicio" href="/" active={isActive("/")} />
      <TabItem icon={<Search size={28} />} label="Buscar" href="/buscar" active={isActive("/buscar")} />
      <TabItem icon={<Map size={28} />} label="Mapa" href="/mapa" active={isActive("/mapa")} />
      <TabItem icon={<Heart size={28} />} label="Seguidos" href="/seguidos" active={isActive("/seguidos")} />
      <TabItem icon={<User size={28} />} label="Perfil" href="/perfil" active={isActive("/perfil")} />
    </div>
  );
}

function TabItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-[3px] w-14 transition-colors ${active ? 'text-[#00C853]' : 'text-gray-500 hover:text-black'}`}>
      <div className={`transition-all ${active ? 'stroke-[2.5px] scale-110' : 'stroke-2'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-tight">
        {label}
      </span>
    </Link>
  );
}
