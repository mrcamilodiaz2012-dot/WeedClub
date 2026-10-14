import type { Club } from '@/types';

export interface CityEntry {
  slug: string;
  name: string;
  province: string;
  img: string;
  description: string;
  lat: number;
  lng: number;
}

export interface FlowerEntry {
  id: number;
  slug: string;
  name: string;
  type: 'ÍNDICA' | 'SATIVA' | 'HÍBRIDA';
  thc: string;
  cbd: string;
  flavor: string;
  effect: string;
  color: string;
  bg: string;
  image: string;
  description: string;
}

export interface GrowShopEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  rating: number;
  city: string;
  img: string;
  description: string;
  specialties: string[];
}

export interface EventEntry {
  id: string;
  slug: string;
  title: string;
  city: string;
  dateLabel: string;
  image: string;
  summary: string;
  description: string;
}

export const CITIES: CityEntry[] = [
  {
    slug: 'barcelona',
    name: 'Barcelona',
    province: 'Barcelona',
    img: '/portadas-ciudades/barcelona.webp',
    description: 'Explora las fichas disponibles en Barcelona y consulta su información antes de desplazarte.',
    lat: 41.3851,
    lng: 2.1734,
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    province: 'Comunidad de Madrid',
    img: '/portadas-ciudades/madrid.webp',
    description: 'Descubre el directorio de Madrid con la imagen y el estilo visual ya definidos en WeedClub.',
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    province: 'Valencia',
    img: '/portadas-ciudades/valencia.webp',
    description: 'Consulta clubes y recursos del catálogo disponibles para la ciudad de Valencia.',
    lat: 39.4699,
    lng: -0.3763,
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    province: 'Alicante',
    img: '/portadas-ciudades/alicante.webp',
    description: 'Revisa el directorio de Alicante y accede a cada ficha desde una única página.',
    lat: 38.3452,
    lng: -0.481,
  },
];

const DEMO_HOURS = {
  lunes: '12:00-22:00',
  martes: '12:00-22:00',
  miércoles: '12:00-22:00',
  jueves: '12:00-22:00',
  viernes: '12:00-23:00',
  sábado: '12:00-23:00',
  domingo: 'cerrado',
};

export const DEMO_CLUBS: Club[] = [
  {
    id: 'demo-madrid-centro',
    name: 'Green Leaf Club 1',
    slug: 'green-leaf-club-1',
    description: 'Ficha de demostración creada para probar la navegación, la búsqueda y las páginas de club antes de incorporar un establecimiento verificado.',
    logo_url: '/weed-maps.svg',
    cover_image_url: '/portadas/cannabis2.jpg',
    lat: 40.4168,
    lng: -3.7038,
    address: 'Zona centro (ubicación aproximada)',
    city: 'Madrid',
    province: 'Comunidad de Madrid',
    status: 'active',
    subscription_tier: 'demo',
    phone: null,
    whatsapp: null,
    instagram_url: null,
    website_url: null,
    opening_hours: DEMO_HOURS,
    photos: ['/portadas/cannabis2.jpg', '/portadas/portada1.jpg'],
    rating: null,
    review_count: 0,
    amenities: ['wifi', 'cafeteria', 'zona social'],
    membership_standard_price: null,
    membership_premium_price: null,
    is_demo: true,
    verification_status: 'demo',
  },
  {
    id: 'demo-barcelona-eixample',
    name: 'Green Leaf Club 2',
    slug: 'green-leaf-club-2',
    description: 'Perfil demostrativo para validar la experiencia de una ficha de club en Barcelona. No corresponde a un negocio verificado.',
    logo_url: '/weed-maps.svg',
    cover_image_url: '/portadas/cannabis.jpg',
    lat: 41.3851,
    lng: 2.1734,
    address: 'Zona Eixample (ubicación aproximada)',
    city: 'Barcelona',
    province: 'Barcelona',
    status: 'active',
    subscription_tier: 'demo',
    phone: null,
    whatsapp: null,
    instagram_url: null,
    website_url: null,
    opening_hours: DEMO_HOURS,
    photos: ['/portadas/cannabis.jpg', '/portadas/portada1.jpg'],
    rating: null,
    review_count: 0,
    amenities: ['wifi', 'terraza', 'zona social'],
    membership_standard_price: null,
    membership_premium_price: null,
    is_demo: true,
    verification_status: 'demo',
  },
  {
    id: 'demo-valencia-centro',
    name: 'Canna Valencia',
    slug: 'canna-valencia',
    description: 'Contenido de demostración para comprobar cómo se relacionan la ciudad, el buscador, el mapa y la ficha del club.',
    logo_url: '/weed-maps.svg',
    cover_image_url: '/portadas/cannabis3.jpg',
    lat: 39.4699,
    lng: -0.3763,
    address: 'Zona centro (ubicación aproximada)',
    city: 'Valencia',
    province: 'Valencia',
    status: 'active',
    subscription_tier: 'demo',
    phone: null,
    whatsapp: null,
    instagram_url: null,
    website_url: null,
    opening_hours: DEMO_HOURS,
    photos: ['/portadas/cannabis3.jpg', '/portadas/portada1.jpg'],
    rating: null,
    review_count: 0,
    amenities: ['wifi', 'gaming'],
    membership_standard_price: null,
    membership_premium_price: null,
    is_demo: true,
    verification_status: 'demo',
  },
  {
    id: 'demo-alicante-centro',
    name: 'Costa Blanca Social',
    slug: 'costa-blanca-social',
    description: 'Ficha ficticia y demostrativa para completar el recorrido del catálogo de Alicante.',
    logo_url: '/weed-maps.svg',
    cover_image_url: '/portadas/portada1.jpg',
    lat: 38.3452,
    lng: -0.481,
    address: 'Zona centro (ubicación aproximada)',
    city: 'Alicante',
    province: 'Alicante',
    status: 'active',
    subscription_tier: 'demo',
    phone: null,
    whatsapp: null,
    instagram_url: null,
    website_url: null,
    opening_hours: DEMO_HOURS,
    photos: ['/portadas/portada1.jpg', '/portadas/cannabis.jpg'],
    rating: null,
    review_count: 0,
    amenities: ['terraza', 'zona social'],
    membership_standard_price: null,
    membership_premium_price: null,
    is_demo: true,
    verification_status: 'demo',
  },
];

