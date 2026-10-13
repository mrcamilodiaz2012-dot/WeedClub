import { createClient } from '@supabase/supabase-js';
import { fakerES as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), 'apps/web/.env.local');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

const CITIES = [
  { name: 'Madrid', slug: 'madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Barcelona', slug: 'barcelona', lat: 41.3874, lon: 2.1686 },
  { name: 'Valencia', slug: 'valencia', lat: 39.4699, lon: -0.3763 },
  { name: 'Sevilla', slug: 'sevilla', lat: 37.3891, lon: -5.9845 },
  { name: 'Málaga', slug: 'malaga', lat: 36.7213, lon: -4.4214 },
  { name: 'Alicante', slug: 'alicante', lat: 38.3452, lon: -0.4810 },
  { name: 'Bilbao', slug: 'bilbao', lat: 43.2630, lon: -2.9350 },
  { name: 'Zaragoza', slug: 'zaragoza', lat: 41.6488, lon: -0.8891 }
];

const AMENITIES = [
  { name: 'Pet Friendly', slug: 'pet-friendly', icon: 'paw' },
  { name: 'Accesible', slug: 'accesible', icon: 'wheelchair' },
  { name: 'Extractos', slug: 'extractos', icon: 'leaf' },
  { name: 'Comestibles', slug: 'comestibles', icon: 'cookie' },
  { name: 'Dab Bar', slug: 'dab-bar', icon: 'fire' },
  { name: 'Juegos de Mesa', slug: 'juegos-de-mesa', icon: 'dice' },
  { name: 'Música en Vivo', slug: 'musica-en-vivo', icon: 'music' },
  { name: 'Bebidas', slug: 'bebidas', icon: 'coffee' }
];

async function seed() {
  console.log('🌱 Iniciando Seed masivo...\n');
  const stats = { users: 0, cities: 0, amenities: 0, clubs: 0, reviews: 0, favorites: 0 };

  // 1. Crear Ciudades
  console.log('Generando ciudades...');
  const cityIds = {};
  for (const c of CITIES) {
    const { data } = await supabase.from('cities').insert({
      name: c.name,
      slug: c.slug,
      description: `Los mejores clubes cannábicos en ${c.name}.`,
      meta_title: `Clubes de Cannabis en ${c.name} | WeedClub`,
      meta_description: `Encuentra y descubre asociaciones y clubes en ${c.name}.`,
      image_url: faker.image.urlLoremFlickr({ category: 'city', width: 800, height: 600 })
    }).select('id').single();
    cityIds[c.name] = data.id;
    stats.cities++;
  }

  // 2. Crear Amenities
  console.log('Generando amenities...');
  const amenityIds = [];
  for (const a of AMENITIES) {
    const { data } = await supabase.from('amenities').insert({
      name: a.name,
      slug: a.slug,
      icon: a.icon
    }).select('id').single();
    amenityIds.push(data.id);
    stats.amenities++;
  }

  // 3. Crear Usuarios (Auth)
  console.log('Generando 100 usuarios...');
  const userIds = [];
  for (let i = 0; i < 100; i++) {
    const email = `user${i}_seed_${Date.now()}@test.com`;
    const { data } = await supabase.auth.admin.createUser({
      email,
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        username: faker.internet.username(),
        avatar_url: faker.image.avatar()
      }
    });
    if (data.user) {
      userIds.push(data.user.id);
      stats.users++;
    }
  }

  // 4. Crear 50 Clubes
  console.log('Generando 50 clubes...');
  const clubIds = [];
  for (let i = 0; i < 50; i++) {
    const cityObj = faker.helpers.arrayElement(CITIES);
    const cityId = cityIds[cityObj.name];
    
    // Add small random jitter to coordinates so they aren't exactly the city center
    const lat = cityObj.lat + faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 6 });
    const lon = cityObj.lon + faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 6 });

    const ownerId = faker.helpers.arrayElement(userIds);
    const clubName = faker.company.name() + ' Green Club';

    const { data: club } = await supabase.from('clubs').insert({
      name: clubName,
      slug: faker.helpers.slugify(clubName).toLowerCase() + '-' + i,
      description: faker.lorem.paragraphs(2),
      logo_url: faker.image.urlLoremFlickr({ category: 'abstract', width: 200, height: 200 }),
      cover_image_url: faker.image.urlLoremFlickr({ category: 'interior', width: 1200, height: 400 }),
      location: `POINT(${lon} ${lat})`,
      address: faker.location.streetAddress(),
      city: cityObj.name,
      province: cityObj.name,
      postal_code: faker.location.zipCode('#####'),
      status: 'active',
      subscription_tier: faker.helpers.arrayElement(['free', 'free', 'free', 'premium']),
      city_id: cityId,
      owner_id: ownerId
    }).select('id').single();

    clubIds.push(club.id);
    stats.clubs++;

    // Horarios (Club Hours)
    const hoursToInsert = [];
    for (let day = 0; day <= 6; day++) {
      hoursToInsert.push({
        club_id: club.id,
        day_of_week: day,
        open_time: '10:00:00',
        close_time: '22:00:00',
        is_closed: day === 0 // Cerrado los domingos
      });
    }
    await supabase.from('club_hours').insert(hoursToInsert);

    // Amenities (Club Amenities)
    const selectedAmenities = faker.helpers.arrayElements(amenityIds, faker.number.int({ min: 2, max: 5 }));
    const amenitiesToInsert = selectedAmenities.map(amId => ({
      club_id: club.id,
      amenity_id: amId
    }));
    // Evitar duplicados exactos si faker saca el mismo
    const uniqueAmenities = Array.from(new Set(selectedAmenities)).map(amId => ({ club_id: club.id, amenity_id: amId }));
    await supabase.from('club_amenities').insert(uniqueAmenities);
  }

  // 5. Crear 500 Reviews
  console.log('Generando 500 reviews...');
  for (let i = 0; i < 500; i++) {
    const clubId = faker.helpers.arrayElement(clubIds);
    const userId = faker.helpers.arrayElement(userIds);
    
    // Ignorar errores por constraint UNIQUE(club_id, user_id)
    const { error } = await supabase.from('reviews').insert({
      club_id: clubId,
      user_id: userId,
      rating: faker.number.int({ min: 1, max: 5 }),
      content: faker.lorem.sentences(2)
    });
    if (!error) stats.reviews++;
  }

  // 6. Crear 300 Favoritos
  console.log('Generando 300 favoritos...');
  for (let i = 0; i < 300; i++) {
    const clubId = faker.helpers.arrayElement(clubIds);
    const userId = faker.helpers.arrayElement(userIds);
    
    const { error } = await supabase.from('favorites').insert({
      club_id: clubId,
      user_id: userId
    });
    if (!error) stats.favorites++;
  }

  console.log('\n✅ Seed finalizado exitosamente.');
  console.log('Estadísticas generadas:');
  console.table(stats);
}

seed().catch(console.error);
