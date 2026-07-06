'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustrationUrl?: string;
}

export function AuthLayout({ children, title, subtitle, illustrationUrl = 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2940&auto=format&fit=crop' }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-background-base">
      {/* Left side: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10">
        
        {/* Back / Logo */}
        <div className="absolute top-8 left-8 sm:left-16 md:left-24 xl:left-32">
          <Link href="/" className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
            WeedClub
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          {children}

        </motion.div>
      </div>

      {/* Right side: Image / Visual */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay z-10" />
        
        {/* We use an actual image or graphic here */}
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={illustrationUrl} 
          alt="WeedClub Auth Cover" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.3 }}
             className="max-w-xl backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20"
          >
            <h2 className="text-3xl font-bold mb-4">Descubre, conecta y gestiona.</h2>
            <p className="text-gray-200 text-lg">
              Únete a la comunidad de WeedClub. Explora clubes cerca de ti, o reclama tu página para conectar con miles de usuarios.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
