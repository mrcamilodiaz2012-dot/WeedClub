"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Navigation,
  Search,
  X,
} from "lucide-react";
import type { Club } from "@/types";

type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

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
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "locating" | "ready" | "error"
  >("idle");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationHelpOpen, setIsLocationHelpOpen] = useState(false);
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

  const locateUser = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Tu navegador no permite obtener la ubicación.");
      return;
    }

    setLocationStatus("locating");
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setUserLocation(currentLocation);
        setViewport({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          zoom: 14.5,
        });
        setLocationStatus("ready");
        setIsLocationHelpOpen(false);
      },
      (error) => {
        setLocationStatus("error");

        if (error.code === 1) {
          setLocationError(null);
          setIsLocationHelpOpen(true);
          return;
        }

        setLocationError(
          "No hemos podido obtener tu ubicación. Inténtalo de nuevo.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
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
          userLocation={userLocation}
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
                className="flex items-center gap-1.5 px-2 py-2 text-[16px] font-extrabold tracking-tight text-text-primary transition-opacity active:opacity-60"
                aria-haspopup="listbox"
                aria-expanded={isCityMenuOpen}
                aria-label="Cambiar ciudad"
              >
                <span>{selectedCity ?? "Todas las ciudades"}</span>
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

      {isLocationHelpOpen && (
        <div
          className="absolute inset-0 z-40 flex items-end justify-center bg-black/20 px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 backdrop-blur-[2px]"
          onClick={() => setIsLocationHelpOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-help-title"
            className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F3FF] text-[#007AFF]">
                <LocateFixed size={24} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setIsLocationHelpOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background-secondary text-text-primary"
                aria-label="Cerrar instrucciones"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <h2
              id="location-help-title"
              className="mt-4 font-display text-[24px] font-black tracking-tight text-text-primary"
            >
              Permite tu ubicación
            </h2>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              Safari tiene bloqueado el acceso para weedclub.app. Puedes
              activarlo sin salir de esta página:
            </p>

            <ol className="mt-4 space-y-3">
              {[
                "Pulsa el icono de página a la izquierda de weedclub.app.",
                "Entra en Configuración del sitio web. Si aparece “Más”, ábrelo primero.",
                "En Ubicación elige Permitir y vuelve a intentarlo.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-[13px] font-semibold leading-5 text-text-primary"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background-secondary text-[11px] font-black">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => {
                setIsLocationHelpOpen(false);
                locateUser();
              }}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-[#007AFF] text-[14px] font-extrabold text-white transition-transform active:scale-[0.98]"
            >
              Volver a intentar
            </button>

            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-[13px] font-bold text-[#007AFF]"
              >
                <Navigation size={17} aria-hidden="true" />
                Abrir la ruta de todos modos
              </a>
            )}
          </section>
        </div>
      )}

      {locationError && (
        <div
          role="alert"
          className="absolute inset-x-4 top-[calc(5.25rem+env(safe-area-inset-top))] z-30 mx-auto flex max-w-md items-center gap-3 rounded-[18px] border border-black/5 bg-white/95 px-4 py-3 text-[13px] font-semibold text-text-primary shadow-[0_10px_32px_rgba(0,0,0,0.16)] backdrop-blur-xl"
        >
          <span className="min-w-0 flex-1">{locationError}</span>
          <button
            type="button"
            onClick={locateUser}
            className="shrink-0 text-[12px] font-extrabold text-[#007AFF]"
          >
            Reintentar
          </button>
          <button
            type="button"
            onClick={() => setLocationError(null)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-secondary"
            aria-label="Cerrar aviso"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={locateUser}
        disabled={locationStatus === "locating"}
        className={`absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_6px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all active:scale-95 disabled:cursor-wait ${
          locationStatus === "ready"
            ? "border-white/70 bg-[#007AFF] text-white"
            : "border-black/5 bg-white/95 text-[#007AFF]"
        } ${
          selectedClub
            ? "bottom-[calc(174px+env(safe-area-inset-bottom))]"
            : "bottom-[calc(73px+env(safe-area-inset-bottom))]"
        }`}
        aria-label={
          locationStatus === "locating"
            ? "Obteniendo tu ubicación"
            : "Mostrar mi ubicación"
        }
      >
        {locationStatus === "locating" ? (
          <LoaderCircle
            size={22}
            strokeWidth={2.2}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          <LocateFixed size={22} strokeWidth={2.2} aria-hidden="true" />
        )}
      </button>

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
