import { execSync } from 'child_process';
import path from 'path';

console.log('Iniciando proceso completo de Reseed...');

try {
  console.log('\n1. Ejecutando Reset...');
  execSync(`node ${path.join(process.cwd(), 'scripts/seed/reset.js')}`, { stdio: 'inherit' });

  console.log('\n2. Ejecutando Seed...');
  execSync(`node ${path.join(process.cwd(), 'scripts/seed/seed.js')}`, { stdio: 'inherit' });

  console.log('\n🎉 Reseed finalizado!');
} catch (e) {
  console.error('❌ Error durante el reseed:', e.message);
}
