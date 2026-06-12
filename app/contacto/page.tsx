import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { WHATSAPP_URL, WHATSAPP_NUMBER, EMAIL, PHONE_E164 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto | BOMEL — Cotiza tu proyecto",
  description:
    "Agenda una visita técnica o cotiza tu proyecto de construcción, ventanería o fachadas ACM en El Salvador. Respuesta en menos de 24 horas hábiles.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero compacto */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-strong/15 blur-[140px]"
          />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <p className="section-kicker justify-center mb-5">Contacto</p>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
                Cuéntanos qué quieres{" "}
                <span className="text-brand-bright">construir.</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Completa el formulario y un miembro de nuestro equipo te responde en menos de 24 horas hábiles. Sin formularios eternos, sin callcenters.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Formulario */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info lateral */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="glass-panel rounded-3xl p-7">
                  <h2 className="font-heading text-lg font-bold mb-5">
                    También por WhatsApp
                  </h2>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold text-brand-bright transition-colors hover:text-brand"
                  >
                    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.12 1.526 5.853L0 24l6.347-1.503A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.853 9.853 0 0 1-5.025-1.371l-.36-.214-3.735.883.928-3.634-.235-.374A9.852 9.852 0 0 1 2.118 12c0-5.45 4.432-9.882 9.882-9.882 5.45 0 9.882 4.432 9.882 9.882 0 5.45-4.432 9.882-9.882 9.882z" />
                    </svg>
                    {WHATSAPP_NUMBER}
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Respondemos en minutos durante horario de atención: Lun–Vie 8:00–17:00 · Sáb 8:00–12:00
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="glass-panel rounded-3xl p-7">
                  <h2 className="font-heading text-lg font-bold mb-4">
                    Datos de contacto
                  </h2>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href={`tel:${PHONE_E164}`}
                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-brand-bright"
                      >
                        <svg className="h-4 w-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        {WHATSAPP_NUMBER}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-brand-bright"
                      >
                        <svg className="h-4 w-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        {EMAIL}
                      </a>
                    </li>
                    <li className="text-muted-foreground/60">
                      San Salvador, El Salvador
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass-panel rounded-3xl p-7 border-brand/20">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-3">
                    Garantía BOMEL
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fecha de entrega por contrato.{" "}
                    <span className="font-semibold text-foreground/80">
                      Lo que BOMEL firma, BOMEL cumple.
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
