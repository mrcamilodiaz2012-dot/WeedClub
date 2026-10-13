'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import {
  CalendarClock,
  Camera,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react';
import type { Club } from '@/types';

const InteractiveMap = dynamic(
  () => import('../map/InteractiveMap').then((module) => module.InteractiveMap),
  { ssr: false, loading: () => <div className="h-[390px] animate-pulse rounded-[28px] bg-gray-100" /> }
);

const DAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

const AMENITY_LABELS: Record<string, string> = {
  wifi: 'Wi-Fi',
  gaming: 'Zona de juegos',
  cafeteria: 'Cafetería',
  parking: 'Aparcamiento',
  terraza: 'Terraza',
  'pet-friendly': 'Admite mascotas',
  accesible: 'Accesible',
  'juegos-de-mesa': 'Juegos de mesa',
  'musica-en-vivo': 'Música en vivo',
  bebidas: 'Bebidas',
};

export function ProfileContent({ club }: { club: Club }) {
  const hasCoordinates = club.lat != null && club.lng != null;
  const [viewport, setViewport] = useState({
    latitude: club.lat ?? 40.4168,
    longitude: club.lng ?? -3.7038,
    zoom: 14,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-14 px-5 py-10 pb-32 md:px-8">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)]">
        <div>
          <SectionEyebrow>El club</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Información del club</h2>
          {club.description ? (
            <p className="mt-5 whitespace-pre-line text-base leading-7 text-gray-600">{club.description}</p>
          ) : (
            <p className="mt-5 rounded-2xl bg-gray-50 p-5 text-sm leading-6 text-gray-500">
              Este club todavía no ha añadido una descripción. Los datos de contacto y ubicación disponibles aparecen en esta página.
            </p>
          )}

          {club.amenities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-gray-400">Servicios</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {club.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700">
                    {AMENITY_LABELS[amenity] ?? amenity.replaceAll('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-[26px] border border-black/5 bg-[#f6f7f5] p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={20} />
            <h3 className="font-black">Datos del perfil</h3>
          </div>
          <dl className="mt-5 space-y-4 text-sm">
            <InfoRow label="Estado" value={club.is_claimed ? 'Gestionado por el club' : 'Pendiente de reclamar'} />
            <InfoRow label="Ubicación" value={[club.city, club.province].filter(Boolean).join(', ') || 'No indicada'} />
            {club.review_count > 0 && <InfoRow label="Valoración" value={`${club.rating.toFixed(1)} · ${club.review_count} reseñas`} />}
          </dl>
        </aside>
      </section>

      {club.photos.length > 0 && (
        <section>
          <SectionTitle icon={<Camera size={21} />} title="Fotos" />
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {club.photos.slice(0, 9).map((photo, index) => (
              <div key={`${photo}-${index}`} className={`overflow-hidden rounded-[20px] bg-gray-100 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`Foto ${index + 1} de ${club.name}`} className="aspect-square h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle icon={<CalendarClock size={21} />} title="Horarios" />
          <div className="mt-5 overflow-hidden rounded-[24px] border border-black/5">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center justify-between border-b border-black/5 px-5 py-3.5 text-sm last:border-b-0">
                <span className="font-semibold capitalize text-gray-700">{day}</span>
                <span className={`font-bold ${club.opening_hours[day] === 'cerrado' ? 'text-red-500' : 'text-gray-950'}`}>
                  {club.opening_hours[day] || 'No indicado'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle icon={<Phone size={21} />} title="Contacto" />
          <div className="mt-5 grid gap-3">
            {club.phone && <ContactLink href={`tel:${club.phone}`} icon={<Phone size={18} />} label="Teléfono" value={club.phone} />}
            {club.email && <ContactLink href={`mailto:${club.email}`} icon={<Mail size={18} />} label="Correo" value={club.email} />}
            {club.whatsapp && <ContactLink href={`https://wa.me/${club.whatsapp.replace(/\D/g, '')}`} icon={<ExternalLink size={18} />} label="WhatsApp" value="Abrir conversación" external />}
            {club.instagram_url && <ContactLink href={club.instagram_url} icon={<Camera size={18} />} label="Instagram" value="Ver perfil" external />}
            {club.website_url && <ContactLink href={club.website_url} icon={<Globe size={18} />} label="Sitio web" value="Visitar sitio" external />}
            {!club.phone && !club.email && !club.whatsapp && !club.instagram_url && !club.website_url && (
              <div className="rounded-[24px] bg-gray-50 p-6 text-sm leading-6 text-gray-500">El club todavía no ha publicado medios de contacto.</div>
            )}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle icon={<MapPin size={21} />} title="Ubicación" />
        {hasCoordinates ? (
          <div className="mt-5 h-[390px] overflow-hidden rounded-[28px] border border-black/5 shadow-sm md:h-[480px]">
            <InteractiveMap
              clubs={[club]}
              selectedClubId={club.id}
              hoveredClubId={null}
              onSelectClub={() => undefined}
              onHoverClub={() => undefined}
              viewport={viewport}
              onViewportChange={setViewport}
            />
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] bg-gray-50 p-8 text-center text-sm text-gray-500">Este club aún no ha publicado coordenadas.</div>
        )}
      </section>

      {club.review_count > 0 && (
        <section className="rounded-[28px] bg-gray-950 p-7 text-white md:p-10">
          <div className="flex items-center gap-2 text-amber-400">
            <Star className="fill-current" size={22} />
            <span className="text-3xl font-black">{club.rating.toFixed(1)}</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight">Valoración histórica</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
            Calculada a partir de {club.review_count} reseñas existentes. La creación de nuevas reseñas queda desactivada mientras no haya cuentas para usuarios finales.
          </p>
        </section>
      )}

      <section className="rounded-[24px] border border-black/5 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
        <p><strong className="text-gray-950">Aviso:</strong> WeedClub es un directorio informativo. Esta ficha no certifica la situación legal del club, no garantiza la admisión y no ofrece venta, reserva ni intermediación de sustancias.</p>
        <Link href={`/reportar-contenido?url=${encodeURIComponent(`/clubs/${club.slug}`)}`} className="mt-3 inline-flex font-bold text-emerald-700 underline">Reportar un error o contenido ilícito</Link>
      </section>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{children}</p>;
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight">{icon}{title}</h2>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4"><dt className="text-gray-500">{label}</dt><dd className="text-right font-bold text-gray-900">{value}</dd></div>;
}

function ContactLink({ href, icon, label, value, external = false }: { href: string; icon: React.ReactNode; label: string; value: string; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 rounded-[20px] border border-black/5 p-4 transition hover:border-black/15 hover:bg-gray-50">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">{icon}</span>
      <span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-wider text-gray-400">{label}</span><span className="block truncate text-sm font-bold text-gray-900">{value}</span></span>
      <ExternalLink size={15} className="text-gray-300" />
    </a>
  );
}
