import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), 'apps/web/.env.local');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

async function reset() {
  console.log('🧹 Limpiando base de datos...');
  
  // Como tenemos cascadas, limpiar auth.users y clubs debería borrar casi todo.
  // Borramos primero reviews, favorites, club_hours, club_amenities, club_images, club_claims manualmente por si acaso
  await supabase.from('club_claims').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('club_hours').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('club_amenities').delete().neq('club_id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('club_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('amenities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('clubs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('cities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Borrar todos los usuarios creados por seed (correo contiene seed)
  const { data: users } = await supabase.auth.admin.listUsers();
  if (users && users.users) {
    const seedUsers = users.users.filter(u => u.email.includes('seed'));
    console.log(`Borrando ${seedUsers.length} usuarios seed...`);
    for (const u of seedUsers) {
      await supabase.auth.admin.deleteUser(u.id);
    }
  }
  console.log('✅ Limpieza completada.');
}

reset();
