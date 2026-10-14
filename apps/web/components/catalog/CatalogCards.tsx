import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import type { Club } from '@/types';
import type { CityEntry, EventEntry, FlowerEntry, GrowShopEntry } from '@/lib/catalog';

export function ClubDirectoryCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.slug || club.id}`} className="block group active:scale-[0.98] transition-transform">
      <article className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-background-secondary border border-border-subtle/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <img
          src={club.cover_image_url ?? '/portadas/cannabis.jpg'}
          alt={club.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        {club.is_demo && (
          <span className="absolute top-3 left-3 bg-white/90 text-black text-[9px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full">
            Demo
          </span>
        )}
        <div className="absolute left-0 right-0 bottom-0 p-4 text-white">
          <h2 className="text-[22px] font-display font-black tracking-tighter leading-tight">{club.name}</h2>
          <p className="mt-1 text-[12px] text-white/80 flex items-center gap-1.5">
            <MapPin size={13} /> {club.city ?? 'Ubicación pendiente'}
          </p>
        </div>
      </article>
    </Link>
  );
}

export function CityDirectoryCard({ city }: { city: CityEntry }) {
  return (
    <Link href={`/ciudades/${city.slug}`} className="block group active:scale-[0.98] transition-transform">
      <article className="aspect-square rounded-[24px] overflow-hidden relative bg-background-secondary border border-border-subtle/40 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h2 className="text-[26px] font-display font-black tracking-tighter drop-shadow-md">{city.name}</h2>
          <p className="text-[11px] font-semibold text-white/85 mt-1">Ver directorio</p>
        </div>
      </article>
    </Link>
  );
}

export function FlowerDirectoryCard({ flower }: { flower: FlowerEntry }) {
  return (
    <Link href={`/flores/${flower.slug}`} className="block group active:scale-[0.98] transition-transform">
      <article className="h-full bg-[#F5F5F7] border border-border-subtle/40 rounded-[24px] p-4 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[40px] opacity-25 ${flower.type === 'SATIVA' ? 'bg-amber-400' : flower.type === 'ÍNDICA' ? 'bg-purple-400' : 'bg-emerald-400'}`} />
        <span className={`relative z-10 inline-block text-[9px] font-bold px-2 py-1 rounded-full ${flower.color} ${flower.bg}`}>
          {flower.type}
        </span>
        <div className="relative z-10 h-[155px] flex items-center justify-center">
          <img src={flower.image} alt={flower.name} className="h-[130%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="relative z-10">
          <h2 className="text-[17px] font-display font-black tracking-tighter truncate">{flower.name}</h2>
          <div className="flex gap-2 mt-2 text-[10px] font-bold text-text-secondary">
            <span className="border border-border-subtle rounded-md px-2 py-1">THC {flower.thc}</span>
            <span className="border border-border-subtle rounded-md px-2 py-1">CBD {flower.cbd}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function GrowShopDirectoryCard({ shop }: { shop: GrowShopEntry }) {
  return (
    <Link href={`/grow-shops/${shop.slug}`} className="block group active:scale-[0.98] transition-transform">
      <article className="h-full bg-white border border-border-subtle/60 rounded-[18px] overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <div className="aspect-[16/9] relative overflow-hidden bg-background-secondary">
          <img src={shop.img} alt={shop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider">Demo</span>
        </div>
        <div className="p-3">
          <h2 className="text-[15px] font-display font-black tracking-tight leading-tight">{shop.title}</h2>
          <p className="text-[11px] text-text-secondary mt-1">{shop.subtitle}</p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border-subtle/40 text-[10px] font-semibold text-text-secondary">
            <span className="flex items-center gap-1"><MapPin size={11} /> {shop.city}</span>
            <span><span className="text-amber-500">★</span> {shop.rating}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function EventDirectoryCard({ event }: { event: EventEntry }) {
  return (
    <Link href={`/eventos/${event.slug}`} className="block group active:scale-[0.98] transition-transform">
      <article className="h-full bg-white border border-border-subtle/60 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="aspect-[16/10] relative overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">Demo</span>
        </div>
        <div className="p-4">
          <h2 className="text-[20px] font-display font-black tracking-tighter leading-tight">{event.title}</h2>
          <p className="text-[12px] text-text-secondary mt-2 flex items-center gap-1.5"><MapPin size={13} /> {event.city}</p>
          <p className="text-[12px] text-text-secondary mt-1 flex items-center gap-1.5"><CalendarDays size={13} /> {event.dateLabel}</p>
        </div>
      </article>
    </Link>
  );
}
