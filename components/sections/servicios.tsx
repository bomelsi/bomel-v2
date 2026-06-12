import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

interface Servicio {
  titulo: string;
  descripcion: string;
  href: string;
  icono: React.ReactNode;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SERVICIOS: Servicio[] = [
  {
    titulo: "Obra civil, urbanización y obra gris",
    descripcion:
      "Del terreno vacío a la estructura lista: terracería, calles, redes, cimentaciones, paredes y losas con precisión milimétrica. La base completa sobre la que descansa todo lo demás.",
    href: "/servicios/obra-civil-y-obra-gris",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M2.25 21h19.5M3.75 21V9.349M20.25 21V9.349M4.5 9.349 12 3l7.5 6.349M9.75 21v-6.75h4.5V21" />
      </svg>
    ),
  },
  {
    titulo: "Diseño arquitectónico",
    descripcion:
      "Espacios que funcionan antes de existir. Diseñamos la distribución exacta para que cada metro cuadrado trabaje a favor de quien lo habita.",
    href: "/servicios/diseno-arquitectonico",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M15.75 3.75 18 6m-2.25-2.25L9 10.5l-1.5 4.5 4.5-1.5 6.75-6.75m-2.25-2.25 2.25 2.25M4.5 19.5h15" />
      </svg>
    ),
  },
  {
    titulo: "Instalaciones eléctricas, hidráulicas y pluviales",
    descripcion:
      "La ingeniería que no se ve es la que más importa. Sistemas planificados para funcionar décadas sin darte un solo dolor de cabeza.",
    href: "/servicios/instalaciones-electricas-hidraulicas",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    titulo: "Acabados finos y revestimientos",
    descripcion:
      "El detalle que separa una construcción de un lugar que enamora. ACM, WPC, PVC y tablaroca con terminaciones que se sienten al tacto.",
    href: "/servicios/acabados-finos-y-revestimientos",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    titulo: "Ventanería y puertas",
    descripcion:
      "Aluminio, vidrio y sistemas especiales instalados con sellado de precisión. Luz, seguridad y silencio en cada apertura.",
    href: "/servicios/ventaneria-y-puertas",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M4.5 3.75h15v16.5h-15V3.75ZM12 3.75v16.5M4.5 12h15" />
      </svg>
    ),
  },
  {
    titulo: "Fachadas ACM",
    descripcion:
      "Tu edificio habla antes de que alguien entre. Fachadas modernas en panel compuesto de aluminio que proyectan exactamente lo que tu marca quiere decir.",
    href: "/servicios/fachadas-acm",
    icono: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M3.75 4.5h16.5M3.75 4.5v15h16.5v-15M7.5 8.25h3v3h-3v-3ZM13.5 8.25h3v3h-3v-3ZM7.5 14.25h3v3h-3v-3ZM13.5 14.25h3v3h-3v-3Z" />
      </svg>
    ),
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 -z-10 h-[450px] w-[450px] rounded-full bg-brand/10 blur-[130px]"
      />

      <Reveal className="text-center">
        <p className="section-kicker justify-center mb-5">Servicios</p>
        <h2 className="font-heading mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Todo lo que tu obra necesita,{" "}
          <span className="text-brand-bright">sin salir de una empresa.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          Seis especialidades, un solo equipo y cero excusas entre etapas. Así
          se construye cuando el mismo nombre responde por cada detalle.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((servicio, i) => (
          <Reveal key={servicio.titulo} delay={(i % 3) * 0.1}>
            <Link
              href={servicio.href}
              className="glass-panel glass-panel-hover group flex h-full flex-col rounded-3xl p-7"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-bright/25 to-brand-strong/10 text-brand-bright border border-brand/30 transition-transform duration-500 group-hover:scale-110">
                {servicio.icono}
              </div>
              <h3 className="font-heading text-lg font-bold leading-snug mb-3">
                {servicio.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                {servicio.descripcion}
              </p>
              <p className="mt-4 text-xs font-bold text-brand-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Ver servicio →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
