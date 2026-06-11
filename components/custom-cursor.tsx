"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Sobre títulos el punto crece en grande (estilo Baggy Studio)
const GROW_SELECTOR = "h1, h2, h3, h4, .cursor-grow";
// Sobre enlaces/botones/iconos crece apenas, sin tapar el hover del elemento
const LINK_SELECTOR = "a, button, [role='button']";

type CursorVariant = "default" | "grow" | "link" | "press";

/**
 * Cursor personalizado: un único punto que sigue al mouse con física de
 * resorte. Crece y cambia de tono sobre títulos, se agranda levemente sobre
 * enlaces y se comprime al hacer click. mix-blend-difference invierte su
 * color según el fondo. Solo se activa con puntero fino (desktop).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let pressed = false;
    let zone: Exclude<CursorVariant, "press"> = "default";

    const syncVariant = () => {
      setVariant(pressed ? "press" : zone);
    };

    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest?.(LINK_SELECTOR)) {
        zone = "link";
      } else if (target?.closest?.(GROW_SELECTOR)) {
        zone = "grow";
      } else {
        zone = "default";
      }
      syncVariant();
    };
    const onMouseDown = () => {
      pressed = true;
      syncVariant();
    };
    const onMouseUp = () => {
      pressed = false;
      syncVariant();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ x: dotX, y: dotY }}
    >
      <motion.div
        className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        variants={{
          default: { scale: 1, backgroundColor: "#2dd4bf" },
          grow: { scale: 4, backgroundColor: "#5eead4" },
          link: { scale: 1.9, backgroundColor: "#99f6e4" },
          press: { scale: 0.6, backgroundColor: "#ffffff" },
        }}
        animate={variant}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
      />
    </motion.div>
  );
}
