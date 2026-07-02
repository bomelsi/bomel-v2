"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";

interface Testimonio {
  texto: string;
  nombre: string;
  cargo: string;
  iniciales: string;
}

const TESTIMONIOS: Testimonio[] = [
  {
    texto:
      "BOMEL nos entregó la fachada del edificio en la fecha que firmaron, sin un solo cambio en el presupuesto. Eso en construcción casi no existe.",
    nombre: "Ing. Carlos Martínez",
    cargo: "Gerente de Proyecto",
    iniciales: "CM",
  },
  {
    texto:
      "Contratamos solo la ventanería y terminaron encargándose de todos los acabados. Que un solo equipo responda por todo cambia la experiencia y la paz mental por completo.",
    nombre: "Familia Rivas Herrera",
    cargo: "Residencia en Santa Elena",
    iniciales: "RH",
  },
  {
    texto:
      "Buscábamos remodelar nuestra cocina y ampliar el estudio; la atención al detalle y la limpieza durante la obra fue lo que más nos sorprendió. Definitivamente superaron nuestras expectativas.",
    nombre: "Lic. Elena Sandoval",
    cargo: "Residencia en San Benito",
    iniciales: "ES",
  },
];

function Estrellas() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-brand-bright" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonios() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand/10 blur-[130px]"
      />

      <Reveal className="text-center">
        <p className="section-kicker justify-center mb-5">Testimonios</p>
        <h2 className="font-heading mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Lo que dicen quienes{" "}
          <span className="text-brand-bright">ya construyeron con nosotros.</span>
        </h2>
      </Reveal>

      {/* Carrusel */}
      <div className="mt-14 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <Estrellas />
            <blockquote className="mt-6 font-heading text-lg md:text-xl font-semibold leading-relaxed text-foreground/90">
              &ldquo;{TESTIMONIOS[active].texto}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-brand-bright/30 to-brand-strong/15 border border-brand/30 font-heading text-sm font-extrabold text-brand-bright">
                {TESTIMONIOS[active].iniciales}
              </div>
              <div>
                <p className="font-heading font-bold text-sm">{TESTIMONIOS[active].nombre}</p>
                <p className="text-xs text-muted-foreground">{TESTIMONIOS[active].cargo}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {TESTIMONIOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver testimonio ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-brand-bright"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Tarjetas de fondo (desktop) */}
        <div className="mt-10 hidden md:grid grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`glass-panel rounded-2xl p-5 text-left transition-all duration-300 ${
                i === active
                  ? "border-brand/40 opacity-100"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <Estrellas />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                &ldquo;{t.texto}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-bright/15 text-xs font-bold text-brand-bright">
                  {t.iniciales}
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">{t.nombre}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{t.cargo}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
