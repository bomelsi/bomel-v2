"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

export interface ScrollCanvasHandle {
  /** Dibuja el frame correspondiente a una fracción de scroll entre 0 y 1. */
  drawProgress: (progress: number) => void;
}

interface ScrollCanvasProps {
  frameCount: number;
  /** Devuelve la URL del frame para un índice base-0. */
  frameSrc: (index: number) => string;
  className?: string;
  /**
   * Progreso (0 a 1) de la primera pasada de carga. Al llegar a 1 la
   * secuencia ya recorre la obra completa y el scroll puede empezar.
   */
  onLoadProgress?: (progress: number) => void;
}

// Primera pasada: un frame de cada COARSE_STEP, repartidos por toda la obra
// (más el último). Con esos ~31 frames la casa ya se construye de principio
// a fin; el resto se rellena después sin que se note, gracias a nearestLoaded.
const COARSE_STEP = 4;

function splitLoadOrder(count: number) {
  const coarse: number[] = [];
  for (let i = 0; i < count; i += COARSE_STEP) coarse.push(i);
  if (coarse[coarse.length - 1] !== count - 1) coarse.push(count - 1);
  const inCoarse = new Set(coarse);
  const fine: number[] = [];
  for (let i = 0; i < count; i++) if (!inCoarse.has(i)) fine.push(i);
  return { coarse, fine };
}

/**
 * Secuencia de imágenes controlada por scroll, estilo Apple.
 * - Pre-carga los frames en dos pasadas (ver splitLoadOrder) e informa el
 *   progreso de la primera a quien lo pida (la pantalla de entrada del home).
 * - Dibuja con ctx.drawImage (cover-fit en horizontal, contain-fit con
 *   bordes desvanecidos en vertical) dentro de requestAnimationFrame.
 * - Multiplica la resolución interna por devicePixelRatio para nitidez HiDPI/Retina.
 */
