import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeroProps {
  club: Club;
}

export function ProfileHero({ club }: ProfileHeroProps) {
  // Default images if none provided
  const coverUrl = club.cover_image_url || 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80';
  const logoUrl = club.logo_url || 'https://api.dicebear.com/7.x/shapes/svg?seed=' + club.id;
  const isPremium = club.subscription_tier === 'premium';
  
  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="w-full h-[280px] md:h-[380px] relative overflow-hidden md:rounded-b-3xl md:rounded-t-3xl">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Arc Browser style top shadow for better integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        
        {/* Actions (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/30 transition-all shadow-sm">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/30 transition-all shadow-sm">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Identity Container (Superimposed) */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative -mt-16 md:-mt-20">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          {/* Logo */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white shrink-0">
            <Image
              src={logoUrl}
              alt={`${club.name} logo`}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="w-full pb-1 md:pb-3">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {club.name}
              </h1>
              <BadgeCheck className="w-6 h-6 text-blue-500 shrink-0" />
              {isPremium && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  PREMIUM
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Abierto ahora
              </span>
              <span className="text-gray-300">•</span>
              <span>{club.city}{club.province ? `, ${club.province}` : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
