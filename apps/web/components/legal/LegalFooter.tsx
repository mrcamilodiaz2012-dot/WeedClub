import Link from "next/link";

const links = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/terminos", label: "Términos" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];

export function LegalFooter() {
  return (
    <footer className="mx-4 mb-4 border-t border-gray-100 px-1 py-7 text-center">
      <nav aria-label="Enlaces legales" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[11px] font-medium text-gray-400 transition-colors hover:text-gray-900"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-3 text-[10px] text-gray-300">© 2026 WeedClub</p>
    </footer>
  );
}
