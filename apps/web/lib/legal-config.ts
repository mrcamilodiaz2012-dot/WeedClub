export const legalConfig = {
  brandName: "WeedClub",
  domain: "https://www.weedclub.app",
  version: "1.0",
  lastUpdated: "13 de octubre de 2026",
  operator: {
    legalName: "PENDIENTE DE COMPLETAR",
    taxId: "PENDIENTE DE COMPLETAR",
    address: "PENDIENTE DE COMPLETAR",
    registry: "PENDIENTE DE COMPLETAR, SI PROCEDE",
    email: "PENDIENTE DE COMPLETAR",
  },
} as const;

export const legalIdentityIsComplete = Object.values(legalConfig.operator).every(
  (value) => !value.startsWith("PENDIENTE"),
);
