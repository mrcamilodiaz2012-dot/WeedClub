"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  MapPin,
  Navigation,
  Search,
} from "lucide-react";
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
  const initialClub = clubs.find(
    (club) => typeof club.lat === "number" && typeof club.lng === "number",
  );
  const [selectedClubId, setSelectedClubId] = useState<string | null>(
    initialClub?.id ?? null,
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    initialClub?.city ?? null,
  );
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [viewport, setViewport] = useState(() => ({
    latitude: initialClub?.lat ?? 40.4168,
    longitude: initialClub?.lng ?? -3.7038,
    zoom: initialClub ? 11.5 : 5.2,
  }));
  const cityMenuRef = useRef<HTMLDivElement>(null);

  const cityOptions = useMemo(() => {
    const cities = new Map<
      string,
      { name: string; latitude: number; longitude: number; clubId: string }
    >();

    clubs.forEach((club) => {
      if (
        club.city &&
        typeof club.lat === "number" &&
        typeof club.lng === "number" &&
        !cities.has(club.city.toLocaleLowerCase("es"))
      ) {
        cities.set(club.city.toLocaleLowerCase("es"), {
          name: club.city,
          latitude: club.lat,
          longitude: club.lng,
          clubId: club.id,
        });
      }
    });

    return Array.from(cities.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "es"),
    );
  }, [clubs]);

  const visibleClubs = useMemo(
    () =>
      selectedCity
        ? clubs.filter(
            (club) =>
              club.city?.toLocaleLowerCase("es") ===
              selectedCity.toLocaleLowerCase("es"),
          )
        : clubs,
    [clubs, selectedCity],
  );

  const selectedClub = useMemo(
    () => clubs.find((club) => club.id === selectedClubId),
    [clubs, selectedClubId],
  );

  useEffect(() => {
    if (!isCityMenuOpen) return;

    const closeMenu = (event: PointerEvent) => {
      if (!cityMenuRef.current?.contains(event.target as Node)) {
        setIsCityMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCityMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isCityMenuOpen]);

  const selectClub = (id: string) => {
    setSelectedClubId(id);
    const club = clubs.find((item) => item.id === id);
    if (club?.lat != null && club.lng != null) {
      setViewport({ latitude: club.lat, longitude: club.lng, zoom: 13 });
    }
    if (club?.city) setSelectedCity(club.city);
  };

  const selectCity = (city: (typeof cityOptions)[number] | null) => {
    setIsCityMenuOpen(false);

    if (!city) {
      setSelectedCity(null);
      setSelectedClubId(null);
      setViewport({ latitude: 40.4168, longitude: -3.7038, zoom: 5.2 });
      return;
    }

    setSelectedCity(city.name);
    setSelectedClubId(city.clubId);
    setViewport({
      latitude: city.latitude,
      longitude: city.longitude,
      zoom: 11.5,
    });
  };

  const directionsUrl =
    selectedClub?.lat != null && selectedClub.lng != null
      ? `https://maps.apple.com/directions?destination=${encodeURIComponent(`${selectedClub.lat},${selectedClub.lng}`)}&mode=driving`
      : null;

  return (
    <section
      className="relative h-full w-full overflow-hidden"
      aria-label="Mapa de clubes"
    >
      <h1 className="sr-only">Mapa de clubes</h1>

      <div className="absolute inset-0">
        <InteractiveMap
          clubs={visibleClubs}
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
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/95 text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-transform active:scale-95"
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={21} strokeWidth={2} />
            </Link>

            <div ref={cityMenuRef} className="pointer-events-auto relative">
              <button
                type="button"
                onClick={() => setIsCityMenuOpen((isOpen) => !isOpen)}
                className="flex h-12 max-w-[220px] items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-5 text-[16px] font-extrabold tracking-tight text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-transform active:scale-95"
                aria-haspopup="listbox"
                aria-expanded={isCityMenuOpen}
                aria-label="Cambiar ciudad"
              >
                <span className="truncate">
                  {selectedCity ?? "Todas las ciudades"}
                </span>
                <ChevronDown
                  size={17}
                  strokeWidth={2.5}
                  className={`transition-transform ${isCityMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isCityMenuOpen && (
                <div
                  role="listbox"
                  aria-label="Ciudades disponibles"
                  className="absolute left-1/2 top-[calc(100%+8px)] max-h-[55vh] w-56 -translate-x-1/2 overflow-y-auto rounded-[22px] border border-black/5 bg-white/95 p-2 shadow-[0_14px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCity === null}
                    onClick={() => selectCity(null)}
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-[14px] font-semibold transition-colors hover:bg-background-secondary"
                  >
                    Todas las ciudades
                    {selectedCity === null && (
                      <Check size={17} className="text-brand-accent" />
                    )}
                  </button>

                  {cityOptions.map((city) => {
                    const isSelected =
                      city.name.toLocaleLowerCase("es") ===
                      selectedCity?.toLocaleLowerCase("es");

                    return (
                      <button
                        key={city.name}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => selectCity(city)}
                        className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-[14px] font-semibold transition-colors hover:bg-background-secondary"
                      >
                        {city.name}
                        {isSelected && (
                          <Check size={17} className="text-brand-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/buscar"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/95 text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-transform active:scale-95"
              aria-label="Buscar"
            >
              <Search size={21} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {selectedClub && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[calc(73px+env(safe-area-inset-bottom))] z-20 px-4">
          <article className="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-3 rounded-[24px] border border-black/5 bg-white/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform active:scale-[0.98]">
            <Link
              href={`/clubs/${selectedClub.slug || selectedClub.id}`}
              className="flex min-w-0 flex-1 items-center gap-3"
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
            </Link>

            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-16 w-[78px] shrink-0 flex-col items-center justify-center gap-1 rounded-[18px] bg-[#007AFF] text-white shadow-[0_5px_16px_rgba(0,122,255,0.25)] transition-transform active:scale-95"
                aria-label={`Cómo llegar a ${selectedClub.name}`}
              >
                <Navigation size={20} strokeWidth={2.2} aria-hidden="true" />
                <span className="text-[10px] font-extrabold">Cómo llegar</span>
              </a>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
