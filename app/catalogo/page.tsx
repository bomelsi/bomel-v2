import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Catalogo, CATALOGO_PAGINAS } from "@/components/sections/catalogo";
import { Reveal } from "@/components/reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catálogo de Puertas y Ventanería 2026 | BOMEL El Salvador",
  description:
    `Descarga gratis el catálogo ${CATALOGO_PAGINAS} páginas de BOMEL: ventanas corredizas, fijas y proyectables, puertas de aluminio y fachadas ACM en El Salvador. Sin registro.`,
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo de Puertas y Ventanería 2026 — BOMEL",
    description:
      "Toda la línea en aluminio y vidrio: sistemas, acabados y proyectos reales. Descarga directa en PDF, sin registro.",
    url: "/catalogo",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/catalogo-portada.webp`,
        width: 680,
        height: 819,
        alt: "Portada del catálogo de puertas y ventanería de BOMEL",
      },
    ],
  },
};

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden pb-4 pt-16 md:pt-20">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/3 -z-10 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-strong/15 blur-[140px]"
          />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <h1 className="font-heading mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
                Catálogo de puertas y{" "}
                <span className="text-brand-bright">ventanería 2026.</span>
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Toda nuestra línea en aluminio y vidrio en un solo documento.
                Descárgalo, compártelo con tu arquitecto o guárdalo para cuando
                lo necesites.
              </p>
            </Reveal>
          </div>
        </section>

        <Catalogo />

        <section className="mx-auto max-w-3xl px-6 pb-24 text-center md:pb-32">
          <Reveal>
            <p className="text-base leading-relaxed text-muted-foreground">
              ¿Ya sabes lo que necesitas? Arma tu solicitud con medidas y recibe
              una cotización profesional hecha a la medida de tu proyecto.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#cotizador"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Armar mi cotización →
              </Link>
              <Link
                href="/servicios/ventaneria-y-puertas"
                className="inline-flex items-center justify-center rounded-full border border-brand/40 bg-brand-strong/10 px-7 py-3.5 text-sm font-bold text-brand-bright transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand-strong/20"
              >
                Ver el servicio completo
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
