"use client";

import { useEffect, useState } from "react";
import { scrollPageBy, subscribeScroll } from "@/lib/scroll-root";
import { cn } from "@/lib/utils";

interface ScrollHintProps {
  label?: string;
}

/**
 * Invitación a hacer scroll al final del hero. Se oculta apenas el usuario
 * empieza a desplazarse. El hero es ahora una sola sección continua (600svh,
 * pin + scrub), así que no hay un "siguiente elemento" al que saltar — el
 * tap simplemente empuja el scroll un poco para arrancar la secuencia,
 * en vez de saltar a una ancla. Absolute respecto al hero: no agrega altura
 * al flujo del documento.
 */
export function ScrollHint({ label = "Desliza para construir" }: ScrollHintProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => subscribeScroll((top) => setVisible(top < 40)), []);

  const handleClick = () => {
    scrollPageBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "scroll-hint absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-opacity duration-500 md:bottom-6",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-widest md:text-sm">
        {label}
      </span>
      <svg
        className="scroll-hint-chevron h-5 w-5 text-brand-bright"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
}
