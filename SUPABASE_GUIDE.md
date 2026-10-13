# Supabase: desarrollo y despliegue

## Entornos

Usa proyectos separados para desarrollo y producción. Todas las migraciones deben probarse primero en desarrollo.

```bash
npx supabase login
npx supabase link --project-ref PROJECT_REF_DESARROLLO
npx supabase db push
```

Variables necesarias en `apps/web/.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_LEGAL_NAME=
NEXT_PUBLIC_LEGAL_TAX_ID=
NEXT_PUBLIC_LEGAL_ADDRESS=
NEXT_PUBLIC_LEGAL_EMAIL=
NEXT_PUBLIC_LEGAL_REGISTRY=
```

La `SUPABASE_SERVICE_ROLE_KEY` solo se usa en scripts administrativos locales. Nunca debe estar disponible en componentes del navegador.

## Migración del directorio

`20261012000000_public_directory.sql`:

- Elimina las columnas históricas de pagos y planes.
- Añade contacto por WhatsApp e Instagram.
- Crea la vista agregada `club_directory`.
- Corrige las distancias mediante PostGIS `geography`.
- Restringe Storage a carpetas propiedad del club.
- Impide que una cuenta cambie su propio rol o reclame un club ya asignado.
- Añade la revisión transaccional de reclamaciones.

Después de aplicar la migración ejecuta:

```bash
node scripts/validate-infra.js
```

## Datos de desarrollo

```bash
npm run seed
```

Para borrar exclusivamente los registros creados por los scripts y volver a generarlos:

```bash
npm run seed:reseed
```

Revisa siempre el proyecto vinculado antes de ejecutar un reset. No uses estos scripts contra producción.

## Primer administrador

Crea la cuenta desde `/club/registro` y asigna el rol desde SQL Editor usando el UUID correcto:

```sql
update public.profiles
set role = 'super_admin'
where id = 'UUID_DEL_ADMINISTRADOR';
```

El administrador podrá revisar solicitudes en `/admin/reclamaciones`.

La migración `20261013000000_legal_compliance.sql` añade el registro de aceptación legal, restringe la lectura de perfiles, exige una declaración en las reclamaciones y crea el flujo de reportes de contenido. Los reportes se revisan en `/admin/reportes`.

## Producción

1. Haz una copia de seguridad.
2. Vincula la CLI al proyecto de producción.
3. Ejecuta `npx supabase db push`.
4. Configura las variables web en Vercel.
5. Despliega la web.
6. Completa `LEGAL_LAUNCH_CHECKLIST.md`.
7. Comprueba portada, búsqueda, mapa, perfil público, acceso de propietario, una reclamación y un reporte de contenido de prueba.
