import React, { useState, useEffect, useRef } from 'react';
import type { Club } from '@/types';

// Local photos — no external HTTP requests
const LOCAL_PHOTOS = [
  '/portadas/cannabis.jpg',
  '/portadas/cannabis2.jpg',
  '/portadas/cannabis3.jpg',
  '/portadas/cannabis.jpg',
  '/portadas/cannabis2.jpg',
  '/portadas/cannabis3.jpg',
];

export function TabPhotosCarousel({ club }: { club: Club }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = LOCAL_PHOTOS;
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (deltaTime >= 4000) {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [photos.length]);

  return (
    <div className="w-full">
      {/* Featured Large Image */}
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-3 bg-gray-100">
        {photos.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={url}
            alt={`Gallery image ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
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
                ? 'ring-2 ring-black ring-offset-2 scale-[0.95]' 
                : 'scale-100 hover:scale-[0.98] ring-0'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Thumbnail ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
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
