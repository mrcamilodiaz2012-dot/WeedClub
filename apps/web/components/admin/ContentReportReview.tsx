'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export function ContentReportReview({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const review = async (status: 'resolved' | 'rejected') => {
    if (reason.trim().length < 10) {
      setError('Escribe una motivación de al menos 10 caracteres.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await createClient().rpc('review_content_report', {
      p_report_id: reportId,
      p_status: status,
      p_decision_reason: reason.trim(),
    });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    router.refresh();
  };

  return (
    <div className="mt-5 border-t border-black/5 pt-5">
      <label className="block text-xs font-black uppercase tracking-wider text-gray-500">Motivación de la decisión<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} maxLength={2000} className="mt-2 w-full rounded-xl border border-black/10 p-3 text-sm normal-case tracking-normal text-gray-800 outline-none focus:border-emerald-600" placeholder="Indica qué se comprobó y por qué se actúa o se rechaza el aviso." /></label>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" disabled={loading} onClick={() => review('rejected')} className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-50 disabled:opacity-50"><X size={15} /> Rechazar aviso</button>
        <button type="button" disabled={loading} onClick={() => review('resolved')} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-50"><Check size={15} /> Marcar atendido</button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
