import { AppStoreHome } from '@/components/layout/AppStoreHome';
import { getActiveClubs } from '@/lib/clubs';

export const revalidate = 300;

export default async function Home() {
  const clubs = await getActiveClubs(20);

  return (
    <main className="w-full h-screen overflow-hidden bg-background-base">
      <AppStoreHome clubs={clubs} />
    </main>
  );
}
