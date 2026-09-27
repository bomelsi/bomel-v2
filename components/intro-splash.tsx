"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";

export interface IntroSplashHandle {
  /** Progreso de la carga de la secuencia del hero, de 0 a 1. Al llegar a 1 se retira. */
  setProgress: (progress: number) => void;
}

// Tope de espera: con conexión lenta la entrada se retira igual y el resto
// de frames sigue cargando por detrás (ScrollCanvas muestra el más cercano).
const MAX_WAIT_MS = 4000;
// Pausa para que la línea llegue visiblemente al final antes del fundido.
const FILL_SETTLE_MS = 350;
const FADE_OUT_MS = 600;

const STYLES = `
  /* Aparece con retraso: si la secuencia ya está en caché (visita repetida),
     la entrada se retira antes de llegar a verse. */
  @keyframes intro-in { from { opacity: 0; } to { opacity: 1; } }
  /* Red de seguridad sin JavaScript: se retira sola pasados unos segundos. */
  @keyframes intro-safety { to { opacity: 0; visibility: hidden; } }
  @keyframes intro-glow {
    0%, 100% {
      filter: drop-shadow(0 0 6px rgba(45,212,191,.25));
      transform: scale(1);
    }
    50% {
      filter: drop-shadow(0 0 22px rgba(45,212,191,.85)) drop-shadow(0 0 44px rgba(45,212,191,.35));
      transform: scale(1.035);
    }
  }
  .intro-splash {
    animation: intro-in .5s ease .4s both, intro-safety .5s ease 9s forwards;
  }
  .intro-logo { animation: intro-glow 2.2s ease-in-out infinite; }
  .intro-fill { box-shadow: 0 0 10px rgba(45,212,191,.7); }
  @media (prefers-reduced-motion: reduce) {
    .intro-splash { animation: intro-in .2s ease .4s both, intro-safety .2s ease 9s forwards; }
    .intro-logo { animation: none; filter: drop-shadow(0 0 14px rgba(45,212,191,.55)); }
  }
`;

/**
 * Pantalla de entrada del home: el logo de BOMEL brillando y una línea con el
 * progreso real de la secuencia del hero, para que la primera visita no se
 * sienta como una espera vacía. Se retira cuando el hero ya puede hacer scroll.
 */
export const IntroSplash = forwardRef<IntroSplashHandle>(function IntroSplash(
  _props,
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const [done, setDone] = useState(false);

  const leave = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    const root = rootRef.current;
    if (!root) return;

    // Todavía invisible (carga desde caché): se quita sin más, sin parpadeo.
    if (Number(getComputedStyle(root).opacity) < 0.05) {
      setDone(true);
      return;
    }

    if (fillRef.current) fillRef.current.style.width = "100%";
    timersRef.current.push(
      window.setTimeout(() => {
        // Congela la opacidad actual y funde con una transición.
        root.style.animation = "none";
        root.style.opacity = "1";
        root.style.pointerEvents = "none";
        void root.offsetWidth;
        root.style.transition = `opacity ${FADE_OUT_MS}ms ease`;
        root.style.opacity = "0";
        timersRef.current.push(
          window.setTimeout(() => setDone(true), FADE_OUT_MS)
        );
      }, FILL_SETTLE_MS)
    );
  };

  useImperativeHandle(ref, () => ({
    setProgress(progress: number) {
      if (leavingRef.current) return;
      const p = Math.min(1, Math.max(0, progress));
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
      if (p >= 1) leave();
    },
  }));

  useEffect(() => {
    const timers = timersRef.current;
    timers.push(window.setTimeout(leave, MAX_WAIT_MS));

    // Mientras la entrada cubre la pantalla, el scroll no debe avanzar el
    // hero por debajo sin que se vea. En táctil lo frena touch-action.
    const root = rootRef.current;
    const block = (e: Event) => e.preventDefault();
    root?.addEventListener("wheel", block, { passive: false });

    return () => {
      root?.removeEventListener("wheel", block);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Cargando BOMEL"
      className="intro-splash fixed inset-0 z-[200] flex touch-none flex-col items-center justify-center bg-background px-6 text-center"
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <Image
        src="/logo.png"
        alt="BOMEL"
        width={112}
        height={112}
        loading="eager"
        fetchPriority="high"
        className="intro-logo h-24 w-24 object-contain md:h-28 md:w-28"
      />
      <p className="mt-7 font-heading text-sm leading-relaxed text-muted-foreground md:text-base">
        Cuando quieras soluciones, piensa en{" "}
        <span className="font-extrabold text-brand-bright">BOMEL</span>.
      </p>
      <div
        className="mt-7 h-0.5 w-40 overflow-hidden rounded-full bg-white/10 md:w-56"
        aria-hidden="true"
      >
        <div
          ref={fillRef}
          className="intro-fill h-full w-0 rounded-full bg-brand-bright transition-[width] duration-300 ease-out"
        />
      </div>
    </div>
  );
});
