"use client";

import { useEffect } from "react";

/**
 * Desplazamiento suave para enlaces de ancla, hecho por JS en el clic.
 * Sustituye a `scroll-behavior: smooth` en CSS, que animaba también los
 * ajustes internos de ScrollTrigger (restauración de scroll en cada
 * refresh) y provocaba tirones. Respeta prefers-reduced-motion y los
 * scroll-margin de las secciones.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element)?.closest?.(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href")!;
      const target = hash === "#" ? null : document.getElementById(hash.slice(1));
      if (hash !== "#" && !target) return;

      e.preventDefault();
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : ("smooth" as ScrollBehavior);

      if (target) {
        history.pushState(null, "", hash);
        target.scrollIntoView({ behavior });
      } else {
        history.pushState(null, "", window.location.pathname);
        window.scrollTo({ top: 0, behavior });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
