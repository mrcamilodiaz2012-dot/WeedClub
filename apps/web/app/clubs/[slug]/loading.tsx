import React from 'react';

export default function LoadingProfile() {
  return (
    <main className="w-full min-h-screen bg-white animate-pulse">
      {/* Hero Skeleton (Portada) */}
      <div className="w-full h-[350px] md:h-[450px] bg-gray-200"></div>
      
      {/* Contenido del Perfil Skeleton */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Logo Skeleton */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gray-300 border-4 border-white shadow-md flex-shrink-0"></div>
          
          {/* Título y descripción Skeleton */}
          <div className="flex-1 w-full pt-4 md:pt-24 space-y-4">
            <div className="w-2/3 h-10 bg-gray-200 rounded-xl"></div>
            <div className="flex gap-3">
              <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Skeleton */}
      <div className="w-full border-b border-gray-100 mt-10">
        <div className="max-w-4xl mx-auto flex gap-4 px-5 md:px-8 pb-4">
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
        </div>
      </div>
      
      {/* Tarjetas de Contenido Skeleton */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-8 flex gap-6 overflow-x-hidden">
        <div className="w-[220px] h-[280px] bg-gray-100 rounded-[24px] flex-shrink-0"></div>
        <div className="w-[220px] h-[280px] bg-gray-100 rounded-[24px] flex-shrink-0"></div>
        <div className="w-[220px] h-[280px] bg-gray-100 rounded-[24px] flex-shrink-0"></div>
      </div>
    </main>
  );
}
