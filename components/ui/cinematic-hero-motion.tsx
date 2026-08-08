"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollCanvasHandle } from "@/components/scroll-canvas";
import { getScrollRoot, getScrollTop } from "@/lib/scroll-root";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Red de seguridad: con el scroll en #scroll-root la barra de direcciones
  // ya no se retrae y el viewport no cambia de alto a mitad del scroll, pero
  // el teclado virtual y la rotación siguen disparando resize.
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
      if (getScrollTop() > window.innerHeight * 6) return;

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
    const create = () => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        // En móvil el scroll lo hace #scroll-root; en desktop, el documento
        // (getScrollRoot() devuelve null y ScrollTrigger usa su default).
        // Se pasa el elemento y no un selector porque gsap resolvería la
        // cadena dentro del scope, y #scroll-root es un ancestro del hero.
        scroller: getScrollRoot() ?? undefined,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const sequenceProgress =
            (self.progress - SEQUENCE_START) / (SEQUENCE_END - SEQUENCE_START);
          canvasApiRef.current?.drawProgress(sequenceProgress);
        },
      });

      return () => trigger.kill();
    };

    // matchMedia recrea el trigger al cruzar el breakpoint, que es justo
    // cuando cambia cuál es el elemento que scrollea.
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", create);
    mm.add("(min-width: 768px)", create);

    return () => mm.revert();
  }, [containerRef, canvasApiRef]);

  return null;
}
