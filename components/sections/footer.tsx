import React from "react";
import Image from "next/image";
import { RotatingWord } from "@/components/rotating-word";
import { SocialConnect } from "@/components/social-connect";
import { FooterWordmark } from "@/components/footer-wordmark";
import { NAV_LINKS, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contacto" className="relative scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <SocialConnect />

        <div className="relative mt-20 flex flex-col items-center gap-10 border-t border-white/5 pt-14">
          {/* Resplandor ambiental detrás de la marca */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[340px] w-[640px] max-w-full -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[100px]"
          />

          {/* Marca: apagada en reposo, se enciende en teal al pasar el mouse */}
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

          <nav aria-label="Enlaces del sitio">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative font-heading text-sm font-bold uppercase tracking-[0.18em] text-foreground/90 transition-colors hover:text-brand-bright"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-bright transition-all duration-300 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-brand/40 bg-brand-strong/15 px-5 py-2 font-heading text-sm font-bold tracking-wider text-brand-bright transition-all hover:-translate-y-0.5 hover:bg-brand-strong/30 hover:shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)]"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </li>
            </ul>
          </nav>

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

      {/* Copyright: la última línea de toda la página */}
      <div className="border-t border-white/5 px-6 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Servicios Integrales BOMEL S.A. de C.V.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
