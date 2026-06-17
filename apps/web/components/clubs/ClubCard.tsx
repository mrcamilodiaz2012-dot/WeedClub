'use client';

import * as React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MapPin, Clock, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Club } from '@/types';

interface ClubCardProps {
  club: Club;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ClubCard({ club, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ClubCardProps) {
  const coverUrl = club.cover_image_url || `https://picsum.photos/seed/${club.id}/400/300`;
  const isOpen = club.status === 'active'; // Lógica simplificada por ahora
  const isPremium = club.subscription_tier === 'premium';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card 
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`cursor-pointer overflow-hidden transition-all duration-300 border-2 bg-white
          ${isSelected 
            ? 'border-brand-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
            : isHovered 
              ? 'border-border-subtle shadow-lg' 
              : 'border-transparent shadow-card'
          }
        `}
      >
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <Image 
            src={coverUrl} 
            alt={club.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition hover:scale-110">
            <Heart className="w-5 h-5 text-white" />
          </button>
          
          {isPremium && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-gray-900/80 backdrop-blur-md text-brand-accent text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-brand-accent" /> Premium
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-display font-semibold text-xl text-text-primary line-clamp-1 group-hover:text-brand-primary transition-colors">
                {club.name}
              </h3>
              <p className="text-text-secondary text-sm flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {club.city} • <span className="text-gray-400 ml-1">1.2 km</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1 font-semibold text-text-primary">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">(120)</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
               {isOpen ? (
                 <Badge variant="outline" className="bg-brand-accent/20 text-brand-primary border-brand-accent/30 font-medium">
                   Abierto
                 </Badge>
               ) : (
                 <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-medium">
                   Cerrado
                 </Badge>
               )}
               <Badge variant="outline" className="text-text-secondary border-gray-200">
                 Pet Friendly
               </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ClubCardSkeleton() {
  return (
    <Card className="overflow-hidden border-transparent shadow-card animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-2 w-2/3">
            <div className="h-6 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-2/3" />
          </div>
          <div className="h-6 bg-gray-200 rounded-md w-12" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
