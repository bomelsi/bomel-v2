"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
}

/**
 * Secuencia de imágenes controlada por scroll, estilo Apple.
 * - Pre-carga todos los frames con objetos Image y muestra un indicador de carga.
 * - Dibuja con ctx.drawImage en cover-fit dentro de requestAnimationFrame.
 * - Multiplica la resolución interna por devicePixelRatio para nitidez HiDPI/Retina.
 */
export const ScrollCanvas = forwardRef<ScrollCanvasHandle, ScrollCanvasProps>(
  function ScrollCanvas({ frameCount, frameSrc, className }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef<boolean[]>([]);
    const frameIndexRef = useRef(0);
    const rafRef = useRef(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const ready = loadedCount >= frameCount;

    // Si el frame exacto aún no cargó, usa el más cercano disponible
    // para que el scrub nunca muestre un canvas vacío.
    const nearestLoaded = useCallback((index: number) => {
      if (loadedRef.current[index]) return index;
      for (let offset = 1; offset < loadedRef.current.length; offset++) {
        if (loadedRef.current[index - offset]) return index - offset;
        if (loadedRef.current[index + offset]) return index + offset;
      }
      return -1;
    }, []);

    const renderFrame = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const index = nearestLoaded(frameIndexRef.current);
      if (index < 0) return;
      const img = imagesRef.current[index];

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      const bitmapWidth = Math.round(cssWidth * dpr);
      const bitmapHeight = Math.round(cssHeight * dpr);
      if (canvas.width !== bitmapWidth || canvas.height !== bitmapHeight) {
        canvas.width = bitmapWidth;
        canvas.height = bitmapHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Cover-fit: escala para llenar el lienzo sin deformar la imagen.
      const scale = Math.max(cssWidth / img.width, cssHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.drawImage(
        img,
        (cssWidth - drawWidth) / 2,
        (cssHeight - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    }, [nearestLoaded]);

    const scheduleRender = useCallback(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderFrame);
    }, [renderFrame]);

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

    // Pre-carga de toda la secuencia antes de iniciar.
    useEffect(() => {
      let cancelled = false;
      loadedRef.current = new Array(frameCount).fill(false);
      imagesRef.current = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return;
          loadedRef.current[i] = true;
          setLoadedCount((count) => count + 1);
          // Pinta el primer frame disponible apenas exista.
          if (i === frameIndexRef.current || nearestLoaded(frameIndexRef.current) === i) {
            scheduleRender();
          }
        };
        img.src = frameSrc(i);
        return img;
      });

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
        {!ready && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="glass-panel flex items-center gap-3 rounded-full px-5 py-2.5">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-brand-bright"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold tracking-widest text-foreground/80 uppercase">
                Cargando obra… {Math.round((loadedCount / frameCount) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
