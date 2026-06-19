"use client";

import React from "react";
import { Home, Map, Heart, Search } from "lucide-react";

export function BottomTabBar() {
  return (
    <div className="fixed bottom-6 left-4 right-4 h-[72px] bg-white/90 backdrop-blur-3xl rounded-[36px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-around px-2 z-50">
      <TabItem icon={<Home size={24} />} label="Inicio" active />
      <TabItem icon={<Map size={24} />} label="Mapa" />
      <TabItem icon={<Heart size={24} />} label="Seguidos" />
      <TabItem icon={<Search size={24} />} label="Buscar" />
    </div>
  );
}

function TabItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 w-16 ${active ? 'text-[#00C853]' : 'text-gray-500 hover:text-black'}`}>
      <div className={active ? 'stroke-[2.5px]' : 'stroke-2'}>
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-tight">
        {label}
      </span>
    </button>
  );
}
