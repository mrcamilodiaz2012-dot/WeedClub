import { Bell } from 'lucide-react';
import { DirectoryHeader } from '@/components/catalog/DirectoryHeader';

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-background-base pb-28">
      <DirectoryHeader
        eyebrow="ACTIVIDAD"
        title="Notificaciones"
        description="Aquí aparecerán las novedades relevantes cuando la cuenta de usuario vuelva a incorporarse al alcance del proyecto."
      />
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center mx-auto text-text-secondary"><Bell size={28} /></div>
        <h2 className="text-[20px] font-display font-black mt-5">No hay notificaciones</h2>
        <p className="text-[14px] leading-relaxed text-text-secondary mt-2">La página queda conectada, sin activar todavía funciones de usuario ni enviar avisos.</p>
      </div>
    </main>
  );
}
