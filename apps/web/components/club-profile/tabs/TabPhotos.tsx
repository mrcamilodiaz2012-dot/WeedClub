import React from 'react';
import type { Club } from '@/types';
import Image from 'next/image';

export function TabPhotos({ club }: { club: Club }) {
  // Mock data for gallery
  const photos = Array.from({ length: 9 }).map((_, i) => (
    `https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=600&h=600&random=${i + 10}`
  ));

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 md:gap-3 auto-rows-[120px] md:auto-rows-[180px]">
        {photos.map((url, i) => {
          let spanClass = "col-span-1 row-span-1";
          
          // Modern Bento Box Pattern:
          if (i === 0) spanClass = "col-span-2 row-span-2";
          else if (i === 3) spanClass = "col-span-1 row-span-2";
          else if (i === 4) spanClass = "col-span-2 row-span-1";
          else if (i === 7) spanClass = "col-span-2 row-span-2";
          else if (i === 8) spanClass = "col-span-1 row-span-2";

          return (
            <div 
              key={i} 
              className={`relative overflow-hidden group rounded-2xl cursor-pointer shadow-sm ${spanClass}`}
            >
              <Image
                src={url}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          );
        })}
      </div>
      
      {/* Load more placeholder with modern floating style */}
      <div className="mt-8 flex justify-center relative z-10 -top-12 pointer-events-none">
        <button className="pointer-events-auto px-8 py-3.5 bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-gray-900 font-bold rounded-full transition-all hover:-translate-y-1 text-sm flex items-center gap-2">
          Cargar más fotos
        </button>
      </div>
    </div>
  );
}
