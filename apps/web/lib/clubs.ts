import 'server-only';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Club } from '@/types';

type UnknownRecord = Record<string, unknown>;
const HIDDEN_AMENITIES = new Set(['extractos', 'comestibles', 'dab-bar']);

function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    }
  );
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

function numberOrNull(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return null;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function hoursRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
}

function coordinatesFromLocation(value: unknown): { lat: number | null; lng: number | null } {
  if (!value || typeof value !== 'object') return { lat: null, lng: null };
  const coordinates = (value as { coordinates?: unknown }).coordinates;
  if (!Array.isArray(coordinates) || coordinates.length < 2) return { lat: null, lng: null };
  return { lng: numberOrNull(coordinates[0]), lat: numberOrNull(coordinates[1]) };
}

export function normalizeClubRecord(record: UnknownRecord): Club {
  const fallbackCoordinates = coordinatesFromLocation(record.location);

  return {
    id: String(record.id ?? ''),
    name: String(record.name ?? 'Club sin nombre'),
    slug: String(record.slug ?? record.id ?? ''),
    description: stringOrNull(record.description),
    logo_url: stringOrNull(record.logo_url),
    cover_image_url: stringOrNull(record.cover_image_url),
    lat: numberOrNull(record.lat) ?? fallbackCoordinates.lat,
    lng: numberOrNull(record.lng) ?? fallbackCoordinates.lng,
    address: stringOrNull(record.address),
    city: stringOrNull(record.city),
    province: stringOrNull(record.province),
    postal_code: stringOrNull(record.postal_code),
    phone: stringOrNull(record.phone),
    email: stringOrNull(record.email),
    whatsapp: stringOrNull(record.whatsapp),
    instagram_url: stringOrNull(record.instagram_url),
    website_url: stringOrNull(record.website_url ?? record.website),
    status: record.status === 'pending' || record.status === 'suspended' ? record.status : 'active',
    is_claimed: typeof record.is_claimed === 'boolean' ? record.is_claimed : Boolean(record.owner_id),
    photos: stringArray(record.photos),
    rating: numberOrNull(record.rating) ?? 0,
    review_count: numberOrNull(record.review_count) ?? 0,
    amenities: stringArray(record.amenities).filter((amenity) => !HIDDEN_AMENITIES.has(amenity)),
    opening_hours: hoursRecord(record.opening_hours),
    distance_km: numberOrNull(record.distance_km),
    created_at: String(record.created_at ?? ''),
    updated_at: String(record.updated_at ?? record.created_at ?? ''),
  };
}

async function queryDirectory(limit: number) {
  const supabase = createPublicClient();
  const result = await supabase
    .from('club_directory')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (!result.error) return result;

  // Compatibility while the new migration is being applied to an existing
  // development project. New installations should always use the view.
  const legacyResult = await supabase
    .from('clubs')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  return legacyResult;
}

export async function getPublicClubs(limit = 200): Promise<Club[]> {
  const { data, error } = await queryDirectory(limit);
  if (error) {
    console.error('Unable to load public clubs:', error.message);
    return [];
  }
  return (data ?? []).map((row) => normalizeClubRecord(row as UnknownRecord));
}

export async function getPublicClub(identifier: string): Promise<Club | null> {
  if (!/^[a-z0-9-]{1,100}$/i.test(identifier)) return null;
  const supabase = createPublicClient();
  const directoryResult = await supabase
    .from('club_directory')
    .select('*')
    .or(`slug.eq.${identifier},id.eq.${identifier}`)
    .maybeSingle();

  if (!directoryResult.error && directoryResult.data) {
    return normalizeClubRecord(directoryResult.data as UnknownRecord);
  }

  const legacyResult = await supabase
    .from('clubs')
    .select('*')
    .or(`slug.eq.${identifier},id.eq.${identifier}`)
    .eq('status', 'active')
    .maybeSingle();

  if (legacyResult.error || !legacyResult.data) return null;
  return normalizeClubRecord(legacyResult.data as UnknownRecord);
}
