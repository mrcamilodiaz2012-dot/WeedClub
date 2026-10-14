import type { Metadata } from "next";
import { MapDirectory } from "@/components/catalog/MapDirectory";
import { getActiveClubs } from "@/lib/clubs";

export const metadata: Metadata = {
  title: "Mapa | WeedClub",
  description: "Explora las fichas del directorio directamente sobre el mapa.",
};

export default async function MapPage() {
  const clubs = (await getActiveClubs()).filter(
    (club) => typeof club.lat === "number" && typeof club.lng === "number",
  );

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-background-secondary overscroll-none">
      <MapDirectory clubs={clubs} />
    </main>
  );
}
