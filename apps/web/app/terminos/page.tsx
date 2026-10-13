import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalList, LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { legalIdentity, TERMS_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Términos de uso | WeedClub' };

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos de uso"
      description="Reglas aplicables al directorio público y al área reservada para representantes de clubes."
      version={TERMS_VERSION}
    >
      <LegalSection title="1. Titular y aceptación">
        <p>El servicio WeedClub es prestado por <strong>{legalIdentity.ownerName}</strong>, con NIF/CIF {legalIdentity.taxId} y domicilio en {legalIdentity.address} (en adelante, «WeedClub»).</p>
        <p>Al navegar por el directorio aceptas las reglas aplicables a la consulta pública. Al crear una cuenta o publicar contenido declaras, además, que has leído y aceptado íntegramente estos términos y la <Link href="/privacidad" className="font-bold text-emerald-700 underline">política de privacidad</Link>.</p>
      </LegalSection>

      <LegalSection title="2. Edad y naturaleza del servicio">
        <LegalList>
          <li>El directorio está dirigido exclusivamente a personas de 18 años o más.</li>
          <li>WeedClub muestra información de asociaciones y clubes, pero no vende, entrega, anuncia precios ni intermedia en la adquisición de cannabis u otras sustancias.</li>
          <li>WeedClub no tramita altas de socios, reservas, invitaciones ni pagos y no garantiza la admisión en ningún establecimiento.</li>
          <li>Una ficha publicada, reclamada o marcada como gestionada no certifica la legalidad de la entidad, de sus actividades ni de la información facilitada.</li>
          <li>La información no sustituye asesoramiento legal o sanitario ni constituye una recomendación de consumo.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Cuentas de representantes">
        <p>El registro está reservado a propietarios, administradores o representantes con autorización suficiente para actuar por cuenta del club. Debes facilitar datos exactos, mantener segura la contraseña y avisar inmediatamente de cualquier acceso no autorizado.</p>
        <p>No se permiten cuentas de usuario final en esta fase. WeedClub puede pedir documentación adicional, rechazar una reclamación o retirar el acceso cuando no pueda verificarse la representación.</p>
      </LegalSection>

      <LegalSection title="4. Reglas de publicación">
        <p>Quien publique o modifique una ficha responde de que dispone de los derechos y autorizaciones necesarios y de que el contenido es exacto, actualizado y conforme a la ley. En particular, queda prohibido:</p>
        <LegalList>
          <li>ofrecer, vender, reservar, enviar o facilitar la adquisición ilegal de drogas o sustancias controladas;</li>
          <li>publicar precios, catálogos de producto, promociones de consumo, instrucciones para eludir controles o mensajes dirigidos a menores;</li>
          <li>atribuir al club licencias, autorizaciones, cualidades sanitarias o una condición legal que no pueda acreditarse;</li>
          <li>suplantar a otra entidad o reclamar una ficha sin autorización;</li>
          <li>publicar datos personales de terceros, documentos de identidad, información de salud o antecedentes, salvo base jurídica y necesidad acreditadas;</li>
          <li>subir imágenes sin permiso, que vulneren propiedad intelectual, intimidad o propia imagen, o que muestren a menores;</li>
          <li>introducir malware, automatizar extracciones masivas, intentar eludir controles de seguridad o interferir en el servicio;</li>
          <li>usar la plataforma para cualquier finalidad ilícita, engañosa, discriminatoria, amenazante o que lesione derechos de terceros.</li>
        </LegalList>
        <p>Las reglas operativas completas están en las <Link href="/normas-publicacion" className="font-bold text-emerald-700 underline">normas de publicación y moderación</Link>, que forman parte de estos términos.</p>
      </LegalSection>

      <LegalSection title="5. Licencia sobre el contenido">
        <p>Conservas los derechos sobre el contenido que aportas. Concedes a WeedClub una licencia no exclusiva, gratuita, revocable al cerrar la cuenta y limitada a alojar, reproducir, adaptar técnicamente y mostrar ese contenido para operar y promocionar el propio directorio. Garantizas que puedes otorgar esta licencia.</p>
      </LegalSection>

      <LegalSection title="6. Verificación, moderación y avisos">
        <p>La moderación es humana; actualmente no se adoptan decisiones de retirada mediante algoritmos. WeedClub podrá corregir, limitar, despublicar o eliminar contenido y suspender cuentas cuando existan indicios razonables de infracción, riesgo para terceros, información engañosa o requerimiento de una autoridad.</p>
        <p>Cualquier persona puede notificar contenido concreto desde <Link href="/reportar-contenido" className="font-bold text-emerald-700 underline">Reportar contenido</Link>. El aviso debe identificar con precisión la URL, explicar el motivo y presentarse de buena fe. Se comunicará la decisión y su motivo por medios electrónicos cuando existan datos de contacto válidos y resulte legalmente posible.</p>
        <p>El titular del contenido podrá solicitar una revisión escribiendo a {legalIdentity.email}, identificando la decisión impugnada y explicando el motivo.</p>
      </LegalSection>

      <LegalSection title="7. Disponibilidad y responsabilidad">
        <p>WeedClub procura mantener información y servicio disponibles, pero no garantiza ausencia de errores o interrupciones. Los datos de cada ficha proceden de fuentes públicas o de sus representantes y pueden quedar desactualizados. Antes de desplazarte o actuar, confirma la información directamente con la entidad.</p>
        <p>Nada en estos términos limita responsabilidades que legalmente no puedan excluirse. Fuera de esos supuestos, WeedClub no responde de decisiones tomadas únicamente a partir de información de terceros, servicios externos enlazados ni actividades desarrolladas por los clubes.</p>
      </LegalSection>

      <LegalSection title="8. Cambios y finalización">
        <p>Podemos modificar estos términos por cambios legales, de seguridad o del servicio. Si el cambio es relevante para una cuenta registrada, lo comunicaremos con antelación razonable por el canal disponible y pediremos una nueva aceptación cuando sea necesario.</p>
        <p>Puedes dejar de utilizar el servicio y solicitar el cierre de tu cuenta. Determinados datos podrán quedar bloqueados durante los plazos legales descritos en la política de privacidad.</p>
      </LegalSection>

      <LegalSection title="9. Ley aplicable y contacto">
        <p>Se aplica la legislación española y de la Unión Europea. Cualquier sumisión a tribunales se entiende sin perjuicio del fuero imperativo que corresponda a consumidores u otros interesados. Para consultas legales: <strong>{legalIdentity.email}</strong>.</p>
      </LegalSection>
    </LegalPage>
  );
}
