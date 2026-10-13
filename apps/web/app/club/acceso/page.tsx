import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OwnerAccessForm } from '@/components/owner/OwnerAccessForm';
import { OwnerAuthShell } from '@/components/owner/OwnerAuthShell';

export const metadata: Metadata = { title: 'Acceso para clubes | WeedClub' };

export default function OwnerAccessPage() {
  return <OwnerAuthShell title="Gestiona tu club" description="Accede para reclamar un perfil, mantener sus datos al día y publicar información útil."><Suspense fallback={<div className="mt-8 h-80 animate-pulse rounded-2xl bg-gray-50" />}><OwnerAccessForm /></Suspense></OwnerAuthShell>;
}
