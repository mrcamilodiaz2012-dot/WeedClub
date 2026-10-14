import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogDetail } from '@/components/catalog/CatalogDetail';
import { GROW_SHOPS, findGrowShop } from '@/lib/catalog';

export function generateStaticParams() {
  return GROW_SHOPS.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const shop = findGrowShop((await params).slug);
  return { title: shop ? `${shop.title} | WeedClub` : 'Grow shop | WeedClub' };
}

export default async function GrowShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const shop = findGrowShop((await params).slug);
  if (!shop) notFound();

  return (
    <CatalogDetail
      backHref="/grow-shops"
      eyebrow="GROW SHOP · DEMO"
      title={shop.title}
      image={shop.img}
      description={shop.description}
      meta={`${shop.city} · ★ ${shop.rating} de demostración`}
    >
      <section className="max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 mb-3">Especialidades de muestra</p>
        <div className="flex flex-wrap gap-2">
          {shop.specialties.map((item) => (
            <span key={item} className="px-4 py-2 rounded-full bg-background-secondary text-[13px] font-semibold">{item}</span>
          ))}
        </div>
      </section>
    </CatalogDetail>
  );
}
