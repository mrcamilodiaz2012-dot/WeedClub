'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ImagePlus, Save, Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { CONTENT_POLICY_VERSION } from '@/lib/legal';

type EditableClub = {
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  whatsapp: string | null;
  instagram_url: string | null;
  lat: number | null;
  lng: number | null;
};

type Hour = { day_of_week: number; open_time: string | null; close_time: string | null; is_closed: boolean };
type Amenity = { id: string; name: string; slug: string };
type ClubImage = { id: string; image_url: string; display_order: number };

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function OwnerClubEditor({ initialClub, initialHours, amenities, selectedAmenityIds, initialImages }: { initialClub: EditableClub; initialHours: Hour[]; amenities: Amenity[]; selectedAmenityIds: string[]; initialImages: ClubImage[] }) {
  const [club, setClub] = useState(initialClub);
  const [hours, setHours] = useState<Hour[]>(() => DAYS.map((_, day) => initialHours.find((hour) => hour.day_of_week === day) ?? { day_of_week: day, open_time: '10:00', close_time: '22:00', is_closed: day === 0 }));
  const [selectedAmenities, setSelectedAmenities] = useState(new Set(selectedAmenityIds));
  const [images, setImages] = useState(initialImages);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [contentCertified, setContentCertified] = useState(false);

  const location = useMemo(() => club.lat != null && club.lng != null ? `POINT(${club.lng} ${club.lat})` : null, [club.lat, club.lng]);

  const updateField = (field: keyof EditableClub, value: string | number | null) => setClub((current) => ({ ...current, [field]: value }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contentCertified) {
      setError('Debes confirmar que el contenido cumple las normas de publicación.');
      return;
    }
    setSaving(true);
    setMessage('');
    setError('');
    const supabase = createClient();
    const clubResult = await supabase.from('clubs').update({
      name: club.name.trim(),
      description: club.description || null,
      logo_url: club.logo_url || null,
      cover_image_url: club.cover_image_url || null,
      address: club.address || null,
      city: club.city || null,
      province: club.province || null,
      postal_code: club.postal_code || null,
      phone: club.phone || null,
      email: club.email || null,
      website: club.website || null,
      whatsapp: club.whatsapp || null,
      instagram_url: club.instagram_url || null,
      location,
      content_certified_at: new Date().toISOString(),
      content_terms_version: CONTENT_POLICY_VERSION,
    }).eq('id', club.id);

    if (clubResult.error) {
      setError(clubResult.error.message);
      setSaving(false);
      return;
    }

    const hourResult = await supabase.from('club_hours').upsert(
      hours.map((hour) => ({ club_id: club.id, day_of_week: hour.day_of_week, open_time: hour.is_closed ? null : hour.open_time, close_time: hour.is_closed ? null : hour.close_time, is_closed: hour.is_closed })),
      { onConflict: 'club_id,day_of_week' }
    );
    if (hourResult.error) {
      setError(hourResult.error.message);
      setSaving(false);
      return;
    }

    const deleteAmenities = await supabase.from('club_amenities').delete().eq('club_id', club.id);
    if (deleteAmenities.error) {
      setError(deleteAmenities.error.message);
      setSaving(false);
      return;
    }
    if (selectedAmenities.size > 0) {
      const amenitiesResult = await supabase.from('club_amenities').insert([...selectedAmenities].map((amenityId) => ({ club_id: club.id, amenity_id: amenityId })));
      if (amenitiesResult.error) {
        setError(amenitiesResult.error.message);
        setSaving(false);
        return;
      }
    }

    setMessage('Cambios guardados correctamente.');
    setContentCertified(false);
    setSaving(false);
  };

  const uploadPhoto = async (file: File | undefined) => {
    if (!file) return;
    setError('');
    if (!contentCertified) {
      setError('Confirma primero que el contenido cumple las normas de publicación.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setError('Selecciona una imagen JPG, PNG o WebP de hasta 10 MB.');
      return;
    }
    setUploading(true);
    let safeFile: File;
    try {
      safeFile = await sanitizeImage(file);
    } catch {
      setError('No pudimos procesar la imagen. Comprueba que el archivo sea válido.');
      setUploading(false);
      return;
    }
    const supabase = createClient();
    const safeName = safeFile.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    const path = `${club.id}/${crypto.randomUUID()}-${safeName}`;
    const upload = await supabase.storage.from('club_assets').upload(path, safeFile, { upsert: false, contentType: safeFile.type });
    if (upload.error) {
      setError(upload.error.message);
      setUploading(false);
      return;
    }
    const publicUrl = supabase.storage.from('club_assets').getPublicUrl(path).data.publicUrl;
    const inserted = await supabase.from('club_images').insert({ club_id: club.id, image_url: publicUrl, display_order: images.length }).select('id,image_url,display_order').single();
    if (inserted.error) setError(inserted.error.message);
    else setImages((current) => [...current, inserted.data as ClubImage]);
    setUploading(false);
  };

  const deletePhoto = async (image: ClubImage) => {
    const supabase = createClient();
    const marker = '/club_assets/';
    const storagePath = image.image_url.includes(marker) ? decodeURIComponent(image.image_url.split(marker)[1] ?? '') : '';
    if (storagePath) await supabase.storage.from('club_assets').remove([storagePath]);
    const result = await supabase.from('club_images').delete().eq('id', image.id).eq('club_id', club.id);
    if (result.error) setError(result.error.message);
    else setImages((current) => current.filter((item) => item.id !== image.id));
  };

  return (
    <main className="min-h-screen bg-[#f6f7f5] px-5 py-8 pb-28">
      <form onSubmit={save} className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/club/panel" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black"><ArrowLeft size={17} /> Panel</Link><h1 className="mt-3 text-3xl font-black tracking-tight">Editar {club.name}</h1><p className="mt-1 text-sm text-gray-500">Estado de publicación: {club.status}</p></div>
          <div className="flex gap-2">{club.status === 'active' && <Link href={`/clubs/${club.slug}`} target="_blank" className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-bold">Perfil público <ExternalLink size={16} /></Link>}<button disabled={saving} className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-black text-white disabled:opacity-50"><Save size={17} /> {saving ? 'Guardando…' : 'Guardar'}</button></div>
        </header>

        {message && <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">{message}</p>}
        {error && <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <EditorSection title="Información principal">
            <TextField label="Nombre" value={club.name} onChange={(value) => updateField('name', value)} required />
            <label className="block"><span className="text-sm font-bold">Descripción</span><textarea rows={7} value={club.description ?? ''} onChange={(event) => updateField('description', event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 p-3 outline-none focus:border-emerald-600" /></label>
            <TextField label="Imagen de portada (URL)" value={club.cover_image_url ?? ''} onChange={(value) => updateField('cover_image_url', value)} />
            <TextField label="Logo (URL)" value={club.logo_url ?? ''} onChange={(value) => updateField('logo_url', value)} />
          </EditorSection>

          <EditorSection title="Ubicación">
            <TextField label="Dirección" value={club.address ?? ''} onChange={(value) => updateField('address', value)} />
            <div className="grid grid-cols-2 gap-3"><TextField label="Ciudad" value={club.city ?? ''} onChange={(value) => updateField('city', value)} /><TextField label="Provincia" value={club.province ?? ''} onChange={(value) => updateField('province', value)} /></div>
            <TextField label="Código postal" value={club.postal_code ?? ''} onChange={(value) => updateField('postal_code', value)} />
            <div className="grid grid-cols-2 gap-3"><NumberField label="Latitud" value={club.lat} onChange={(value) => updateField('lat', value)} /><NumberField label="Longitud" value={club.lng} onChange={(value) => updateField('lng', value)} /></div>
          </EditorSection>

          <EditorSection title="Contacto">
            <div className="grid grid-cols-2 gap-3"><TextField label="Teléfono" value={club.phone ?? ''} onChange={(value) => updateField('phone', value)} /><TextField label="WhatsApp" value={club.whatsapp ?? ''} onChange={(value) => updateField('whatsapp', value)} /></div>
            <TextField label="Correo" type="email" value={club.email ?? ''} onChange={(value) => updateField('email', value)} />
            <TextField label="Sitio web" type="url" value={club.website ?? ''} onChange={(value) => updateField('website', value)} />
            <TextField label="Instagram" type="url" value={club.instagram_url ?? ''} onChange={(value) => updateField('instagram_url', value)} />
          </EditorSection>

          <EditorSection title="Servicios">
            <div className="grid grid-cols-2 gap-2">{amenities.map((amenity) => <label key={amenity.id} className="flex items-center gap-2 rounded-xl border border-black/5 p-3 text-sm font-semibold"><input type="checkbox" checked={selectedAmenities.has(amenity.id)} onChange={() => setSelectedAmenities((current) => { const next = new Set(current); if (next.has(amenity.id)) next.delete(amenity.id); else next.add(amenity.id); return next; })} /> {amenity.name}</label>)}</div>
          </EditorSection>
        </div>

        <EditorSection title="Horarios" className="mt-6">
          <div className="space-y-2">{hours.map((hour, index) => <div key={hour.day_of_week} className="grid items-center gap-2 rounded-xl bg-gray-50 p-3 sm:grid-cols-[120px_1fr_1fr_auto]"><span className="text-sm font-bold">{DAYS[hour.day_of_week]}</span><input type="time" disabled={hour.is_closed} value={(hour.open_time ?? '10:00').slice(0, 5)} onChange={(event) => setHours((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, open_time: event.target.value } : item))} className="rounded-lg border border-black/10 bg-white p-2 disabled:opacity-40" /><input type="time" disabled={hour.is_closed} value={(hour.close_time ?? '22:00').slice(0, 5)} onChange={(event) => setHours((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, close_time: event.target.value } : item))} className="rounded-lg border border-black/10 bg-white p-2 disabled:opacity-40" /><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={hour.is_closed} onChange={(event) => setHours((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, is_closed: event.target.checked } : item))} /> Cerrado</label></div>)}</div>
        </EditorSection>

        <EditorSection title="Galería" className="mt-6">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm font-bold hover:border-emerald-600"><ImagePlus size={20} /> {uploading ? 'Procesando y subiendo…' : 'Añadir fotografía'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadPhoto(event.target.files?.[0])} className="sr-only" /></label>
          <p className="text-xs leading-5 text-gray-500">La imagen se redimensiona y se vuelve a codificar antes de subirla para eliminar metadatos ocultos. No publiques rostros, matrículas, documentos o material de terceros sin autorización.</p>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.image_url} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => deletePhoto(image)} className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white opacity-0 transition group-hover:opacity-100" aria-label="Eliminar foto"><Trash2 size={15} /></button>
                  <button type="button" onClick={() => updateField('cover_image_url', image.image_url)} className="absolute inset-x-2 bottom-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-black opacity-0 transition group-hover:opacity-100">Usar de portada</button>
                </div>
              ))}
            </div>
          )}
        </EditorSection>

        <label className="mt-6 flex items-start gap-3 rounded-[24px] border border-black/10 bg-white p-5 text-sm leading-6 text-gray-700">
          <input required type="checkbox" checked={contentCertified} onChange={(event) => setContentCertified(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
          <span>Confirmo que la información es exacta, que dispongo de los derechos necesarios y que no contiene venta, precios, promoción de sustancias, datos personales indebidos ni contenido contrario a las <Link href="/normas-publicacion" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">normas de publicación</Link>.</span>
        </label>
      </form>
    </main>
  );
}

function EditorSection({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) { return <section className={`rounded-[26px] border border-black/5 bg-white p-5 shadow-sm md:p-6 ${className}`}><h2 className="mb-5 text-xl font-black">{title}</h2><div className="space-y-4">{children}</div></section>; }
function TextField({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) { return <label className="block"><span className="text-sm font-bold">{label}</span><input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 p-3 outline-none focus:border-emerald-600" /></label>; }
function NumberField({ label, value, onChange }: { label: string; value: number | null; onChange: (value: number | null) => void }) { return <label className="block"><span className="text-sm font-bold">{label}</span><input type="number" step="any" value={value ?? ''} onChange={(event) => onChange(event.target.value ? Number(event.target.value) : null)} className="mt-2 w-full rounded-xl border border-black/10 p-3 outline-none focus:border-emerald-600" /></label>; }

async function sanitizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const maxDimension = 2400;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Image conversion failed')), 'image/webp', 0.88);
  });
  const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 80) || 'club-photo';
  return new File([blob], `${baseName}.webp`, { type: 'image/webp', lastModified: Date.now() });
}
