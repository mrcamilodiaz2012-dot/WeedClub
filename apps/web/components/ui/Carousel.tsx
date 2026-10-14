"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

interface CarouselProps {
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  children: ReactNode;
}

export function Carousel({ title, subtitle, viewAllHref, children }: CarouselProps) {
  return (
    <div className="mb-6 w-full">
      {title && (
        <div className="px-2 mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-[26px] font-display font-black tracking-tight text-text-primary leading-none">
              {title}
            </h2>
          </div>
          {viewAllHref ? (
            <Link href={viewAllHref} className="text-[#00E676] font-semibold text-sm hover:opacity-80 transition-opacity">Ver Todos</Link>
          ) : (
            <span className="text-[#00E676] font-semibold text-sm">Ver Todos</span>
          )}
        </div>
      )}
      <div className="w-full overflow-x-auto snap-x snap-mandatory scroll-pl-2 scrollbar-hide pb-4">
        <div className="flex items-stretch gap-4 px-2 w-max after:content-[''] after:w-[1px] after:shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
