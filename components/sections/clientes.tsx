import React from "react";
import { Reveal } from "@/components/reveal";

const CLIENTES = [
  { empresa: "Constructora El Salvador", proyecto: "Hospital Nacional Rosales" },
  { empresa: "Constructora El Salvador", proyecto: "Plaza Universitaria" },
  { empresa: "UDP CALZADA - ICACON", proyecto: "Hospital Nejapa" },
  { empresa: "4Carriles", proyecto: "Recintos Deportivos" },
  { empresa: "Solaire", proyecto: "FGR Santa Elena" },
  { empresa: "Sr. Marcos Carranza", proyecto: "Centro Médico San Alejo" },
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
            Empresas que han confiado en BOMEL
          </p>
        </Reveal>

        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {CLIENTES.map((cliente, i) => (
            <Reveal key={`${cliente.empresa}-${cliente.proyecto}`} delay={i * 0.06}>
              <div className="group flex flex-col items-center gap-1">
                <span className="font-heading text-sm font-bold tracking-wide text-foreground/40 transition-colors duration-300 group-hover:text-foreground/80 md:text-base">
                  {cliente.empresa}
                </span>
                <span className="text-[11px] font-medium text-brand/40 transition-colors duration-300 group-hover:text-brand/70">
                  {cliente.proyecto}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
