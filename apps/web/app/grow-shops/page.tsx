import type { Metadata } from 'next';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';
import { DemoNotice } from '@/components/catalog/DemoNotice';
import { GrowShopDirectoryCard } from '@/components/catalog/CatalogCards';
import { GROW_SHOPS } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Grow Shops | WeedClub' };

export default function GrowShopsPage() {
  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="GROW SHOPS"
        title="Tiendas del directorio"
        description="Accede a cada ficha desde la portada, la búsqueda o esta vista general. Los comercios actuales son demostraciones no verificadas."
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <DemoNotice />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {GROW_SHOPS.map((shop) => <GrowShopDirectoryCard key={shop.id} shop={shop} />)}
        </div>
      </div>
    </main>
  );
}
