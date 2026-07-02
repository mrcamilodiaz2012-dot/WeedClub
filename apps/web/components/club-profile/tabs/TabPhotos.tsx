import React, { useState, useEffect } from 'react';
import type { Club } from '@/types';
import Image from 'next/image';

export function TabPhotos({ club }: { club: Club }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for gallery
  const photos = Array.from({ length: 6 }).map((_, i) => (
    `https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=800&h=600&random=${i + 10}`
  ));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="w-full">
      {/* Featured Large Image */}
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-3 bg-gray-100">
        {photos.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`Gallery image ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0'
            }`}
            priority={i === 0}
          />
        ))}
        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-bold tracking-widest z-20 shadow-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        {photos.map((url, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`relative w-[72px] h-[72px] shrink-0 rounded-[16px] overflow-hidden transition-all duration-300 ${
              i === currentIndex 
                ? 'ring-2 ring-black ring-offset-2 scale-[0.95] opacity-100' 
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Image
              src={url}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Ver todas las fotos */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-full transition-all text-sm flex items-center gap-2">
          Ver todas las fotos
        </button>
      </div>
    </div>
  );
}
