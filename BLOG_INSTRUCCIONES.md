# Guía del Blog BOMEL — Sanity CMS

## Acceso al Studio (panel de contenido)

1. Abre `https://www.bomelsi.com/studio` en tu navegador.
2. Inicia sesión con tu cuenta de Sanity (la misma con que creaste el proyecto `hk5cl9yf`).
3. Verás la interfaz para crear y editar artículos de blog.

---

## Configurar variables de entorno antes de publicar

Copia `.env.local.example` → `.env.local` y rellena:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=hk5cl9yf
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<tu-token-aquí>
```

### Cómo generar el token:
1. Ve a https://www.sanity.io/manage/project/hk5cl9yf/api
2. Haz clic en **"Add API Token"**
3. Dale el nombre "BOMEL Next.js" y rol **"Viewer"** (solo lectura es suficiente para el sitio; usa "Editor" si quieres publicar desde la app).
4. Copia el token y pégalo en `SANITY_API_TOKEN`.

> **IMPORTANTE:** Nunca subas `.env.local` a git. Está en `.gitignore` por defecto.

---

## Publicar el primer artículo

1. Entra al Studio en `/studio`.
2. Haz clic en **"Artículo de Blog"** → **"+ Nuevo documento"**.
3. Rellena los campos:
   - **Título** — máx. 100 caracteres
   - **Slug** — generado automáticamente; puedes editarlo
   - **Fecha de publicación** — aparece en el artículo y en el sitemap
   - **Categoría** — elige entre: Ventanería, Construcción, Fachadas, Acabados, Consejos, Casos de éxito
   - **Imagen principal** — sube la foto principal (al menos 1200×630 px para redes sociales)
   - **Extracto** — resumen de máx. 200 caracteres para la tarjeta y el SEO
   - **Contenido** — usa el editor de texto enriquecido (puedes agregar imágenes internas, listas, encabezados)
   - **Título SEO / Meta descripción** — opcionales; si los dejas vacíos se usa el título y extracto
4. Haz clic en **"Publicar"** en la esquina superior derecha.

### ¿Cuándo aparece en el sitio?
El sitio se regenera automáticamente cada hora (`revalidate = 3600`). Para verlo de inmediato, haz un nuevo despliegue desde Vercel/tu hosting.

---

## Categorías disponibles

| Categoría       | Cuándo usarla                                             |
|-----------------|-----------------------------------------------------------|
| Ventanería      | Guías y tips sobre ventanas y puertas de aluminio         |
| Construcción    | Proyectos, procesos y novedades de construcción           |
| Fachadas        | Fachadas de vidrio, aluminio compuesto, cortinas de vidrio|
| Acabados        | Pisos, repellos, pintura, carpintería                     |
| Consejos        | Mantenimiento, selección de materiales, preguntas comunes |
| Casos de éxito  | Proyectos terminados con fotos y resultados               |

---

## Estructura del blog en el sitio

- `/blog` — Listado de todos los artículos con filtro por categoría
- `/blog/[slug]` — Artículo completo con imagen, cuerpo, CTA y artículos relacionados
- Sección "Desde el blog" en la página de inicio (últimos 3 artículos; se oculta automáticamente si no hay artículos)
- El Studio está disponible en `/studio` (solo accesible para usuarios autenticados en Sanity)

---

## Preguntas frecuentes

**¿Puedo editar un artículo ya publicado?**
Sí. Los cambios se reflejan en el sitio dentro de la próxima hora.

**¿Hay límite de artículos?**
No. El plan gratuito de Sanity incluye 200 000 API requests/mes, suficiente para comenzar.

**¿Puedo subir videos?**
El schema actual no incluye videos. Para agregar soporte de video embebido (YouTube/Vimeo), pídele a tu desarrollador que extienda el campo `body` del schema.

**¿Se indexan los artículos en Google?**
Sí. Cada artículo tiene metadatos Open Graph, canonical URL y Schema.org Article JSON-LD. Además, el sitemap en `/sitemap.xml` incluye automáticamente todos los artículos publicados.
