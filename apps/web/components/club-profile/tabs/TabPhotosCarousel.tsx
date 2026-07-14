import React from 'react';
import type { Club } from '@/types';
import { Image as ImageIcon } from 'lucide-react';

// Fotos locales de fallback (cuando el club aún no tiene galería)
const FALLBACK_PHOTOS = [
  '/portadas/cannabis.jpg',
  '/portadas/cannabis2.jpg',
  '/portadas/cannabis3.jpg',
  '/portadas/cannabis.jpg', // Una más para probar el '+X fotos'
];

interface Props {
  club: Club;
  onClick?: () => void;
}

export function TabPhotosCarousel({ club, onClick }: Props) {
  // Usar fotos reales del club si existen, si no fallback local
  const photos = club.photos && club.photos.length > 0 ? club.photos : FALLBACK_PHOTOS;

  if (photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <div onClick={onClick} className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative cursor-pointer hover:opacity-95 transition-opacity border border-black/[0.04]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[0]} alt={`Foto de ${club.name}`} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div onClick={onClick} className="w-full aspect-[4/3] rounded-[24px] overflow-hidden flex gap-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer hover:opacity-95 transition-opacity border border-black/[0.04]">
        <div className="w-1/2 h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[0]} alt={`Foto 1 de ${club.name}`} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[1]} alt={`Foto 2 de ${club.name}`} className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  if (photos.length === 3) {
    return (
      <div onClick={onClick} className="w-full aspect-[4/3] rounded-[24px] overflow-hidden flex gap-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer hover:opacity-95 transition-opacity border border-black/[0.04]">
        <div className="w-[68%] h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[0]} alt={`Foto 1 de ${club.name}`} className="w-full h-full object-cover" />
        </div>
        <div className="w-[32%] h-full flex flex-col gap-1">
          <div className="w-full h-1/2 relative bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[1]} alt={`Foto 2 de ${club.name}`} className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-1/2 relative bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[2]} alt={`Foto 3 de ${club.name}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
              <ImageIcon className="w-5 h-5 mb-1 opacity-90" />
              <span className="font-bold text-[12px] md:text-sm tracking-tight leading-tight">Ver todas</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4 or more photos
  const displayPhotos = photos.slice(0, 4);
  const extraPhotos = photos.length > 4 ? photos.length - 4 : 0;

  return (
    <div className="w-full">
      <div 
        onClick={onClick}
        className="relative w-full aspect-square md:aspect-[21/9] rounded-[24px] overflow-hidden grid grid-cols-2 grid-rows-2 gap-1 bg-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer hover:opacity-95 transition-opacity border border-black/[0.04]"
      >
        {displayPhotos.map((url, idx) => (
          <div key={idx} className="w-full h-full relative bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Foto ${idx + 1} de ${club.name}`}
              className="w-full h-full object-cover"
            />
            {idx === 3 && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
                <ImageIcon className="w-5 h-5 mb-1 opacity-90" />
                <span className="font-bold text-[12px] md:text-sm tracking-tight leading-tight">Ver todas</span>
                {extraPhotos > 0 && (
                  <span className="text-[10px] font-medium opacity-90 mt-0.5">+{extraPhotos} fotos</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
