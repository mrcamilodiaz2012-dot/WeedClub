import type { Metadata } from 'next';
import { LegalList, LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { legalIdentity, PRIVACY_VERSION } from '@/lib/legal';

export const metadata: Metadata = { title: 'Política de privacidad | WeedClub' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" description="Cómo tratamos los datos personales al navegar, gestionar una ficha o comunicar una incidencia." version={PRIVACY_VERSION}>
      <LegalSection title="1. Responsable del tratamiento">
        <dl className="grid gap-2 rounded-2xl bg-gray-50 p-5 sm:grid-cols-[150px_1fr]">
          <dt className="font-bold text-gray-950">Responsable</dt><dd>{legalIdentity.ownerName}</dd>
          <dt className="font-bold text-gray-950">NIF/CIF</dt><dd>{legalIdentity.taxId}</dd>
          <dt className="font-bold text-gray-950">Domicilio</dt><dd>{legalIdentity.address}</dd>
          <dt className="font-bold text-gray-950">Contacto</dt><dd>{legalIdentity.email}</dd>
          {legalIdentity.dpoEmail && <><dt className="font-bold text-gray-950">DPD</dt><dd>{legalIdentity.dpoEmail}</dd></>}
        </dl>
      </LegalSection>

      <LegalSection title="2. Datos, finalidades y bases jurídicas">
        <div className="overflow-x-auto">
          <table className="min-w-[680px] border-separate border-spacing-0 text-left text-sm">
            <thead><tr><th className="border-b p-3">Actividad</th><th className="border-b p-3">Datos y finalidad</th><th className="border-b p-3">Base jurídica</th></tr></thead>
            <tbody>
              <tr><td className="border-b p-3 align-top font-bold">Navegación y seguridad</td><td className="border-b p-3 align-top">IP, cabeceras, identificadores técnicos, fecha y registros de error para entregar la web, prevenir abuso y resolver incidencias.</td><td className="border-b p-3 align-top">Interés legítimo en operar y proteger el servicio.</td></tr>
              <tr><td className="border-b p-3 align-top font-bold">Cuenta de club</td><td className="border-b p-3 align-top">Nombre del representante, correo, identificador de cuenta y datos de autenticación para crear y mantener el acceso.</td><td className="border-b p-3 align-top">Ejecución de los términos y medidas precontractuales solicitadas.</td></tr>
              <tr><td className="border-b p-3 align-top font-bold">Reclamación de ficha</td><td className="border-b p-3 align-top">Relación declarada con el club, explicación y contacto profesional para verificar la representación y prevenir suplantaciones.</td><td className="border-b p-3 align-top">Ejecución de los términos e interés legítimo en verificar a quien publica.</td></tr>
              <tr><td className="border-b p-3 align-top font-bold">Ficha pública</td><td className="border-b p-3 align-top">Información profesional o pública del club, incluida la facilitada por su representante, para mostrar y mantener el directorio.</td><td className="border-b p-3 align-top">Interés legítimo y, cuando el representante lo solicita, ejecución del servicio.</td></tr>
              <tr><td className="border-b p-3 align-top font-bold">Avisos de contenido</td><td className="border-b p-3 align-top">Nombre, correo, URL, categoría y explicación para investigar contenido presuntamente ilícito o contrario a las reglas.</td><td className="border-b p-3 align-top">Obligación legal, interés legítimo y defensa de reclamaciones.</td></tr>
              <tr><td className="p-3 align-top font-bold">Geolocalización</td><td className="p-3 align-top">Coordenadas aproximadas que autorices en el navegador para ordenar resultados cercanos. Se transmiten para calcular la consulta, pero WeedClub no las guarda en su base de datos.</td><td className="p-3 align-top">Tu solicitud y permiso expreso del dispositivo.</td></tr>
            </tbody>
          </table>
        </div>
        <p>No realizamos perfiles comerciales, publicidad comportamental ni decisiones con efectos jurídicos basadas únicamente en procesos automatizados. No tratamos datos de pago.</p>
      </LegalSection>

      <LegalSection title="3. Procedencia y datos que no debes enviar">
        <p>Los datos proceden de la propia persona interesada, del representante de un club y, para el directorio, de fuentes públicamente accesibles. No envíes documentos de identidad, historiales médicos, datos de consumo, antecedentes ni otra información especialmente sensible a través de los campos de texto.</p>
        <p>Si una ficha muestra datos personales inexactos o sin base suficiente, utiliza el canal de reporte para solicitar su revisión o retirada.</p>
      </LegalSection>

      <LegalSection title="4. Destinatarios y proveedores">
        <LegalList>
          <li><strong>Supabase</strong>, como proveedor de autenticación, base de datos y almacenamiento.</li>
          <li><strong>Vercel</strong>, cuando sea el proveedor de alojamiento del despliegue web.</li>
          <li><strong>CARTO</strong>, al cargar los mosaicos cartográficos; recibe datos técnicos como la IP y la solicitud del recurso.</li>
          <li>Administraciones, juzgados y autoridades cuando exista una obligación legal o requerimiento válido.</li>
        </LegalList>
        <p>Los enlaces a Google Maps, Instagram o WhatsApp solo cargan esos servicios cuando decides abrirlos; desde ese momento se aplican sus propias políticas.</p>
      </LegalSection>

      <LegalSection title="5. Transferencias internacionales">
        <p>Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. Antes del lanzamiento debe formalizarse el acuerdo de encargo de tratamiento con cada proveedor, elegirse una región adecuada y verificar el mecanismo aplicable, como decisiones de adecuación o cláusulas contractuales tipo con las garantías adicionales necesarias. Puedes pedir información sobre las garantías vigentes escribiendo al contacto de privacidad.</p>
      </LegalSection>

      <LegalSection title="6. Conservación">
        <LegalList>
          <li>Los registros técnicos se conservan durante el periodo breve necesario para seguridad y diagnóstico, normalmente hasta 30 días, salvo investigación de un incidente.</li>
          <li>La cuenta se conserva mientras permanezca activa. Tras solicitar su baja, los datos se eliminan o bloquean durante los plazos necesarios para atender responsabilidades legales.</li>
          <li>Una reclamación rechazada se revisará para su supresión o anonimización en un máximo de 12 meses, salvo disputa, fraude o deber de conservación.</li>
          <li>Los datos vinculados a una reclamación aprobada se mantienen mientras se gestione la ficha y, bloqueados, durante los plazos de prescripción aplicables.</li>
          <li>Los avisos de contenido y su decisión se conservarán hasta tres años para acreditar la gestión, salvo que una obligación o procedimiento exija más tiempo.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Derechos">
        <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad, retirar un consentimiento sin efectos retroactivos y no ser objeto de decisiones exclusivamente automatizadas cuando proceda.</p>
        <p>Escribe a <strong>{legalIdentity.email}</strong> indicando «Protección de datos», el derecho que quieres ejercer y la información necesaria para localizar tu cuenta. Solo pediremos acreditación adicional cuando existan dudas razonables sobre tu identidad.</p>
        <p>También puedes reclamar ante la Agencia Española de Protección de Datos en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">aepd.es</a>.</p>
      </LegalSection>

      <LegalSection title="8. Menores y seguridad">
        <p>El servicio no se dirige a menores de 18 años. Si conocemos que hemos recibido datos de un menor, los eliminaremos. Aplicamos controles de acceso, cifrado en tránsito, políticas de seguridad en base de datos y las medidas de respaldo proporcionadas por la infraestructura, sin que ningún sistema pueda considerarse absolutamente invulnerable.</p>
      </LegalSection>

      <LegalSection title="9. Cambios">
        <p>Actualizaremos esta política cuando cambien los tratamientos o la normativa. La versión y fecha vigentes aparecen al inicio; los cambios relevantes para representantes registrados se comunicarán por un canal disponible.</p>
      </LegalSection>
    </LegalPage>
  );
}
