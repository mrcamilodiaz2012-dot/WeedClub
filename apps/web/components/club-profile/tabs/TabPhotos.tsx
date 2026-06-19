import React from 'react';
import type { Club } from '@/types';
import Image from 'next/image';

export function TabPhotos({ club }: { club: Club }) {
  // Mock data for gallery
  const photos = Array.from({ length: 9 }).map((_, i) => (
    `https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=400&h=400&random=${i}`
  ));

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 md:gap-3">
        {photos.map((url, i) => (
          <div key={i} className="relative aspect-square cursor-pointer overflow-hidden group rounded-md md:rounded-xl">
            <Image
              src={url}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>
      
      {/* Load more placeholder */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-full transition-colors text-sm">
          Cargar más fotos
        </button>
      </div>
    </div>
  );
}
