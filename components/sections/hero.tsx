"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { ScrollCanvas, type ScrollCanvasHandle } from "@/components/scroll-canvas";
import { ScrollHint } from "@/components/ui/scroll-hint";

// GSAP + ScrollTrigger solo se cargan en el cliente, en su propio chunk,
// diferido: no afectan en nada la velocidad de apertura del hero (el
// contenido crítico — logo, kicker, hint — ya está pintado por CSS).
const CinematicHeroMotion = dynamic(
  () => import("@/components/ui/cinematic-hero-motion").then((m) => m.CinematicHeroMotion),
  { ssr: false }
);

const INJECTED_STYLES = `
  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

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

  /* Deep Physical Card — gradiente teal de marca BOMEL */
  .premium-depth-card {
      background: linear-gradient(150deg, #10433D 0%, #07100E 60%, #050A09 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          0 0 80px -30px rgba(45, 212, 191, 0.25),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Velo inferior para legibilidad del texto sobre el canvas */
  .canvas-veil {
      background: linear-gradient(to top, rgba(3,8,7,0.85) 0%, rgba(3,8,7,0.35) 30%, transparent 60%),
                  linear-gradient(to bottom, rgba(3,8,7,0.6) 0%, transparent 25%);
  }

  /* Desktop: la imagen va de borde a borde, con degradado arriba y abajo
     para fundirse con el fondo oscuro del hero */
  @media (min-width: 768px) {
    .canvas-veil {
        background: linear-gradient(to top, rgba(3,8,7,0.95) 0%, rgba(3,8,7,0.4) 18%, transparent 40%),
                    linear-gradient(to bottom, rgba(3,8,7,0.95) 0%, rgba(3,8,7,0.4) 18%, transparent 40%);
    }
  }

  /* Entrada del hero: kicker + logo + hint, una sola vez, solo CSS */
  @keyframes hero-fade-up {
    from { opacity: 0; transform: translateY(24px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0);     filter: blur(0); }
  }
  .hero-entrance {
    animation: hero-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes scroll-hint-bounce {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50%      { transform: translateY(6px); opacity: 1; }
  }
  .scroll-hint-chevron {
    animation: scroll-hint-bounce 1.8s ease-in-out infinite;
  }

  /* Headline + párrafo: visibles desde el primer pintado */
  .hero-text-heading,
  .hero-text-description {
    opacity: 1;
  }

  /* Clímax (final del scroll): oculto inicialmente */
  .cta-wrapper {
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      filter: blur(30px);
  }
`;

const FRAME_COUNT = 121;
const frameSrc = (index: number) =>
  `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandKicker?: string;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
  ctaHeading1?: string;
  ctaHeading2?: string;
  climaxDescription?: string;
}

/**
 * Hero fusionado con revelado progresivo:
 * - Estado inicial: kicker + logo pequeño + imagen gris + "Desliza para construir"
 * - Al scroll: logo fade-out, headline + párrafo fade-in, imagen transiciona
 *   de obra gris a casa terminada, todo sincronizado vía ScrollTrigger.
 */
export function Hero({
  brandKicker = "Servicios Integrales",
  brandName = "BOMEL",
  tagline1 = "Construimos tu proyecto,",
  tagline2 = "de obra gris a realidad.",
  ctaDescription = "Construcción, acabados y ventanería con una sola empresa de principio a fin.",
  ctaHeading1 = "",
  ctaHeading2 = "",
  climaxDescription = "Construcción, acabados y ventanería con una sola empresa de principio a fin.",
  className,
  ...props
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const canvasApiRef = useRef<ScrollCanvasHandle>(null);

  return (
    <div
      ref={containerRef}
      className={"relative w-full h-[600svh] " + (className ?? "")}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <CinematicHeroMotion
        containerRef={containerRef}
        mainCardRef={mainCardRef}
        canvasApiRef={canvasApiRef}
      />

      {/* Escenario sticky: permanece fijo mientras el contenedor de 600svh hace scroll */}
      <div
        className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden bg-background text-foreground font-sans"
        style={{ perspective: "1500px" }}
      >
        <div className="film-grain" aria-hidden="true" />
        <div
          className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50"
          aria-hidden="true"
        />

        {/* Headline visible desde el inicio (arriba de la imagen) */}
        <div className="hero-text-heading hero-entrance absolute top-28 md:top-32 left-0 right-0 z-30 px-4 text-center pointer-events-none">
          <h1 className="font-heading text-2xl font-bold leading-[1.1] tracking-tight md:text-3xl lg:text-4xl">
            <span className="text-3d-matte block md:inline">{tagline1}</span>{" "}
            <span className="text-silver-matte block md:inline font-extrabold tracking-tighter">
              {tagline2}
            </span>
          </h1>
        </div>

        {/* Descripción visible desde el inicio (debajo de la imagen) */}
        <div className="hero-text-description hero-entrance absolute bottom-32 md:bottom-16 left-0 right-0 z-30 px-4 text-center pointer-events-none">
          <p className="mx-auto max-w-xl text-sm text-muted-foreground md:max-w-2xl md:text-lg md:text-foreground/75">
            {ctaDescription}
          </p>
        </div>

        {/* CAPA DE FONDO: Clímax — el slogan de la marca, revelado al final del scroll */}
        <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-auto will-change-transform">
          <p className="section-kicker mb-6">{brandName}</p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-silver-matte">
            {ctaHeading1}
          </h2>
          <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-bright text-glow-brand mb-8">
            {ctaHeading2}
          </p>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-10">
            {climaxDescription}
          </p>
        </div>

        {/* CAPA FRONTAL: Tarjeta con la casa (visible de inmediato en tamaño reducido) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none md:pt-36 md:pb-24"
          style={{ perspective: "1500px" }}
        >
          <div
            ref={mainCardRef}
            className="main-card premium-depth-card relative overflow-hidden pointer-events-auto w-full h-[52svh] rounded-none md:h-[63vh]"
          >
            <div className="card-sheen" aria-hidden="true" />

            {/* Lienzo: obra gris → obra terminada */}
            <div className="canvas-stage absolute inset-0">
              <ScrollCanvas
                ref={canvasApiRef}
                frameCount={FRAME_COUNT}
                frameSrc={frameSrc}
              />
              <div className="canvas-veil absolute inset-0 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Hint de scroll sobre la parte baja de la imagen */}
            <ScrollHint />
          </div>
        </div>
      </div>
    </div>
  );
}
