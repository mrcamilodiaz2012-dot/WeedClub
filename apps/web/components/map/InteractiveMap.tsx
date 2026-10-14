"use client";

import * as React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { motion } from "framer-motion";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Map as MapboxMap } from "mapbox-gl";
import type { Club } from "@/types";
import { trackEvent } from "@/lib/analytics";

interface InteractiveMapProps {
  clubs: Club[];
  selectedClubId: string | null;
  hoveredClubId: string | null;
  onSelectClub: (id: string, fromList?: boolean) => void;
  onHoverClub: (id: string | null) => void;
  viewport: { latitude: number; longitude: number; zoom: number };
  onViewportChange: (viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;
  showNavigationControl?: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

function applyAppleInspiredPalette(map: MapboxMap) {
  const paintRules = [
    ["background", "background-color", "#DDEDBB"],
    ["water", "fill-color", "#56B8E8"],
    ["waterway_river", "line-color", "#69BFE8"],
    ["waterway_other", "line-color", "#78C7EB"],
    ["landcover_wood", "fill-color", "#9ED36F"],
    ["landcover_grass", "fill-color", "#B9DF83"],
    ["park", "fill-color", "#AFE07E"],
    ["landcover_sand", "fill-color", "#E8DCA8"],
  ] as const;

  paintRules.forEach(([layerId, property, value]) => {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, value);
    }
  });
}

type MappableClub = Club & { lat: number; lng: number };

interface PinMarkerProps {
  club: MappableClub;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

// Componente Memoizado del Pin para evitar re-renders por hover si no le afecta
const PinMarker = React.memo(
  ({ club, isSelected, isHovered, onSelect, onHover }: PinMarkerProps) => {
    const active = isSelected || isHovered;

    return (
      <Marker
        longitude={club.lng}
        latitude={club.lat}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          onSelect(club.id);
        }}
      >
        <motion.button
          type="button"
          aria-label={`Abrir ${club.name}`}
          className="group relative z-10 cursor-pointer"
          initial={false}
          animate={{
            scale: active ? 1.06 : 1,
            zIndex: active ? 30 : 10,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          onMouseEnter={() => onHover(club.id)}
          onMouseLeave={() => onHover(null)}
        >
          <div
            className={`flex h-11 items-center border border-black/10 bg-white shadow-[0_5px_18px_rgba(0,0,0,0.22)] ${
              active
                ? "gap-2 rounded-full py-1.5 pl-2 pr-3"
                : "w-11 justify-center rounded-full p-2.5"
            }`}
          >
            <Image
              src="/logo2.svg"
              alt=""
              width={25}
              height={25}
              className="h-6 w-6 shrink-0"
              aria-hidden="true"
            />
            {active && (
              <span className="max-w-36 truncate text-[13px] font-bold tracking-tight text-gray-950">
                {club.name}
              </span>
            )}
          </div>

          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-black/10 bg-white" />
        </motion.button>
      </Marker>
    );
  },
);
PinMarker.displayName = "PinMarker";

export function InteractiveMap({
  clubs,
  selectedClubId,
  hoveredClubId,
  onSelectClub,
  onHoverClub,
  viewport,
  onViewportChange,
  showNavigationControl = true,
}: InteractiveMapProps) {
  return (
    <div className="relative h-full w-full bg-[#EEF1F3]">
      <Map
        mapboxAccessToken={
          MAPBOX_TOKEN !== "tu-mapbox-token" ? MAPBOX_TOKEN : undefined
        }
        {...viewport}
        onMove={(evt) =>
          onViewportChange({
            latitude: evt.viewState.latitude,
            longitude: evt.viewState.longitude,
            zoom: evt.viewState.zoom,
          })
        }
        onLoad={(event) => applyAppleInspiredPalette(event.target)}
        mapStyle={MAP_STYLE}
        dragRotate={false}
        touchPitch={false}
        pitchWithRotate={false}
        reuseMaps
      >
        {showNavigationControl && <NavigationControl position="top-right" />}

        {clubs
          .filter(
            (club): club is MappableClub =>
              typeof club.lat === "number" && typeof club.lng === "number",
          )
          .map((club) => (
            <PinMarker
              key={club.id}
              club={club}
              isSelected={selectedClubId === club.id}
              isHovered={hoveredClubId === club.id}
              onSelect={(id: string) => {
                trackEvent("club_pin_click", { club_id: id });
                onSelectClub(id, false);
              }}
              onHover={onHoverClub}
            />
          ))}
      </Map>
    </div>
  );
}
