import React from 'react';
import type { Club } from '@/types';
import Image from 'next/image';

export function TabPhotos({ club }: { club: Club }) {
  // Mock data for gallery
  const photos = Array.from({ length: 9 }).map((_, i) => (
    `https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=400&h=400&random=${i + 10}`
  ));

  return (
    <div className="w-full">
      {/* Modern tight grid: 3 columns, minimal gaps, square aspect ratio */}
      <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-2xl">
        {photos.map((url, i) => (
          <div 
            key={i} 
            className="relative aspect-square cursor-pointer group bg-gray-100"
          >
            <Image
              src={url}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
      
      {/* Load more placeholder with modern floating style */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-full transition-all text-sm flex items-center gap-2">
          Ver todas las fotos
        </button>
      </div>
    </div>
  );
}
