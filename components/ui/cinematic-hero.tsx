"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ScrollCanvas, type ScrollCanvasHandle } from "@/components/scroll-canvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

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

  /* OUTSIDE THE CARD: Theme-aware text */
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

  /* INSIDE THE CARD: Silver/White over the dark teal background */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A8C3BF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
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
`;

const FRAME_COUNT = 121;
const frameSrc = (index: number) =>
  `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;

// Tramo del scroll del hero durante el cual se reproduce la secuencia de la casa.
const SEQUENCE_START = 0.24;
const SEQUENCE_END = 0.82;

export interface CinematicHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  brandKicker?: string;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading1?: string;
  ctaHeading2?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandKicker = "Servicios Integrales",
  brandName = "BOMEL",
  tagline1 = "Construimos tu proyecto,",
  tagline2 = "de obra gris a realidad.",
  cardHeading = "Una sola empresa. Todo tu proyecto.",
  cardDescription = (
    <>
      Diseño arquitectónico, obra gris, instalaciones, acabados y ventanería{" "}
      <span className="font-semibold text-white">bajo un mismo equipo</span>.
      Sin intermediarios. Sin sorpresas.
    </>
  ),
  ctaHeading1 = "Lo que se promete,",
  ctaHeading2 = "se cumple.",
  ctaDescription = "Construcción, acabados y ventanería con una sola empresa responsable de principio a fin.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const canvasApiRef = useRef<ScrollCanvasHandle>(null);
  const requestRef = useRef<number>(0);

  // Luz dinámica de la tarjeta siguiendo el mouse (rAF para rendimiento)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 6) return;

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty(
            "--mouse-x",
            `${e.clientX - rect.left}px`
          );
          mainCardRef.current.style.setProperty(
            "--mouse-y",
            `${e.clientY - rect.top}px`
          );
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Línea de tiempo cinematográfica ligada al scroll del contenedor de 600vh
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [".canvas-stage", ".card-left-text", ".card-brand", ".floating-badge"],
        { autoAlpha: 0 }
      );
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Entrada de los taglines al cargar
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" },
          "-=1.0"
        );

      // El contenedor alto (600vh) + sticky reemplaza al pin de GSAP.
      // ScrollTrigger calcula la fracción de scroll y sincroniza
      // tanto la línea de tiempo como el frame del canvas.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const sequenceProgress =
              (self.progress - SEQUENCE_START) / (SEQUENCE_END - SEQUENCE_START);
            canvasApiRef.current?.drawProgress(sequenceProgress);
          },
        },
      });

      scrollTl
        .to(
          [".hero-text-wrapper", ".bg-grid-theme"],
          { scale: 1.15, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 2 },
          0
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .to(".canvas-stage", { autoAlpha: 1, ease: "power2.out", duration: 1 }, "-=0.8")
        .fromTo(
          ".card-brand",
          { y: -40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "expo.out", duration: 1.2 },
          "-=0.5"
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 },
          "<"
        )
        .fromTo(
          ".floating-badge",
          { y: 80, autoAlpha: 0, scale: 0.7, rotationZ: -6 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.2, stagger: 0.2 },
          "-=0.8"
        )
        // Pausa larga: aquí la casa se construye frame a frame con el scroll
        .to({}, { duration: 7 })
        .to([".card-left-text", ".card-brand", ".floating-badge"], {
          y: -40,
          autoAlpha: 0,
          ease: "power3.in",
          duration: 1,
          stagger: 0.05,
        })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "85svh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".canvas-stage", { autoAlpha: 0.25, duration: 1.8 }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: "-130vh", ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[600vh]", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Escenario sticky: permanece fijo mientras el contenedor de 600vh hace scroll */}
      <div
        className="sticky top-0 h-dvh md:h-screen w-full overflow-hidden flex items-center justify-center bg-background text-foreground font-sans"
        style={{ perspective: "1500px" }}
      >
        <div className="film-grain" aria-hidden="true" />
        <div
          className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50"
          aria-hidden="true"
        />

        {/* CAPA DE FONDO: Taglines */}
        <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 will-change-transform transform-style-3d">
          <p className="text-track gsap-reveal section-kicker mb-6 !text-base md:!text-lg">
            {brandKicker} {brandName}
          </p>
          <h1 className="sr-only">
            {brandKicker} {brandName}: {tagline1} {tagline2}
          </h1>
          <p
            aria-hidden="true"
            className="text-track gsap-reveal text-3d-matte font-heading text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-2"
          >
            {tagline1}
          </p>
          <p
            aria-hidden="true"
            className="text-days gsap-reveal text-silver-matte font-heading text-4xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter"
          >
            {tagline2}
          </p>
          <p className="text-track gsap-reveal mt-8 text-sm md:text-base text-muted-foreground tracking-widest uppercase">
            Desliza para construir
          </p>
        </div>

        {/* CAPA DE FONDO 2: Clímax — el slogan de la marca */}
        <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 gsap-reveal pointer-events-auto will-change-transform">
          <p className="section-kicker mb-6">{brandName}</p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-silver-matte">
            {ctaHeading1}
          </h2>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-bright text-glow-brand mb-8">
            {ctaHeading2}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
            {ctaDescription}
          </p>
        </div>

        {/* CAPA FRONTAL: Tarjeta física premium con el canvas de la obra */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ perspective: "1500px" }}
        >
          <div
            ref={mainCardRef}
            className="main-card premium-depth-card relative overflow-hidden gsap-reveal pointer-events-auto w-[92vw] md:w-[85vw] h-[85svh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
          >
            <div className="card-sheen" aria-hidden="true" />

            {/* Lienzo de la secuencia: obra gris → obra terminada */}
            <div className="canvas-stage absolute inset-0">
              <ScrollCanvas
                ref={canvasApiRef}
                frameCount={FRAME_COUNT}
                frameSrc={frameSrc}
              />
              <div className="canvas-veil absolute inset-0 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Marca, arriba a la derecha */}
            <div className="card-brand gsap-reveal absolute top-24 right-6 md:top-28 md:right-12 z-20 text-right">
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-brand-bright mb-1">
                {brandKicker}
              </p>
              <p className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-card-silver-matte leading-none">
                {brandName}
              </p>
            </div>

            {/* Mensaje principal, abajo a la izquierda */}
            <div className="card-left-text gsap-reveal absolute bottom-8 left-6 md:bottom-14 md:left-12 z-20 max-w-md text-left">
              <h3 className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-teal-50/75 text-sm md:text-base leading-relaxed">
                {cardDescription}
              </p>
            </div>

            {/* Insignias de vidrio flotantes */}
            <div className="floating-badge absolute flex top-48 left-6 md:top-28 md:left-12 floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-teal-500/20 to-teal-900/10 flex items-center justify-center border border-teal-400/30 shadow-inner">
                <svg
                  className="h-4 w-4 lg:h-5 lg:w-5 text-teal-300 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3.75 21h16.5M4.5 21V8.25L12 4.5l7.5 3.75V21M9 21v-4.5h6V21M9 11.25h.008M12 11.25h.008M15 11.25h.008" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs lg:text-sm font-bold tracking-tight">
                  Obra gris
                </p>
                <p className="text-teal-200/50 text-[10px] lg:text-xs font-medium">
                  Estructura y cimentación
                </p>
              </div>
            </div>

            <div className="floating-badge absolute flex bottom-44 right-6 md:bottom-32 md:right-12 floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                <svg
                  className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-300 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs lg:text-sm font-bold tracking-tight">
                  Obra terminada
                </p>
                <p className="text-teal-200/50 text-[10px] lg:text-xs font-medium">
                  Lo prometido, entregado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
