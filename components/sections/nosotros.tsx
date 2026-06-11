import React from "react";
import { Reveal } from "@/components/reveal";
import { ProyectosDestacados } from "@/components/sections/proyectos";
import { Stats } from "@/components/sections/stats";

const VALORES = [
  {
    titulo: "Responsabilidad",
    frase: "Lo que firmamos, lo cumplimos.",
    descripcion:
      "Fechas reales, presupuestos reales, entregas reales. Cuando BOMEL pone una fecha sobre la mesa, esa fecha se respeta — porque nuestra palabra vale tanto como nuestro concreto.",
    icono: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    titulo: "Transparencia",
    frase: "Números claros, avances visibles.",
    descripcion:
      "Sabrás exactamente en qué va tu obra, en qué se invierte cada dólar y qué sigue en el cronograma. Sin letra pequeña, sin sorpresas en la factura final.",
    icono: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    titulo: "Compromiso",
    frase: "Tu obra lleva nuestro nombre.",
    descripcion:
      "Trabajamos cada proyecto como si la fachada llevara nuestro apellido. Porque en cada entrega, lo lleva: nuestra reputación se construye junto a tu obra.",
    icono: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-brand-strong/15 blur-[120px]"
      />

      <Reveal className="text-center">
        <p className="section-kicker justify-center mb-5">Nosotros</p>
        <h2 className="font-heading mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          La diferencia entre prometer y entregar{" "}
          <span className="text-brand-bright">tiene nombre: BOMEL.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          BOMEL nació para eliminar la fricción de construir: un solo equipo que
          diseña, ejecuta y entrega tu proyecto completo. Olvídate de coordinar
          cinco contratistas que se culpan entre sí — aquí hay una sola empresa,
          un solo responsable y una sola promesa que se cumple.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {VALORES.map((valor, i) => (
          <Reveal key={valor.titulo} delay={i * 0.12}>
            <article className="glass-panel glass-panel-hover flex h-full flex-col items-center rounded-3xl p-7 text-center">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-bright/25 to-brand-strong/10 text-brand-bright border border-brand/30">
                {valor.icono}
              </div>
              <h3 className="font-heading text-xl font-bold mb-1">{valor.titulo}</h3>
              <p className="text-sm font-semibold text-brand-bright mb-3">
                {valor.frase}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {valor.descripcion}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Stats />

      <ProyectosDestacados />
    </section>
  );
}
