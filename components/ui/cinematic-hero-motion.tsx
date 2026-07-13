"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollCanvasHandle } from "@/components/scroll-canvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // La barra de direcciones del navegador móvil dispara un resize al
  // aparecer/ocultarse durante el scroll; sin esto, ScrollTrigger
  // recalcula start/end en ese instante y el scrub salta de frame.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Tramo del scroll del hero durante el cual se reproduce la secuencia de la casa.
// La tarjeta ya es visible desde el primer pintado, así que solo el paso a
// pantalla completa (breve, ~13% del scroll) separa la llegada de la fase
// de construcción frame a frame.
const SEQUENCE_START = 0.13;
const SEQUENCE_END = 0.71;

interface CinematicHeroMotionProps {
  containerRef: RefObject<HTMLDivElement | null>;
  mainCardRef: RefObject<HTMLDivElement | null>;
  canvasApiRef: RefObject<ScrollCanvasHandle | null>;
}

/**
 * Coreografía GSAP + ScrollTrigger del Hero fusionado
 * (components/sections/hero.tsx), cargada como chunk aparte
 * (dynamic import con ssr:false) para no afectar la apertura de la página.
 */
export function CinematicHeroMotion({
  containerRef,
  mainCardRef,
  canvasApiRef,
}: CinematicHeroMotionProps) {
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
  }, [mainCardRef]);

  // Línea de tiempo cinematográfica ligada al scroll del contenedor de 600svh
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // La entrada inicial (kicker, logo, hint) usa una animación CSS con
      // fill-mode "both" para mostrarse sin esperar a este chunk de GSAP.
      // Pero fill-mode "both" deja el valor final de la animación "fijado"
      // con prioridad sobre estilos inline — si no se limpia, gana el pulso
      // sobre los tweens de GSAP que tocan las MISMAS propiedades (opacity)
      // más adelante (el logo no se desvanecería, hero-text no aparecería).
      // Se quita la animación CSS aquí, justo antes de que GSAP tome control,
      // para que los estilos inline manden sin competencia.
      gsap.set([".hero-text-heading", ".hero-text-description", ".main-card"], {
        animation: "none",
      });

      // La tarjeta ya es visible desde el primer pintado (CSS la muestra en
      // su tamaño "encajado" en el hero, sin necesitar scroll). GSAP no
      // toca su posición/visibilidad inicial — solo anima a partir de ahí,
      // así no hay ningún cambio visual en el instante en que toma el control.
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // El contenedor alto (600svh) + sticky reemplaza al pin de GSAP.
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
        // El headline y el párrafo ya son visibles desde el primer pintado;
        // solo la tarjeta se expande a pantalla completa (~13% del scroll).
        .to(
          ".bg-grid-theme",
          { scale: 1.15, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 0.4 },
          0
        )
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 0.5,
        }, 0)
        // Pausa larga: aquí la casa se construye frame a frame con el scroll
        .to({}, { duration: 7 })
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
        .to(".main-card", { y: "-130vh", ease: "power3.in", duration: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, canvasApiRef]);

  return null;
}
