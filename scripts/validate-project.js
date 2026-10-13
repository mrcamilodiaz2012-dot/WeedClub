const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const requiredFiles = [
  'apps/web/app/page.tsx',
  'apps/web/app/buscar/page.tsx',
  'apps/web/app/mapa/page.tsx',
  'apps/web/app/club/panel/page.tsx',
  'apps/web/app/club/reclamar/page.tsx',
  'apps/web/app/admin/reclamaciones/page.tsx',
  'apps/web/app/admin/reportes/page.tsx',
  'apps/web/app/aviso-legal/page.tsx',
  'apps/web/app/cookies/page.tsx',
  'apps/web/app/privacidad/page.tsx',
  'apps/web/app/terminos/page.tsx',
  'apps/web/app/reportar-contenido/page.tsx',
  'apps/mobile/app/index.tsx',
  'apps/mobile/app/clubs/[slug].tsx',
  'supabase/migrations/20261012000000_public_directory.sql',
  'supabase/migrations/20261013000000_legal_compliance.sql',
  'LEGAL_LAUNCH_CHECKLIST.md',
];

requiredFiles.forEach((file) => expect(fs.existsSync(path.join(root, file)), `Falta ${file}`));

const webPackage = JSON.parse(read('apps/web/package.json'));
const mobilePackage = JSON.parse(read('apps/mobile/package.json'));
expect(!webPackage.dependencies?.stripe, 'Stripe no debe estar en las dependencias web');
expect(!fs.existsSync(path.join(root, 'apps/web/app/api/stripe')), 'No debe existir una API de Stripe');
expect(mobilePackage.main === 'expo-router/entry', 'La app móvil debe arrancar con Expo Router');
expect(!mobilePackage.dependencies?.['@stripe/stripe-react-native'], 'Stripe no debe estar en las dependencias móviles');

const migration = read('supabase/migrations/20261012000000_public_directory.sql');
expect(migration.includes('club_directory'), 'La migración debe crear club_directory');
expect(migration.includes('::extensions.geography'), 'La búsqueda geográfica debe trabajar en metros mediante geography');
expect(migration.includes('review_club_claim'), 'La moderación de reclamaciones debe ser transaccional');
expect(migration.includes('REVOKE UPDATE ON public.profiles'), 'Los usuarios no deben poder elevar su propio rol');
expect(migration.includes('owner_id IS NULL'), 'Las reclamaciones solo deben transferir clubes sin propietario');

const legalMigration = read('supabase/migrations/20261013000000_legal_compliance.sql');
expect(legalMigration.includes('terms_accepted_at'), 'Debe conservarse evidencia de aceptación de términos');
expect(legalMigration.includes('content_reports'), 'Debe existir un canal persistente de reportes de contenido');
expect(legalMigration.includes('DROP POLICY IF EXISTS "Public profiles are viewable by everyone."'), 'Los perfiles de cuenta no deben ser públicos');
expect(legalMigration.includes('review_content_report'), 'La resolución de reportes debe quedar registrada');

if (failures.length > 0) {
  console.error('Validación fallida:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Validación del proyecto completada correctamente.');
