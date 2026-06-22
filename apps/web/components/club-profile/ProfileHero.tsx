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
      <div className="w-full h-[280px] md:h-[360px] relative overflow-hidden bg-gray-200 z-10">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlays for nav and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Name & Meta (Integrated in cover) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pb-10 md:pb-12 z-20 flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-[44px] md:text-[64px] font-bold text-white tracking-tighter leading-[0.95] drop-shadow-lg mb-1">
              {club.name}
            </h1>
            <BadgeCheck className="w-[24px] h-[24px] text-[#00C853] shrink-0" fill="currentColor" stroke="white" strokeWidth={1.5} />
          </div>

          {/* Meta Info Integrated */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-white/90 leading-tight mt-2.5 drop-shadow-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-[14px] h-[14px]" />
              <span className="font-semibold text-white">Cerrado</span>
              <span className="text-white/70">⋅ Abre 8:00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-[14px] h-[14px]" />
              <span>+34 600 000 000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-[14px] h-[14px]" />
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
      <div className="relative bg-white rounded-t-[32px] -mt-6 px-4 md:px-8 pt-6 pb-2 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">

        {/* Action Buttons */}
        <div className="flex w-full items-center gap-3">
          <button className="flex-1 bg-[#000000] text-white font-semibold text-[16px] py-3.5 px-6 rounded-[20px] flex items-center justify-center hover:bg-gray-800 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
            Seguir
          </button>
          <a 
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[52px] h-[52px] rounded-[20px] bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20bd5a] transition-all shrink-0 shadow-[0_4px_14px_rgba(37,211,102,0.3)]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
