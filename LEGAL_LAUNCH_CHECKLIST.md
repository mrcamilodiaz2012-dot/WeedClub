# Lista legal y operativa antes del lanzamiento

Las páginas y controles del repositorio reducen riesgos, pero no convierten por sí solos el proyecto en legal. El directorio opera en un ámbito especialmente sensible: una ficha o mensaje mal planteado puede interpretarse como promoción o facilitación de una actividad ilícita. Antes de publicar, deben cerrarse los puntos siguientes.

## 1. Titular y canales obligatorios

- [ ] Definir quién presta realmente el servicio: persona física o sociedad.
- [ ] Completar nombre o razón social, NIF/CIF, domicilio, correo legal y datos registrales en las variables `NEXT_PUBLIC_LEGAL_*`.
- [ ] Crear y vigilar un correo real para privacidad, avisos de contenido y requerimientos de autoridades.
- [ ] Confirmar el dominio y la marca que se usarán en producción.
- [ ] Encargar a un abogado español con experiencia penal/administrativa en cannabis la revisión final del modelo, los textos y las fichas que se mostrarán.

No debe lanzarse la web si alguna página muestra un campo `[PENDIENTE: ...]`.

## 2. Límites del producto

- [ ] Mantener fuera del producto pagos, venta, reservas, precios, catálogos, mensajería de compra, invitaciones y altas de socios.
- [ ] No describir una ficha como «legal», «autorizada» o «verificada» salvo que exista una verificación documental concreta y vigente que sostenga exactamente esa afirmación.
- [ ] Evitar campañas, SEO o redes sociales dirigidas a menores o que promocionen el consumo.
- [ ] Aplicar las normas de publicación a todos los textos, enlaces e imágenes antes de hacerlos públicos.
- [ ] Documentar por qué se incorpora cada club y la fuente original de sus datos.

## 3. Protección de datos

- [ ] Mantener un registro interno de actividades de tratamiento con finalidades, datos, bases jurídicas, destinatarios y plazos.
- [ ] Firmar o aceptar el acuerdo de encargo de tratamiento vigente de Supabase y del proveedor real de alojamiento.
- [ ] Elegir una región específica del EEE para Supabase y comprobarla; una etiqueta genérica «Europa» no acredita por sí sola residencia en la UE.
- [ ] Revisar subencargados, transferencias internacionales, cláusulas contractuales tipo y medidas adicionales.
- [ ] Limitar el acceso administrativo, usar MFA en Supabase/Vercel y revisar permisos trimestralmente.
- [ ] Probar un procedimiento de acceso, rectificación, supresión, oposición, limitación y portabilidad.
- [ ] Ejecutar una revisión mensual de reclamaciones rechazadas y aplicar los plazos de borrado declarados.
- [ ] Preparar un protocolo de brechas: registro, evaluación, contención y, si procede, notificación a la AEPD en 72 horas.
- [ ] No solicitar ni admitir DNI, antecedentes, datos de salud o consumo en campos libres.

## 4. Cookies, mapas y terceros

- [ ] Verificar con el navegador y un escáner de red que no se instalan cookies opcionales antes de consentimiento.
- [ ] Si se añade analítica, publicidad, píxeles o vídeo embebido, implantar consentimiento previo con «Aceptar» y «Rechazar» al mismo nivel y actualizar la tabla de cookies.
- [ ] Confirmar las condiciones y atribución exigidas por CARTO/Mapbox para la cartografía usada.
- [ ] Revisar que Google Maps, Instagram y WhatsApp sigan siendo enlaces activados por el usuario, no recursos cargados automáticamente.

## 5. Moderación y avisos

- [ ] Aplicar la migración `20261013000000_legal_compliance.sql` antes de abrir el formulario de reportes.
- [ ] Probar un aviso completo desde `/reportar-contenido` y su resolución desde `/admin/reportes`.
- [ ] Definir quién revisa los avisos, en qué plazo y quién cubre vacaciones o incidencias urgentes.
- [ ] Comunicar una decisión motivada al denunciante y al titular afectado cuando corresponda; el panel conserva la decisión, pero el envío del correo sigue siendo manual.
- [ ] Conservar pruebas de las comprobaciones y de cualquier retirada sin almacenar información innecesaria.
- [ ] Preparar un canal diferenciado para requerimientos policiales, judiciales o administrativos.
- [ ] Incorporar protección contra abuso (limitación de frecuencia y CAPTCHA respetuoso con la privacidad) antes de tener tráfico significativo.

## 6. Seguridad y calidad

- [ ] Aplicar todas las migraciones primero en desarrollo y hacer copia de seguridad antes de producción.
- [ ] Confirmar que `SUPABASE_SERVICE_ROLE_KEY` nunca llega al navegador ni al repositorio.
- [ ] Activar MFA para administradores, alertas de acceso y rotación de credenciales.
- [ ] Probar RLS como visitante, representante, propietario y superadministrador.
- [ ] Revisar dependencias, cabeceras de seguridad, restauración de copias y gestión de incidentes.
- [ ] Ejecutar `npm run check-types`, `npm run lint`, `npm run validate` y una prueba manual del flujo legal antes de cada lanzamiento relevante.

## 7. Control de cambios

Los documentos usan versiones fechadas. Cuando cambie un tratamiento, proveedor o regla material:

1. actualizar el texto y su constante de versión en `apps/web/lib/legal.ts`;
2. adaptar el registro de aceptación y la función SQL de reaceptación;
3. comunicar el cambio a las cuentas existentes y exigir nueva aceptación si corresponde;
4. conservar un histórico de versiones y la fecha de entrada en vigor.
