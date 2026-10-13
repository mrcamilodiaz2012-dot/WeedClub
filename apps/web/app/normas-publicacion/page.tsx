import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalList, LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { CONTENT_POLICY_VERSION, legalIdentity } from '@/lib/legal';

export const metadata: Metadata = { title: 'Normas de publicación y moderación | WeedClub' };

export default function PublicationRulesPage() {
  return (
    <LegalPage title="Normas de publicación y moderación" description="Criterios aplicados a fichas, imágenes, reclamaciones y avisos de contenido." version={CONTENT_POLICY_VERSION}>
      <LegalSection title="1. Objetivo y alcance">
        <p>Estas normas se aplican a toda información aportada por representantes de clubes y complementan los <Link href="/terminos" className="font-bold text-emerald-700 underline">términos de uso</Link>. Buscan que el directorio sea informativo, fiable, seguro para mayores de edad y respetuoso con la legislación y los derechos de terceros.</p>
      </LegalSection>

      <LegalSection title="2. Contenido admitido">
        <LegalList>
          <li>Nombre, descripción institucional, dirección, horarios y medios de contacto del club.</li>
          <li>Servicios e instalaciones descritos de forma objetiva y comprobable.</li>
          <li>Fotografías propias o autorizadas del local, su identidad visual o actividades lícitas.</li>
          <li>Información necesaria para corregir o verificar una ficha, enviada por un representante autorizado.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Contenido prohibido">
        <LegalList>
          <li>Venta, catálogo, precio, reserva, envío, promoción o instrucciones para adquirir cannabis u otras drogas.</li>
          <li>Promesas terapéuticas, sanitarias o de seguridad no autorizadas.</li>
          <li>Contenido dirigido a menores o que banalice riesgos de salud.</li>
          <li>Identidades, documentos, rostros o datos de terceros sin autorización o base jurídica.</li>
          <li>Información falsa, reseñas manipuladas, suplantación, amenazas, discriminación o infracciones de propiedad intelectual.</li>
          <li>Cualquier contenido o enlace que favorezca una actividad ilícita.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Criterios y proceso de moderación">
        <p>La revisión es humana y atiende al contexto, precisión, gravedad, riesgo, derechos afectados y posibilidad de corregir el contenido. Podemos pedir pruebas, limitar temporalmente una ficha, corregir un dato manifiestamente erróneo, despublicar contenido o suspender el acceso.</p>
        <p>No consideramos que una denuncia pruebe por sí sola una infracción. Evaluamos la notificación y procuramos adoptar una medida proporcionada. En situaciones de riesgo urgente o requerimiento válido de autoridad podremos actuar de inmediato.</p>
      </LegalSection>

      <LegalSection title="5. Notificación y revisión">
        <p>Usa <Link href="/reportar-contenido" className="font-bold text-emerald-700 underline">Reportar contenido</Link> e incluye la URL exacta y una explicación concreta. Si una decisión afecta a tu contenido, podrás pedir revisión escribiendo a <strong>{legalIdentity.email}</strong>. Una persona distinta revisará el caso cuando sea razonablemente posible.</p>
      </LegalSection>

      <LegalSection title="6. Transparencia">
        <p>WeedClub conservará un registro interno de los avisos y decisiones durante el plazo indicado en privacidad. Si el servicio alcanza una escala u obligaciones que requieran informes públicos de moderación, se publicarán con datos agregados y sin identificar a denunciantes o afectados.</p>
      </LegalSection>
    </LegalPage>
  );
}
