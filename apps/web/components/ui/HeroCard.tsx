"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroCardProps {
  subtitle: string;
  title: string;
  imageSrc: string;
  clubName: string;
  clubSubtitle: string;
  clubIconSrc?: string;
}

export function HeroCard({
  subtitle,
  title,
  imageSrc,
  clubName,
  clubSubtitle,
  clubIconSrc,
}: HeroCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6 flex flex-col"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Top Content */}
      <div className="relative z-10 p-5 pt-6 flex flex-col">
        <span className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">
          {subtitle}
        </span>
        <h2 className="text-white text-3xl font-display font-bold leading-tight w-2/3">
          {title}
        </h2>
      </div>

      <div className="mt-auto" />

      {/* Bottom Club Info */}
      <div className="relative z-10 p-4 pb-5 flex items-center gap-3 w-full bg-black/20 backdrop-blur-md">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/20 shrink-0">
          {clubIconSrc ? (
            <img src={clubIconSrc} alt={clubName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-brand-accent to-emerald-400" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-white font-semibold text-sm leading-tight">{clubName}</span>
          <span className="text-white/70 text-xs">{clubSubtitle}</span>
        </div>
        <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wide">
          VER
        </button>
      </div>
    </motion.div>
  );
}
