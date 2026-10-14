"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MapPin, Search } from "lucide-react";
import type { Club } from "@/types";

const InteractiveMap = dynamic(
  () =>
    import("@/components/map/InteractiveMap").then(
      (module) => module.InteractiveMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-background-secondary animate-pulse" />
    ),
  },
);

export function MapDirectory({ clubs }: { clubs: Club[] }) {
  const [selectedClubId, setSelectedClubId] = useState<string | null>(
    clubs[0]?.id ?? null,
  );
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
    zoom: 5.2,
  });
  const selectedClub = useMemo(
    () => clubs.find((club) => club.id === selectedClubId),
    [clubs, selectedClubId],
  );

  const selectClub = (id: string) => {
    setSelectedClubId(id);
    const club = clubs.find((item) => item.id === id);
    if (club?.lat != null && club.lng != null) {
      setViewport({ latitude: club.lat, longitude: club.lng, zoom: 13 });
    }
  };

  return (
    <section
      className="relative h-full w-full overflow-hidden"
      aria-label="Mapa de clubes"
    >
      <h1 className="sr-only">Mapa de clubes</h1>

      <div className="absolute inset-0">
        <InteractiveMap
          clubs={clubs}
          selectedClubId={selectedClubId}
          hoveredClubId={hoveredClubId}
          onSelectClub={selectClub}
          onHoverClub={setHoveredClubId}
          viewport={viewport}
          onViewportChange={setViewport}
          showNavigationControl={false}
        />
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-[calc(1rem+env(safe-area-inset-top))]">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-transform active:scale-95"
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={21} strokeWidth={2} />
            </Link>

            <Link
              href="/"
              className="pointer-events-auto"
              aria-label="Ir al inicio de WeedClub"
            >
              <Image
                src="/weed-maps.svg"
                alt="WeedClub"
                width={130}
                height={37}
                className="h-8 w-auto"
              />
            </Link>

            <Link
              href="/buscar"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-transform active:scale-95"
              aria-label="Buscar"
            >
              <Search size={21} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {selectedClub && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[calc(73px+env(safe-area-inset-bottom))] z-20 px-4">
          <Link
            href={`/clubs/${selectedClub.slug || selectedClub.id}`}
            className="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-3 rounded-[24px] border border-black/5 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.98]"
          >
            <Image
              src={selectedClub.cover_image_url ?? "/portadas/cannabis.jpg"}
              alt={selectedClub.name}
              width={68}
              height={68}
              className="h-17 w-17 shrink-0 rounded-[18px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-display text-[18px] font-black tracking-tighter">
                  {selectedClub.name}
                </h2>
                {selectedClub.is_demo && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1 text-[8px] font-black uppercase text-amber-900">
                    Demo
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-text-secondary">
                <MapPin size={13} aria-hidden="true" />
                {selectedClub.city}
              </p>
              <p className="mt-1 truncate text-[11px] text-text-secondary">
                {selectedClub.address ?? "Consulta la información del club"}
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background-secondary text-text-primary">
              <ChevronRight size={19} aria-hidden="true" />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
