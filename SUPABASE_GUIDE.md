# Guía de Gestión de Base de Datos (Supabase Remoto)

Dado que utilizamos dos entornos remotos (Dev y Prod), aquí tienes las instrucciones claras para vincular los proyectos, ejecutar migraciones, y desplegar cambios.

## 1. Vincular los Proyectos Remotos

Abre una terminal en la raíz del monorepo (`/Users/andres/PROGRAMADOR/Proyectos/WeedClub`) y autentícate en la CLI de Supabase:

```bash
npx supabase login
```
*(Sigue las instrucciones en el navegador o pega tu access token).*

Una vez logueado, vincula tu entorno de **Desarrollo**:

```bash
npx supabase link --project-ref <REFERENCE_ID_DEV>
```
*(Ingresa tu contraseña de base de datos cuando se te solicite).*

## 2. Configurar Variables de Entorno

Ve a **Project Settings -> API** en tu panel de Supabase y copia tus credenciales en los siguientes archivos:
- `apps/web/.env.local`
- `apps/mobile/.env`

*(Revisa los archivos `.env.example` en cada carpeta si necesitas la plantilla).*

## 3. Ejecutar Migraciones (Desplegar Cambios a la BD)

Para empujar las migraciones locales (`supabase/migrations/*.sql`) hacia el proyecto vinculado (Dev o Prod), ejecuta:

```bash
npx supabase db push
```

Este comando leerá todos los archivos en la carpeta de migraciones y los aplicará secuencialmente en el proyecto remoto. **Esto creará las tablas, PostGIS y políticas de RLS en la nube.**

## 4. Ejecutar Seeds (Datos de Prueba)

Si tienes un archivo `supabase/seed.sql` con datos de prueba, puedes insertarlos en la base de datos remota usando:

```bash
npx supabase db reset --linked
```
> [!WARNING]  
> Esto **borrará** todos los datos de tu base de datos remota vinculada y la recreará usando tus migraciones y el archivo seed. ¡Solo usa esto en el entorno DEV!

## 5. Desplegar a Producción

Cuando estés listo para subir tus cambios a `WeedClub Prod`:

1. Vincula el CLI al proyecto de producción:
   ```bash
   npx supabase link --project-ref <REFERENCE_ID_PROD>
   ```
2. Empuja las migraciones a producción:
   ```bash
   npx supabase db push
   ```
3. *(Opcional)* Si realizaste cambios manuales en Prod que no están en local, usa `npx supabase db pull` antes de empujar.

---
**Siguiente Paso Inmediato:** Una vez hayas vinculado tu proyecto Dev y corrido `npx supabase db push`, avísame. Yo ejecutaré el script de validación `scripts/validate-infra.js` para asegurar que todo funciona perfecto.
