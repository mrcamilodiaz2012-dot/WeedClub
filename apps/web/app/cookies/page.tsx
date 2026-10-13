import type { Metadata } from 'next';
import { LegalList, LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { COOKIES_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Política de cookies | WeedClub' };

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" description="Tecnologías de almacenamiento local utilizadas por WeedClub y cómo controlarlas." version={COOKIES_VERSION}>
      <LegalSection title="1. Situación actual">
        <p>WeedClub no utiliza cookies publicitarias, de personalización comercial ni de analítica. Solo emplea almacenamiento estrictamente necesario para la seguridad, la sesión del área de clubes y la comprobación de mayoría de edad.</p>
        <p>Por ello no se muestra un panel de aceptación de cookies opcionales. Si en el futuro se incorpora analítica u otra tecnología no necesaria, permanecerá desactivada hasta obtener una elección válida, con opciones equivalentes para aceptar y rechazar.</p>
      </LegalSection>

      <LegalSection title="2. Tecnologías utilizadas">
        <div className="overflow-x-auto">
          <table className="min-w-[650px] border-separate border-spacing-0 text-left text-sm">
            <thead><tr><th className="border-b p-3">Nombre o familia</th><th className="border-b p-3">Tipo</th><th className="border-b p-3">Finalidad</th><th className="border-b p-3">Duración</th></tr></thead>
            <tbody>
              <tr><td className="border-b p-3 align-top font-mono text-xs">sb-*-auth-token</td><td className="border-b p-3 align-top">Cookie técnica de Supabase</td><td className="border-b p-3 align-top">Mantener y renovar de forma segura la sesión del representante del club.</td><td className="border-b p-3 align-top">La necesaria para la sesión y su renovación; se elimina al cerrar sesión o expirar.</td></tr>
              <tr><td className="p-3 align-top font-mono text-xs">weedclub_age_confirmed</td><td className="p-3 align-top">Almacenamiento local propio</td><td className="p-3 align-top">Recordar que el visitante confirmó tener al menos 18 años y evitar repetir el aviso.</td><td className="p-3 align-top">Hasta 12 meses o hasta que el usuario borre los datos del sitio.</td></tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Recursos y enlaces externos">
        <p>El mapa descarga recursos cartográficos de CARTO, que puede recibir la dirección IP y datos técnicos necesarios para servirlos. Los enlaces a Google Maps, Instagram o WhatsApp no cargan esos servicios hasta que decides abrirlos. Esos terceros gestionan sus propias cookies conforme a sus políticas.</p>
      </LegalSection>

      <LegalSection title="4. Cómo controlar o borrar los datos">
        <p>Puedes borrar las cookies y el almacenamiento local desde la configuración de tu navegador. Si bloqueas las cookies técnicas, el directorio público seguirá siendo consultable, pero el acceso y la gestión de clubes podrían no funcionar.</p>
        <LegalList>
          <li>Busca en tu navegador «Privacidad», «Cookies» o «Datos de sitios».</li>
          <li>Selecciona este dominio y elimina sus datos para retirar la confirmación de edad y cerrar la persistencia local.</li>
          <li>Cierra también la sesión desde el panel del club si habías iniciado sesión.</li>
        </LegalList>
      </LegalSection>
    </LegalPage>
  );
}
