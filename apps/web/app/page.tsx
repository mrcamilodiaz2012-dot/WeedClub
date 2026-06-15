import { Suspense } from 'react';
import { DiscoveryContainer } from '@/components/layout/DiscoveryContainer';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  // Centro de España aproximado (Madrid) por defecto
  // En el futuro, podríamos detectar IP aquí en el Server Component para un initialLat/Lon preciso
  const defaultLat = 40.4168;
  const defaultLon = -3.7038;

  // Track visit on server/client hydration
  trackEvent('city_visit', { city: 'madrid_default' });

  return (
    <main className="w-full h-screen overflow-hidden">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-100">Cargando mapa...</div>}>
        <DiscoveryContainer initialLat={defaultLat} initialLon={defaultLon} initialZoom={12} />
      </Suspense>
    </main>
  );
}
