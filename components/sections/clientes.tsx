import React from "react";
import { Reveal } from "@/components/reveal";

const CLIENTES = [
  { nombre: "Hospital Nacional Rosales", sector: "Salud" },
  { nombre: "FGR", sector: "Gobierno" },
  { nombre: "INDES", sector: "Deporte" },
  { nombre: "Constructora El Salvador", sector: "Construcción" },
  { nombre: "Solaire", sector: "Bienes raíces" },
  // TODO: agregar más clientes y logos cuando estén disponibles
];

export function ClientesBanner() {
  return (
    <section className="relative border-y border-white/5 bg-card/30 py-12 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-brand/[0.04] to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-brand-bright/60 mb-8">
            Instituciones y empresas que ya construyeron con BOMEL
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {CLIENTES.map((cliente, i) => (
            <Reveal key={cliente.nombre} delay={i * 0.06}>
              <div className="group flex flex-col items-center gap-1">
                {/* TODO: reemplazar por logo real cuando esté disponible */}
                <span className="font-heading text-sm font-bold tracking-wide text-foreground/35 transition-colors duration-300 group-hover:text-foreground/70 md:text-base">
                  {cliente.nombre}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-brand/30 transition-colors duration-300 group-hover:text-brand/60">
                  {cliente.sector}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
