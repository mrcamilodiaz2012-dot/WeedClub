import { AppStoreHome } from "@/components/layout/AppStoreHome";
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  // Track visit on server/client hydration
  trackEvent('app_store_visit', { tab: 'today' });

  return (
    <main className="w-full h-screen overflow-hidden bg-background-base">
      <AppStoreHome />
    </main>
  );
}
