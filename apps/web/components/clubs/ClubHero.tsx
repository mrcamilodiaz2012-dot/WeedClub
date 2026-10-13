import * as React from 'react';
import Image from 'next/image';
import { Star, MapPin, Share, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Club } from '@/types';

export function ClubHero({ club }: { club: Club }) {
  const images: [string, string, string] = [
    club.cover_image_url || `https://source.unsplash.com/random/800x600/?interior,cafe&sig=${club.id}1`,
    `https://source.unsplash.com/random/800x600/?cannabis,lounge&sig=${club.id}2`,
    `https://source.unsplash.com/random/800x600/?interior,relax&sig=${club.id}3`
  ];

  return (
    <div className="relative w-full h-[35vh] md:h-[55vh] bg-gray-900 group">
      {/* Mobile Back Button */}
      <div className="absolute top-4 left-4 z-20 md:hidden">
        <Link href="/">
          <button className="p-2 bg-white/30 backdrop-blur-md rounded-full shadow-lg text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
      </div>

      {/* Acciones Top Right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button className="p-2 bg-white/30 backdrop-blur-md rounded-full shadow-lg text-white hover:bg-white/50 transition">
          <Share className="w-5 h-5" />
        </button>
        <button className="p-2 bg-white/30 backdrop-blur-md rounded-full shadow-lg text-white hover:bg-white/50 transition">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Galería Grid Desktop / Swipe Mobile */}
      <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2">
        <div className="w-full shrink-0 snap-center md:col-span-2 md:row-span-2 relative h-full">
           <Image src={images[0]} alt="Principal" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="hidden md:block w-full h-full relative">
           <Image src={images[1]} alt="Interior 1" fill className="object-cover" sizes="25vw" />
        </div>
        <div className="hidden md:block w-full h-full relative">
           <Image src={images[2]} alt="Interior 2" fill className="object-cover rounded-tr-xl" sizes="25vw" />
        </div>
        <div className="hidden md:block w-full h-full relative">
           <Image src={images[1]} alt="Detalle 1" fill className="object-cover" sizes="25vw" />
        </div>
        <div className="hidden md:block w-full h-full relative">
           <Image src={images[2]} alt="Detalle 2" fill className="object-cover rounded-br-xl" sizes="25vw" />
        </div>
      </div>

      {/* View All Photos Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <button className="px-4 py-2 bg-white/90 backdrop-blur-md text-sm font-semibold rounded-lg shadow-lg flex items-center gap-2 hover:bg-white transition">
          Ver todas las fotos
        </button>
      </div>
    </div>
  );
}
