import { AppStoreHome } from '@/components/layout/AppStoreHome';
import { getPublicClubs } from '@/lib/clubs';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const clubs = await getPublicClubs(100);

  return <AppStoreHome clubs={clubs} />;
}
