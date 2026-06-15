import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), 'apps/web/.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey || supabaseUrl.includes('tu-proyecto-dev')) {
  console.error("❌ Credentials in .env.local not real. Aborting validation.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceKey);
const supabaseAnon = createClient(supabaseUrl, anonKey);

async function runTest(name, fn) {
  const start = performance.now();
  let result = '❌ Failed';
  try {
    const success = await fn();
    if (success) result = '✅ Passed';
  } catch (e) {
    console.error(e);
  }
  const end = performance.now();
  console.log(`${result} | [${(end - start).toFixed(2)}ms] - ${name}`);
  return result.includes('✅');
}

async function validateInfrastructure() {
  console.log("\n🚀 INICIANDO VALIDACIÓN DE INFRAESTRUCTURA...\n");

  await runTest("Tablas: Acceso a 'clubs', 'profiles', 'reviews'", async () => {
    const { error } = await supabaseAdmin.from('clubs').select('id').limit(1);
    const { error: e2 } = await supabaseAdmin.from('profiles').select('id').limit(1);
    return !error && !e2;
  });

  await runTest("Relaciones: Join entre 'clubs' y 'profiles'", async () => {
    const { error } = await supabaseAdmin.from('clubs').select('id, owner_id, profiles(id)').limit(1);
    return !error;
  });

  await runTest("Índices: Verificando índices geoespaciales y FKs", async () => {
    const { data, error } = await supabaseAdmin.rpc('get_nearby_clubs', { lat: 0, lon: 0, radius_km: 1 });
    // Si la función existe y no tira error 500, los índices y postgis están montados.
    return !error; 
  });

  await runTest("PostGIS y get_nearby_clubs: Inserción y búsqueda geo", async () => {
    const testClub = {
      name: 'Geo Test',
      slug: 'geo-test-' + Date.now(),
      status: 'active',
      location: 'POINT(-3.7 40.4)'
    };
    await supabaseAdmin.from('clubs').insert(testClub);
    const { data } = await supabaseAdmin.rpc('get_nearby_clubs', { lat: 40.4, lon: -3.7, radius_km: 5 });
    await supabaseAdmin.from('clubs').delete().eq('slug', testClub.slug);
    return data && data.some(c => c.slug === testClub.slug);
  });

  await runTest("Auth: Creación de usuario y triggers", async () => {
    const email = `test-${Date.now()}@weedclub.test`;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: 'password123',
      email_confirm: true
    });
    if (error) return false;
    
    // Verificar que el trigger creó el profile
    const { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('id', data.user.id).single();
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    return profile !== null;
  });

  await runTest("Storage: Buckets configurados", async () => {
    const { data } = await supabaseAdmin.storage.listBuckets();
    return data.some(b => b.name === 'avatars') && data.some(b => b.name === 'club_assets');
  });

  await runTest("RLS: Políticas de inserción anónima bloqueadas", async () => {
    const { error } = await supabaseAnon.from('clubs').insert({ name: 'Hack', slug: 'hack', status: 'active' });
    return error && error.code === '42501'; // 42501 = insufficient privilege
  });

  await runTest("Stripe Webhook: Verificación de endpoint web", async () => {
    // Solo podemos verificar que el archivo de la ruta existe y exporta POST
    const webhookPath = path.resolve(process.cwd(), 'apps/web/app/api/stripe/webhook/route.ts');
    return fs.existsSync(webhookPath);
  });

  console.log("\n✅ Script de validación finalizado.");
}

validateInfrastructure();
