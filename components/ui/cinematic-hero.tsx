import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/site";

const INJECTED_STYLES = `
  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /*
   * Entrada del hero: una sola vez, solo CSS, sin JavaScript. Se pinta
   * visible de inmediato (no bloquea LCP) y sube con un fundido suave.
   */
  @keyframes hero-fade-up {
    from { opacity: 0; transform: translateY(24px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0);     filter: blur(0); }
  }
  .hero-entrance {
    animation: hero-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
`;

export interface CinematicHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  brandKicker?: string;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
}

/**
 * Hero estático: sin scroll-jacking, sin GSAP, sin canvas de frames.
 * El contenido no se mueve ni redimensiona con el scroll — usa min-h-[100svh]
 * para no saltar cuando la barra del navegador móvil aparece/desaparece.
 */
export function CinematicHero({
  brandKicker = "Servicios Integrales",
  brandName = "BOMEL",
  tagline1 = "Construimos tu proyecto,",
  tagline2 = "de obra gris a realidad.",
  ctaDescription = "Construcción, acabados y ventanería con una sola empresa responsable de principio a fin.",
  className,
  ...props
}: CinematicHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center text-foreground",
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div
        aria-hidden="true"
        className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50"
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <p
          className="hero-entrance section-kicker mb-6 !text-base md:!text-lg"
          style={{ animationDelay: "0s" }}
        >
          {brandKicker} {brandName}
        </p>

        <h1
          className="hero-entrance font-heading mb-8 text-4xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-3d-matte block">{tagline1}</span>
          <span className="text-silver-matte block font-extrabold tracking-tighter">
            {tagline2}
          </span>
        </h1>

        <p
          className="hero-entrance mb-10 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {ctaDescription}
        </p>

        <div
          className="hero-entrance flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.7)]"
          >
            Recibe tu cotización en 24h →
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-strong/10 px-7 py-3.5 text-sm font-bold text-brand-bright transition-all hover:-translate-y-0.5 hover:bg-brand-strong/20 hover:border-brand/60"
          >
            Agenda una visita técnica
          </Link>
        </div>
      </div>
    </section>
  );
}
