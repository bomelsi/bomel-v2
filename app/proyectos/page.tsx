import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/reveal";
import { PROYECTOS_DATA } from "@/lib/data/proyectos";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proyectos Destacados | BOMEL — Construcción y Ventanería El Salvador",
  description:
    "Portafolio de obras ejecutadas por BOMEL en El Salvador: hospitales, recintos deportivos, edificios corporativos y residencias. Cada proyecto habla por nosotros.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos BOMEL — Obras ejecutadas en El Salvador",
    description:
      "Portafolio de obras de construcción, fachadas ACM y ventanería ejecutadas por BOMEL en El Salvador.",
    url: "/proyectos",
  },
};

const CATEGORIAS = ["Todos", "Salud", "Deportivo", "Comercial", "Corporativo", "Residencial"];

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* ── Hero ── */}
        <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div
            aria-hidden="true"
            className="absolute -right-40 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand/15 blur-[130px]"
          />
          <Reveal>
            <p className="section-kicker mb-5">Portafolio</p>
            <h1 className="font-heading max-w-3xl text-3xl font-extrabold tracking-tight leading-[1.1] md:text-5xl lg:text-6xl mb-6">
              Obras que hablan por nosotros,{" "}
              <span className="text-brand-bright">antes que cualquier promesa.</span>
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Hospitales, recintos deportivos, edificios corporativos y residencias: cada proyecto
              entregado es un argumento construido en concreto, acero y vidrio.
            </p>
          </Reveal>
        </section>

        {/* ── Grid de proyectos ── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROYECTOS_DATA.map((proyecto, i) => (
              <Reveal key={proyecto.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/proyectos/${proyecto.slug}`}
                  className="glass-panel glass-panel-hover group block overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={proyecto.imagen}
                      alt={`Proyecto ${proyecto.nombre} ejecutado por BOMEL`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060c0b] via-transparent to-transparent opacity-80" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-bright backdrop-blur-md">
                      {proyecto.categoria}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading text-base font-bold mb-2 leading-snug">
                      {proyecto.nombre}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {proyecto.descripcion}
                    </p>
                    <p className="mt-3 text-xs font-bold text-brand-bright">Ver proyecto →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-card/40 py-20 md:py-24">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-[100px]"
          />
          <Reveal className="text-center mx-auto max-w-xl px-6">
            <p className="section-kicker justify-center mb-5">Tu proyecto</p>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl mb-4">
              ¿Tienes un proyecto{" "}
              <span className="text-brand-bright">que construir?</span>
            </h2>
            <p className="text-muted-foreground mb-10">
              Una sola empresa para todo. Fecha de entrega por contrato.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Cotiza por WhatsApp →
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
