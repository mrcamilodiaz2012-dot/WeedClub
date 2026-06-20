'use client';

import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, Sparkles, Heart, ArrowLeft } from 'lucide-react';
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
            className="flex items-center gap-2.5 bg-white/20 backdrop-blur-xl pl-3 pr-3.5 py-2 rounded-full text-white hover:bg-white/30 transition-all border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          >
            <ArrowLeft className="w-5 h-5" />
            <Image 
              src="/logos/logo2.svg" 
              alt="WeedClub" 
              width={22} 
              height={22} 
            />
          </button>
        </div>

        {/* Actions (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button className="bg-white/20 backdrop-blur-xl p-2.5 rounded-full text-white hover:bg-white/30 transition-all border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-xl p-2.5 rounded-full text-white hover:bg-white/30 transition-all border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Identity Container (Superimposed) */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-20 -mt-[48px] md:-mt-[60px]">
        {/* Top Row: Profile Pic & Action Buttons */}
        <div className="flex items-end justify-between w-full">
          {/* Logo (Left) */}
          <div className="relative w-[96px] h-[96px] md:w-[120px] md:h-[120px] rounded-full border-[4px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden bg-white shrink-0">
            <Image
              src={logoUrl}
              alt={`${club.name} logo`}
              fill
              className="object-cover"
            />
          </div>

          {/* Action Buttons (Right) - Twitter Style */}
          <div className="flex items-center gap-2 pb-2">
            <button className="flex items-center justify-center w-[38px] h-[38px] bg-white border border-black/[0.08] text-gray-900 rounded-full hover:bg-gray-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </button>
            <button className="flex items-center justify-center gap-1.5 bg-[#18181B] text-white font-bold px-5 py-[9px] rounded-full hover:bg-[#27272A] transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.15)] text-[14px]">
              Seguir
            </button>
          </div>
        </div>

        {/* Info (Below, Left Aligned) */}
        <div className="w-full pt-3 pb-2">
          <div className="flex flex-col gap-0.5 mb-3">
            <div className="flex items-center justify-start gap-1.5 flex-wrap">
              <h1 className="text-[24px] md:text-3xl font-display font-bold tracking-tight text-gray-900 leading-none">
                {club.name}
              </h1>
              <BadgeCheck className="w-6 h-6 text-[#007AFF] shrink-0" />
            </div>
            <span className="text-[15px] text-gray-500 font-medium">@{club.slug || club.name.toLowerCase().replace(/\s+/g, '')}</span>
          </div>
          
          <div className="flex items-center justify-start gap-3 text-[14px] md:text-[15px] text-gray-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34C759] shadow-[0_1px_3px_rgba(52,199,89,0.3)]"></span>
              Abierto ahora
            </span>
            <span className="text-gray-300">•</span>
            <span>{club.city}{club.province ? `, ${club.province}` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
