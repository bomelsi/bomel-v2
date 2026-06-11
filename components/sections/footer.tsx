import React from "react";
import Image from "next/image";
import { SocialConnect } from "@/components/social-connect";
import { FooterWordmark } from "@/components/footer-wordmark";
import { NAV_LINKS, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contacto" className="relative scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <SocialConnect />

        <div className="mt-20 flex flex-col items-center gap-8 border-t border-white/5 pt-10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="font-heading text-lg font-extrabold tracking-tight leading-none">
                BOMEL
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Servicios Integrales
              </p>
            </div>
          </div>

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

          <p className="font-heading text-center text-base font-semibold tracking-wide text-brand md:text-lg">
            Cuando pienses en ventanas, piensa en{" "}
            <span className="text-brand-bright">BOMEL</span>.
          </p>
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
