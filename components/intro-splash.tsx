"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface IntroSplashHandle {
  /** Progreso de la carga de la secuencia del hero, de 0 a 1. */
  setProgress: (progress: number) => void;
}

const SLOGAN = "Cuando quieras soluciones, piensa en";

// Coreografía (ms desde que monta el componente):
// la frase se escribe letra por letra, pausa, BOMEL cae como un sello y,
// al impactar, sale la onda, tiembla la escena y el logo destella.
const TYPE_START_MS = 300;
const CHAR_MS = 42;
const STAMP_PAUSE_MS = 380;
const STAMP_AT_MS = TYPE_START_MS + SLOGAN.length * CHAR_MS + STAMP_PAUSE_MS;
// Momento del golpe dentro de la animación del sello (≈55% de 620 ms).
const IMPACT_DELAY_MS = 340;
// Tiempo que BOMEL se sostiene firme antes de retirarse.
const HOLD_MS = 2000;
// Tiempo mínimo en pantalla: aunque la carga termine antes, la entrada se
// queda hasta completar la coreografía. La línea avanza pareja hasta aquí.
const MIN_SHOW_MS = STAMP_AT_MS + HOLD_MS;
// Tope de espera: con conexión lenta la entrada se retira igual y el resto
// de frames sigue cargando por detrás (ScrollCanvas muestra el más cercano).
const MAX_WAIT_MS = 9000;
const TICK_MS = 100;
// Pausa para que la línea llegue visiblemente al final antes del fundido.
const FILL_SETTLE_MS = 350;
const FADE_OUT_MS = 600;

type Phase = "typing" | "stamp" | "impact";

const STYLES = `
  /* Aparece con retraso: si la secuencia ya está en caché (visita repetida),
     la entrada se retira antes de llegar a verse. */
  @keyframes intro-in { from { opacity: 0; } to { opacity: 1; } }
  /* Red de seguridad sin JavaScript: se retira sola pasados unos segundos. */
  @keyframes intro-safety { to { opacity: 0; visibility: hidden; } }
  @keyframes intro-glow {
    0%, 100% { filter: drop-shadow(0 0 6px rgba(45,212,191,.25)); transform: scale(1); }
    50% {
      filter: drop-shadow(0 0 22px rgba(45,212,191,.85)) drop-shadow(0 0 44px rgba(45,212,191,.35));
      transform: scale(1.035);
    }
  }
  @keyframes intro-logo-flash {
    0% {
      filter: drop-shadow(0 0 32px rgba(45,212,191,1)) drop-shadow(0 0 64px rgba(45,212,191,.7));
      transform: scale(1.08);
    }
    100% { filter: drop-shadow(0 0 6px rgba(45,212,191,.25)); transform: scale(1); }
  }
  @keyframes intro-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  @keyframes intro-stamp {
    0% { opacity: 0; transform: scale(2.8); filter: blur(10px); }
    55% {
      opacity: 1; transform: scale(.93);
      filter: blur(0) drop-shadow(0 0 28px rgba(45,212,191,.95));
    }
    72% { transform: scale(1.035); }
    100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 14px rgba(45,212,191,.55)); }
  }
  @keyframes intro-sheen { from { background-position: 130% 0; } to { background-position: -30% 0; } }
  @keyframes intro-ring {
    0% { opacity: .9; transform: translate(-50%, -50%) scale(.35); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(2.6); }
  }
  @keyframes intro-shake {
    0%, 100% { transform: translate(0, 0); }
    20% { transform: translate(-3px, 2px); }
    40% { transform: translate(3px, -2px); }
    60% { transform: translate(-2px, 1px); }
    80% { transform: translate(1px, 0); }
  }
  @keyframes intro-fade { to { opacity: 1; } }

  .intro-splash { animation: intro-in .5s ease .4s both, intro-safety .5s ease 12s forwards; }
  .intro-logo { animation: intro-glow 2.2s ease-in-out infinite; }
  .intro-logo.is-hit {
    animation: intro-logo-flash .9s ease-out, intro-glow 2.2s ease-in-out .9s infinite;
  }
  .intro-stage.is-shake { animation: intro-shake .38s ease-out; }
  /* Cursor en posición absoluta dentro de la letra: no crea puntos de corte
     de línea, así la frase no se reacomoda mientras se escribe. */
  .intro-cursor {
    position: absolute; top: .12em; right: -3px;
    height: 1.2em; width: 2px; background: var(--brand-bright);
    visibility: visible;
    animation: intro-blink .9s step-end infinite;
  }
  .intro-cursor.is-before { right: auto; left: -3px; }
  .intro-bomel {
    opacity: 0;
    background: linear-gradient(105deg, var(--brand-bright) 42%, #eafffb 50%, var(--brand-bright) 58%);
    background-size: 260% 100%;
    background-position: 130% 0;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .intro-bomel.is-on {
    animation:
      intro-stamp .62s cubic-bezier(.2,.9,.25,1) forwards,
      intro-sheen 1.1s ease-in-out .75s 1 both;
  }
  .intro-ring { opacity: 0; box-shadow: 0 0 18px rgba(45,212,191,.5); }
  .intro-ring.is-on { animation: intro-ring .85s cubic-bezier(.1,.7,.3,1) forwards; }
  .intro-fill { box-shadow: 0 0 10px rgba(45,212,191,.7); }

  /* Reducir movimiento: sin escritura, sin caída, onda ni temblor. */
  @media (prefers-reduced-motion: reduce) {
    .intro-splash { animation: intro-in .2s ease .4s both, intro-safety .2s ease 12s forwards; }
    .intro-logo, .intro-logo.is-hit {
      animation: none; filter: drop-shadow(0 0 14px rgba(45,212,191,.55));
    }
    .intro-bomel.is-on {
      animation: intro-fade .4s ease forwards;
      filter: drop-shadow(0 0 14px rgba(45,212,191,.55));
    }
    .intro-ring.is-on, .intro-stage.is-shake { animation: none; }
    .intro-cursor { animation: none; }
  }
`;

