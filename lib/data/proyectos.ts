export interface ProyectoData {
  slug: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  cliente: string;
  año: string;
  alcance: string[];
  especialidades: string[];
  imagen: string;
  galeria: { src: string; alt: string }[];
  reto: string;
  solucion: string;
  descripcion: string;
  serviciosRelacionados: string[];
}

export const PROYECTOS_DATA: ProyectoData[] = [
  {
    slug: "centro-medico-san-alejo",
    nombre: "Centro Médico San Alejo",
    categoria: "Salud",
    ubicacion: "El Salvador",
    cliente: "Centro Médico San Alejo",
    año: "2022",
    alcance: [
      "Estructura metálica de múltiples niveles",
      "Losas densas de segundo y tercer nivel",
      "Fachada de muro cortina con ACM",
    ],
    especialidades: ["Obra civil", "Fachadas ACM", "Ventanería"],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80",
        alt: "Centro Médico San Alejo con fachada ACM ejecutada por BOMEL",
      },
    ],
    reto:
      "El proyecto requería integrar estructura metálica de múltiples niveles con una fachada de muro cortina que diera identidad al edificio, cumpliendo los estándares de un centro de salud sin interrumpir las operaciones de las instalaciones vecinas.",
    solucion:
      "BOMEL ejecutó la estructura metálica y las losas densas con precisión de cronograma. La fachada de muro cortina con ACM se instaló con paneles cortados en taller para garantizar el ajuste perfecto en cada módulo de la envolvente.",
    descripcion:
      "Estructura metálica, losas y fachada ACM ejecutadas por BOMEL para el Centro Médico San Alejo en El Salvador.",
    serviciosRelacionados: ["obra-civil-y-obra-gris", "fachadas-acm"],
  },
  {
    slug: "hospital-nacional-rosales",
    nombre: "Hospital Nacional Rosales",
    categoria: "Salud",
    ubicacion: "San Salvador, El Salvador",
    cliente: "Hospital Nacional Rosales (MINSAL)",
    año: "2021",
    alcance: [
      "Reconstrucción del edificio de especialidades",
      "Paredes, pisos y divisiones internas",
      "Red eléctrica e hidráulica completa",
      "Puertas y ventanas de aluminio y vidrio",
    ],
    especialidades: ["Obra civil", "Instalaciones", "Ventanería", "Acabados"],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1280&q=80",
        alt: "Reconstrucción del edificio de especialidades del Hospital Nacional Rosales ejecutada por BOMEL",
      },
    ],
    reto:
      "Infraestructura crítica hospitalaria donde no hay margen de error ni retrasos. La reconstrucción debía integrarse con las instalaciones activas del hospital y cumplir con los estándares más exigentes de asepsia y seguridad estructural.",
    solucion:
      "BOMEL coordinó cada especialidad bajo un cronograma estricto: obra gris, instalaciones eléctricas e hidráulicas, divisiones y carpintería de aluminio. Un solo equipo que responde por cada etapa elimina la fricción entre subcontratistas.",
    descripcion:
      "Reconstrucción del edificio de especialidades del Hospital Nacional Rosales: obra gris, instalaciones, acabados y ventanería ejecutados íntegramente por BOMEL.",
    serviciosRelacionados: [
      "obra-civil-y-obra-gris",
      "instalaciones-electricas-hidraulicas",
      "ventaneria-y-puertas",
    ],
  },
  {
    slug: "recintos-deportivos",
    nombre: "Recintos Deportivos El Polvorín y Ciudad Merliot",
    categoria: "Deportivo",
    ubicacion: "El Salvador",
    cliente: "INDES",
    año: "2020",
    alcance: [
      "Puertas y ventanas de aluminio y vidrio",
      "Cortasoles de aluminio",
      "Drenajes y cajas de registro",
    ],
    especialidades: ["Ventanería", "Instalaciones"],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1280&q=80",
        alt: "Instalaciones de aluminio en Recintos Deportivos El Polvorín y Ciudad Merliot por BOMEL",
      },
    ],
    reto:
      "Dos recintos de alto tráfico que exigen materiales robustos para apertura y cierre constante, sistemas de drenaje eficientes, y soluciones que soporten la afluencia masiva de usuarios sin mantenimiento intensivo.",
    solucion:
      "Se instalaron sistemas de aluminio y vidrio diseñados para uso intensivo, con herrajes de alta resistencia y sellado que soporta las condiciones climatológicas de El Salvador. Los drenajes y cajas de registro se integraron al diseño sin interrumpir el flujo peatonal.",
    descripcion:
      "Puertas, ventanas y cortasoles de aluminio más drenajes en los Recintos Deportivos El Polvorín y Ciudad Merliot para INDES — ejecutado por BOMEL.",
    serviciosRelacionados: [
      "ventaneria-y-puertas",
      "instalaciones-electricas-hidraulicas",
    ],
  },
  {
    slug: "plaza-universitaria",
    nombre: "Plaza Universitaria",
    categoria: "Comercial",
    ubicacion: "El Salvador",
    cliente: "Constructora El Salvador",
    año: "2021",
    alcance: [
      "Estructura de obra civil",
      "Acabados para uso comercial intensivo",
    ],
    especialidades: ["Obra civil", "Acabados"],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80",
        alt: "Plaza Universitaria — estructura y acabados ejecutados por BOMEL para Constructora El Salvador",
      },
    ],
    reto:
      "Obra comercial de uso intensivo que exige precisión en acabados y materiales de larga duración, ejecutada bajo los estándares de una constructora de trayectoria reconocida en El Salvador.",
    solucion:
      "BOMEL aportó la rigurosidad técnica y la velocidad de ejecución que una obra de este nivel requiere, coordinando estructura y acabados bajo un solo equipo con cronograma documentado y sin sorpresas en el presupuesto.",
    descripcion:
      "Estructura y acabados de Plaza Universitaria en El Salvador, ejecutados por BOMEL en colaboración con Constructora El Salvador.",
    serviciosRelacionados: [
      "obra-civil-y-obra-gris",
      "acabados-finos-y-revestimientos",
    ],
  },
  {
    slug: "fgr-santa-elena",
    nombre: "FGR Edificio Santa Elena",
    categoria: "Corporativo",
    ubicacion: "Santa Elena, El Salvador",
    cliente: "Solaire (para FGR)",
    año: "2022",
    alcance: [
      "Muro cortina con vidrio insulado",
      "Cortasol de aluminio extruido",
      "Fachada en ACM",
    ],
    especialidades: ["Fachadas ACM", "Ventanería"],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1280&q=80",
        alt: "Muro cortina con vidrio insulado y cortasol de aluminio en Edificio FGR Santa Elena — BOMEL",
      },
    ],
    reto:
      "Fachada institucional que debía proyectar solidez y modernidad mientras optimizaba el confort térmico interior de un edificio de alta ocupación administrativa.",
    solucion:
      "BOMEL instaló un muro cortina con vidrio insulado que maximiza la luz natural y reduce la ganancia solar. El cortasol de aluminio extruido actúa como segunda piel, bloqueando la radiación directa sin comprometer las vistas desde el interior.",
    descripcion:
      "Muro cortina con vidrio insulado y cortasol de aluminio en Edificio FGR Santa Elena — diseño e instalación por BOMEL para Solaire.",
    serviciosRelacionados: ["fachadas-acm", "ventaneria-y-puertas"],
  },
  {
    slug: "residencia-caceres",
    nombre: "Residencia Cáceres",
    categoria: "Residencial",
    ubicacion: "Suchitoto, El Salvador",
    cliente: "Familia Cáceres",
    año: "2023",
    alcance: [
      "Diseño arquitectónico integral",
      "Obra gris completa",
      "Instalaciones eléctricas e hidráulicas",
      "Techos y obra terminada",
    ],
    especialidades: [
      "Diseño arquitectónico",
      "Obra civil",
      "Instalaciones",
    ],
    // TODO: reemplazar con foto real de BOMEL
    imagen:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&q=80",
    galeria: [
      {
        // TODO: reemplazar con foto real de BOMEL
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&q=80",
        alt: "Residencia Cáceres en Suchitoto — obra gris, instalaciones y acabados llave en mano por BOMEL",
      },
    ],
    reto:
      "Residencia familiar en Suchitoto que requería manejo integral de todas las especialidades desde el diseño hasta la entrega llave en mano, coordinando logística en una ubicación fuera del área metropolitana.",
    solucion:
      "BOMEL asumió el proyecto completo: diseño, obra gris, instalaciones y techos. La familia tuvo un solo punto de contacto y una sola fecha de entrega firmada en contrato. Sin intermediarios, sin excusas entre etapas.",
    descripcion:
      "Residencia familiar en Suchitoto ejecutada íntegramente por BOMEL: diseño arquitectónico, obra gris, instalaciones y acabados llave en mano.",
    serviciosRelacionados: [
      "obra-civil-y-obra-gris",
      "diseno-arquitectonico",
      "instalaciones-electricas-hidraulicas",
    ],
  },
];

export function getProyecto(slug: string): ProyectoData | undefined {
  return PROYECTOS_DATA.find((p) => p.slug === slug);
}
