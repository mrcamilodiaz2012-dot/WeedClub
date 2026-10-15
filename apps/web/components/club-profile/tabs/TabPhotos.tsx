import React from 'react';
import type { Club } from '@/types';
import Image from 'next/image';

export function TabPhotos({ club }: { club: Club }) {
  const photos = club.photos ?? [];

  if (photos.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
        <p className="font-semibold text-gray-700">Este perfil todavía no tiene fotos verificadas.</p>
        <p className="mt-2 text-sm text-gray-500">El club puede añadirlas cuando reclame su ficha.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
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
      
    </div>
  );
}