export const ScrollCanvas = forwardRef<ScrollCanvasHandle, ScrollCanvasProps>(
  function ScrollCanvas({ frameCount, frameSrc, className, onLoadProgress }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef<boolean[]>([]);
    const frameIndexRef = useRef(0);
    const rafRef = useRef(0);
    // Indirección para poder reintentar desde renderFrame, que se define
    // antes que scheduleRender.
    const scheduleRenderRef = useRef<(() => void) | null>(null);
    const onLoadProgressRef = useRef(onLoadProgress);
    useEffect(() => {
      onLoadProgressRef.current = onLoadProgress;
    }, [onLoadProgress]);

    // Un frame solo sirve si además de haber cargado sigue siendo dibujable:
    // bajo presión de memoria el navegador móvil puede descartar el bitmap
    // decodificado, y entonces drawImage no pinta nada (fotograma en negro).
    const isDrawable = useCallback((index: number) => {
      if (!loadedRef.current[index]) return false;
      const img = imagesRef.current[index];
      return !!img && img.complete && img.naturalWidth > 0;
    }, []);

    // Si el frame exacto no está disponible, usa el más cercano que sí lo esté
    // para que el scrub nunca muestre un canvas vacío.
    const nearestLoaded = useCallback(
      (index: number) => {
        if (isDrawable(index)) return index;
        for (let offset = 1; offset < loadedRef.current.length; offset++) {
          if (isDrawable(index - offset)) return index - offset;
          if (isDrawable(index + offset)) return index + offset;
        }
        return -1;
      },
      [isDrawable]
    );

    const renderFrame = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Nada dibujable: conserva lo que ya hubiera pintado. Nunca se limpia
      // el lienzo "por si acaso", porque eso es justo lo que deja el hueco
      // negro cuando el frame de destino no está disponible.
      const index = nearestLoaded(frameIndexRef.current);
      if (index < 0) return;
      const img = imagesRef.current[index];

      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      // Sin layout todavía: asignar canvas.width = 0 lo dejaría en negro.
      if (cssWidth <= 0 || cssHeight <= 0) return;

      // En móvil la secuencia se sirve a 900px de ancho (mismo criterio que
      // frameSrc en hero.tsx), así que pasar de dpr 2 solo escalaría hacia
      // arriba: más memoria de canvas sin ganar nitidez.
      const maxDpr = window.innerWidth < 768 ? 2 : 3;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const bitmapWidth = Math.round(cssWidth * dpr);
      const bitmapHeight = Math.round(cssHeight * dpr);
      if (canvas.width !== bitmapWidth || canvas.height !== bitmapHeight) {
        canvas.width = bitmapWidth;
        canvas.height = bitmapHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Contain-fit como base: la casa siempre se ve completa. En
      // contenedores anchos (desktop) se aplica un acercamiento moderado
      // que agranda la casa recortando solo cielo (arriba) y calle (abajo),
      // sin pasar nunca de cover. Los bordes sin cubrir se desvanecen.
      const containScale = Math.min(cssWidth / img.width, cssHeight / img.height);
      const coverScale = Math.max(cssWidth / img.width, cssHeight / img.height);
      const zoom = cssWidth > cssHeight ? 1.25 : 1;
      const scale = Math.min(containScale * zoom, coverScale);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (cssWidth - drawWidth) / 2;
      // Si hay recorte vertical, se lo lleva más el cielo que la calle (60/40)
      const dy =
        drawHeight > cssHeight
          ? -(drawHeight - cssHeight) * 0.6
          : (cssHeight - drawHeight) / 2;

      // Última verificación antes de borrar: con medidas no finitas drawImage
      // no pinta nada y el lienzo se quedaría limpio, es decir, negro.
      if (!Number.isFinite(drawWidth) || !Number.isFinite(drawHeight)) return;

      try {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      } catch {
        // Imagen en estado inválido (descartada por el navegador): se marca
        // como no cargada para que el siguiente render tire del vecino más
        // cercano, y se reintenta enseguida en vez de dejar el hueco negro.
        loadedRef.current[index] = false;
        scheduleRenderRef.current?.();
        return;
      }

      ctx.globalCompositeOperation = "destination-out";
      if (drawHeight < cssHeight - 1) {
        // Bordes superior e inferior desvanecidos
        const fade = Math.min(drawHeight * 0.18, 90);
        const top = ctx.createLinearGradient(0, dy, 0, dy + fade);
        top.addColorStop(0, "rgba(0,0,0,1)");
        top.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = top;
        ctx.fillRect(dx, dy, drawWidth, fade);
        const bottom = ctx.createLinearGradient(
          0,
          dy + drawHeight - fade,
          0,
          dy + drawHeight
        );
        bottom.addColorStop(0, "rgba(0,0,0,0)");
        bottom.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = bottom;
        ctx.fillRect(dx, dy + drawHeight - fade, drawWidth, fade);
      }
      if (drawWidth < cssWidth - 1) {
        // Bordes laterales desvanecidos
        const fade = Math.min(drawWidth * 0.18, 140);
        const left = ctx.createLinearGradient(dx, 0, dx + fade, 0);
        left.addColorStop(0, "rgba(0,0,0,1)");
        left.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = left;
        ctx.fillRect(dx, dy, fade, drawHeight);
        const right = ctx.createLinearGradient(
          dx + drawWidth - fade,
          0,
          dx + drawWidth,
          0
        );
        right.addColorStop(0, "rgba(0,0,0,0)");
        right.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = right;
        ctx.fillRect(dx + drawWidth - fade, dy, fade, drawHeight);
      }
      ctx.globalCompositeOperation = "source-over";
    }, [nearestLoaded]);

    const scheduleRender = useCallback(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderFrame);
    }, [renderFrame]);

    scheduleRenderRef.current = scheduleRender;

    useImperativeHandle(
      ref,
      () => ({
        drawProgress(progress: number) {
          const clamped = Math.min(1, Math.max(0, progress));
          const index = Math.min(
            frameCount - 1,
            Math.floor(clamped * frameCount)
          );
          if (index !== frameIndexRef.current) {
            frameIndexRef.current = index;
            scheduleRender();
          }
        },
      }),
      [frameCount, scheduleRender]
    );

    // Pre-carga en dos pasadas: primero los frames repartidos por toda la
    // obra (la secuencia ya se puede recorrer completa) y, cuando terminan,
    // los intermedios. Si se pidieran los 121 a la vez, los de la primera
    // pasada competirían con el resto y el scroll tardaría mucho más.
    useEffect(() => {
      let cancelled = false;
      loadedRef.current = new Array(frameCount).fill(false);
      imagesRef.current = new Array(frameCount);
      const { coarse, fine } = splitLoadOrder(frameCount);

      const load = (i: number, onSettled?: () => void) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return;
          loadedRef.current[i] = true;
          // Pinta el primer frame disponible apenas exista, y mejora el
          // actual si el que llega está más cerca del que toca.
          if (i === frameIndexRef.current || nearestLoaded(frameIndexRef.current) === i) {
            scheduleRender();
          }
          onSettled?.();
        };
        // Un frame que falla cuenta igual como resuelto: si no, el progreso
        // se quedaría clavado. Queda como no cargado y nearestLoaded tira
        // de su vecino.
        img.onerror = () => {
          if (cancelled) return;
          loadedRef.current[i] = false;
          onSettled?.();
        };
        img.src = frameSrc(i);
        imagesRef.current[i] = img;
      };

      let coarseSettled = 0;
      coarse.forEach((i) =>
        load(i, () => {
          coarseSettled += 1;
          onLoadProgressRef.current?.(coarseSettled / coarse.length);
          if (coarseSettled === coarse.length) fine.forEach((j) => load(j));
        })
      );

      return () => {
        cancelled = true;
        cancelAnimationFrame(rafRef.current);
      };
    }, [frameCount, frameSrc, nearestLoaded, scheduleRender]);

    // Redibuja al cambiar el tamaño del lienzo (rotación, resize, etc.).
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const observer = new ResizeObserver(() => scheduleRender());
      observer.observe(canvas);
      return () => observer.disconnect();
    }, [scheduleRender]);

    return (
      <div className={cn("relative h-full w-full", className)}>
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label="Secuencia de construcción: una casa pasa de obra gris a obra terminada"
        />
      </div>
    );
  }
);
