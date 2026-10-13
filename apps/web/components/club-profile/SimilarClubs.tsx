import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export function SimilarClubs() {
  // Mock data
  const clubs = [
    { id: 1, name: 'Green House', city: 'Madrid', rating: 4.9, img: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&q=80' },
    { id: 2, name: 'The Social Club', city: 'Madrid', rating: 4.7, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80' },
    { id: 3, name: 'Oasis Lounge', city: 'Madrid', rating: 4.8, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80' },
  ];

  return (
    <div className="mt-16 mb-8 max-w-7xl mx-auto px-5 md:px-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Te podría interesar...</h3>
      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5 md:mx-0 md:px-0">
        {clubs.map((club) => (
          <div key={club.id} className="w-64 shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-32 relative">
              <Image src={club.img} alt={club.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1">{club.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{club.city}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                <Star className="w-4 h-4 fill-current" />
                {club.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
