'use client';
import React, { useState } from 'react';

interface ProfileBioProps {
  description: string;
}

export function ProfileBio({ description }: ProfileBioProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Lógica simple para determinar si el texto es muy largo
  const isLong = description && description.length > 150;
  
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 mt-1 mb-4">
      <div className="text-[15px] md:text-[15px] text-gray-800 leading-snug max-w-3xl text-left">
        <p className={!expanded && isLong ? "line-clamp-3" : ""}>
          {description || "Club social privado con un ambiente relajado y acceso exclusivo para socios. Un espacio seguro y confortable para compartir y disfrutar en comunidad."}
        </p>
        
        {isLong && !expanded && (
          <button 
            onClick={() => setExpanded(true)}
            className="text-gray-500 font-semibold mt-1 hover:text-gray-900 transition-colors"
          >
            Leer más
          </button>
        )}
      </div>
    </div>
  );
}