export const FLOWERS: FlowerEntry[] = [
  {
    id: 1,
    slug: 'purple-exotica-1',
    name: 'Purple Exotica 1',
    type: 'ÍNDICA',
    thc: '24%',
    cbd: '0.2%',
    flavor: 'Uva, dulce',
    effect: 'Relajante',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border border-purple-100',
    image: '/weed/Colores%20Exoticos/E1.webp',
    description: 'Ficha informativa de muestra. Los valores y sensaciones son datos demostrativos y no constituyen una recomendación de consumo.',
  },
  {
    id: 2,
    slug: 'neon-sativa-2',
    name: 'Neon Sativa 2',
    type: 'SATIVA',
    thc: '26%',
    cbd: '0.1%',
    flavor: 'Tropical',
    effect: 'Energético',
    color: 'text-orange-500',
    bg: 'bg-orange-50 border border-orange-100',
    image: '/weed/Colores%20Exoticos/E2.webp',
    description: 'Variedad de demostración utilizada para validar la navegación del catálogo. No representa disponibilidad comercial real.',
  },
  {
    id: 3,
    slug: 'amnesia-haze',
    name: 'Amnesia Haze',
    type: 'HÍBRIDA',
    thc: '22%',
    cbd: '0.5%',
    flavor: 'Cítrico, pino',
    effect: 'Creativo',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border border-emerald-100',
    image: '/weed/Colores%20Naturales/N3.webp',
    description: 'Contenido orientativo de demostración. La composición real depende del producto y de su análisis correspondiente.',
  },
  {
    id: 4,
    slug: 'gelato-33',
    name: 'Gelato 33',
    type: 'ÍNDICA',
    thc: '25%',
    cbd: '0.1%',
    flavor: 'Fresa, vainilla',
    effect: 'Felicidad',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border border-purple-100',
    image: '/weed/Colores%20Exoticos/E3.webp',
    description: 'Ficha ficticia para probar el catálogo visual. WeedClub no garantiza composición, disponibilidad ni efectos.',
  },
];

