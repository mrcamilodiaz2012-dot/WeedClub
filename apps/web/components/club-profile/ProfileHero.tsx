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
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="w-full h-[144px] md:h-[200px] relative overflow-hidden">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/5"></div>
        
        {/* Top Left Nav (Back Arrow & Leaf) */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full text-white hover:bg-white/40 transition-all border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
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

        {/* Actions (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
          <button className="bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Identity Container (Superimposed) */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-20 pb-6">
        {/* Top Row: Profile Pic & Action Buttons */}
        <div className="flex justify-between items-start w-full">
          {/* Logo (Left) */}
          <div className="relative w-[76px] h-[76px] md:w-[134px] md:h-[134px] rounded-full border-[4px] border-white overflow-hidden bg-white shrink-0 -mt-[38px] md:-mt-[67px]">
            <Image
              src={logoUrl}
              alt={`${club.name} logo`}
              fill
              className="object-cover"
            />
          </div>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 pt-3">
            <button className="flex items-center justify-center w-[34px] h-[34px] border border-gray-300 text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
              <Mail className="w-[18px] h-[18px]" />
            </button>
            <button className="bg-black text-white font-bold px-4 py-[6px] rounded-full hover:bg-gray-900 transition-colors text-[14px]">
              Seguir
            </button>
          </div>
        </div>

        {/* Info (Vertical Flow) */}
        <div className="w-full flex flex-col mt-2 md:mt-4">
          {/* Name & Badge */}
          <div className="flex items-center gap-1 mt-1">
            <h1 className="text-[24px] md:text-[28px] font-[900] text-[#0F1419] leading-tight">
              {club.name}
            </h1>
            <BadgeCheck className="w-[20px] h-[20px] text-white shrink-0" fill="#00C853" />
          </div>
          
          {/* Username */}
          <span className="text-[15px] text-[#536471] leading-[20px] font-normal mt-0.5 mb-3">
            @{club.slug || club.name.toLowerCase().replace(/\s+/g, '')}
          </span>

          {/* Bio */}
          <p className="text-[15px] text-[#0F1419] leading-[20px] mb-3 pr-2 whitespace-pre-wrap break-words">
            {club.description || "Club social privado con un ambiente relajado y acceso exclusivo para socios. Un espacio seguro y confortable para compartir y disfrutar en comunidad."}
          </p>

          {/* Meta Info (Inline flow) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-[#536471] leading-[20px]">
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
                className="text-[#536471] hover:underline cursor-pointer"
              >
                {club.address || "Calle de Ejemplo 123"}, {club.city}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
