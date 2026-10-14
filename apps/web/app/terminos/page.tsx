import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalConfig } from "@/lib/legal-config";

export const metadata: Metadata = {
  title: "Términos de uso | WeedClub",
  description: "Condiciones aplicables al uso de WeedClub.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Términos de uso"
      title="Reglas para utilizar WeedClub"
      description="Estas condiciones explican qué ofrece la plataforma, cuáles son sus límites y qué responsabilidades asume cada parte."
    >
      <LegalSection title="1. Ámbito y aceptación">
        <p>
          Estos términos regulan el acceso y uso de {legalConfig.domain}. Al utilizar la plataforma
          o crear una cuenta, la persona usuaria declara haber leído y aceptado estas condiciones y
          la Política de privacidad. Si no está de acuerdo, debe abstenerse de usar el servicio.
        </p>
      </LegalSection>

      <LegalSection title="2. Requisito de edad">
        <p>
          WeedClub se dirige exclusivamente a personas mayores de 18 años. Queda prohibido el acceso
          de menores a contenidos relacionados con cannabis, así como proporcionar datos falsos para
          evitar controles de edad.
        </p>
        <p>
          Ser mayor de edad no implica que el consumo, cultivo, posesión, transporte o distribución
          de cannabis sea legal. La persona usuaria es responsable de conocer y respetar la normativa
          aplicable en su territorio.
        </p>
      </LegalSection>

      <LegalSection title="3. Naturaleza del servicio">
        <p>
          WeedClub es un directorio y servicio informativo. No es una asociación cannábica, no vende
          ni distribuye cannabis, no tramita altas como socio, no garantiza el acceso a clubes y no
          interviene en acuerdos entre usuarios y entidades listadas.
        </p>
        <p>
          La información sobre variedades, concentraciones, efectos o productos tiene carácter
          descriptivo y no constituye consejo médico, recomendación de consumo, publicidad de venta
          ni confirmación de disponibilidad.
        </p>
      </LegalSection>

      <LegalSection title="4. Cuentas de usuario">
        <p>
          Cuando una función requiera registro, la persona usuaria deberá facilitar información
          exacta, proteger sus credenciales y avisar de cualquier acceso no autorizado. Las cuentas
          son personales y no pueden cederse ni utilizarse para suplantar a terceros.
        </p>
        <p>
          WeedClub podrá limitar o suspender una cuenta cuando exista un riesgo de seguridad, un uso
          fraudulento, un incumplimiento de estos términos o una obligación legal.
        </p>
      </LegalSection>

      <LegalSection title="5. Fichas de clubes y contenido de terceros">
        <p>
          Los clubes y responsables de fichas deben mantener información veraz, actualizada y lícita,
          disponer de los derechos sobre los materiales publicados y evitar afirmaciones sanitarias,
          comerciales o administrativas que puedan inducir a error.
        </p>
        <p>
          La presencia en WeedClub no constituye una licencia, certificación o validación legal. Cada
          entidad conserva plena responsabilidad sobre su organización, actividad, admisión de
          miembros y cumplimiento normativo.
        </p>
      </LegalSection>

      <LegalSection title="6. Conductas prohibidas">
        <p>No está permitido utilizar WeedClub para:</p>
        <ul>
          <li>vender, comprar, distribuir o facilitar el acceso ilícito a sustancias controladas;</li>
          <li>promover el consumo de cannabis o dirigir contenidos relacionados a menores;</li>
          <li>publicar información falsa, engañosa, discriminatoria o que vulnere derechos;</li>
          <li>subir malware, interferir en la seguridad o acceder sin autorización a sistemas;</li>
          <li>extraer datos de forma masiva o reutilizar el directorio con fines no autorizados;</li>
          <li>suplantar a una persona, un club, una asociación o cualquier otra entidad.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Moderación y retirada">
        <p>
          WeedClub podrá revisar, corregir, desindexar o retirar contenido cuando vulnere estos
          términos, pueda ser ilícito, afecte a derechos de terceros o resulte necesario para proteger
          la plataforma. Cuando corresponda, se informará al responsable del contenido sobre la
          decisión y las vías disponibles para solicitar su revisión.
        </p>
      </LegalSection>

      <LegalSection title="8. Disponibilidad y responsabilidad">
        <p>
          Se procura mantener el servicio disponible y la información actualizada, pero no se garantiza
          que esté libre de errores o interrupciones. WeedClub no responde de decisiones tomadas
          únicamente a partir de fichas de terceros ni de daños causados por actividades ajenas a la
          plataforma, dentro de los límites permitidos por la ley.
        </p>
        <p>
          Nada en estos términos excluye responsabilidades que legalmente no puedan limitarse ni
          derechos imperativos de consumidores y usuarios.
        </p>
      </LegalSection>

      <LegalSection title="9. Modificaciones">
        <p>
          Estas condiciones podrán actualizarse por cambios legales, técnicos o funcionales. La fecha
          y versión vigentes aparecerán al comienzo del documento. Los cambios materiales se
          comunicarán por medios adecuados antes de que resulten exigibles cuando la ley lo requiera.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
