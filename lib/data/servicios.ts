export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface Servicio {
  slug: string;
  titulo: string;
  kicker: string;
  subtitulo: string;
  descripcion: string;
  heroImage: string;
  heroImageAlt: string;
  queIncluye: string[];
  galeriaImagenes: { src: string; alt: string }[];
  proyectosRelacionados: string[];
  proceso: { titulo: string; descripcion: string }[];
  faqs: FaqItem[];
}

export const SERVICIOS_DATA: Servicio[] = [
  {
    slug: "obra-civil-y-obra-gris",
    titulo: "Obra Civil y Construcción en El Salvador",
    kicker: "Obra Civil",
    subtitulo:
      "Del terreno vacío a la estructura lista. Terracería, cimentaciones, muros y losas con precisión milimétrica.",
    descripcion:
      "Servicios completos de obra civil y obra gris en El Salvador: terracería, urbanización, cimentaciones, paredes, losas y estructura metálica. Una empresa, un responsable.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&q=80",
    heroImageAlt:
      "Construcción de obra gris con estructura de concreto en El Salvador",
    queIncluye: [
      "Terracería y movimiento de tierras",
      "Urbanización y redes de drenaje pluvial",
      "Cimentaciones, fundaciones y zapatas",
      "Levantamiento de paredes y columnas",
      "Losas de concreto y entrepisos",
      "Estructura metálica y techos",
    ],
    galeriaImagenes: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1590486803833-1b5dc97ddb9c?w=1280&q=80",
        alt: "Colada de concreto en cimentación de obra civil residencial",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1280&q=80",
        alt: "Estructura metálica de acero en construcción de edificio",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1280&q=80",
        alt: "Trabajadores especializados en obra de construcción",
      },
    ],
    proyectosRelacionados: [
      "hospital-nacional-rosales",
      "recintos-deportivos",
      "residencia-caceres",
    ],
    proceso: [
      {
        titulo: "Visita técnica",
        descripcion:
          "Evaluamos el terreno, las dimensiones y los requerimientos específicos de tu obra sin costo.",
      },
      {
        titulo: "Cotización en 24h",
        descripcion:
          "Presupuesto detallado con cronograma real, sin letra pequeña ni costos ocultos.",
      },
      {
        titulo: "Ejecución supervisada",
        descripcion:
          "Un equipo dedicado a tu obra con reportes de avance y comunicación directa.",
      },
      {
        titulo: "Entrega con garantía",
        descripcion:
          "Fecha de entrega por contrato. Lo que firmamos, lo cumplimos.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Trabajan en cualquier municipio de El Salvador?",
        respuesta:
          "Sí. Hemos ejecutado obras en San Salvador, Santa Ana, Suchitoto y otras zonas del país. Evaluamos la logística caso por caso y lo incluimos en la cotización.",
      },
      {
        pregunta:
          "¿Pueden encargarse de todo desde el diseño hasta la entrega?",
        respuesta:
          "Exactamente. BOMEL puede llevar tu proyecto desde el diseño arquitectónico hasta los acabados finales. Es la ventaja de trabajar con una sola empresa que responde por cada etapa.",
      },
      {
        pregunta: "¿Cuánto tarda una obra gris típica?",
        respuesta:
          "Depende del alcance. Una residencia de 150 m² puede tomar entre 3 y 5 meses. Lo importante es que el plazo va firmado en contrato desde el inicio.",
      },
    ],
  },
  {
    slug: "diseno-arquitectonico",
    titulo: "Diseño Arquitectónico en El Salvador",
    kicker: "Diseño Arquitectónico",
    subtitulo:
      "Espacios que funcionan antes de existir. Diseñamos para que cada metro cuadrado trabaje a tu favor.",
    descripcion:
      "Diseño arquitectónico profesional en El Salvador: planos, renders, fachadas y gestión de permisos. Construimos la visión antes del primer bloque.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1280&q=80",
    heroImageAlt:
      "Diseño arquitectónico y planos de construcción para proyecto en El Salvador",
    queIncluye: [
      "Planos arquitectónicos y memoria descriptiva",
      "Diseño y renderizado de fachadas",
      "Distribución óptima de espacios interiores",
      "Visualización 3D fotorrealista",
      "Gestión de permisos municipales",
      "Coordinación con especialidades (estructura, MEP)",
    ],
    galeriaImagenes: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1280&q=80",
        alt: "Planos y documentos de diseño arquitectónico sobre mesa de trabajo",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80",
        alt: "Arquitecto revisando planos de proyecto en oficina de diseño",
      },
    ],
    proyectosRelacionados: ["centro-medico-san-alejo", "residencia-caceres"],
    proceso: [
      {
        titulo: "Briefing del proyecto",
        descripcion:
          "Entendemos tu programa de necesidades: funciones, estética, presupuesto y plazos.",
      },
      {
        titulo: "Anteproyecto en 48h",
        descripcion:
          "Primera propuesta de distribución y concepto de fachada para tu retroalimentación.",
      },
      {
        titulo: "Proyecto ejecutivo",
        descripcion:
          "Planos completos, detalles constructivos y memoria técnica lista para cotizar y construir.",
      },
      {
        titulo: "Acompañamiento en obra",
        descripcion:
          "El diseñador supervisa la ejecución para garantizar que el resultado coincida con el proyecto.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Diseñan solo o también construyen?",
        respuesta:
          "Hacemos las dos cosas — y es la clave. Cuando el mismo equipo diseña y construye, no hay interpretaciones ni excusas entre etapas. El resultado es lo que se prometió.",
      },
      {
        pregunta: "¿Qué incluye un proyecto ejecutivo?",
        respuesta:
          "Planos de planta, cortes, elevaciones, detalles constructivos, especificaciones técnicas y, en muchos casos, el apoyo para tramitar los permisos municipales.",
      },
      {
        pregunta: "¿Puedo ver un render antes de comenzar?",
        respuesta:
          "Sí. Parte del proceso incluye visualización 3D para que apruebes la estética antes del primer bloque. Sin sorpresas.",
      },
    ],
  },
  {
    slug: "instalaciones-electricas-hidraulicas",
    titulo: "Instalaciones Eléctricas e Hidráulicas en El Salvador",
    kicker: "Instalaciones",
    subtitulo:
      "La ingeniería que no se ve es la que más importa. Sistemas planificados para funcionar décadas sin darte un solo dolor de cabeza.",
    descripcion:
      "Instalaciones eléctricas, hidráulicas y pluviales para construcción residencial, comercial e institucional en El Salvador. Planificadas para durar.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1280&q=80",
    heroImageAlt:
      "Instalación de red eléctrica e hidráulica en construcción en El Salvador",
    queIncluye: [
      "Red eléctrica residencial, comercial e industrial",
      "Tableros de distribución y sistemas de protección",
      "Iluminación arquitectónica y de emergencia",
      "Red hidráulica (agua potable y aguas residuales)",
      "Sistemas pluviales y cajas de registro",
      "Cisternas, bombas y sistemas de presión",
    ],
    galeriaImagenes: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1280&q=80",
        alt: "Instalación de canalización eléctrica en construcción residencial",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&q=80",
        alt: "Técnico realizando instalación de cableado eléctrico en obra",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1280&q=80",
        alt: "Tubería y conexiones hidráulicas en instalación de red de agua potable",
      },
    ],
    proyectosRelacionados: [
      "hospital-nacional-rosales",
      "recintos-deportivos",
      "residencia-caceres",
    ],
    proceso: [
      {
        titulo: "Diagnóstico técnico",
        descripcion:
          "Revisamos las necesidades eléctricas e hidráulicas del proyecto y las normativas aplicables.",
      },
      {
        titulo: "Diseño de redes",
        descripcion:
          "Trazamos las rutas óptimas para minimizar pérdidas, facilitar el mantenimiento y cumplir normativa.",
      },
      {
        titulo: "Instalación certificada",
        descripcion:
          "Técnicos especializados con los materiales correctos. Sin improvisaciones.",
      },
      {
        titulo: "Pruebas y entrega",
        descripcion:
          "Pruebas de presión, continuidad y aislamiento antes de la entrega. Todo documentado.",
      },
    ],
    faqs: [
      {
        pregunta:
          "¿Pueden hacer solo instalaciones si ya tengo constructor?",
        respuesta:
          "Sí. Trabajamos como especialistas de instalaciones en proyectos donde ya hay constructor principal. Coordinamos planos y cronograma directamente.",
      },
      {
        pregunta:
          "¿Las instalaciones cumplen con la normativa de CAESS y ANDA?",
        respuesta:
          "Absolutamente. Trabajamos bajo los requerimientos de las empresas distribuidoras y entes reguladores de El Salvador.",
      },
      {
        pregunta: "¿Dan garantía por las instalaciones?",
        respuesta:
          "Sí, garantía por escrito. Los defectos de instalación que se reporten dentro del período acordado los atendemos sin costo adicional.",
      },
    ],
  },
  {
    slug: "acabados-finos-y-revestimientos",
    titulo: "Acabados Finos y Revestimientos en El Salvador",
    kicker: "Acabados",
    subtitulo:
      "El detalle que separa una construcción de un lugar que enamora. ACM, WPC, PVC y más con terminaciones que se sienten al tacto.",
    descripcion:
      "Acabados finos y revestimientos arquitectónicos en El Salvador: ACM, WPC, tablaroca, enchapes y divisiones de vidrio. Lo que transforma una estructura en un lugar memorable.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a2f79?w=1280&q=80",
    heroImageAlt:
      "Acabados finos y revestimientos interiores en edificio moderno en El Salvador",
    queIncluye: [
      "Recubrimientos en panel compuesto de aluminio (ACM)",
      "Deck y cladding en WPC (wood plastic composite)",
      "Cielos falsos y divisiones en tablaroca",
      "Enchapes cerámicos y porcelanatos",
      "Divisiones de vidrio de seguridad para oficinas y clínicas",
      "Divisiones de baño en acero inoxidable",
    ],
    galeriaImagenes: [
      {
        src: "/images/productos/divisiones-vidrio-oficina.webp",
        alt: "Divisiones de vidrio de seguridad para oficinas y consultorios, instaladas por BOMEL",
      },
      {
        src: "/images/productos/divisiones-bano-acero-inoxidable.webp",
        alt: "Divisiones de baño en acero inoxidable de alta resistencia, suministradas por BOMEL",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1280&q=80",
        alt: "Acabados finos en interior de oficina comercial con revestimientos de lujo",
      },
    ],
    proyectosRelacionados: [
      "fgr-santa-elena",
      "hospital-nacional-rosales",
      "residencia-caceres",
    ],
    proceso: [
      {
        titulo: "Selección de materiales",
        descripcion:
          "Te presentamos muestras reales y recomendamos la opción más adecuada según uso, presupuesto y estética.",
      },
      {
        titulo: "Cotización detallada",
        descripcion:
          "Precio por material, mano de obra y alcance. Sin estimaciones vagas.",
      },
      {
        titulo: "Instalación precisa",
        descripcion:
          "Especialistas que conocen cada sistema. Terminaciones que pasan la revisión más exigente.",
      },
      {
        titulo: "Limpieza y entrega",
        descripcion:
          "Entregamos el espacio listo para usar, con el área de trabajo limpia.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué ventaja tiene el WPC sobre la madera natural?",
        respuesta:
          "El WPC no se pudre, no le afecta la humedad ni los insectos, y requiere cero mantenimiento. Ideal para El Salvador donde la lluvia y el calor deterioran la madera rápidamente.",
      },
      {
        pregunta:
          "¿Las divisiones de vidrio son seguras para uso comercial?",
        respuesta:
          "Usamos vidrio de seguridad templado o laminado que cumple con las normas para espacios de uso intensivo. El mismo sistema que instalamos en infraestructura hospitalaria donde el margen de error es cero.",
      },
      {
        pregunta: "¿Hacen tablaroca en zonas húmedas como baños?",
        respuesta:
          "Sí, con tablaroca resistente a humedad (MR). Seleccionamos el tipo correcto según la exposición de cada zona.",
      },
    ],
  },
  {
    slug: "ventaneria-y-puertas",
    titulo: "Ventanería y Puertas de Aluminio en El Salvador",
    kicker: "Ventanería & Puertas",
    subtitulo:
      "Aluminio, vidrio y sistemas especiales instalados con sellado de precisión. Luz, seguridad y silencio en cada apertura.",
    descripcion:
      "Ventanas y puertas de aluminio y vidrio en El Salvador: sistemas corredizos, fijos, proyectables, automáticos y puertas en ACM. Fabricación e instalación a medida por BOMEL.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1280&q=80",
    heroImageAlt:
      "Ventanas y puertas de aluminio y vidrio instaladas en edificio por BOMEL El Salvador",
    queIncluye: [
      "Ventanas corredizas españolas de aluminio",
      "Ventanas fijas de gran formato",
      "Ventanas proyectables con herrajes de precisión",
      "Puertas corredizas y embisagradas de aluminio",
      "Puertas automáticas con sensor sin contacto",
      "Puertas en ACM de alta resistencia",
      "Divisiones de vidrio templado para espacios comerciales",
    ],
    galeriaImagenes: [
      {
        src: "/images/productos/puertas-vidrio-automaticas.webp",
        alt: "Puertas de vidrio con sistema de apertura automática por sensor, instaladas por BOMEL",
      },
      {
        src: "/images/productos/puertas-acm-entrada.webp",
        alt: "Puertas en ACM de alta resistencia para accesos de alto tráfico — BOMEL",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1280&q=80",
        alt: "Ventanas de aluminio de gran formato en residencia moderna",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1280&q=80",
        alt: "Fachada de vidrio y aluminio en edificio comercial contemporáneo",
      },
    ],
    proyectosRelacionados: [
      "fgr-santa-elena",
      "recintos-deportivos",
      "plaza-universitaria",
    ],
    proceso: [
      {
        titulo: "Medición en sitio",
        descripcion:
          "Un técnico toma medidas exactas en tu obra. Sin estimaciones — cada pieza se fabrica a medida.",
      },
      {
        titulo: "Cotización en 24h",
        descripcion:
          "Especificación detallada de perfil, vidrio, herraje y costo total sin sorpresas.",
      },
      {
        titulo: "Fabricación e instalación",
        descripcion:
          "Piezas fabricadas en taller y montadas por especialistas con sellado de precisión.",
      },
      {
        titulo: "Garantía de hermeticidad",
        descripcion:
          "Garantizamos el sellado y el funcionamiento mecánico por escrito.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Fabrican a medida o son tamaños estándar?",
        respuesta:
          "Fabricamos a medida. Cada ventana y puerta se produce según las medidas exactas de tu obra. No hay tamaños predefinidos ni adaptaciones forzadas.",
      },
      {
        pregunta: "¿Cuánto tiempo tarda la instalación?",
        respuesta:
          "Una residencia típica (10-20 piezas) se instala en 1 a 3 días. Proyectos mayores se programan con cronograma específico.",
      },
      {
        pregunta:
          "¿Las puertas automáticas requieren mantenimiento especial?",
        respuesta:
          "El sistema de sensores requiere revisión semestral. Te entregamos la guía de mantenimiento y tenemos servicio técnico disponible después de la instalación.",
      },
    ],
  },
  {
    slug: "fachadas-acm",
    titulo: "Fachadas ACM y Revestimientos Arquitectónicos en El Salvador",
    kicker: "Fachadas ACM",
    subtitulo:
      "Tu edificio habla antes de que alguien entre. Fachadas en panel compuesto de aluminio que proyectan exactamente lo que tu marca quiere decir.",
    descripcion:
      "Fachadas en ACM, muro cortina, louvers y lámina microperforada en El Salvador. Diseño, fabricación e instalación de envolventes arquitectónicos de alto rendimiento por BOMEL.",
    // TODO: reemplazar con foto real de BOMEL
    heroImage:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1280&q=80",
    heroImageAlt:
      "Fachada ACM de panel compuesto de aluminio en edificio moderno en El Salvador",
    queIncluye: [
      "Fachadas en panel compuesto de aluminio (ACM)",
      "Muro cortina con vidrio insulado y laminado",
      "Cortasoles de aluminio extruido",
      "Sistemas de louvers en aluminio sólido o acabado madera",
      "Lámina microperforada para control solar",
      "Celosías decorativas bioclimáticas",
    ],
    galeriaImagenes: [
      {
        src: "/images/productos/louvers-sistema-fachada.webp",
        alt: "Sistema de louvers para control solar bioclimático en fachada de edificio — BOMEL",
      },
      {
        src: "/images/productos/lamina-microperforada-fachada.webp",
        alt: "Lámina microperforada como revestimiento exterior de control solar en fachada",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1486591547781-1d6c1c2c5aa9?w=1280&q=80",
        alt: "Fachada en panel ACM de aluminio compuesto en edificio corporativo",
      },
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1280&q=80",
        alt: "Envolvente arquitectónica de aluminio en edificio institucional moderno",
      },
    ],
    proyectosRelacionados: ["fgr-santa-elena", "centro-medico-san-alejo"],
    proceso: [
      {
        titulo: "Conceptualización",
        descripcion:
          "Evaluamos el diseño arquitectónico, la orientación solar y la identidad visual para proponer el sistema de fachada ideal.",
      },
      {
        titulo: "Ingeniería de detalle",
        descripcion:
          "Diseñamos la subestructura de montaje, los detalles de esquina y los puntos de fijación para garantizar durabilidad y hermeticidad.",
      },
      {
        titulo: "Fabricación de precisión",
        descripcion:
          "Los paneles se cortan y pliegan en taller con maquinaria CNC para garantizar ajuste milimétrico.",
      },
      {
        titulo: "Montaje y sellado",
        descripcion:
          "Equipo especializado en altura. Sellado perimetral garantizado por escrito.",
      },
    ],
    faqs: [
      {
        pregunta: "¿El ACM es resistente al clima de El Salvador?",
        respuesta:
          "Sí. El panel compuesto de aluminio resiste la humedad, la lluvia y la radiación UV sin decolorarse ni oxidarse. Es el material de fachada más usado en edificios comerciales e institucionales del país.",
      },
      {
        pregunta:
          "¿Qué ventaja tiene el muro cortina sobre una fachada sólida?",
        respuesta:
          "El muro cortina maximiza la luz natural, reduce el consumo en iluminación y proyecta una imagen corporativa de primer nivel. Con vidrio insulado, el ahorro en aire acondicionado es significativo.",
      },
      {
        pregunta:
          "¿Los louvers y la lámina microperforada realmente reducen el calor?",
        respuesta:
          "Sí. Actúan como segunda piel arquitectónica: filtran la radiación solar directa antes de que llegue al vidrio, reduciendo significativamente la ganancia de calor. El mismo sistema instalado en infraestructura hospitalaria donde el control térmico es crítico.",
      },
    ],
  },
];

export function getServicio(slug: string): Servicio | undefined {
  return SERVICIOS_DATA.find((s) => s.slug === slug);
}