export const GROW_SHOPS: GrowShopEntry[] = [
  {
    id: 'demo-grow-barcelona-1',
    slug: 'green-care-growshop',
    title: 'Green Care GrowShop',
    subtitle: 'Semillas y cultivo',
    rating: 4.8,
    city: 'Barcelona',
    img: '/portadas/cannabis.jpg',
    description: 'Ficha de comercio de demostración. El nombre, la valoración y el catálogo no han sido verificados.',
    specialties: ['Semillas', 'Iluminación', 'Sustratos'],
  },
  {
    id: 'demo-grow-barcelona-2',
    slug: 'urban-cultivation',
    title: 'Urban Cultivation',
    subtitle: 'Todo para tu huerto',
    rating: 4.9,
    city: 'Barcelona',
    img: '/portadas/cannabis2.jpg',
    description: 'Perfil ficticio empleado para conectar la portada con una ficha completa de grow shop.',
    specialties: ['Cultivo interior', 'Riego', 'Accesorios'],
  },
  {
    id: 'demo-grow-madrid',
    slug: 'seed-point-madrid',
    title: 'Seed Point Madrid',
    subtitle: 'Especialistas en genética',
    rating: 4.7,
    city: 'Madrid',
    img: '/portadas/cannabis3.jpg',
    description: 'Contenido demostrativo pendiente de sustitución por un comercio incorporado y verificado.',
    specialties: ['Semillas', 'Genética', 'Germinación'],
  },
  {
    id: 'demo-grow-valencia',
    slug: 'the-plant-store',
    title: 'The Plant Store',
    subtitle: 'Fertilizantes y más',
    rating: 4.6,
    city: 'Valencia',
    img: '/portadas/portada1.jpg',
    description: 'Ficha de muestra para validar filtros, búsqueda y navegación entre páginas.',
    specialties: ['Fertilizantes', 'Sustratos', 'Herramientas'],
  },
];

export const EVENTS: EventEntry[] = [
  {
    id: 'demo-event-madrid',
    slug: 'encuentro-cannabis-madrid',
    title: 'Encuentro de la comunidad',
    city: 'Madrid',
    dateLabel: 'Fecha pendiente',
    image: '/portadas-ciudades/madrid.webp',
    summary: 'Una ficha de ejemplo para mostrar cómo se anunciarán actividades futuras.',
    description: 'Este evento es contenido de demostración: no está programado y no admite inscripciones.',
  },
  {
    id: 'demo-event-barcelona',
    slug: 'taller-cultivo-responsable-barcelona',
    title: 'Taller de cultivo responsable',
    city: 'Barcelona',
    dateLabel: 'Fecha pendiente',
    image: '/portadas-ciudades/barcelona.webp',
    summary: 'Ejemplo de una actividad informativa enlazada con la ciudad correspondiente.',
    description: 'Contenido ficticio creado únicamente para probar la sección de eventos.',
  },
  {
    id: 'demo-event-valencia',
    slug: 'jornada-asociaciones-valencia',
    title: 'Jornada para asociaciones',
    city: 'Valencia',
    dateLabel: 'Fecha pendiente',
    image: '/portadas-ciudades/valencia.webp',
    summary: 'Demostración de una ficha para actividades destinadas a asociaciones.',
    description: 'Este evento no existe todavía. La página queda preparada para recibir eventos reales.',
  },
];

export const CATEGORY_LINKS = [
  { name: 'Ciudades', href: '/ciudades', color: 'bg-sky-300', icon: '/iconos/Ciudad.webp' },
  { name: 'Top Clubs', href: '/clubs', color: 'bg-orange-300', icon: '/iconos/fuego.webp' },
  { name: 'Flores', href: '/flores', color: 'bg-emerald-300', icon: '/iconos/flor.webp' },
  { name: 'Eventos', href: '/eventos', color: 'bg-purple-300', icon: '/iconos/eventos.webp' },
  { name: 'Grow Shops', href: '/grow-shops', color: 'bg-lime-300', icon: '/iconos/grow.webp' },
] as const;

export function findCity(slug: string) {
  return CITIES.find((city) => city.slug === slug);
}

export function findFlower(slug: string) {
  return FLOWERS.find((flower) => flower.slug === slug);
}

export function findGrowShop(slug: string) {
  const legacyAliases: Record<string, string> = {
    '101': 'green-care-growshop',
    '102': 'urban-cultivation',
    '103': 'seed-point-madrid',
    '104': 'the-plant-store',
  };
  const resolvedSlug = legacyAliases[slug] ?? slug;
  return GROW_SHOPS.find((shop) => shop.slug === resolvedSlug || shop.id === resolvedSlug);
}

export function findEvent(slug: string) {
  return EVENTS.find((event) => event.slug === slug);
}
