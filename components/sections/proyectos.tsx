import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

interface Proyecto {
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
}

const PROYECTOS: Proyecto[] = [
  {
    nombre: "Centro Médico San Alejo",
    categoria: "Salud",
    descripcion:
      "Estructura metálica, losas densas de segundo y tercer nivel, y una fachada de muro cortina con ACM que le da identidad al edificio.",
    imagen: "/proyecto-centro-medico-san-alejo.jpg",
  },
  {
    nombre: "Hospital Nacional Rosales",
    categoria: "Salud",
    descripcion:
      "Reconstrucción del edificio de especialidades: paredes, pisos, divisiones, red eléctrica, puertas y ventanas. Infraestructura crítica, cero margen de error.",
    imagen: "/proyecto-hospital-rosales.jpg",
  },
  {
    nombre: "Recintos Deportivos El Polvorín y Ciudad Merliot",
    categoria: "Deportivo",
    descripcion:
      "Puertas, ventanas y cortasoles de aluminio y vidrio, más drenajes y cajas de registro, para dos recintos de alto tráfico.",
    imagen: "/proyecto-recintos-deportivos.jpg",
  },
  {
    nombre: "Plaza Universitaria",
    categoria: "Comercial",
    descripcion:
      "Estructura y acabados ejecutados para Constructora El Salvador, con la precisión que exige una obra de uso intensivo.",
    imagen: "/proyecto-plaza-universitaria.jpg",
  },
  {
    nombre: "FGR Edificio Santa Elena",
    categoria: "Corporativo",
    descripcion:
      "Muro cortina con vidrio insulado y cortasol de aluminio para Solaire: una fachada que trabaja tan duro como quienes la habitan.",
    imagen: "/proyecto-fgr-santa-elena.jpg",
  },
  {
    nombre: "Residencia Cáceres",
    categoria: "Residencial",
    descripcion:
      "Diseño y ejecución integral en Suchitoto: obra gris, instalaciones eléctricas, techos e hidráulica de una residencia familiar completa.",
    imagen: "/proyecto-residencia-caceres.jpg",
  },
];

export function ProyectosDestacados() {
  return (
    <div className="mt-24">
      <Reveal className="text-center">
        <p className="section-kicker justify-center mb-5">Proyectos Destacados</p>
        <h3 className="font-heading mx-auto max-w-3xl text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-6">
          Obras que hablan por nosotros,{" "}
          <span className="text-brand-bright">antes que cualquier promesa.</span>
        </h3>
        <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          Hospitales, recintos deportivos, edificios corporativos y residencias:
          cada proyecto entregado es un argumento construido en concreto, acero
          y vidrio.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROYECTOS.map((proyecto, i) => (
          <Reveal key={proyecto.nombre} delay={(i % 3) * 0.1}>
            <article className="glass-panel glass-panel-hover group h-full overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={proyecto.imagen}
                  alt={`Proyecto ${proyecto.nombre} ejecutado por BOMEL`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#060c0b] via-transparent to-transparent opacity-80"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-bright backdrop-blur-md">
                  {proyecto.categoria}
                </span>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-heading text-lg font-bold mb-2">
                  {proyecto.nombre}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {proyecto.descripcion}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
