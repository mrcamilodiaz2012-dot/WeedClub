import React from 'react';
import type { Club } from '@/types';
import { Star } from 'lucide-react';

export function TabReviews({ club }: { club: Club }) {
  const rating = club.rating;
  const reviewCount = club.review_count ?? 0;

  if (rating == null || reviewCount === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-gray-50 px-6 py-12 text-center text-gray-500">
        <Star className="mx-auto mb-3 h-12 w-12 text-gray-200" />
        <p className="font-medium text-gray-700">Sin valoración publicada en WeedClub</p>
        <p className="mt-1 text-sm">Consulta la ficha externa para ver información actualizada.</p>
        {club.google_maps_url && (
          <a href={club.google_maps_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white">
            Abrir Google Maps
          </a>
        )}
      </div>
    );
  }

  const ratingRounded = Math.round(rating);

  return (
    <div>
      {/* Rating Header */}
      <div className="mb-8 border-b border-gray-100 pb-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">{rating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= ratingRounded ? 'fill-gray-900 text-gray-900' : 'fill-gray-200 text-gray-200'}`}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            {reviewCount} reseñas públicas en el momento de la consulta
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 p-5 text-sm leading-relaxed text-gray-600">
        Esta es una referencia pública consultada durante la preparación de la ficha. WeedClub no copia reseñas individuales y la valoración puede cambiar.
        {club.google_maps_url && (
          <a href={club.google_maps_url} target="_blank" rel="noopener noreferrer" className="mt-4 block font-bold text-gray-900 underline underline-offset-4">
            Ver la ficha actual en Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
