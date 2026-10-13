import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies | WeedClub",
  description: "Información sobre el uso de cookies en WeedClub.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Uso de cookies y almacenamiento local"
      description="Explicamos qué tecnologías utiliza WeedClub, para qué sirven y cuándo sería necesario solicitar tu consentimiento."
    >
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que un sitio guarda en el navegador para recordar
          información, mantener una sesión, aplicar preferencias o conocer cómo se utiliza un servicio.
          Otras tecnologías, como el almacenamiento local, pueden cumplir funciones similares.
        </p>
      </LegalSection>

      <LegalSection title="2. Uso actual en WeedClub">
        <p>
          En su configuración actual, WeedClub utiliza únicamente tecnologías necesarias para prestar
          el servicio, protegerlo y mantener la sesión cuando una persona inicia sesión. No se utilizan
          cookies propias de publicidad comportamental ni analítica no esencial.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-3 py-3 font-bold">Tecnología</th>
                <th className="border-b border-gray-200 px-3 py-3 font-bold">Finalidad</th>
                <th className="border-b border-gray-200 px-3 py-3 font-bold">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 px-3 py-3">Cookies de sesión de Supabase</td>
                <td className="border-b border-gray-200 px-3 py-3">
                  Autenticación, seguridad y mantenimiento de la sesión.
                </td>
                <td className="border-b border-gray-200 px-3 py-3">
                  Sesión o el periodo configurado para la autenticación.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-3">Almacenamiento técnico del navegador</td>
                <td className="px-3 py-3">
                  Conservar estados o preferencias imprescindibles para funciones solicitadas.
                </td>
                <td className="px-3 py-3">Hasta que se cierre la sesión o se eliminen los datos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Servicios de terceros">
        <p>
          Al utilizar mapas o iniciar sesión mediante Google o Apple, el navegador puede conectar con
          esos proveedores. Sus servicios pueden aplicar sus propias tecnologías conforme a sus
          políticas. WeedClub solo los activa cuando son necesarios para una función solicitada por la
          persona usuaria.
        </p>
      </LegalSection>

      <LegalSection title="4. Consentimiento">
        <p>
          Las cookies estrictamente necesarias no requieren consentimiento porque permiten prestar una
          función expresamente solicitada o mantener la seguridad. Si WeedClub incorpora analítica,
          publicidad u otras tecnologías opcionales, no se instalarán antes de obtener un consentimiento
          informado, y se ofrecerán opciones para aceptar o rechazar al mismo nivel.
        </p>
      </LegalSection>

      <LegalSection title="5. Cómo gestionar las cookies">
        <p>
          Puedes borrar o bloquear cookies desde la configuración de tu navegador. Si bloqueas las
          necesarias, es posible que el inicio de sesión u otras funciones no estén disponibles. Los
          menús habituales se encuentran en los apartados de privacidad, seguridad o datos del sitio de
          cada navegador.
        </p>
      </LegalSection>

      <LegalSection title="6. Actualizaciones">
        <p>
          Esta política se revisará cuando cambien las tecnologías utilizadas. La tabla se actualizará
          antes de activar nuevas categorías de cookies y, cuando sea necesario, se renovará la solicitud
          de consentimiento.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
