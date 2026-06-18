"use client";

import React, { ReactNode } from "react";

interface CarouselProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function Carousel({ title, subtitle, children }: CarouselProps) {
  return (
    <div className="mb-8 w-full">
      {title && (
        <div className="px-5 mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              {title}
            </h2>
          </div>
          <button className="text-[#00E676] font-semibold text-sm hover:opacity-80 transition-opacity">Ver Todos</button>
        </div>
      )}
      <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
        <div className="flex gap-4 px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
