'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export function OwnerSignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut();
        router.replace('/club/acceso');
        router.refresh();
      }}
      className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold hover:bg-gray-50"
    >
      <LogOut size={16} /> Salir
    </button>
  );
}
