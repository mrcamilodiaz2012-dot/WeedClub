import type { Metadata } from "next";
import { headers } from "next/headers";
import { MapDirectory } from "@/components/catalog/MapDirectory";
import { getActiveClubs } from "@/lib/clubs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mapa | WeedClub",
  description: "Explora las fichas del directorio directamente sobre el mapa.",
};

function decodeCityHeader(value: string | null) {
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseCoordinate(
  value: string | null,
  minimum: number,
  maximum: number,
) {
  if (!value) return null;

  const coordinate = Number(value);
  return Number.isFinite(coordinate) &&
    coordinate >= minimum &&
    coordinate <= maximum
    ? coordinate
    : null;
}

export default async function MapPage() {
  const requestHeaders = await headers();
  const detectedCity = decodeCityHeader(requestHeaders.get("x-vercel-ip-city"));
  const detectedLatitude = parseCoordinate(
    requestHeaders.get("x-vercel-ip-latitude"),
    -90,
    90,
  );
  const detectedLongitude = parseCoordinate(
    requestHeaders.get("x-vercel-ip-longitude"),
    -180,
    180,
  );
  const clubs = (await getActiveClubs()).filter(
    (club) => typeof club.lat === "number" && typeof club.lng === "number",
  );

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-background-secondary overscroll-none">
      <MapDirectory
        clubs={clubs}
        detectedLocation={
          detectedCity && detectedLatitude != null && detectedLongitude != null
            ? {
                city: detectedCity,
                latitude: detectedLatitude,
                longitude: detectedLongitude,
              }
            : null
        }
      />
    </main>
  );
}
