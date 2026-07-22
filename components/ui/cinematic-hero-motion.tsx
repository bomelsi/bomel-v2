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
// El layout es estático: la secuencia arranca casi de inmediato y termina
// antes del final para dejar un breve "hold" con la casa terminada.
// SEQUENCE_END se acerca a 1 (poco margen muerto) para que el usuario no
// acumule impulso de scroll sin ver cambios — eso es lo que causaba el
// "salto" brusco al liberar el pin hacia la siguiente sección.
const SEQUENCE_START = 0.05;
const SEQUENCE_END = 0.9;

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

  // Escena estática: el layout del hero no cambia con el scroll.
  // El único efecto ligado al scroll es la construcción de la casa
  // frame a frame dentro de la tarjeta (canvas).
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const sequenceProgress =
            (self.progress - SEQUENCE_START) / (SEQUENCE_END - SEQUENCE_START);
          canvasApiRef.current?.drawProgress(sequenceProgress);
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, canvasApiRef]);

  return null;
}
