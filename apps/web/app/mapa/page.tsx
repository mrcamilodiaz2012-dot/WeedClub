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

export default async function MapPage() {
  const requestHeaders = await headers();
  const detectedCity = decodeCityHeader(requestHeaders.get("x-vercel-ip-city"));
  const clubs = (await getActiveClubs()).filter(
    (club) => typeof club.lat === "number" && typeof club.lng === "number",
  );

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-background-secondary overscroll-none">
      <MapDirectory clubs={clubs} detectedCity={detectedCity} />
    </main>
  );
}
