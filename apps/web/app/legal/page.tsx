import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Cookie, FileText, Scale, ShieldCheck } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Información legal | WeedClub",
  description: "Documentación legal y de privacidad de WeedClub.",
};

const documents = [
  {
    href: "/aviso-legal",
    title: "Aviso legal",
    description: "Identificación del titular, finalidad del sitio y reglas generales de acceso.",
    icon: Scale,
  },
  {
    href: "/terminos",
    title: "Términos de uso",
    description: "Condiciones para utilizar el directorio y las funcionalidades de WeedClub.",
    icon: FileText,
  },
  {
    href: "/privacidad",
    title: "Política de privacidad",
    description: "Qué datos se tratan, para qué se utilizan y cómo ejercer tus derechos.",
    icon: ShieldCheck,
  },
  {
    href: "/cookies",
    title: "Política de cookies",
    description: "Información sobre cookies técnicas y servicios de terceros.",
    icon: Cookie,
  },
];

export default function LegalHubPage() {
  return (
    <LegalPage
      eyebrow="Centro legal"
      title="Información clara y accesible"
      description="Aquí puedes consultar las condiciones que regulan WeedClub y conocer cómo protegemos la información de quienes utilizan la plataforma."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {documents.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl border border-gray-100 bg-[#F5F5F7] p-5 transition-transform active:scale-[0.99]"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-900 shadow-sm">
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <ChevronRight className="text-gray-300 transition-transform group-hover:translate-x-0.5" size={20} />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
          </Link>
        ))}
      </div>

      <LegalSection title="Qué es WeedClub">
        <p>
          WeedClub es un directorio informativo que permite descubrir clubes y consultar la
          información que publican o facilitan sus responsables. WeedClub no es un club, no vende
          ni distribuye cannabis y no intermedia en su adquisición.
        </p>
        <p>
          La aparición de una entidad en el directorio no certifica su situación administrativa ni
          supone una recomendación. Cada club es responsable de su actividad, de la información que
          facilita y del cumplimiento de la normativa aplicable.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
