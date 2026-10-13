import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { OwnerClubEditor } from '@/components/owner/OwnerClubEditor';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Editar club | WeedClub' };
export const dynamic = 'force-dynamic';

function coordinates(location: unknown) {
  if (!location || typeof location !== 'object') return { lat: null, lng: null };
  const value = (location as { coordinates?: unknown }).coordinates;
  if (!Array.isArray(value) || value.length < 2) return { lat: null, lng: null };
  return { lng: typeof value[0] === 'number' ? value[0] : null, lat: typeof value[1] === 'number' ? value[1] : null };
}

export default async function EditClubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/i.test(id)) notFound();

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/club/acceso?next=${encodeURIComponent(`/club/panel/${id}`)}`);

  const profile = await supabase.from('profiles').select('terms_accepted_at,terms_version,privacy_version').eq('id', user.id).maybeSingle();
  if (!profile.data?.terms_accepted_at || profile.data.terms_version !== TERMS_VERSION || profile.data.privacy_version !== PRIVACY_VERSION) redirect('/club/panel');

  const [clubResult, hoursResult, amenitiesResult, selectedResult, imagesResult] = await Promise.all([
    supabase.from('clubs').select('id,name,slug,status,description,logo_url,cover_image_url,address,city,province,postal_code,phone,email,website,whatsapp,instagram_url,location').eq('id', id).eq('owner_id', user.id).maybeSingle(),
    supabase.from('club_hours').select('day_of_week,open_time,close_time,is_closed').eq('club_id', id).order('day_of_week'),
    supabase.from('amenities').select('id,name,slug').order('name'),
    supabase.from('club_amenities').select('amenity_id').eq('club_id', id),
    supabase.from('club_images').select('id,image_url,display_order').eq('club_id', id).order('display_order'),
  ]);

  if (!clubResult.data) notFound();
  const point = coordinates(clubResult.data.location);
  const club = { ...clubResult.data, ...point };

  return (
    <OwnerClubEditor
      initialClub={club}
      initialHours={hoursResult.data ?? []}
      amenities={amenitiesResult.data ?? []}
      selectedAmenityIds={(selectedResult.data ?? []).map((item) => item.amenity_id)}
      initialImages={imagesResult.data ?? []}
    />
  );
}