/**
 * Pantalla de entrada del home: el logo de BOMEL brillando, el slogan que se
 * escribe solo y BOMEL cayendo como un sello, con una línea que avanza con el
 * progreso real de la secuencia del hero. Se retira cuando el hero ya puede
 * hacer scroll y la coreografía terminó.
 */
export const IntroSplash = forwardRef<IntroSplashHandle>(function IntroSplash(
  _props,
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef(false);
  const progressRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const [done, setDone] = useState(false);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

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
      progressRef.current = Math.min(1, Math.max(0, progress));
      // Todo listo antes de que la entrada llegara a verse (fotos en caché):
      // se quita en el acto, sin hacer esperar a quien ya visitó la página.
      const root = rootRef.current;
      if (
        progressRef.current >= 1 &&
        root &&
        Number(getComputedStyle(root).opacity) < 0.05
      ) {
        leave();
      }
    },
  }));

  useEffect(() => {
    const timers = timersRef.current;
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    const start = performance.now();

    // Coreografía del slogan y del sello.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      at(TYPE_START_MS, () => {
        setTyped(SLOGAN.length);
        setPhase("stamp");
      });
    } else {
      for (let i = 1; i <= SLOGAN.length; i++) {
        at(TYPE_START_MS + (i - 1) * CHAR_MS, () => setTyped(i));
      }
      at(STAMP_AT_MS, () => setPhase("stamp"));
      at(STAMP_AT_MS + IMPACT_DELAY_MS, () => setPhase("impact"));
    }

    at(MAX_WAIT_MS, leave);

    // La línea muestra el menor entre el progreso real y el tiempo mínimo
    // transcurrido, y la entrada se retira cuando se cumplen ambos.
    const tick = window.setInterval(() => {
      if (leavingRef.current) return window.clearInterval(tick);
      const byTime = (performance.now() - start) / MIN_SHOW_MS;
      const shown = Math.min(progressRef.current, byTime);
      if (fillRef.current) fillRef.current.style.width = `${shown * 100}%`;
      if (progressRef.current >= 1 && byTime >= 1) leave();
    }, TICK_MS);

    // Mientras la entrada cubre la pantalla, el scroll no debe avanzar el
    // hero por debajo sin que se vea. En táctil lo frena touch-action.
    const root = rootRef.current;
    const block = (e: Event) => e.preventDefault();
    root?.addEventListener("wheel", block, { passive: false });

    return () => {
      root?.removeEventListener("wheel", block);
      window.clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (done) return null;

  const stamped = phase !== "typing";
  const impact = phase === "impact";

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Cargando BOMEL"
      className="intro-splash fixed inset-0 z-[200] flex touch-none items-center justify-center overflow-hidden bg-background px-6 text-center"
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <span className="sr-only">{SLOGAN} BOMEL.</span>

      <div
        className={cn("intro-stage flex flex-col items-center", impact && "is-shake")}
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          width={112}
          height={112}
          loading="eager"
          fetchPriority="high"
          className={cn(
            "intro-logo h-24 w-24 object-contain md:h-28 md:w-28",
            impact && "is-hit"
          )}
        />

        {/* Cada letra ocupa su lugar desde el inicio (visibility), así nada
            se desplaza mientras se escribe. */}
        <p className="mt-7 font-heading text-sm leading-relaxed text-muted-foreground md:text-base">
          {SLOGAN.split("").map((ch, i) => (
            <span key={i} className={cn("relative", i < typed ? "visible" : "invisible")}>
              {ch}
              {!stamped && i === typed - 1 && <span className="intro-cursor" />}
              {!stamped && typed === 0 && i === 0 && (
                <span className="intro-cursor is-before" />
              )}
            </span>
          ))}
        </p>

        <div className="relative mt-2">
          <span
            className={cn(
              "intro-ring pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] rounded-full border-2 border-brand-bright",
              impact && "is-on"
            )}
          />
          <span
            className={cn(
              "intro-bomel inline-block -mr-[0.08em] font-heading text-5xl font-black tracking-[0.08em] md:text-7xl",
              stamped && "is-on"
            )}
          >
            BOMEL
          </span>
        </div>

        <div className="mt-7 h-0.5 w-40 overflow-hidden rounded-full bg-white/10 md:w-56">
          <div
            ref={fillRef}
            className="intro-fill h-full w-0 rounded-full bg-brand-bright transition-[width] duration-300 ease-out"
          />
        </div>
      </div>
    </div>
  );
});
