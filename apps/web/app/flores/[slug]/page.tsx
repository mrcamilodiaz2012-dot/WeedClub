import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogDetail } from '@/components/catalog/CatalogDetail';
import { FLOWERS, findFlower } from '@/lib/catalog';

export function generateStaticParams() {
  return FLOWERS.map((flower) => ({ slug: flower.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const flower = findFlower((await params).slug);
  return { title: flower ? `${flower.name} | WeedClub` : 'Flor | WeedClub' };
}

export default async function FlowerPage({ params }: { params: Promise<{ slug: string }> }) {
  const flower = findFlower((await params).slug);
  if (!flower) notFound();

  return (
    <CatalogDetail
      backHref="/flores"
      eyebrow="FICHA INFORMATIVA · DEMO"
      title={flower.name}
      image={flower.image}
      description={flower.description}
      meta={`${flower.type} · THC ${flower.thc} · CBD ${flower.cbd}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
        {[
          ['Tipo', flower.type],
          ['Sabor', flower.flavor],
          ['Efecto', flower.effect],
          ['Estado', 'Sin stock asociado'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[18px] bg-background-secondary p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-text-secondary">{label}</p>
            <p className="text-[14px] font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>
    </CatalogDetail>
  );
}
