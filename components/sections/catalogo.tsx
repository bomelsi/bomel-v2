import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { WHATSAPP_URL } from "@/lib/site";

export const CATALOGO_PDF = "/catalogo-bomel-ventaneria-2026.pdf";
export const CATALOGO_PAGINAS = 15;

const INCLUYE = [
  "Ventanas corredizas, fijas y proyectables",
  "Puertas corredizas, embisagradas y automáticas",
  "Fachadas y revestimientos en ACM",
  "Sistemas, perfiles y acabados disponibles",
];

/**
 * Descarga del catálogo de puertas y ventanería. Va debajo de la línea de
 * productos: quien todavía no está listo para cotizar se lleva algo en la
 * mano, y quien sí lo está tiene el botón de WhatsApp al lado.
 */
export function Catalogo() {
  return (
    <section
      id="catalogo"
      className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pb-24 md:pb-32"
    >
      <Reveal>
        <div className="glass-panel grid gap-8 rounded-3xl p-7 md:grid-cols-[minmax(0,260px)_1fr] md:items-center md:gap-12 md:p-10">
          {/* Portada */}
          <a
            href={CATALOGO_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto block w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-1"
            aria-label="Abrir el catálogo de puertas y ventanería en PDF"
          >
            <Image
              src="/catalogo-portada.webp"
              alt="Portada del catálogo de puertas y ventanería de BOMEL"
              width={680}
              height={819}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#04211d]/80 via-transparent to-transparent"
            />
            <span className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-brand-bright">
              Catálogo 2026
            </span>
          </a>

          {/* Texto y acciones */}
          <div>
            <p className="section-kicker mb-4">Catálogo</p>
            <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl">
              Llévate nuestro catálogo de{" "}
              <span className="text-brand-bright">puertas y ventanería.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {CATALOGO_PAGINAS} páginas con toda la línea en aluminio y vidrio:
              sistemas, acabados y proyectos reales. Para revisarlo con calma o
              compartirlo con tu arquitecto.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {INCLUYE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground/75"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CATALOGO_PDF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  />
                </svg>
                Descargar catálogo
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brand/40 bg-brand-strong/10 px-7 py-3.5 text-sm font-bold text-brand-bright transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand-strong/20"
              >
                Pedirlo por WhatsApp
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground/60">
              PDF · {CATALOGO_PAGINAS} páginas · 6 MB · sin registro
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
