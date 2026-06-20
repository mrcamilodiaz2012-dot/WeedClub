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
    <div className="fixed bottom-6 left-4 right-4 h-[68px] z-50 flex items-center justify-between px-6">
      
      {/* Background shape (Seamless liquid glass) */}
      <div className="absolute inset-0 -z-10">
        {/* Navbar Body with hole cut out for the dome */}
        <div 
          className="absolute inset-0 bg-white/85 backdrop-blur-2xl rounded-[34px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]" 
          style={{ 
            WebkitMaskImage: 'radial-gradient(circle at 50% 22px, transparent 27px, black 28px)',
            maskImage: 'radial-gradient(circle at 50% 22px, transparent 27px, black 28px)'
          }}
        />
        {/* Dome perfectly filling the hole */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[8px] w-[60px] h-[60px] bg-white/85 backdrop-blur-2xl rounded-full" />
      </div>

      <TabItem icon={<Home size={28} />} label="Inicio" href="/" active={isActive("/")} />
      <TabItem icon={<Search size={28} />} label="Buscar" href="/buscar" active={isActive("/buscar")} />
      
      {/* Center Map Icon */}
      <div className="relative flex flex-col items-center justify-center">
        <Link 
          href="/mapa"
          className={`flex flex-col items-center gap-[2px] w-14 transition-colors -mt-3 ${isActive('/mapa') ? 'text-[#00C853]' : 'text-gray-500 hover:text-black'}`}
        >
          <div className={`transition-all ${isActive('/mapa') ? 'stroke-[2.5px] scale-110' : 'stroke-2'}`}>
            <Map size={34} />
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-[2px]">Mapa</span>
        </Link>
      </div>

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
