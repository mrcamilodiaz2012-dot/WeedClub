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
    ["background", "background-color", "#F3F1E9"],
    ["landuse_residential", "fill-color", "#F5F2EA"],
    ["water", "fill-color", "#63C6F2"],
    ["waterway_tunnel", "line-color", "#86D1F2"],
    ["waterway_river", "line-color", "#69C8F0"],
    ["waterway_other", "line-color", "#7FD0F1"],
    ["landcover_wood", "fill-color", "#A9DA83"],
    ["landcover_wood", "fill-opacity", 0.72],
    ["landcover_grass", "fill-color", "#B9E493"],
    ["landcover_grass", "fill-opacity", 0.68],
    ["park", "fill-color", "#B6E58D"],
    ["park", "fill-opacity", 0.92],
    ["park", "fill-outline-color", "#A8D97E"],
    ["park_outline", "line-color", "#A8D97E"],
    ["landcover_sand", "fill-color", "#F0E2AE"],
    ["landuse_pitch", "fill-color", "#C6E6A3"],
    ["landuse_track", "fill-color", "#D2E8B6"],
    ["landuse_cemetery", "fill-color", "#C9E3B5"],
    ["landuse_hospital", "fill-color", "#F8E8EA"],
    ["landuse_school", "fill-color", "#F2EBD3"],
    ["building", "fill-color", "#E9E8E4"],
    ["building", "fill-outline-color", "#D8D7D2"],
    ["building", "fill-opacity", 0.96],
    ["road_area_pattern", "fill-color", "#F7F6F1"],
    ["road_motorway_link_casing", "line-color", "#E5B96D"],
    ["road_link_casing", "line-color", "#D7D5CF"],
    ["road_service_track_casing", "line-color", "#DAD9D4"],
    ["road_minor_casing", "line-color", "#DAD9D4"],
    ["road_secondary_tertiary_casing", "line-color", "#D3D1CA"],
    ["road_trunk_primary_casing", "line-color", "#DFB66D"],
    ["road_motorway_casing", "line-color", "#DDAE5F"],
    ["road_motorway_link", "line-color", "#F8CD79"],
    ["road_service_track", "line-color", "#FFFFFF"],
    ["road_link", "line-color", "#FFFDF9"],
    ["road_minor", "line-color", "#FFFFFF"],
    ["road_secondary_tertiary", "line-color", "#FFFDF8"],
    ["road_trunk_primary", "line-color", "#FFD789"],
    ["road_motorway", "line-color", "#F7C668"],
    ["bridge_street", "line-color", "#FFFFFF"],
    ["bridge_secondary_tertiary", "line-color", "#FFFDF8"],
    ["bridge_trunk_primary", "line-color", "#FFD789"],
    ["bridge_motorway", "line-color", "#F7C668"],
  ] as const;

  paintRules.forEach(([layerId, property, value]) => {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, value);
    }
  });

  if (map.getLayer("road_area_pattern")) {
    map.setPaintProperty("road_area_pattern", "fill-pattern", undefined);
  }

  [
    "building-3d",
    "road_path_pedestrian",
    "tunnel_path_pedestrian",
    "bridge_path_pedestrian",
    "bridge_path_pedestrian_casing",
    "highway-name-path",
  ].forEach((layerId) => {
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, "visibility", "none");
    }
  });

  const zoomRanges = [
    ["building", 13, 24],
    ["poi_r1", 17, 24],
    ["poi_r7", 18, 24],
    ["poi_r20", 19, 24],
    ["label_city", 3, 13.5],
    ["label_city_capital", 3, 13.5],
    ["label_town", 6, 14.5],
    ["label_village", 9, 15.5],
  ] as const;

  zoomRanges.forEach(([layerId, minZoom, maxZoom]) => {
    if (map.getLayer(layerId)) {
      map.setLayerZoomRange(layerId, minZoom, maxZoom);
    }
  });

  [
    "highway-name-minor",
    "highway-name-major",
    "label_other",
    "label_village",
    "label_town",
    "label_city",
    "label_city_capital",
    "poi_r1",
    "poi_r7",
    "poi_r20",
  ].forEach((layerId) => {
    if (!map.getLayer(layerId)) return;

    map.setPaintProperty(layerId, "text-color", "#56575B");
    map.setPaintProperty(layerId, "text-halo-color", "rgba(255,255,255,0.92)");
    map.setPaintProperty(layerId, "text-halo-width", 1.35);
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
        maxPitch={0}
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
