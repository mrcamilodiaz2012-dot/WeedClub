import React from 'react';
import type { Club } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';

export function TabReviews({ club }: { club: Club }) {
  // Mock data
  const reviews = [
    {
      id: 1,
      user: 'Carlos M.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      rating: 5,
      date: 'Hace 2 semanas',
      content: 'El mejor ambiente de la ciudad. La calidad es excelente y el personal muy atento.'
    },
    {
      id: 2,
      user: 'Laura G.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      rating: 4,
      date: 'Hace 1 mes',
      content: 'Muy buen club, las instalaciones son de primera. A veces se llena mucho los fines de semana.'
    },
    {
      id: 3,
      user: 'David P.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      rating: 5,
      date: 'Hace 2 meses',
      content: 'Increíble variedad y la zona de juegos es un plus enorme.'
    }
  ];

  return (
    <div>
      {/* Rating Header (Apple/Airbnb style) */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-100">
        <div className="text-center md:text-left">
          <div className="text-6xl font-bold text-gray-900 mb-2">4.8</div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-gray-900 text-gray-900' : 'fill-gray-200 text-gray-200'}`} />
            ))}
          </div>
          <p className="text-gray-500 text-sm">124 reseñas</p>
        </div>
        
        {/* Rating Bars */}
        <div className="flex-1 w-full max-w-sm space-y-2">
          {[
            { stars: 5, width: '85%' },
            { stars: 4, width: '10%' },
            { stars: 3, width: '3%' },
            { stars: 2, width: '1%' },
            { stars: 1, width: '1%' },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-sm">
              <span className="w-2 font-medium text-gray-600">{row.stars}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full" style={{ width: row.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative">
                <Image src={review.avatar} alt={review.user} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{review.user}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold rounded-full transition-colors text-sm">
          Ver todas las reseñas
        </button>
      </div>
    </div>
  );
}
