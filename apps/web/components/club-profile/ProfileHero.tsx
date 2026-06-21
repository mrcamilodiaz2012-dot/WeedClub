'use client';

import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
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
    <div className="relative w-full px-2 pt-2 md:px-4 md:pt-4">
      {/* Cover Image */}
      <div className="w-full h-[144px] md:h-[200px] relative overflow-hidden rounded-[28px] md:rounded-[40px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04]">
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
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-20 -mt-[48px] md:-mt-[60px] pb-6">
        {/* Top Row: Profile Pic & Action Buttons */}
        <div className="flex items-end justify-between w-full mb-3">
          {/* Logo (Left) */}
          <div className="relative w-[96px] h-[96px] md:w-[120px] md:h-[120px] rounded-full border-[4px] border-white shadow-sm overflow-hidden bg-white shrink-0">
            <Image
              src={logoUrl}
              alt={`${club.name} logo`}
              fill
              className="object-cover"
            />
          </div>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 pb-2">
            <button className="flex items-center justify-center w-[36px] h-[36px] bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
              <Mail className="w-[18px] h-[18px]" />
            </button>
            <button className="flex items-center justify-center bg-gray-900 text-white font-semibold px-5 py-[8px] rounded-full hover:bg-black transition-colors text-[14px]">
              Seguir
            </button>
          </div>
        </div>

        {/* Info (Vertical Flow) */}
        <div className="w-full flex flex-col">
          {/* Name & Badge */}
          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-gray-900 leading-none">
              {club.name}
            </h1>
            <BadgeCheck className="w-5 h-5 text-[#00C853] shrink-0" />
          </div>
          
          {/* Username */}
          <span className="text-[15px] text-gray-500 font-light mb-4">
            @{club.slug || club.name.toLowerCase().replace(/\s+/g, '')}
          </span>

          {/* Bio */}
          <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-5">
            {club.description || "Club social privado con un ambiente relajado y acceso exclusivo para socios. Un espacio seguro y confortable para compartir y disfrutar en comunidad."}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-2.5 mb-2">
            <div className="flex items-center gap-2.5 text-[15px] text-gray-700">
              <MapPin className="w-[18px] h-[18px] text-gray-400 shrink-0" />
              <span>{club.address || "Calle de Ejemplo 123"}, {club.city}{club.province ? `, ${club.province}` : ''}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-700">
              <Phone className="w-[18px] h-[18px] text-gray-400 shrink-0" />
              <span>+34 600 000 000</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-gray-700 mt-0.5 ml-[28px]">
              <span className="text-red-500 font-medium">Cerrado</span>
              <span className="text-gray-600">⋅ Abre a las 8:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
