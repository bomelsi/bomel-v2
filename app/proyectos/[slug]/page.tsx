import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { PROYECTOS_DATA, getProyecto } from "@/lib/data/proyectos";
import { SERVICIOS_DATA } from "@/lib/data/servicios";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROYECTOS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyecto(slug);
  if (!proyecto) return {};
  return {
    title: `${proyecto.nombre} | Proyectos BOMEL`,
    description: proyecto.descripcion,
    alternates: { canonical: `/proyectos/${slug}` },
    openGraph: {
      title: `${proyecto.nombre} | Proyectos BOMEL`,
      description: proyecto.descripcion,
      url: `/proyectos/${slug}`,
      images: [{ url: proyecto.imagen, alt: `Proyecto ${proyecto.nombre} por BOMEL` }],
    },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const proyecto = getProyecto(slug);
  if (!proyecto) notFound();

  const serviciosRelacionados = SERVICIOS_DATA.filter((s) =>
    proyecto.serviciosRelacionados.includes(s.slug)
  );

  const whatsappMsg = encodeURIComponent(
    `Hola BOMEL, vi el proyecto "${proyecto.nombre}" en su sitio web y me interesa cotizar algo similar.`
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* ── Hero con foto grande ── */}
        <div className="relative h-[55vh] min-h-[360px] md:h-[65vh] overflow-hidden">
          <Image
            src={proyecto.imagen}
            alt={`Proyecto ${proyecto.nombre} ejecutado por BOMEL`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-10">
            <span className="mb-3 inline-block rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-bright backdrop-blur-md">
              {proyecto.categoria}
            </span>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {proyecto.nombre}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-6">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Proyectos", href: "/proyectos" },
              { label: proyecto.nombre },
            ]}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-3 pb-16 md:pb-24">
          {/* ── Contenido principal ── */}
          <div className="lg:col-span-2 space-y-14">
            {/* Reto y Solución */}
            <Reveal>
              <div className="space-y-8">
                <div>
                  <p className="section-kicker mb-4">El reto</p>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {proyecto.reto}
                  </p>
                </div>
                <div>
                  <p className="section-kicker mb-4">La solución BOMEL</p>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {proyecto.solucion}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Galería */}
            {proyecto.galeria.length > 1 && (
              <Reveal>
                <h2 className="font-heading text-xl font-bold mb-6">Galería del proyecto</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {proyecto.galeria.map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Servicios relacionados */}
            {serviciosRelacionados.length > 0 && (
              <Reveal>
                <h2 className="font-heading text-xl font-bold mb-6">Especialidades aplicadas</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {serviciosRelacionados.map((servicio) => (
                    <Link
                      key={servicio.slug}
                      href={`/servicios/${servicio.slug}`}
                      className="glass-panel glass-panel-hover rounded-2xl p-5 block"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-1">
                        {servicio.kicker}
                      </p>
                      <h3 className="font-heading font-bold text-sm leading-snug">
                        {servicio.titulo.split(" en El Salvador")[0]}
                      </h3>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* ── Ficha técnica ── */}
          <div className="space-y-6">
            <Reveal>
              <div className="glass-panel rounded-3xl p-6 space-y-5 sticky top-28">
                <h2 className="font-heading font-bold text-lg border-b border-white/8 pb-4">
                  Ficha técnica
                </h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-1">Cliente</dt>
                    <dd className="text-foreground/80">{proyecto.cliente}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-1">Ubicación</dt>
                    <dd className="text-foreground/80">{proyecto.ubicacion}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-1">Año</dt>
                    <dd className="text-foreground/80">{proyecto.año}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">Alcance</dt>
                    <dd>
                      <ul className="space-y-1">
                        {proyecto.alcance.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-foreground/80">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-bright" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-white/8 pt-5">
                  <p className="text-xs text-muted-foreground mb-4">
                    ¿Tienes un proyecto similar?
                  </p>
                  <a
                    href={`https://wa.me/50370401212?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-5 py-3 text-sm font-bold text-[#04211d] transition-transform hover:-translate-y-0.5"
                  >
                    Cotiza por WhatsApp →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Otros proyectos ── */}
        <section className="bg-card/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight mb-10">
                Otros proyectos
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROYECTOS_DATA.filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.1}>
                    <Link
                      href={`/proyectos/${p.slug}`}
                      className="glass-panel glass-panel-hover group block overflow-hidden rounded-3xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={p.imagen}
                          alt={`Proyecto ${p.nombre} por BOMEL`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060c0b] via-transparent to-transparent opacity-70" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-bright backdrop-blur-md">
                          {p.categoria}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-sm">{p.nombre}</h3>
                      </div>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
