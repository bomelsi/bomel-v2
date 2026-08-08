"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getScrollRoot } from "@/lib/scroll-root";

/**
 * Next.js restaura el scroll en cada navegación sobre `window`, pero en móvil
 * quien se desplaza es #scroll-root (ver lib/scroll-root.ts). Sin esto, al
 * cambiar de página se conservaría la posición de la anterior.
 *
 * En desktop getScrollRoot() devuelve null y no hace nada: el comportamiento
 * nativo de Next.js sigue intacto.
 */
export function ScrollRootReset() {
  const pathname = usePathname();

  useEffect(() => {
    const root = getScrollRoot();
    if (!root) return;

    const hash = window.location.hash;
    if (hash.length > 1) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    root.scrollTop = 0;
  }, [pathname]);

  return null;
}
