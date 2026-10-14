import { createClient } from '@supabase/supabase-js';
import { DEMO_CLUBS } from '@/lib/catalog';
import type { Club } from '@/types';

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getActiveClubs(limit = 50): Promise<Club[]> {
  try {
    const supabase = publicClient();
    if (!supabase) return DEMO_CLUBS;

    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit)
      .abortSignal(AbortSignal.timeout(4_000));

    if (error || !data?.length) return DEMO_CLUBS;
    return data as Club[];
  } catch {
    return DEMO_CLUBS;
  }
}

export async function getClubByIdentifier(identifier: string): Promise<Club | null> {
  const legacyAliases: Record<string, string> = {
    '1': 'green-leaf-club-1',
    '2': 'green-leaf-club-2',
    '3': 'canna-valencia',
    '4': 'costa-blanca-social',
    'green-leaf-1': 'green-leaf-club-1',
    'green-leaf-2': 'green-leaf-club-2',
  };
  const resolvedIdentifier = legacyAliases[identifier] ?? identifier;
  const demoClub = DEMO_CLUBS.find(
    (club) => club.slug === resolvedIdentifier || club.id === resolvedIdentifier,
  );
  if (demoClub) return demoClub;

  if (!/^[a-zA-Z0-9-]+$/.test(identifier)) return null;

  try {
    const supabase = publicClient();
    if (!supabase) return null;

    const bySlug = await supabase
      .from('clubs')
      .select('*')
      .eq('slug', identifier)
      .abortSignal(AbortSignal.timeout(4_000))
      .maybeSingle();

    if (bySlug.data) return bySlug.data as Club;

    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier)) {
      const byId = await supabase
        .from('clubs')
        .select('*')
        .eq('id', identifier)
        .abortSignal(AbortSignal.timeout(4_000))
        .maybeSingle();
      if (byId.data) return byId.data as Club;
    }
  } catch {
    return null;
  }

  return null;
}
