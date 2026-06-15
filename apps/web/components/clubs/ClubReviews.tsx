import * as React from 'react';
import { Star } from 'lucide-react';

export function ClubReviews() {
  const reviews = [
    { id: 1, author: 'Carlos', date: 'Hace 2 semanas', rating: 5, text: 'El mejor ambiente de la ciudad, las instalaciones son de primera. Definitivamente recomiendo hacerse socio.', avatar: 'https://source.unsplash.com/random/100x100/?portrait&sig=1' },
    { id: 2, author: 'María', date: 'Hace 1 mes', rating: 4, text: 'Buen sitio para trabajar y relajarse. Tienen muy buen WiFi y café.', avatar: 'https://source.unsplash.com/random/100x100/?portrait&sig=2' },
    { id: 3, author: 'Juan', date: 'Hace 3 meses', rating: 5, text: 'Excelente atención por parte del staff, la decoración es brutal.', avatar: 'https://source.unsplash.com/random/100x100/?portrait&sig=3' },
    { id: 4, author: 'Elena', date: 'Hace 4 meses', rating: 5, text: 'Súper espacioso, no te sientes agobiado nunca y siempre hay buena música de fondo.', avatar: 'https://source.unsplash.com/random/100x100/?portrait&sig=4' }
  ];

  return (
    <div className="py-8 border-b border-border-subtle">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-brand-primary fill-brand-primary" />
        <h2 className="text-2xl font-semibold text-text-primary">4.8 <span className="text-text-secondary font-medium text-lg ml-1">· 120 reseñas</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {reviews.map(review => (
          <div key={review.id} className="flex flex-col">
            <div className="flex items-center gap-4 mb-3">
              <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
              <div>
                <h4 className="font-semibold text-text-primary">{review.author}</h4>
                <p className="text-sm text-text-secondary">{review.date}</p>
              </div>
            </div>
            <p className="text-text-primary leading-relaxed text-sm md:text-base">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-8 px-6 py-3 border border-text-primary rounded-xl font-semibold hover:bg-gray-50 transition">
        Mostrar las 120 reseñas
      </button>
    </div>
  );
}
