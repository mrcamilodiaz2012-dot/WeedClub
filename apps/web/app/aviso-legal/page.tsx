import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { legalIdentity, TERMS_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Aviso legal | WeedClub' };

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso legal" description="Identificación del prestador, finalidad del sitio y condiciones generales de acceso." version={TERMS_VERSION}>
      <LegalSection title="1. Identificación del prestador">
        <dl className="grid gap-2 rounded-2xl bg-gray-50 p-5 sm:grid-cols-[160px_1fr]">
          <dt className="font-bold text-gray-950">Nombre comercial</dt><dd>{legalIdentity.tradeName}</dd>
          <dt className="font-bold text-gray-950">Titular</dt><dd>{legalIdentity.ownerName}</dd>
          <dt className="font-bold text-gray-950">NIF/CIF</dt><dd>{legalIdentity.taxId}</dd>
          <dt className="font-bold text-gray-950">Domicilio</dt><dd>{legalIdentity.address}</dd>
          <dt className="font-bold text-gray-950">Correo</dt><dd>{legalIdentity.email}</dd>
          <dt className="font-bold text-gray-950">Registro</dt><dd>{legalIdentity.registry}</dd>
        </dl>
      </LegalSection>

      <LegalSection title="2. Finalidad">
        <p>WeedClub es un directorio informativo independiente de clubes y asociaciones. Permite consultar fichas públicas y, a representantes verificados, solicitar y mantener la ficha de su entidad.</p>
        <p>WeedClub no es un club, dispensario, comercio ni servicio de intermediación. No vende sustancias, no gestiona pagos, altas, reservas o invitaciones y no autoriza ni certifica la actividad de las entidades listadas.</p>
      </LegalSection>

      <LegalSection title="3. Acceso y uso responsable">
        <p>El acceso está reservado a mayores de 18 años. Debes utilizar el sitio conforme a la ley, la buena fe y los <Link href="/terminos" className="font-bold text-emerald-700 underline">términos de uso</Link>. La mera inclusión de una entidad no debe interpretarse como recomendación, verificación jurídica o garantía de admisión.</p>
      </LegalSection>

      <LegalSection title="4. Contenidos y enlaces de terceros">
        <p>Parte de la información es aportada por clubes o procede de fuentes públicas. Aunque se habilitan mecanismos de verificación y corrección, pueden existir errores o datos desactualizados. Confirma siempre la información con la entidad correspondiente.</p>
        <p>Los enlaces externos se facilitan como referencia. WeedClub no controla ni responde de sus contenidos, disponibilidad o políticas. Al abrirlos abandonas el entorno de WeedClub.</p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual">
        <p>La marca, diseño, código y contenidos propios de WeedClub están protegidos por la normativa aplicable. Los nombres, logotipos, fotografías y marcas de clubes pertenecen a sus respectivos titulares. No se permite reproducir, extraer de forma masiva o explotar el sitio sin autorización, salvo los usos permitidos por la ley.</p>
      </LegalSection>

      <LegalSection title="6. Comunicación de incidencias">
        <p>Para errores, derechos de terceros o contenido presuntamente ilícito utiliza <Link href="/reportar-contenido" className="font-bold text-emerald-700 underline">el formulario de notificación</Link>. Para cuestiones generales o legales escribe a <strong>{legalIdentity.email}</strong>.</p>
      </LegalSection>

      <LegalSection title="7. Normativa y jurisdicción">
        <p>Este sitio se rige por la legislación española y de la Unión Europea. Se respetará en todo caso cualquier fuero imperativo que corresponda al usuario. La publicación de estas cláusulas no sustituye las obligaciones legales ni limita derechos que no puedan ser excluidos.</p>
      </LegalSection>
    </LegalPage>
  );
}
