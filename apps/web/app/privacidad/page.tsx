import type { Metadata } from "next";
import { LegalPage, LegalSection, ServiceDisclosure } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad | WeedClub",
  description: "Información sobre el tratamiento de datos personales en WeedClub.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad"
      title="Tu información, explicada con claridad"
      description="Esta política describe qué datos personales puede tratar WeedClub, para qué los utiliza y cómo puedes ejercer tus derechos."
    >
      <LegalSection title="1. Sobre el servicio">
        <p>
          WeedClub es la denominación pública del directorio informativo disponible en
          weedclub.app. Esta política se aplica a los tratamientos vinculados a las funcionalidades
          descritas a continuación.
        </p>
        <ServiceDisclosure />
      </LegalSection>

      <LegalSection title="2. Datos que podemos tratar">
        <ul>
          <li>
            <strong>Cuenta e identificación:</strong> nombre, correo electrónico, identificadores de
            cuenta y datos proporcionados mediante Google o Apple si eliges ese acceso.
          </li>
          <li>
            <strong>Perfil y actividad:</strong> preferencias, clubes guardados, reseñas, solicitudes
            y acciones realizadas dentro de la plataforma cuando estas funciones estén disponibles.
          </li>
          <li>
            <strong>Datos de clubes y representantes:</strong> información profesional, datos de
            contacto, acreditaciones y contenido remitido para crear o reclamar una ficha.
          </li>
          <li>
            <strong>Ubicación:</strong> ciudad seleccionada y, únicamente con autorización del
            dispositivo, ubicación necesaria para mostrar resultados cercanos.
          </li>
          <li>
            <strong>Datos técnicos:</strong> dirección IP, dispositivo, navegador, registros de
            seguridad, incidencias y datos esenciales de sesión.
          </li>
          <li>
            <strong>Comunicaciones:</strong> consultas, reclamaciones y solicitudes de soporte.
          </li>
        </ul>
        <p>
          WeedClub no pretende deducir ni crear perfiles sobre hábitos de consumo o datos de salud. No
          envíes información médica ni otros datos especialmente sensibles a través de campos libres.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidades y bases jurídicas">
        <ul>
          <li>
            <strong>Prestar el servicio y gestionar la cuenta:</strong> ejecución de los términos
            aceptados y medidas solicitadas antes del registro.
          </li>
          <li>
            <strong>Mostrar resultados por ubicación:</strong> consentimiento cuando se solicite la
            ubicación precisa; la ciudad elegida se usa para ejecutar la funcionalidad solicitada.
          </li>
          <li>
            <strong>Atender consultas y ejercer derechos:</strong> consentimiento, ejecución del
            servicio y cumplimiento de obligaciones legales, según corresponda.
          </li>
          <li>
            <strong>Proteger la plataforma y prevenir abusos:</strong> interés legítimo en garantizar
            la seguridad y, cuando proceda, cumplimiento de obligaciones legales.
          </li>
          <li>
            <strong>Enviar comunicaciones no esenciales:</strong> únicamente con consentimiento,
            que podrá retirarse en cualquier momento.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Procedencia de los datos">
        <p>
          La mayoría de los datos se obtienen directamente de la persona usuaria o de su dispositivo.
          Si una ficha de club se crea a partir de fuentes públicas o información facilitada por un
          tercero, se informará al representante afectado cuando corresponda y se habilitarán medios
          para corregir o retirar la información.
        </p>
      </LegalSection>

      <LegalSection title="5. Destinatarios y proveedores">
        <p>
          Los datos podrán ser tratados por proveedores que prestan servicios de alojamiento,
          infraestructura, base de datos, autenticación, mapas, correo y seguridad. Actualmente la
          plataforma integra servicios tecnológicos de Vercel, Supabase y Mapbox, y permite utilizar
          Google o Apple para iniciar sesión cuando la persona usuaria elige esa opción.
        </p>
        <p>
          También podrán comunicarse datos a autoridades, juzgados o terceros cuando exista una
          obligación legal, una solicitud válida o sea necesario para formular, ejercer o defender
          reclamaciones.
        </p>
      </LegalSection>

      <LegalSection title="6. Transferencias internacionales">
        <p>
          Algunos proveedores pueden tratar información fuera del Espacio Económico Europeo. Cuando
          esto ocurra, se utilizarán los mecanismos reconocidos por el RGPD, como decisiones de
          adecuación o cláusulas contractuales tipo, junto con las medidas adicionales necesarias.
          La persona interesada podrá solicitar información sobre las garantías aplicables.
        </p>
      </LegalSection>

      <LegalSection title="7. Plazos de conservación">
        <p>
          Los datos de cuenta se conservarán mientras permanezca activa y, posteriormente, bloqueados
          durante los plazos necesarios para atender responsabilidades legales. Las consultas se
          mantendrán durante el tiempo necesario para resolverlas; los registros de seguridad, durante
          el periodo estrictamente necesario para investigar incidentes; y los datos basados en consentimiento,
          hasta que este se retire, sin afectar al tratamiento anterior.
        </p>
        <p>
          Cuando no sea posible establecer un plazo exacto, se aplicarán criterios como la finalidad,
          las obligaciones legales, el riesgo y la necesidad de formular o defender reclamaciones.
        </p>
      </LegalSection>

      <LegalSection title="8. Derechos de las personas">
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad de
          tus datos, así como retirar un consentimiento sin efectos retroactivos. Las solicitudes
          deberán indicar el derecho que se desea ejercer y la información necesaria para localizar
          los datos afectados. Cuando resulte necesario, podrá solicitarse información razonable
          para comprobar la identidad de quien ejerce el derecho.
        </p>
        <p>
          También puedes presentar una reclamación ante la {" "}
          <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">
            Agencia Española de Protección de Datos
          </a>
          {" "}si consideras que el tratamiento no se ajusta a la normativa.
        </p>
      </LegalSection>

      <LegalSection title="9. Menores y decisiones automatizadas">
        <p>
          WeedClub no se dirige a menores de 18 años ni solicita conscientemente sus datos. Si se
          detecta una cuenta de un menor, se adoptarán medidas para bloquearla y suprimir la información
          cuando proceda. No se toman decisiones exclusivamente automatizadas que produzcan efectos
          jurídicos o afecten significativamente de modo similar a las personas usuarias.
        </p>
      </LegalSection>

      <LegalSection title="10. Seguridad y cambios">
        <p>
          Se aplicarán medidas técnicas y organizativas proporcionadas al riesgo para proteger los
          datos frente a accesos no autorizados, pérdida o alteración. Ningún sistema es completamente
          infalible, por lo que también se mantendrán procedimientos de gestión de incidentes.
        </p>
        <p>
          Esta política se actualizará cuando cambien los tratamientos o la normativa. La versión y la
          fecha vigentes aparecerán al inicio, y los cambios materiales se comunicarán cuando proceda.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
