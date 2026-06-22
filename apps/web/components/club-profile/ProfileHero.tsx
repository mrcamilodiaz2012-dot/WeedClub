'use client';

import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
      <div className="w-full h-[160px] md:h-[220px] relative overflow-hidden bg-gray-200">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Shadow overlay for top nav */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        
        {/* Top Left Nav */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white hover:bg-black/30 transition-all border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <Image 
              src="/logos/logo2.svg" 
              alt="WeedClub" 
              width={18} 
              height={18} 
            />
          </button>
        </div>

        {/* Top Right Nav */}
        <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
          <button className="flex items-center justify-center bg-black/20 backdrop-blur-md w-[34px] h-[34px] rounded-full text-white hover:bg-black/30 transition-all border border-white/20">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center bg-black/20 backdrop-blur-md w-[34px] h-[34px] rounded-full text-white hover:bg-black/30 transition-all border border-white/20">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. White Container with rounded top, negative margin to overlap cover */}
      <div className="relative bg-white rounded-t-[28px] -mt-5 px-4 pt-4 pb-6 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        
        {/* Top Block: Name & Handle */}
        <div className="flex flex-col pt-3">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] md:text-[42px] font-black tracking-tighter text-gray-900 leading-tight">
              {club.name}
            </h1>
            <BadgeCheck className="w-[22px] h-[22px] text-[#00C853] shrink-0" fill="currentColor" stroke="white" strokeWidth={1.5} />
          </div>
          <span className="text-[15px] text-gray-500 font-medium mt-0.5">
            @{club.slug || club.name.toLowerCase().replace(/\s+/g, '')}
          </span>
        </div>

        {/* Bio */}
        <p className="text-[15px] text-[#0F1419] leading-[20px] mt-4 mb-5 whitespace-pre-wrap break-words">
          {club.description || "Club social privado con un ambiente relajado y acceso exclusivo para socios. Un espacio seguro y confortable para compartir y disfrutar en comunidad."}
        </p>

        {/* Meta Info (Inline flow like X) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-[#536471] leading-[20px] mb-5">
          <div className="flex items-center gap-1">
            <Clock className="w-[18px] h-[18px]" />
            <span className="text-[#0F1419] font-medium">Cerrado</span>
            <span>⋅ Abre a las 8:00</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-[18px] h-[18px]" />
            <span>+34 600 000 000</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-[18px] h-[18px]" />
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

        {/* Action Buttons */}
        <div className="flex w-full items-center gap-2.5">
          <button className="flex-1 bg-black text-white font-bold py-2.5 px-4 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors">
            Seguir
          </button>
          <a 
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[44px] h-[44px] rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20bd5a] transition-colors shrink-0 shadow-sm"
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
        </div>
      </div>
    </div>
  );
}
