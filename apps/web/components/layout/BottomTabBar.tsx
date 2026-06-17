"use client";

import React from "react";
import { LayoutGrid, MapPin, Layers, Heart, Search } from "lucide-react";

export function BottomTabBar() {
  return (
    <div className="fixed bottom-6 left-4 right-4 h-[72px] bg-[#1C1C1E]/80 backdrop-blur-3xl rounded-[36px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-around px-2 z-50">
      <TabItem icon={<LayoutGrid size={24} />} label="Hoy" active />
      <TabItem icon={<MapPin size={24} />} label="Cerca" />
      <TabItem icon={<Layers size={24} />} label="Explorar" />
      <TabItem icon={<Heart size={24} />} label="Guardados" />
      <TabItem icon={<Search size={24} />} label="Buscar" />
    </div>
  );
}

function TabItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 w-16 ${active ? 'text-blue-500' : 'text-text-secondary hover:text-text-primary'}`}>
      <div className={active ? 'stroke-[2.5px]' : 'stroke-2'}>
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-tight">
        {label}
      </span>
    </button>
  );
}
