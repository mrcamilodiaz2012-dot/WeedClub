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
  const logoUrl = club.logo_url || 'https://api.dicebear.com/7.x/shapes/svg?seed=' + club.id;
  const isPremium = club.subscription_tier === 'premium';
  
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
        
        {/* Top Block: Avatar (Left) + Name & Handle (Right) */}
        <div className="flex flex-row items-center gap-3">
          {/* Avatar (Sticks out above the white container) */}
          <div className="relative w-[86px] h-[86px] md:w-[110px] md:h-[110px] rounded-full border-[4px] border-white shadow-sm overflow-hidden bg-white shrink-0 -mt-10">
            <Image
              src={logoUrl}
              alt={`${club.name} logo`}
              fill
              className="object-cover"
            />
          </div>

          {/* Name & Handle */}
          <div className="flex flex-col pt-1">
            <div className="flex items-center gap-1">
              <h1 className="text-[22px] md:text-[26px] font-bold text-gray-900 leading-tight">
                {club.name}
              </h1>
              <BadgeCheck className="w-[18px] h-[18px] text-[#00C853] shrink-0" fill="currentColor" stroke="white" strokeWidth={1.5} />
            </div>
            <span className="text-[14px] text-gray-500 font-normal">
              @{club.slug || club.name.toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[15px] text-[#0F1419] leading-[20px] mt-4 mb-5 whitespace-pre-wrap break-words">
          {club.description || "Club social privado con un ambiente relajado y acceso exclusivo para socios. Un espacio seguro y confortable para compartir y disfrutar en comunidad."}
        </p>

        {/* Meta Info (Vertical Stack) */}
        <div className="flex flex-col gap-3 text-[15px] text-[#0F1419] mb-5">
          <div className="flex items-center gap-3">
            <Clock className="w-[20px] h-[20px] text-gray-700 shrink-0" strokeWidth={1.5} />
            <div className="flex gap-1.5 items-center">
              <span className="font-semibold text-gray-900">Cerrado</span>
              <span className="text-gray-500">⋅ Abre a las 8:00</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-[20px] h-[20px] text-gray-700 shrink-0" strokeWidth={1.5} />
            <span className="font-semibold text-gray-900">+34 600 000 000</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-[20px] h-[20px] text-gray-700 shrink-0" strokeWidth={1.5} />
            <a 
              href={`https://maps.google.com/?q=${club.address || "Calle de Ejemplo 123"}, ${club.city}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              {club.address || "Calle de Ejemplo 123"}, {club.city}
            </a>
          </div>
        </div>

        {/* Action Buttons (Full width) */}
        <div className="flex w-full gap-2.5">
          <button className="flex-1 bg-gray-100 text-gray-900 font-semibold py-2.5 px-4 rounded-[10px] flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            Siguiendo
          </button>
          <button className="flex-1 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
            Mensaje
          </button>
        </div>
      </div>
    </div>
  );
}
