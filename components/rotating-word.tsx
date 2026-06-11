"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Palabra rotativa del slogan: cicla por la oferta de BOMEL con un
 * deslizamiento vertical (entra desde abajo, sale hacia arriba).
 * Con prefers-reduced-motion la palabra queda fija en "ventanas".
 * Para lectores de pantalla la frase es estática (sr-only); la
 * animación queda oculta con aria-hidden.
 */
const PALABRAS = [
  "ventanas",
  "puertas",
  "fachadas",
  "remodelación",
  "divisiones",
  "acabados",
];

export function RotatingWord({ intervalMs = 2200 }: { intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PALABRAS.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <>
      <span className="sr-only">ventanas</span>
      <span
        aria-hidden="true"
        className="relative inline-grid overflow-hidden align-bottom"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={PALABRAS[index]}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-glow-brand whitespace-nowrap font-extrabold uppercase tracking-wide text-brand-bright [grid-area:1/1]"
          >
            {PALABRAS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
