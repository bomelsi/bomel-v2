import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { SERVICIOS_DATA, getServicio } from "@/lib/data/servicios";
import { PROYECTOS_DATA } from "@/lib/data/proyectos";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";
import { Cotizador } from "@/components/cotizador";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICIOS_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};
  return {
    title: `${servicio.titulo} | BOMEL`,
    description: servicio.descripcion,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      title: `${servicio.titulo} | BOMEL`,
      description: servicio.descripcion,
      url: `/servicios/${slug}`,
      images: [{ url: servicio.heroImage, alt: servicio.heroImageAlt }],
    },
  };
}

const PROCESO_ICONS = [
  // Visita técnica
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>,
  // Cotización
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>,
  // Ejecución
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg>,
  // Entrega
  <svg key="3" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>,
];

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const proyectosRelacionados = PROYECTOS_DATA.filter((p) =>
    servicio.proyectosRelacionados.includes(p.slug)
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicio.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: { "@type": "Answer", text: faq.respuesta },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: servicio.kicker,
    name: servicio.titulo,
    description: servicio.descripcion,
    provider: {
      "@type": "GeneralContractor",
      "@id": `${SITE_URL}/#empresa`,
      name: "Servicios Integrales BOMEL S.A. de C.V.",
    },
    areaServed: { "@type": "Country", name: "El Salvador" },
    url: `${SITE_URL}/servicios/${slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={servicio.heroImage}
              alt={servicio.heroImageAlt}
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-40 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand/15 blur-[130px]"
          />

          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/#servicios" },
                { label: servicio.kicker },
              ]}
            />

            <div className="mt-8 max-w-3xl">
              <p className="section-kicker mb-5">{servicio.kicker}</p>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight leading-[1.1] md:text-5xl lg:text-6xl mb-6">
                {servicio.titulo.split(" en El Salvador")[0]}{" "}
                <span className="text-brand-bright">en El Salvador</span>
              </h1>
              <p className="text-base md:text-xl leading-relaxed text-muted-foreground mb-10 max-w-2xl">
                {servicio.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
                >
                  Recibe tu cotización en 24h
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a
                  href="/contacto"
                  className="glass-panel inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                >
                  Agenda una visita técnica
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Qué incluye ── */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <p className="section-kicker mb-5">Alcance del servicio</p>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl mb-10">
              ¿Qué incluye?
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicio.queIncluye.map((item, i) => (
              <Reveal key={item} delay={i * 0.07}>
                <div className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-bright/10 text-brand-bright border border-brand/30">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium leading-snug">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Galería ── */}
        {servicio.galeriaImagenes.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl mb-10">
                Galería del servicio
              </h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicio.galeriaImagenes.map((img, i) => (
                <Reveal key={img.src} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Proceso ── */}
        <section className="relative overflow-hidden bg-card/50 py-16 md:py-24">
          <div
            aria-hidden="true"
            className="absolute -left-40 top-1/2 -z-10 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-brand-strong/15 blur-[100px]"
          />
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="text-center">
              <p className="section-kicker justify-center mb-5">Proceso</p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl mb-4">
                Así trabajamos contigo
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-14">
                Cuatro pasos, un equipo, una fecha firmada. Sin intermediarios ni excusas entre etapas.
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {servicio.proceso.map((paso, i) => (
                <Reveal key={paso.titulo} delay={i * 0.12}>
                  <div className="glass-panel rounded-3xl p-6 text-center h-full">
                    <div className="mb-4 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-bright/25 to-brand-strong/10 text-brand-bright border border-brand/30">
                      {PROCESO_ICONS[i] ?? PROCESO_ICONS[0]}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
                      Paso {i + 1}
                    </p>
                    <h3 className="font-heading font-bold text-base mb-2">{paso.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Proyectos relacionados ── */}
        {proyectosRelacionados.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <p className="section-kicker mb-5">Proyectos ejecutados</p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl mb-10">
                Obras donde lo aplicamos
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proyectosRelacionados.map((proyecto, i) => (
                <Reveal key={proyecto.slug} delay={i * 0.1}>
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
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060c0b] via-transparent to-transparent opacity-70" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-bright backdrop-blur-md">
                        {proyecto.categoria}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-base mb-1">{proyecto.nombre}</h3>
                      <p className="text-xs text-brand-bright font-medium">Ver proyecto →</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-3xl px-6 pb-16 md:pb-24">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          />
          <Reveal>
            <p className="section-kicker mb-5">Preguntas frecuentes</p>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl mb-10">
              Dudas frecuentes sobre este servicio
            </h2>
          </Reveal>
          <div className="space-y-3">
            {servicio.faqs.map((faq, i) => (
              <Reveal key={faq.pregunta} delay={i * 0.1}>
                <details className="glass-panel group rounded-2xl px-6 py-5 open:pb-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading font-bold text-sm md:text-base list-none">
                    {faq.pregunta}
                    <span className="shrink-0 text-brand-bright transition-transform duration-300 group-open:rotate-45">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.respuesta}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cotizador (solo para ventanería) ── */}
        {slug === "ventaneria-y-puertas" && (
          <section className="mx-auto max-w-3xl px-6 pb-16 md:pb-20">
            <Cotizador />
          </section>
        )}

        {/* ── CTA final ── */}
        <section className="relative overflow-hidden bg-card/40 py-20 md:py-24">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-[100px]"
          />
          <Reveal className="text-center mx-auto max-w-2xl px-6">
            <p className="section-kicker justify-center mb-5">¿Listo para empezar?</p>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-4xl mb-4">
              Tu proyecto merece{" "}
              <span className="text-brand-bright">una sola empresa responsable.</span>
            </h2>
            <p className="text-muted-foreground mb-3">
              Fecha de entrega por contrato. Lo que BOMEL firma, BOMEL cumple.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-10">
              Lo que se promete, se cumple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Cotiza por WhatsApp →
              </a>
              <a
                href="/contacto"
                className="glass-panel inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
              >
                Agenda una visita técnica
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
