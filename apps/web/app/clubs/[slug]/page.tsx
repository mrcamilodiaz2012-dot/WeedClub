import * as React from 'react';
import { createClient } from '@/utils/supabase/server';
import { ClubHero } from '@/components/clubs/ClubHero';
import { ClubInfo } from '@/components/clubs/ClubInfo';
import { ClubReviews } from '@/components/clubs/ClubReviews';
import { StickyCTA } from '@/components/clubs/StickyCTA';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import type { Club } from '@/types';

// Opcional: Revalidación para ISR o hacer la página puramente dinámica
export const revalidate = 3600;

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = createClient();
  const resolvedParams = await params;
  
  // Asumimos que el slug es el ID por ahora hasta que tengamos slugs amigables reales
  const { data: club, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', resolvedParams.slug)
    .single();

  if (error || !club) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-white pb-24 md:pb-0">
      {/* Galería Fotográfica (Server + Client Component interactivo) */}
      <div className="w-full max-w-7xl mx-auto md:px-6 md:pt-6">
        <div className="md:rounded-2xl overflow-hidden">
          <ClubHero club={club} />
        </div>
      </div>

      {/* Contenedor Principal Layout Airbnb (2 Columnas en Desktop) */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        
        {/* Columna Izquierda: Información */}
        <div className="w-full">
          <ClubInfo club={club} />
          <ClubReviews />
          
          <div className="py-8 border-b border-border-subtle">
            <h3 className="text-xl font-semibold mb-4">Dónde nos encontramos</h3>
            <p className="text-text-secondary mb-4">{club.address}, {club.city}, {club.province}</p>
            {/* Mapa Estático o Interactivo pequeño */}
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-text-secondary">
              [Mapa de Ubicación]
            </div>
          </div>
        </div>

        {/* Columna Derecha: Sticky Checkout Widget (Solo Desktop) */}
        <div className="hidden md:block relative">
          <div className="sticky top-24 bg-white border border-border-subtle rounded-2xl shadow-card p-6">
             <div className="flex justify-between items-end mb-6">
               <h2 className="text-2xl font-bold">20€ <span className="text-base font-normal text-text-secondary">/ año</span></h2>
               <div className="flex items-center text-sm font-semibold"><Star className="w-4 h-4 fill-brand-primary text-brand-primary mr-1"/> 4.8 <span className="text-gray-400 font-normal ml-1 underline cursor-pointer">120 reseñas</span></div>
             </div>

             <div className="space-y-4 mb-6">
               <div className="p-4 border border-gray-200 rounded-xl text-sm">
                 <p className="font-semibold mb-1">Solicitud de Membresía</p>
                 <p className="text-text-secondary">Tu solicitud será revisada por la junta directiva antes de realizar cualquier cobro.</p>
               </div>
             </div>

             <button className="w-full bg-brand-primary text-white font-semibold py-3.5 rounded-xl text-lg shadow-float hover:bg-brand-primary/90 transition-transform active:scale-95">
               Solicitar Ingreso
             </button>

             <p className="text-center text-xs text-text-secondary mt-4">
               No se te cobrará nada todavía
             </p>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar en Móvil */}
      <StickyCTA />

    </main>
  );
}
