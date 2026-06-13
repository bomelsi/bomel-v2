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
    cliente: "Sr. Marcos Carranza",
    año: "2022",
    alcance: [
      "Estructura metálica",
      "Losa densa 2° y 3° nivel",
      "Muro cortina",
      "ACM",
    ],
    especialidades: ["Obra civil", "Fachadas ACM", "Ventanería"],
    imagen:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80",
        alt: "Centro Médico San Alejo con fachada ACM ejecutada por BOMEL",
      },
    ],
    reto:
      "El proyecto requería integrar estructura metálica de múltiples niveles con una fachada de muro cortina que diera identidad al edificio, cumpliendo los estándares de un centro de salud sin interrumpir las operaciones de las instalaciones vecinas.",
    solucion:
      "BOMEL ejecutó la estructura metálica y las losas densas con precisión de cronograma. La fachada de muro cortina con ACM se instaló con paneles cortados en taller para garantizar el ajuste perfecto en cada módulo de la envolvente.",
    descripcion:
      "Estructura metálica, losas y fachada ACM ejecutadas por BOMEL para el Sr. Marcos Carranza en El Salvador.",
    serviciosRelacionados: ["obra-civil-y-obra-gris", "fachadas-acm"],
  },
  {
    slug: "hospital-nacional-rosales",
    nombre: "Hospital Nacional Rosales",
    categoria: "Salud",
    ubicacion: "San Salvador, El Salvador",
    cliente: "Constructora El Salvador",
    año: "2021",
    alcance: [
      "Reconstrucción de paredes",
      "Pisos",
      "División liviana",
      "Red eléctrica",
      "Puertas y ventanas de aluminio y vidrio",
    ],
    especialidades: ["Obra civil", "Instalaciones", "Ventanería", "Acabados"],
    imagen:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1280&q=80",
        alt: "Reconstrucción del edificio de especialidades del Hospital Nacional Rosales ejecutada por BOMEL",
      },
    ],
    reto:
      "Infraestructura crítica hospitalaria donde no hay margen de error ni retrasos. La reconstrucción debía integrarse con las instalaciones activas del hospital y cumplir con los estándares más exigentes de asepsia y seguridad estructural.",
    solucion:
      "BOMEL coordinó cada especialidad bajo un cronograma estricto: obra gris, instalaciones eléctricas, divisiones y carpintería de aluminio. Un solo equipo que responde por cada etapa elimina la fricción entre subcontratistas.",
    descripcion:
      "Reconstrucción del edificio de especialidades del Hospital Nacional Rosales: paredes, pisos, divisiones, red eléctrica y ventanería ejecutados por BOMEL para Constructora El Salvador.",
    serviciosRelacionados: [
      "obra-civil-y-obra-gris",
      "instalaciones-electricas-hidraulicas",
      "ventaneria-y-puertas",
    ],
  },
  {
    slug: "hospital-nejapa",
    nombre: "Hospital Nejapa Zona Norte",
    categoria: "Salud",
    ubicacion: "El Salvador",
    cliente: "UDP CALZADA - ICACON",
    año: "2022",
    alcance: [
      "Estructura metálica",
      "Lámina microperforada",
      "Casetas",
      "Luminarias",
      "Cortasoles",
    ],
    especialidades: ["Fachadas ACM", "Instalaciones"],
    imagen:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1280&q=80",
        alt: "Estructura metálica con lámina microperforada en Hospital Nejapa Zona Norte — BOMEL",
      },
    ],
    reto:
      "Proyecto hospitalario que demandaba soluciones de control solar eficientes y estructuras metálicas ligeras para cubrir grandes luces sin afectar la funcionalidad clínica ni el cronograma de habilitación del recinto.",
    solucion:
      "BOMEL suministró e instaló la estructura metálica principal y aplicó lámina microperforada como envolvente de control solar. Las casetas, luminarias y cortasoles se integraron bajo un solo cronograma supervisado para UDP CALZADA - ICACON.",
    descripcion:
      "Estructura metálica, lámina microperforada, casetas, luminarias y cortasoles ejecutados por BOMEL para UDP CALZADA - ICACON en Hospital Nejapa Zona Norte.",
    serviciosRelacionados: [
      "fachadas-acm",
      "instalaciones-electricas-hidraulicas",
    ],
  },
  {
    slug: "recintos-deportivos",
    nombre: "Recintos Deportivos El Polvorín y Ciudad Merliot",
    categoria: "Deportivo",
    ubicacion: "El Salvador",
    cliente: "4Carriles",
    año: "2020",
    alcance: [
      "Puertas y ventanas de aluminio y vidrio",
      "Cortasoles de aluminio",
      "Drenajes",
    ],
    especialidades: ["Ventanería", "Instalaciones"],
    imagen:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1280&q=80",
        alt: "Instalaciones de aluminio en Recintos Deportivos El Polvorín y Ciudad Merliot por BOMEL",
      },
    ],
    reto:
      "Dos recintos de alto tráfico que exigen materiales robustos para apertura y cierre constante, sistemas de drenaje eficientes, y soluciones que soporten la afluencia masiva de usuarios sin mantenimiento intensivo.",
    solucion:
      "Se instalaron sistemas de aluminio y vidrio diseñados para uso intensivo, con herrajes de alta resistencia y sellado que soporta las condiciones climatológicas de El Salvador. Los drenajes se integraron al diseño sin interrumpir el flujo peatonal.",
    descripcion:
      "Puertas, ventanas, cortasoles de aluminio y drenajes en los Recintos Deportivos El Polvorín y Ciudad Merliot para 4Carriles — ejecutado por BOMEL.",
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
      "Acabados arquitectónicos",
      "Estructura",
    ],
    especialidades: ["Obra civil", "Acabados"],
    imagen:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80",
        alt: "Plaza Universitaria — estructura y acabados ejecutados por BOMEL para Constructora El Salvador",
      },
    ],
    reto:
      "Obra comercial de uso intensivo que exige precisión en acabados y materiales de larga duración, ejecutada bajo los estándares de una constructora de trayectoria reconocida en El Salvador.",
    solucion:
      "BOMEL aportó la rigurosidad técnica y la velocidad de ejecución que una obra de este nivel requiere, coordinando estructura y acabados bajo un solo equipo con cronograma documentado.",
    descripcion:
      "Estructura y acabados arquitectónicos de Plaza Universitaria en El Salvador, ejecutados por BOMEL para Constructora El Salvador.",
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
    cliente: "Solaire",
    año: "2022",
    alcance: [
      "Muro cortina con vidrio insulado",
      "Cortasol de aluminio tubo rectangular 6 pulgadas",
    ],
    especialidades: ["Fachadas ACM", "Ventanería"],
    imagen:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1280&q=80",
        alt: "Muro cortina con vidrio insulado y cortasol de aluminio en Edificio FGR Santa Elena — BOMEL",
      },
    ],
    reto:
      "Fachada institucional que debía proyectar solidez y modernidad mientras optimizaba el confort térmico interior de un edificio de alta ocupación administrativa.",
    solucion:
      "BOMEL instaló un muro cortina con vidrio insulado que maximiza la luz natural y reduce la ganancia solar. El cortasol de aluminio tubo rectangular de 6 pulgadas actúa como segunda piel, bloqueando la radiación directa sin comprometer las vistas desde el interior.",
    descripcion:
      "Muro cortina con vidrio insulado y cortasol de aluminio en Edificio FGR Santa Elena — diseño e instalación por BOMEL para Solaire.",
    serviciosRelacionados: ["fachadas-acm", "ventaneria-y-puertas"],
  },
  {
    slug: "residencia-caceres",
    nombre: "Residencia Cáceres",
    categoria: "Residencial",
    ubicacion: "Suchitoto, El Salvador",
    cliente: "Melvin Cáceres",
    año: "2023",
    alcance: [
      "Obra gris",
      "Instalaciones eléctricas",
      "Techos",
      "Instalaciones hidráulicas",
    ],
    especialidades: ["Obra civil", "Instalaciones"],
    imagen:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&q=80",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&q=80",
        alt: "Residencia Cáceres en Suchitoto — obra gris, instalaciones y techos por BOMEL",
      },
    ],
    reto:
      "Residencia familiar en Suchitoto que requería manejo integral de obra gris e instalaciones desde el inicio hasta la entrega, coordinando logística en una ubicación fuera del área metropolitana.",
    solucion:
      "BOMEL asumió el proyecto completo: obra gris, instalaciones eléctricas, techos e hidráulica. La familia tuvo un solo punto de contacto y una sola fecha de entrega firmada en contrato. Sin intermediarios, sin excusas entre etapas.",
    descripcion:
      "Residencia de Melvin Cáceres en Suchitoto: obra gris, instalaciones eléctricas, techos e hidráulica ejecutados íntegramente por BOMEL.",
    serviciosRelacionados: [
      "obra-civil-y-obra-gris",
      "instalaciones-electricas-hidraulicas",
    ],
  },
];

export function getProyecto(slug: string): ProyectoData | undefined {
  return PROYECTOS_DATA.find((p) => p.slug === slug);
}
