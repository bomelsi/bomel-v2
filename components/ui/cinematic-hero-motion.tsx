"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollCanvasHandle } from "@/components/scroll-canvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tramo del scroll del hero durante el cual se reproduce la secuencia de la casa.
const SEQUENCE_START = 0.24;
const SEQUENCE_END = 0.82;

interface CinematicHeroMotionProps {
  containerRef: RefObject<HTMLDivElement | null>;
  mainCardRef: RefObject<HTMLDivElement | null>;
  canvasApiRef: RefObject<ScrollCanvasHandle | null>;
}

/**
 * Coreografía GSAP + ScrollTrigger del hero, cargada como chunk aparte
 * (dynamic import con ssr:false) para no sumar el peso de GSAP al bundle
 * inicial ni retrasar el LCP del texto crítico, que ya se pinta sin JS.
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
  }, [containerRef, canvasApiRef]);

  return null;
}
