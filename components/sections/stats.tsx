"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/reveal";

interface Stat {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  etiqueta: string;
}

const STATS: Stat[] = [
  { valor: 8, prefijo: "+", etiqueta: "Años de experiencia" },
  { valor: 250, prefijo: "+", etiqueta: "Proyectos entregados" },
  { valor: 98, sufijo: "%", etiqueta: "Clientes satisfechos" },
];

function Contador({ valor, prefijo = "", sufijo = "" }: Omit<Stat, "etiqueta">) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  // null = no animado aún; SSR/noscript muestra valor real via ?? valor
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, valor, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, valor]);

  return (
    // suppressHydrationWarning: SSR renderiza `valor`; cliente empieza en null
    <span ref={ref} className="tabular-nums" suppressHydrationWarning>
      {prefijo}
      {display ?? valor}
      {sufijo}
    </span>
  );
}

export function Stats() {
  return (
    <Reveal className="mt-14">
      <div className="glass-panel grid grid-cols-1 gap-y-12 rounded-3xl px-6 py-12 sm:grid-cols-3 md:py-16">
        {STATS.map((stat) => (
          <div key={stat.etiqueta} className="text-center">
            <p className="font-heading text-6xl font-extrabold tracking-tight text-brand-bright text-glow-brand md:text-7xl lg:text-8xl">
              <Contador
                valor={stat.valor}
                prefijo={stat.prefijo}
                sufijo={stat.sufijo}
              />
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground md:text-base">
              {stat.etiqueta}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
