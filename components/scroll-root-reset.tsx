"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getScrollRoot } from "@/lib/scroll-root";

const STORE_KEY = "bomel-scroll";
// Reintentos al restaurar: la página puede no haber terminado de medir
// (fotos del blog, tarjetas) y todavía no ser lo bastante alta.
const RESTORE_TRIES = 40;
const RESTORE_STEP_MS = 50;

/** Respaldo si sessionStorage está bloqueado (modo privado, permisos). */
const memoria = new Map<string, number>();

function leerTodo(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return Object.fromEntries(memoria);
  }
}

function guardar(clave: string, top: number) {
  memoria.set(clave, top);
  try {
    const todo = leerTodo();
    todo[clave] = top;
    sessionStorage.setItem(STORE_KEY, JSON.stringify(todo));
  } catch {
    // Solo queda en memoria: se pierde al recargar, no pasa nada.
  }
}

function leer(clave: string): number | undefined {
  const guardado = leerTodo()[clave];
  return typeof guardado === "number" ? guardado : memoria.get(clave);
}

const claveDe = () => window.location.pathname + window.location.search;

/**
 * Posición de scroll al cambiar de página. En móvil quien se desplaza es
 * #scroll-root (ver lib/scroll-root.ts), no `window`, así que la
 * restauración nativa del navegador no lo alcanza: al dar atrás desde un
 * artículo se volvía al principio del blog en vez de a donde se estaba.
 *
 * Aquí se guarda la posición de cada página y se devuelve al navegar hacia
 * atrás o adelante; en una navegación nueva se empieza desde arriba.
 *
 * En desktop getScrollRoot() devuelve null y no hace nada: el documento
 * scrollea y el navegador ya restaura solo.
 */
export function ScrollRootReset() {
  const pathname = usePathname();
  // La siguiente navegación viene del botón atrás/adelante.
  const volviendoRef = useRef(false);
  // Mientras se recoloca la página no hay que guardar nada: si el contenido
  // todavía no ha crecido, se guardaría una posición recortada y se perdería
  // la buena para la próxima vez.
  const restaurandoRef = useRef(false);

  useEffect(() => {
    const onPop = () => {
      volviendoRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Va guardando la posición de la página actual mientras se usa.
  useEffect(() => {
    const root = getScrollRoot();
    if (!root) return;

    const clave = claveDe();
    let ultimo = -1;
    const capturar = () => {
      // Durante la transición entre rutas puede llegar algún scroll ya con
      // la URL nueva: no debe pisar la posición de la página que se deja.
      if (claveDe() !== clave || restaurandoRef.current) return;
      const top = root.scrollTop;
      if (top === ultimo) return;
      ultimo = top;
      guardar(clave, top);
    };

    root.addEventListener("scroll", capturar, { passive: true });
    // Respaldo: no se puede depender solo del evento de scroll. Leer la
    // posición cada poco es barato y solo escribe cuando ha cambiado.
    const timer = window.setInterval(capturar, 300);

    return () => {
      root.removeEventListener("scroll", capturar);
      window.clearInterval(timer);
    };
  }, [pathname]);

  // Al entrar en una página decide dónde dejarla.
  useEffect(() => {
    const root = getScrollRoot();
    if (!root) return;

    const volviendo = volviendoRef.current;
    volviendoRef.current = false;

    const hash = window.location.hash;
    if (hash.length > 1) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    if (!volviendo) {
      root.scrollTop = 0;
      return;
    }

    const destino = leer(claveDe());
    if (destino == null) {
      root.scrollTop = 0;
      return;
    }

    // Insiste un rato: al volver, la página puede no haber terminado de
    // medir (fotos del blog) y todavía no ser lo bastante alta, así que el
    // navegador recorta scrollTop y hay que reintentar. Con temporizador y
    // no con requestAnimationFrame: si el navegador no está pintando, rAF
    // se detiene y la posición se quedaría sin recuperar.
    let intentos = 0;
    restaurandoRef.current = true;
    const colocar = () => {
      root.scrollTop = destino;
      intentos += 1;
      if (Math.abs(root.scrollTop - destino) <= 2 || intentos >= RESTORE_TRIES) {
        window.clearInterval(reintento);
        restaurandoRef.current = false;
      }
    };
    const reintento = window.setInterval(colocar, RESTORE_STEP_MS);
    colocar();

    return () => {
      window.clearInterval(reintento);
      restaurandoRef.current = false;
    };
  }, [pathname]);

  return null;
}
