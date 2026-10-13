import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { legalConfig, legalIdentityIsComplete } from "@/lib/legal-config";

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/terminos", label: "Términos" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];

export function LegalPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white pb-32 text-gray-950">
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 sm:px-8 sm:pt-10">
        <header className="mb-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-black"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Volver
            </Link>
            <Link href="/" aria-label="Ir al inicio de WeedClub">
              <Image src="/weed-maps.svg" alt="WeedClub" width={130} height={37} className="h-9 w-auto" />
            </Link>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00A844]">
            {eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {description}
          </p>
          <p className="mt-4 text-xs font-medium text-gray-400">
            Versión {legalConfig.version} · Última actualización: {legalConfig.lastUpdated}
          </p>
        </header>

        {!legalIdentityIsComplete && (
          <aside className="mb-8 flex gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong>Borrador no publicable todavía.</strong> Falta incorporar el nombre o razón
              social, NIF/CIF, domicilio, datos registrales y correo legal del titular de la
              plataforma.
            </p>
          </aside>
        )}

        <article className="space-y-6">{children}</article>

        <nav aria-label="Documentos legales" className="mt-10 border-t border-gray-100 pt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
            Información legal
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#00A844]">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-[#F5F5F7] p-5 sm:p-7">
      <h2 className="mb-3 text-xl font-extrabold tracking-[-0.02em]">{title}</h2>
      <div className="space-y-3 text-[15px] leading-7 text-gray-600 [&_a]:font-semibold [&_a]:text-gray-950 [&_a]:underline [&_a]:decoration-gray-300 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-bold [&_strong]:text-gray-950 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

export function OperatorDetails() {
  const { operator } = legalConfig;

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-[150px_1fr]">
      <dt className="font-semibold text-gray-500">Titular</dt>
      <dd className="font-medium text-gray-950">{operator.legalName}</dd>
      <dt className="font-semibold text-gray-500">NIF/CIF</dt>
      <dd className="font-medium text-gray-950">{operator.taxId}</dd>
      <dt className="font-semibold text-gray-500">Domicilio</dt>
      <dd className="font-medium text-gray-950">{operator.address}</dd>
      <dt className="font-semibold text-gray-500">Registro</dt>
      <dd className="font-medium text-gray-950">{operator.registry}</dd>
      <dt className="font-semibold text-gray-500">Correo legal</dt>
      <dd className="font-medium text-gray-950">{operator.email}</dd>
      <dt className="font-semibold text-gray-500">Sitio web</dt>
      <dd className="font-medium text-gray-950">{legalConfig.domain}</dd>
    </dl>
  );
}
