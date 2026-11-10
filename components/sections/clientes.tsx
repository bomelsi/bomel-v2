import React from "react";
import { Reveal } from "@/components/reveal";

// Un cliente, una entrada: Constructora El Salvador aparecía dos veces, una
// por cada obra. Ahora se agrupan sus proyectos bajo un solo nombre.
const CLIENTES = [
  {
    nombre: "Constructora El Salvador",
    proyectos: ["Hospital Nacional Rosales", "Plaza Universitaria"],
  },
  { nombre: "UDP CALZADA - ICACON", proyectos: ["Hospital Nejapa"] },
  { nombre: "4Carriles", proyectos: ["Recintos Deportivos"] },
  { nombre: "Solaire", proyectos: ["FGR Santa Elena"] },
  { nombre: "Sr. Marcos Carranza", proyectos: ["Centro Médico San Alejo"] },
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
          {/* "Empresas" no era exacto: la lista incluye también a un cliente
              particular. */}
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-brand-bright/60 mb-8">
            Quienes han confiado en BOMEL
          </p>
        </Reveal>

        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {CLIENTES.map((cliente, i) => (
            <Reveal key={cliente.nombre} delay={i * 0.06}>
              <div className="group flex flex-col items-center gap-1">
                <span className="font-heading text-sm font-bold tracking-wide text-foreground/40 transition-colors duration-300 group-hover:text-foreground/80 md:text-base">
                  {cliente.nombre}
                </span>
                {cliente.proyectos.map((proyecto) => (
                  <span
                    key={proyecto}
                    className="text-[11px] font-medium text-brand/40 transition-colors duration-300 group-hover:text-brand/70"
                  >
                    {proyecto}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
