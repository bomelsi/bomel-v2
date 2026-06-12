import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RotatingWord } from "@/components/rotating-word";
import { SocialConnect } from "@/components/social-connect";
import { FooterWordmark } from "@/components/footer-wordmark";
import { EMAIL, NAV_LINKS, PHONE_E164, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/site";
import { SERVICIOS_DATA } from "@/lib/data/servicios";
import { PROYECTOS_DATA } from "@/lib/data/proyectos";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="relative scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <SocialConnect />

        {/* ── Columnas de navegación ── */}
        <div className="mt-16 grid gap-10 border-t border-white/5 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1 — Marca + NAP */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3 group w-fit">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain opacity-60 transition-opacity group-hover:opacity-100"
              />
              <span className="font-heading text-base font-extrabold tracking-tight text-foreground/70 group-hover:text-foreground transition-colors">
                BOMEL
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground mb-6">
              Servicios Integrales BOMEL S.A. de C.V.<br />
              {/* TODO: agregar dirección exacta cuando el taller esté listo */}
              San Salvador, El Salvador — Atendemos todo el país.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-brand-bright"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  {WHATSAPP_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-brand-bright"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  {EMAIL}
                </a>
              </li>
              <li className="text-xs text-muted-foreground/60 pt-1">
                Lun–Vie 8:00–17:00 · Sáb 8:00–12:00
              </li>
            </ul>
          </div>

          {/* Columna 2 — Servicios */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-bright">
              Servicios
            </p>
            <ul className="space-y-2.5">
              {SERVICIOS_DATA.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-bright"
                  >
                    {s.kicker}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Proyectos */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-bright">
              Proyectos
            </p>
            <ul className="space-y-2.5">
              {PROYECTOS_DATA.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-bright"
                  >
                    {p.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/proyectos"
                  className="text-xs font-bold text-brand/60 hover:text-brand-bright transition-colors"
                >
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 — Navegación rápida */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-bright">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-brand-strong/15 px-5 py-2 font-heading text-sm font-bold tracking-wider text-brand-bright transition-all hover:-translate-y-0.5 hover:bg-brand-strong/30 hover:shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)] inline-block"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* ── Slogan rotativo ── */}
        <div className="relative mt-16 flex flex-col items-center gap-10 border-t border-white/5 pt-14">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[340px] w-[640px] max-w-full -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[100px]"
          />

          {/* Logo BOMEL con glow */}
          <a
            href="#"
            className="group flex flex-col items-center gap-5"
            aria-label="BOMEL — volver arriba"
          >
            <span className="relative inline-flex">
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-brand-bright/0 blur-2xl transition-colors duration-700 group-hover:bg-brand-bright/20"
              />
              <Image
                src="/logo.png"
                alt=""
                width={160}
                height={160}
                className="h-28 w-28 object-contain opacity-45 transition-all duration-700 group-hover:opacity-100 group-hover:drop-shadow-[0_0_32px_rgba(45,212,191,0.45)] md:h-36 md:w-36"
              />
            </span>
            <span className="block text-center">
              <span className="font-heading block text-4xl font-black leading-none tracking-tight text-foreground/40 transition-all duration-700 group-hover:text-foreground group-hover:[text-shadow:0_0_32px_rgba(45,212,191,0.55)] md:text-5xl">
                BOMEL
              </span>
              <span className="mt-3 block pl-[0.45em] text-[11px] font-semibold uppercase tracking-[0.45em] text-muted-foreground/60 transition-colors duration-700 group-hover:text-brand-bright md:text-xs">
                Servicios Integrales
              </span>
            </span>
          </a>

          <div className="flex w-full max-w-3xl items-center gap-5">
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-brand/40 sm:block"
            />
            <p className="font-heading mx-auto text-center text-lg font-semibold tracking-wide text-brand md:text-2xl">
              Cuando pienses en <RotatingWord />, piensa en{" "}
              <span className="font-extrabold text-brand-bright">BOMEL</span>.
            </p>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-brand/40 sm:block"
            />
          </div>
        </div>
      </div>

      {/* Wordmark voxel full-bleed */}
      <FooterWordmark />

      {/* Copyright */}
      <div className="border-t border-white/5 px-6 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {currentYear} Servicios Integrales BOMEL S.A. de C.V. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
