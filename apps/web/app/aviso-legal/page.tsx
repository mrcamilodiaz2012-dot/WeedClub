import type { Metadata } from "next";
import { LegalPage, LegalSection, ServiceDisclosure } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Aviso legal | WeedClub",
  description: "Información general del servicio y condiciones de acceso a WeedClub.",
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Aviso legal"
      title="Información del servicio"
      description="Este documento provisional explica la naturaleza de WeedClub y las reglas básicas de acceso a weedclub.app sin publicar datos personales."
    >
      <LegalSection title="1. Identificación y estado del documento">
        <p>
          WeedClub se presenta públicamente mediante su marca y dominio. Esta versión no publica el
          nombre, identificación fiscal, domicilio ni datos registrales de ninguna persona física.
          Tampoco afirma que esta omisión satisfaga las obligaciones de identificación que pudieran
          resultar aplicables al servicio.
        </p>
        <ServiceDisclosure />
        <p>
          Antes de operar públicamente o activar funciones que recojan datos personales, deberá
          revisarse el encaje jurídico del servicio y completar la información obligatoria mediante
          una solución válida que preserve, en la medida legalmente posible, la privacidad personal.
        </p>
      </LegalSection>

      <LegalSection title="2. Finalidad de la plataforma">
        <p>
          WeedClub ofrece un directorio informativo de asociaciones, clubes, eventos y otros
          establecimientos relacionados con el sector del cannabis. Su finalidad es facilitar la
          consulta y organización de información. WeedClub no vende, suministra ni intermedia en la
          adquisición de cannabis u otras sustancias controladas, y la información publicada no debe
          interpretarse como una invitación al consumo.
        </p>
        <p>
          WeedClub no gestiona los clubes incluidos en el directorio ni garantiza que una entidad
          cumpla todos los requisitos administrativos, asociativos o de otra naturaleza que le sean
          aplicables. Las personas usuarias deben comprobar esa información directamente con cada
          entidad y actuar siempre conforme a la legislación vigente.
        </p>
      </LegalSection>

      <LegalSection title="3. Acceso y uso responsable">
        <p>
          El contenido relacionado con cannabis se dirige exclusivamente a personas mayores de 18
          años. No debe utilizarse la plataforma para facilitar operaciones ilícitas, promover el
          consumo, eludir controles de acceso o poner en contacto a personas para adquirir o
          distribuir sustancias controladas.
        </p>
        <p>
          El acceso al sitio implica un uso diligente, lícito y respetuoso con los derechos de
          terceros. Las condiciones completas están disponibles en los Términos de uso.
        </p>
      </LegalSection>

      <LegalSection title="4. Información de terceros y enlaces">
        <p>
          Las fichas pueden contener información, imágenes y enlaces aportados por terceros. Cada
          tercero responde de la exactitud, actualidad y licitud de sus contenidos. WeedClub podrá
          corregir, limitar o retirar información cuando detecte errores, reciba una notificación
          suficientemente fundada o deba cumplir una obligación legal.
        </p>
        <p>
          Los enlaces externos se facilitan únicamente para comodidad del usuario. WeedClub no
          controla ni hace suyos sus contenidos, políticas o prácticas.
        </p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual e industrial">
        <p>
          El diseño, la marca, el software y los contenidos propios de WeedClub están protegidos por
          la normativa aplicable. No se permite su reproducción, extracción masiva, reutilización o
          explotación sin autorización, salvo en los casos permitidos por la ley.
        </p>
        <p>
          Las marcas, fotografías y materiales de terceros pertenecen a sus respectivos titulares y
          se muestran con la autorización o base jurídica correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="6. Contacto y contenido presuntamente ilícito">
        <p>
          No se publica una dirección personal de contacto. Antes de habilitar aportaciones de
          terceros, reclamaciones o tratamiento de datos en producción, WeedClub deberá disponer de
          un canal legal no nominativo y operativo para recibir solicitudes, correcciones y avisos
          sobre contenido presuntamente ilícito.
        </p>
      </LegalSection>

      <LegalSection title="7. Legislación aplicable">
        <p>
          Este sitio se rige por la legislación española y por la normativa de la Unión Europea que
          resulte aplicable. Los conflictos se someterán a los juzgados y tribunales que determine la
          normativa procesal y de protección de consumidores, sin limitar los derechos imperativos
          que correspondan a cada persona usuaria.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
