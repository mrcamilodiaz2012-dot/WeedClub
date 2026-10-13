# WeedClub

Directorio público de clubes y asociaciones, con búsqueda, mapa, perfiles públicos y un área gratuita para que los propietarios mantengan la información de su club.

## Alcance actual

Incluido:

- Directorio público de clubes.
- Búsqueda por nombre, ciudad y servicios.
- Mapa interactivo y geolocalización opcional.
- Perfiles con contacto, horarios, servicios, fotos y ubicación.
- Registro y acceso exclusivo para propietarios o representantes.
- Reclamación y moderación de perfiles.
- Panel de edición del club y galería.
- Páginas legales versionadas, confirmación de mayoría de edad y aceptación expresa para representantes.
- Canal de notificación y cola administrativa para contenido presuntamente ilícito o incorrecto.

Fuera del alcance actual:

- Pagos, planes y Stripe.
- Cuentas para usuarios finales.
- Favoritos personales.
- Creación de reseñas por usuarios.
- Reservas o compraventa de productos.

## Tecnología

- Next.js 16 y React 19 para la web.
- Supabase para PostgreSQL, Auth y Storage.
- PostGIS para búsquedas por distancia.
- Mapbox GL con cartografía de CARTO.
- Turborepo para el monorepo.
- Expo SDK 56 y Expo Router para el cliente móvil público.

## Configuración

Requisitos: Node.js 18 o superior, npm y un proyecto de Supabase.

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
```

Completa las variables de `apps/web/.env.local` y aplica las migraciones:

```bash
npx supabase link --project-ref TU_PROJECT_REF
npx supabase db push
```

Para desarrollo web:

```bash
npm run dev --workspace=web
```

La web estará disponible en `http://localhost:3000`.

Para la app móvil:

```bash
cp apps/mobile/.env.example apps/mobile/.env
npm run start --workspace=mobile
```

Completa las variables públicas de Supabase y `EXPO_PUBLIC_SITE_URL`. La app móvil ofrece el directorio, búsqueda y fichas públicas; el acceso y la gestión de propietarios se abren en la web.

## Datos de desarrollo

Los scripts de seed usan la service role configurada en `apps/web/.env.local`:

```bash
npm run seed
npm run seed:reset
npm run seed:reseed
```

No ejecutes `seed:reset` contra producción.

## Comprobaciones

```bash
npm run check-types
npm run lint
npm run validate
```

`validate` comprueba que el alcance actual no vuelva a introducir Stripe y que las rutas y migraciones esenciales estén presentes.

Antes de un lanzamiento público completa y verifica [LEGAL_LAUNCH_CHECKLIST.md](./LEGAL_LAUNCH_CHECKLIST.md). Las páginas muestran un aviso visible mientras falten los datos reales del titular en `apps/web/.env.local`.

También puedes comprobar la compatibilidad móvil con `npx expo install --check` desde `apps/mobile`.

## Flujo de propietario

1. El representante crea su acceso en `/club/registro`.
2. Selecciona un club sin reclamar en `/club/reclamar`.
3. Un perfil con rol `super_admin` revisa la solicitud en `/admin/reclamaciones`.
4. Al aprobarla, el club queda asignado al representante.
5. El propietario edita contenido, horarios, servicios e imágenes desde `/club/panel`.

Los avisos sobre contenido se reciben en `/reportar-contenido` y se resuelven desde `/admin/reportes`. La comunicación de la decisión por correo debe realizarla una persona responsable de moderación.

Para convertir un perfil existente en administrador debe hacerse desde un entorno seguro de Supabase, nunca desde el navegador:

```sql
update public.profiles
set role = 'super_admin'
where id = 'UUID_DEL_ADMINISTRADOR';
```

## Despliegue

La aplicación web está preparada para Vercel. Configura las mismas variables de entorno y aplica las migraciones en Supabase antes de desplegar una versión que use el nuevo directorio público.
