export const TERMS_VERSION = '2026-10-13';
export const PRIVACY_VERSION = '2026-10-13';
export const COOKIES_VERSION = '2026-10-13';
export const CONTENT_POLICY_VERSION = '2026-10-13';

const missing = (label: string) => `[PENDIENTE: ${label}]`;

export const legalIdentity = {
  tradeName: 'WeedClub',
  ownerName: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || missing('nombre o razón social del titular'),
  taxId: process.env.NEXT_PUBLIC_LEGAL_TAX_ID?.trim() || missing('NIF/CIF'),
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS?.trim() || missing('domicilio completo'),
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL?.trim() || missing('correo legal y de privacidad'),
  registry: process.env.NEXT_PUBLIC_LEGAL_REGISTRY?.trim() || missing('datos registrales, si procede'),
  dpoEmail: process.env.NEXT_PUBLIC_DPO_EMAIL?.trim() || '',
};

export const legalIdentityIsComplete = [
  process.env.NEXT_PUBLIC_LEGAL_NAME,
  process.env.NEXT_PUBLIC_LEGAL_TAX_ID,
  process.env.NEXT_PUBLIC_LEGAL_ADDRESS,
  process.env.NEXT_PUBLIC_LEGAL_EMAIL,
].every((value) => Boolean(value?.trim()));

export function legalMailto(subject: string) {
  const configuredEmail = process.env.NEXT_PUBLIC_LEGAL_EMAIL?.trim();
  if (!configuredEmail) return null;
  return `mailto:${configuredEmail}?subject=${encodeURIComponent(subject)}`;
}
