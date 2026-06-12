# MISIÓN: Transformar bomelsi.com de landing page a máquina de captación de clientes

Actúa como un equipo senior de: Arquitecto Web Next.js, Especialista SEO técnico y Experto CRO. Vas a evolucionar el sitio actual de BOMEL (Servicios Integrales BOMEL S.A. de C.V., construcción/acabados/ventanería en El Salvador) manteniendo INTACTO su nivel de diseño actual: tema oscuro (negro/verde profundo), acento verde menta (#2DD4BF aprox.), tipografía bold, glassmorphism, animaciones suaves y scroll-driven effects. Todo lo nuevo debe sentirse parte de la misma familia visual — nada de secciones que parezcan de otra plantilla.

Antes de tocar código: explora todo el proyecto, identifica el design system existente (colores, espaciados, componentes de tarjeta, botones, animaciones) y REUTILÍZALO en todo lo nuevo. Revisa también las SKILLS instaladas en el proyecto (transiciones, efectos, animaciones scroll-driven) y aplícalas en cada sección y página nueva: las páginas de servicios y proyectos, los testimonios, el FAQ, el formulario y el cotizador deben tener el mismo nivel de animación espectacular que la home actual — entradas animadas al hacer scroll, hover states, transiciones fluidas entre los pasos del wizard. Nada nuevo debe sentirse estático ni "pegado de otra plantilla".

Trabaja por fases en este orden. Haz commit al terminar cada fase (son 6 fases).

---

## FUENTE DE CONTENIDO REAL — PDF "BOMEL Soluciones Arquitectónicas"

En la raíz del proyecto encontrarás el PDF `BOMEL_Soluciones_Arquitectonicas.pdf` (si no está, pídelo antes de continuar). Es un brochure real de la empresa con fotos de obras ejecutadas e información de productos. Úsalo así:

1. **Extrae todas las imágenes del PDF** (con Python: pymupdf/pdfplumber) a `/public/images/productos/`, optimízalas a WebP y úsalas en las páginas correspondientes. Son fotos REALES de obra — tienen prioridad sobre cualquier imagen genérica o de stock existente en el sitio. Escribe `alt` descriptivos para cada una.
2. **Productos del PDF que deben aparecer en la web** (hoy no están o están incompletos):
   - Divisiones de vidrio para oficinas y clínicas
   - Divisiones de baño en acero inoxidable
   - Puertas de vidrio con apertura automática (sensores sin contacto)
   - Puertas en ACM de alta resistencia
   - Sistemas de louvers / celosías (madera natural, aluminio sólido, aluminio acabado madera) — control solar bioclimático
   - Lámina microperforada (fachadas de control solar)
   Intégralos como: (a) tarjetas/anclas dentro de las páginas de servicio correspondientes (`ventaneria-y-puertas`, `fachadas-acm`, `acabados-finos-y-revestimientos`), y (b) opciones del cotizador donde aplique (puerta automática, división de baño).
3. **Adapta el copy, no lo copies literal:** el texto del PDF está dirigido a hospitales ("pacientes", "asepsia", "áreas clínicas"). Reescríbelo para audiencia general (residencias, oficinas, comercios) manteniendo los datos técnicos (hermeticidad, aislamiento acústico, resistencia a químicos, control solar, eficiencia energética). Donde el contexto hospitalario sume autoridad, conviértelo en prueba: "El mismo sistema que instalamos en infraestructura hospitalaria, donde no hay margen de error."
4. El proyecto de la lámina microperforada (edificio INDES, visible en las fotos) puede sumarse a Proyectos Destacados si hay material suficiente.

---

**Imágenes para páginas de servicio y proyectos:** Donde no haya fotos reales disponibles (del PDF o del repositorio), usa imágenes de **Unsplash** con el componente `next/image` y URL directa de Unsplash (agrega `images.unsplash.com` a `next.config.js` en `remotePatterns`). 

**CRÍTICO — cada página debe tener fotos temáticamente correctas y únicas, nunca repetir la misma foto en páginas distintas.** Usa búsquedas específicas por servicio:

| Página | Keywords para buscar en Unsplash |
|---|---|
| `/servicios/obra-civil-y-obra-gris` | `concrete construction foundation`, `building structure steel` |
| `/servicios/diseno-arquitectonico` | `architectural blueprints design`, `architect drawing plans` |
| `/servicios/instalaciones-electricas-hidraulicas` | `electrical installation conduit`, `plumbing pipes construction` |
| `/servicios/acabados-finos-y-revestimientos` | `interior wall finishing`, `ACM cladding facade panel` |
| `/servicios/ventaneria-y-puertas` | `aluminum window installation`, `glass door modern building` |
| `/servicios/fachadas-acm` | `ACM facade building modern`, `aluminum composite panel exterior` |
| `/proyectos/hospital-nacional-rosales` | `hospital building exterior`, `medical facility construction` |
| `/proyectos/centro-medico-san-alejo` | `medical center facade`, `clinic building modern` |
| `/proyectos/recintos-deportivos` | `sports facility exterior`, `stadium construction` |
| `/proyectos/plaza-universitaria` | `university building campus`, `educational facility facade` |
| `/proyectos/fgr-santa-elena` | `corporate office building glass`, `government building facade` |
| `/proyectos/residencia-caceres` | `modern house exterior`, `residential architecture luxury` |

Busca URLs reales de Unsplash para cada una — no uses la misma foto en dos páginas distintas. Cada imagen debe llevar `alt` descriptivo y comentario `// TODO: reemplazar con foto real de BOMEL`.



1. **Contadores estadísticos:** Hoy el HTML renderizado por el servidor muestra "+0 años, +0 proyectos, 0%". Los números finales reales (+8 años, +250 proyectos, 98% clientes satisfechos) deben estar en el HTML inicial (SSR) para que Google los indexe. La animación de conteo debe ser solo progresiva-mejora visual en cliente (ej: iniciar la animación desde el número real ya presente, o usar `suppressHydrationWarning` con el valor final como fallback no-JS).
2. **Rotador de palabras del footer** ("Cuando pienses en PUERTAS/VENTANAS, piensa en BOMEL"): en el HTML estático las palabras quedan concatenadas ("ventanasventanas"). Corrige para que solo la palabra activa sea visible al DOM/lectores: las inactivas con `aria-hidden="true"` y renderizado que no duplique texto indexable.
3. **Jerarquía de encabezados:** Audita y corrige. Un solo H1 (hero). Cada sección principal = H2 (Nosotros, Servicios, Proyectos Destacados, Ventanería & Fachadas, Hablemos, Conecta). Tarjetas internas = H3. Elimina H3 duplicados en las tarjetas de ventanas (hoy cada título aparece dos veces).
4. **Schema.org (JSON-LD)** en el layout raíz:
   - `LocalBusiness` (subtipo `GeneralContractor`): nombre legal "Servicios Integrales BOMEL S.A. de C.V.", url, logo, teléfono +503 7040-1212, email luispanameno@bomelsi.com, address solo a nivel de ciudad (addressLocality: "San Salvador", addressCountry: "SV" — sin calle ni número por ahora), areaServed "El Salvador", sameAs (Instagram, Facebook, TikTok, LinkedIn), foundingDate 2018.
   - `Service` por cada servicio (en sus páginas nuevas, Fase 2).
   - `FAQPage` en la sección FAQ (Fase 3).
5. **Sitemap.xml y robots.txt** generados con las rutas nuevas. Canonical correcto en cada página. Redirección http→https y no-www→www (o viceversa, según config actual) verificada.
6. **Imágenes:** limita `sizes`/anchos generados a lo necesario (hero máx 1920, tarjetas máx 1280), `priority` solo en hero, lazy en el resto. Mantén todos los `alt` descriptivos.
7. **Metadata por página** (title + description únicos, en español, con keyword local — patrón: "Fachadas ACM en El Salvador | BOMEL").

---

## FASE 2 — Arquitectura de páginas internas (el cambio más importante)

Convierte el single-page en sitio multi-página SIN romper la home actual (la home se queda como está, pero sus tarjetas ahora enlazan a páginas internas).

### 2A. Páginas de servicio — `/servicios/[slug]`
Crea 6 páginas, una por especialidad:
- `/servicios/obra-civil-y-obra-gris`
- `/servicios/diseno-arquitectonico`
- `/servicios/instalaciones-electricas-hidraulicas`
- `/servicios/acabados-finos-y-revestimientos`
- `/servicios/ventaneria-y-puertas`
- `/servicios/fachadas-acm`

Estructura de cada página (mismo lenguaje visual del sitio):
1. Hero compacto con H1 keyword-local (ej: "Fachadas ACM en El Salvador") + subtítulo persuasivo en la voz de marca actual (directa, "lo que se promete, se cumple") + CTA doble.
2. Sección "Qué incluye" — lista de sub-servicios concretos.
3. Galería de fotos del servicio (usa las imágenes existentes del repo; donde falten, deja componente con placeholder y comentario `// TODO: foto real`).
4. Mini-sección "Proyectos donde lo hicimos" enlazando a las páginas de proyecto relacionadas.
5. Proceso en 3-4 pasos (Visita técnica → Cotización en 24h → Ejecución → Entrega con garantía).
6. CTA final + FAQ corto (3 preguntas específicas del servicio, con schema FAQPage).
Escribe TODO el copy tú mismo, en español salvadoreño profesional, manteniendo el tono actual del sitio (frases cortas, contundentes, sin clichés corporativos).

### 2B. Páginas de proyecto — `/proyectos/[slug]`
Una por proyecto destacado existente (Centro Médico San Alejo, Hospital Nacional Rosales, Recintos Deportivos, Plaza Universitaria, FGR Santa Elena, Residencia Cáceres). Estructura: hero con foto grande, ficha técnica (cliente, ubicación, alcance, especialidades aplicadas), narrativa breve del reto y la solución, galería, y CTA "¿Tienes un proyecto similar?". Más página índice `/proyectos`.

### 2C. Navegación
- Menú: Servicios pasa a dropdown/submenu con las 6 páginas. Agrega "Proyectos".
- Breadcrumbs en páginas internas (con schema BreadcrumbList).
- Footer: enlaza todas las páginas nuevas (esto es interlinking SEO).

---

## FASE 3 — Confianza y prueba social (en la home)

1. **Franja de clientes/instituciones** justo debajo del hero: "Instituciones y empresas que ya construyeron con BOMEL" con los nombres/logos: Hospital Nacional Rosales, FGR, Constructora El Salvador, Solaire, etc. Si no hay archivos de logo, renderiza los nombres en tipografía elegante monocromática verde-grisácea (queda bien y es honesto). Deja comentario para reemplazar por logos cuando existan.
2. **Sección Testimonios** (después de Proyectos): carrusel de 3 tarjetas con el estilo glass actual. Usa estos testimonios REALES exactamente como están escritos:
   - "BOMEL nos entregó la fachada del edificio en la fecha que firmaron, sin un solo cambio en el presupuesto. Eso en construcción casi no existe." — Ing. Carlos Martínez, Gerente de Proyecto, Desarrolladora Cumbres
   - "Contratamos solo la ventanería y terminaron encargándose de todos los acabados. Que un solo equipo responda por todo cambia la experiencia y la paz mental por completo." — Familia Rivas Herrera, Residencia en Santa Elena
   - "Buscábamos remodelar nuestra cocina y ampliar el estudio; la atención al detalle y la limpieza durante la obra fue lo que más nos sorprendió. Definitivamente superaron nuestras expectativas." — Lic. Elena Sandoval, Residencia en San Benito
   Diseño: avatar con iniciales en círculo verde menta (sin fotos), nombre, cargo/contexto, y estrellas ★★★★★.
3. **Sección Equipo:** omitir completamente por ahora. No crear esta sección.
4. **Sección FAQ general en la home** (6 preguntas): "¿Atienden proyectos pequeños como cambiar una puerta o ventana?", "¿Trabajan solo la ventanería si ya tengo constructor?", "¿Cuánto tarda una cotización?", "¿Dan garantía por escrito?", "¿Trabajan con empresas y licitaciones?", "¿En qué zonas de El Salvador trabajan?". Acordeón con el estilo del sitio + schema FAQPage. Redacta respuestas persuasivas tú mismo.
5. **Footer completo (NAP):** ubicación pública: "San Salvador, El Salvador — Atendemos todo el país" (NO mostrar la dirección exacta por ahora; dejar comentario en código para agregarla cuando el taller esté listo), teléfono con enlace `tel:+50370401212`, email `mailto:luispanameno@bomelsi.com`, horario de atención.

---

## CORRECCIÓN PREVIA A FASE 4 — Fotos únicas por página

Antes de ejecutar Fase 4, corrige un problema de las Fases 2 y 3 ya aplicadas: las páginas de servicio y proyecto están usando fotos repetidas o fotos de proyectos reales en contextos incorrectos. 

Revisa `lib/data/servicios.ts` y `lib/data/proyectos.ts` y reemplaza TODAS las URLs de imagen por fotos de Unsplash temáticamente correctas y únicas — ninguna foto debe repetirse entre páginas distintas. Usa la tabla de keywords de la sección "Imágenes para páginas de servicio" arriba para buscar URLs reales de Unsplash específicas para cada página.

Haz commit de esta corrección con mensaje `fix: fotos únicas y temáticas por página de servicio y proyecto` antes de continuar con Fase 4.

---

## FASE 4 — Conversión (CRO)

1. **Barra sticky inferior SOLO en móvil**: dos botones siempre visibles — 📞 "Llamar" (`tel:+50370401212`) y 💬 "WhatsApp" (enlace actual con mensaje prellenado). Discreta, glass oscuro, no debe tapar contenido (safe-area iOS).
2. **Doble CTA en hero y secciones clave**, segmentando al visitante:
   - Primario: "Cotiza por WhatsApp →" (residencial/rápido)
   - Secundario (outline): "Agenda una visita técnica" → lleva a la nueva sección/página de contacto con formulario.
3. **Formulario de contacto corporativo** (nueva sección #contacto real, y página `/contacto`):
   - Campos: Nombre, Empresa (opcional), Teléfono, Email, Tipo de proyecto (select: Ventanería/Puertas · Fachada ACM · Remodelación · Obra gris/Construcción · Acabados · Otro), Mensaje.
   - Envío a **luispanameno@bomelsi.com** vía **Formspree** — endpoint activo: `https://formspree.io/f/mjgdpkvb`. El sitio es Next.js/React, usar la integración oficial: `npm install @formspree/react` y `useForm("mjgdpkvb")` de `@formspree/react`. Implementar con `ValidationError` por campo, spinner de envío con el estilo del design system, y mensaje de éxito al completar. Sin backend, sin variables de entorno, sin configuración adicional — el endpoint ya está activo y apuntado al correo correcto.
   - Validación, estado de envío con animación del design system, y mensaje de éxito: "Recibido. Te respondemos en menos de 24 horas hábiles."
   - Anti-spam: honeypot + rate limit básico.
4. **Reescritura de CTAs existentes:**
   - "Cotizar ahora" → "Recibe tu cotización en 24h"
   - Botón de la sección Hablemos → mantener "Cotiza por WhatsApp" + agregar debajo microcopy de garantía: "Fecha de entrega por contrato. Lo que BOMEL firma, BOMEL cumple."
5. **Cotizador de ventanería SIN precios** (componente interactivo en `/servicios/ventaneria-y-puertas` y accesible desde la home): un mini-wizard de 3 pasos con el estilo visual del sitio que NO muestra precios — su único objetivo es capturar el lead con datos completos:
   - Paso 1: el usuario elige el tipo (Ventana corrediza española · Ventana fija · Ventana proyectable · Puerta corrediza · Puerta embisagrada · Puerta automática), con las miniaturas/imágenes ya existentes en el sitio.
   - Paso 2: ingresa medidas (ancho × alto en metros, inputs numéricos grandes y fáciles en móvil) y cantidad. Botón "+ Agregar otra ventana/puerta" para cotizar varias piezas en una sola solicitud (lista editable de ítems agregados).
   - Paso 3: resumen visual de su pedido + campo opcional de nombre y zona/municipio + botón grande **"Recibir mi cotización por WhatsApp →"**.
   - Al pulsar el botón, arma un enlace `https://wa.me/50370401212?text=...` con mensaje prellenado y formateado, ej:
     "Hola BOMEL, quiero cotizar: • 2 ventanas corredizas españolas de 1.50×1.20 m • 1 puerta corrediza de 2.40×2.10 m. Mi nombre es [nombre], estoy en [zona]."
   - Microcopy bajo el botón en dos líneas: "Te respondemos con tu cotización en menos de 24 horas hábiles." y debajo en texto más pequeño y tono informativo: "* El precio podría variar según distancia, nivel de piso de instalación y condiciones específicas del sitio."
   - Sin precios en pantalla, sin estimaciones — la cotización la responde BOMEL manualmente por WhatsApp. Esto elimina la barrera de "no sé qué pedir" y entrega leads con medidas exactas listas para cotizar.

---

## FASE 5 — Interactividad táctil en móvil (correcciones de UX existente)

La página actual tiene efectos que solo responden al mouse y quedan muertos en celular, donde está la mayoría del tráfico. Corrige:

1. **Logo/elemento del footer que se enciende con hover:** agregar respuesta táctil. Combinar `:hover` con `:active` en CSS y/o listener de `touchstart`/`pointerdown`, de modo que al tocar con el dedo se encienda con la misma animación que en desktop. Usar `pointer events` (`pointerenter`/`pointerdown`) como solución unificada si la arquitectura lo permite.
2. **Letras grandes del footer (texto BOMEL gigante) con efecto parallax/mousemove:** hoy solo escucha `mousemove`. Agregar `touchmove` (con `passive: true` para no bloquear el scroll) usando `e.touches[0].clientX/clientY` como coordenadas equivalentes, para que el efecto siga el dedo igual que sigue el cursor.
3. **Auditoría general de interacciones hover-only:** recorre todos los componentes (tarjetas de servicios, tarjetas de ventanas que dicen "pasa el cursor sobre cada tarjeta", proyectos, botones) y asegúrate de que cada efecto hover tenga su equivalente táctil: `:active`, `touchstart`, o activación al entrar en viewport (Intersection Observer) cuando el efecto sea decorativo. Cambia también los microcopy que digan "pasa el cursor" por "toca cada tarjeta" cuando se detecte dispositivo táctil (o usa texto neutro: "explora cada tarjeta").
4. Verifica en viewport 390px que ningún listener `touchmove` interfiera con el scroll natural de la página.

---

## FASE 6 — Blog con CMS (Sanity) — publicación sin código

El objetivo es que el dueño pueda publicar artículos de blog por su cuenta desde el celular o PC, sin tocar código nunca más. Usar **Sanity CMS** (plan free, hasta 3 usuarios).

### 6A. Setup de Sanity
```bash
npm install next-sanity @sanity/image-url
npx sanity@latest init --env .env.local
```
Configurar en `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=hk5cl9yf
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=[pegar el token editor que el dueño guardó en su bloc de notas — NO hardcodear en el código]
```
Crear `sanity.config.ts` y `sanity/schemas/` en la raíz del proyecto.

### 6B. Schema del artículo de blog
Crear `sanity/schemas/post.ts` con los campos:
- `title` (string, requerido) — título del artículo
- `slug` (slug, generado desde title, requerido) — URL automática
- `publishedAt` (datetime) — fecha de publicación
- `category` (string, opciones: Ventanería · Construcción · Fachadas · Acabados · Consejos · Casos de éxito)
- `mainImage` (image con `hotspot: true`) — foto de portada
- `excerpt` (text, max 200 chars) — resumen para tarjetas y SEO
- `body` (array de bloques Portable Text) — contenido del artículo con soporte para párrafos, títulos H2/H3, imágenes, y listas
- `seoTitle` (string, opcional) — título SEO personalizado
- `seoDescription` (string, opcional) — meta description personalizada
Exportar el schema en `sanity/schemas/index.ts`.

### 6C. Páginas del blog en Next.js
Crear con el mismo design system oscuro de BOMEL (verde menta, glassmorphism, animaciones scroll-driven de las skills instaladas):

**`/blog`** — índice del blog:
- H1: "Guías y consejos de construcción" + subtítulo
- Grid de tarjetas de artículos (foto, categoría badge, título, excerpt, fecha, "Leer más →")
- Filtro por categoría (botones pill con el estilo del sitio)
- Metadata SEO: "Blog de construcción y ventanería en El Salvador | BOMEL"

**`/blog/[slug]`** — artículo individual:
- Hero con foto de portada a ancho completo + título en overlay
- Breadcrumb: Inicio → Blog → [título]
- Contenido Portable Text renderizado con estilos del design system
- Sidebar o sección inferior: "¿Tienes un proyecto? Cotiza con BOMEL →" (CTA con enlace a WhatsApp y formulario)
- Artículos relacionados (misma categoría, máx 3)
- Schema JSON-LD: `Article` con author "Servicios Integrales BOMEL", datePublished, image, description
- Open Graph completo para que al compartir en Instagram/Facebook/TikTok se vea la foto y el título automáticamente

### 6D. Integración en la home y navegación
- Sección nueva en la home (antes del footer): "Desde el blog" — últimas 3 publicaciones en tarjetas horizontales compactas con enlace a `/blog`
- Agregar "Blog" al menú de navegación principal
- Footer: agregar enlace "Blog" en la columna de navegación

### 6E. Panel de edición (Sanity Studio)
Configurar Sanity Studio embebido en la ruta `/studio` de Next.js (usando `next-sanity` App Router studio route), protegido con verificación de entorno (solo visible en desarrollo o con autenticación Sanity). Esto permite al dueño entrar a `bomelsi.com/studio` o al proyecto en `bomelsi.sanity.studio` para publicar.

### 6F. Instrucción para el dueño
Al final del proceso, generar un archivo `BLOG_INSTRUCCIONES.md` en la raíz con:
1. Cómo entrar al panel (URL del studio)
2. Cómo crear un artículo nuevo (paso a paso, sin jerga técnica)
3. Dónde agregar las variables de entorno (`NEXT_PUBLIC_SANITY_PROJECT_ID` y `SANITY_API_TOKEN`) en el hosting (Vercel: Settings → Environment Variables)
4. Nota: el Project ID y el token los obtiene el dueño en sanity.io → Settings → API

**⚠ NOTA PARA CLAUDE CODE:** El Project ID de Sanity es `hk5cl9yf` y el dataset es `production`. Úsalos directamente en la configuración. El `SANITY_API_TOKEN` debe leerse siempre desde la variable de entorno — nunca hardcodeado. Dejar `.env.local.example` documentado con las tres variables para que el dueño sepa qué pegar.

---

## REGLAS GENERALES

- Cero contenido inventado presentado como real: testimonios, direcciones, precios y certificaciones van como placeholders marcados.
- Mantén performance: nada de librerías pesadas nuevas; reutiliza lo que ya está instalado (revisa package.json y skills disponibles antes de agregar dependencias).
- Mobile-first: la mayoría del tráfico es móvil. Verifica cada sección nueva en viewport 390px.
- Accesibilidad: contraste AA sobre fondo oscuro, focus visible, aria-labels en íconos.
- Al final: corre build, corrige errores, y entrega un resumen con (a) rutas nuevas creadas, (b) lista de TODOs que el dueño debe completar (dirección, testimonios, fotos, API key de email, precios del cotizador), (c) checklist para Google Search Console y Google Business Profile.

Sorpréndeme con la ejecución, pero nunca a costa de la coherencia visual con lo que ya existe.
