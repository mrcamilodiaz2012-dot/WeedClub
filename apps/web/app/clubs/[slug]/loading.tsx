import React from 'react';

export default function LoadingProfile() {
  return (
    <main className="w-full min-h-screen bg-white animate-pulse overflow-hidden">
      {/* Hero Skeleton (Imita ProfileHero) */}
      <div className="w-full h-[350px] md:h-[440px] bg-gray-200 relative overflow-hidden">
        {/* Placeholder para los textos del Hero */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pb-12 md:pb-14 z-20 flex flex-col gap-3">
          <div className="w-3/4 md:w-1/2 h-10 md:h-14 bg-gray-300 rounded-2xl"></div>
          <div className="flex gap-3">
            <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
            <div className="w-32 h-5 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
      
      {/* Action Bar Skeleton (Imita la curva y botones debajo del Hero) */}
      <div className="relative bg-white rounded-t-[32px] -mt-8 px-4 md:px-8 pt-5 pb-2 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] flex items-center justify-between">
        <div className="w-[60px] h-[36px] bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-[36px] h-[36px] bg-gray-200 rounded-full"></div>
          <div className="w-[85px] h-[36px] bg-gray-200 rounded-full"></div>
        </div>
      </div>
      
      {/* Tabs Skeleton (Imita el Sticky Header de ProfileContent) */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 pt-4 pb-2 flex gap-6 mt-2">
        <div className="w-12 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-100 rounded-md"></div>
        <div className="w-24 h-6 bg-gray-100 rounded-md"></div>
        <div className="w-16 h-6 bg-gray-100 rounded-md"></div>
      </div>
      
      {/* Contenido principal Skeleton (Imita la grilla de Flores del tab Todo) */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 space-y-8">
        <section>
          <div className="w-48 h-8 bg-gray-200 rounded-xl mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full aspect-[4/5] bg-gray-100 rounded-[28px]"></div>
            <div className="w-full aspect-[4/5] bg-gray-100 rounded-[28px]"></div>
            <div className="w-full aspect-[4/5] bg-gray-100 rounded-[28px] hidden md:block"></div>
            <div className="w-full aspect-[4/5] bg-gray-100 rounded-[28px] hidden lg:block"></div>
          </div>
        </section>
      </div>
    </main>
  );
}
