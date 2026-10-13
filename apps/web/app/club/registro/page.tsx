import type { Metadata } from 'next';
import { OwnerAuthShell } from '@/components/owner/OwnerAuthShell';
import { OwnerRegisterForm } from '@/components/owner/OwnerRegisterForm';

export const metadata: Metadata = { title: 'Registro de clubes | WeedClub' };

export default function OwnerRegisterPage() {
  return <OwnerAuthShell title="Crea el acceso de tu club" description="Este registro está reservado a propietarios y representantes autorizados. El equipo revisará la reclamación antes de asignar un perfil."><OwnerRegisterForm /></OwnerAuthShell>;
}
