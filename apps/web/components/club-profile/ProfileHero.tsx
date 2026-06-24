'use client';

import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, ArrowLeft, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileHeroProps {
  club: Club;
}

export function ProfileHero({ club }: ProfileHeroProps) {
  const router = useRouter();

  // Default images if none provided
  const coverUrl = club.cover_image_url || 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80';
  
  return (
    <div className="relative w-full bg-white">
      {/* 1. Cover Image (Edge to edge) */}
      <div className="w-full h-[350px] md:h-[440px] relative overflow-hidden bg-gray-200 z-10">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient and Blur Overlay only at the bottom for readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)] z-10" />
        
        {/* Name & Meta (Integrated in cover) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pb-12 md:pb-14 z-20 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[48px] md:text-[68px] font-black tracking-tighter text-white leading-[0.9]">
              {club.name}
            </h1>
            <BadgeCheck className="w-[28px] h-[28px] text-[#1ed760] shrink-0 drop-shadow-md" fill="currentColor" stroke="white" strokeWidth={1.5} />
          </div>

          {/* Meta Info Integrated */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-white/90 leading-tight mt-2 drop-shadow-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-[15px] h-[15px]" />
              <span className="font-semibold text-white">Cerrado</span>
              <span className="text-white/80">⋅ Abre 8:00</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-[15px] h-[15px]" />
              <span>+34 600 000 000</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-[15px] h-[15px]" />
              <a 
                href={`https://maps.google.com/?q=${club.address || "Calle de Ejemplo 123"}, ${club.city}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline cursor-pointer"
              >
                {club.address || "Calle de Ejemplo 123"}, {club.city}
              </a>
            </div>
          </div>
        </div>
        
        {/* Top Left Nav */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-all drop-shadow-md p-1"
          >
            <ArrowLeft className="w-6 h-6" />
            <Image 
              src="/logos/logo2.svg" 
              alt="WeedClub" 
              width={24} 
              height={24} 
            />
          </button>
        </div>

        {/* Top Center Nav (City) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 mt-1">
          <div className="flex items-center gap-1.5 text-white drop-shadow-md">
            <MapPin className="w-5 h-5" />
            <span className="text-[14px] font-semibold tracking-wide uppercase">
              {club.city}
            </span>
          </div>
        </div>

        {/* Top Right Nav */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button className="text-white hover:text-white/80 transition-all drop-shadow-md p-1">
            <Share2 className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-white/80 transition-all drop-shadow-md p-1">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 2. White Container, negative margin to tuck under cover */}
      <div className="relative bg-white rounded-t-[32px] -mt-8 px-4 md:px-8 pt-5 pb-2 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] flex items-center justify-between">
        
        {/* Left Side: Map Icon */}
        <a 
          href={`https://maps.google.com/?q=${club.address || "Calle de Ejemplo 123"}, ${club.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 transition-colors flex items-center justify-center p-1.5"
          title="Ir"
        >
          <Navigation size={26} fill="currentColor" />
        </a>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Action Button (X Style) */}
          <a 
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition-colors flex items-center justify-center p-1.5"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Seguir Button (X Style) */}
          <button className="h-[36px] px-5 rounded-full bg-black text-white font-bold text-[14px] flex items-center justify-center hover:bg-gray-900 transition-colors">
            Seguir
          </button>
        </div>
      </div>
    </div>
  );
}
