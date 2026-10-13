'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export function ClaimReviewButtons({ claimId }: { claimId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const review = async (approve: boolean) => {
    setLoading(true);
    setError('');
    const result = await createClient().rpc('review_club_claim', { p_claim_id: claimId, p_approve: approve });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <div className="flex gap-2">
        <button type="button" disabled={loading} onClick={() => review(false)} className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-50 disabled:opacity-50"><X size={15} /> Rechazar</button>
        <button type="button" disabled={loading} onClick={() => review(true)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-50"><Check size={15} /> Aprobar</button>
      </div>
      {error && <p className="mt-2 max-w-xs text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
