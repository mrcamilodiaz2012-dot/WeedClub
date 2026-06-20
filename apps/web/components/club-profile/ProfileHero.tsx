import React from 'react';
import type { Club } from '@/types';
import { BadgeCheck, Share2, Bookmark, Sparkles, Heart } from 'lucide-react';
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
    <div className="relative w-full px-2 pt-2 md:px-4 md:pt-4">
      {/* Cover Image */}
      <div className="w-full h-[280px] md:h-[380px] relative overflow-hidden rounded-[32px] md:rounded-[48px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04]">
        <Image
          src={coverUrl}
          alt={`${club.name} cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/5"></div>
        
        {/* App Logo (Top Left) */}
        <div className="absolute top-5 left-5 z-10">
          <Image 
            src="/logo4.svg" 
            alt="WeedClub" 
            width={120} 
            height={34} 
            className="h-7 w-auto md:h-8 drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]" 
          />
        </div>

        {/* Actions (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button className="bg-black/15 backdrop-blur-xl p-2.5 rounded-full text-white hover:bg-black/25 transition-all border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="bg-black/15 backdrop-blur-xl p-2.5 rounded-full text-white hover:bg-black/25 transition-all border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Identity Container (Superimposed) */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-20 -mt-[60px] md:-mt-[75px]">
        <div className="flex flex-col items-center justify-center text-center gap-3">
          {/* Logo */}
          <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full border-[4px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden bg-white shrink-0 -mb-1">
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
              <BadgeCheck className="w-6 h-6 text-[#007AFF] shrink-0" />
            </div>
            
            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34C759] shadow-[0_1px_3px_rgba(52,199,89,0.3)]"></span>
                Abierto ahora
              </span>
              <span className="text-gray-300">•</span>
              <span>{club.city}{club.province ? `, ${club.province}` : ''}</span>
            </div>
          </div>

          {/* Action Buttons (Follow, Message) */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[320px] mt-1">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#34C759] text-white font-semibold px-4 py-2.5 rounded-full hover:bg-[#2FB350] transition-colors shadow-[0_2px_10px_rgba(52,199,89,0.2)] text-sm">
              <Heart className="w-4 h-4" />
              Seguir
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-black/[0.06] text-gray-900 font-semibold px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#34C759] fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
