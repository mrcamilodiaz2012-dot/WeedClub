"use client";

import React from "react";
import { LayoutGrid, MapPin, Layers, Heart, Search } from "lucide-react";

export function BottomTabBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[84px] bg-background-base/90 backdrop-blur-xl border-t border-border-subtle flex items-start justify-around pt-2 px-2 z-50">
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
