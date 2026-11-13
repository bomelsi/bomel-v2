"use client";

import React, {
  forwardRef,
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
   * Progreso (0 a 1) de los frames clave, no de los 121. Al llegar a 1 la
   * secuencia ya se recorre entera de obra gris a casa terminada; el resto
   * entra después y solo añade detalle. Esperar a los 121 dejaba la barra
   * de la pantalla de entrada clavada a medias en móvil.
   */
  onLoadProgress?: (progress: number) => void;
}

// Decodificar un frame cuesta decenas de ms; si se hace al dibujarlo (como
// con <img>) el scroll se traba, y los 121 decodificados a la vez no caben en
// memoria: el navegador los descarta y los vuelve a decodificar sin parar.
//
// La secuencia se sostiene con dos conjuntos:
//
// 1. Claves: uno de cada KEY_STEP, repartidos por toda la obra. Se descargan y
//    decodifican primero y no se liberan nunca. Garantizan que, apenas entra
//    la página, haya siempre un frame dibujable a menos de KEY_STEP/2 de
//    donde esté el scroll. Sin esto solo existía el frame 0 y el hero se veía
//    congelado durante los primeros segundos, porque durante el hero lo único
//    que cambia es la casa.
// 2. Ventana: los vecinos del frame actual, con más margen hacia donde avanza
//    el scroll. Dan el detalle fino y se liberan al alejarse.
const KEY_STEP = 8;
const AHEAD = 20;
const BEHIND = 8;
// Holgura antes de liberar un frame que salió de la ventana, para no
// decodificar y liberar el mismo frame con cada pequeño vaivén del scroll.
const KEEP_MARGIN = 3;
const MAX_DECODES = 6;

type FrameSource = ImageBitmap | HTMLImageElement;

interface Sequence {
  setVisible: (visible: boolean) => void;
  setProgress: (progress: number) => void;
  redraw: () => void;
  dispose: () => void;
}

function createSequence(
  canvas: HTMLCanvasElement,
  frameCount: number,
  frameSrc: (index: number) => string,
  onProgress: (progress: number) => void
): Sequence {
  const ctx = canvas.getContext("2d");
  const keyframes: number[] = [];
  for (let i = 0; i < frameCount; i += KEY_STEP) keyframes.push(i);
  if (keyframes[keyframes.length - 1] !== frameCount - 1) {
    keyframes.push(frameCount - 1);
  }
  const isKeyframe = new Set(keyframes);
  // createImageBitmap(blob) decodifica fuera del hilo principal. Donde no
  // existe (navegadores viejos) se cae al dibujado directo de <img>.
  const useBitmaps = typeof createImageBitmap === "function";
  const blobs: (Blob | undefined)[] = new Array(frameCount);
  const bitmaps = new Map<number, ImageBitmap>();
  const images = new Map<number, HTMLImageElement>();
  const decoding = new Set<number>();
  const abort = new AbortController();
  let disposed = false;
  let target = 0;
  let direction = 1;
  let drawnIndex = -1;
  let raf = 0;
  let forceNext = false;
  let visible = true;
  const keysReady = new Set<number>();

  const source = (index: number): FrameSource | null => {
    const bitmap = bitmaps.get(index);
    if (bitmap) return bitmap;
    const img = images.get(index);
    return img && img.complete && img.naturalWidth > 0 ? img : null;
  };

  // Si el frame exacto no está listo, el más cercano que sí lo esté: el
  // scrub nunca muestra un lienzo vacío ni espera a una decodificación.
  const nearest = (index: number) => {
    if (source(index)) return index;
    for (let offset = 1; offset < frameCount; offset++) {
      if (index - offset >= 0 && source(index - offset)) return index - offset;
      if (index + offset < frameCount && source(index + offset)) {
        return index + offset;
      }
    }
    return -1;
  };

  const draw = (force: boolean) => {
    if (disposed || !ctx) return;

    // Nada dibujable: se conserva lo ya pintado. Nunca se limpia el lienzo
    // "por si acaso", porque eso deja el hueco negro.
    const index = nearest(target);
    if (index < 0) return;
    if (!force && index === drawnIndex) return;
    const src = source(index)!;

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

    const srcWidth = "naturalWidth" in src ? src.naturalWidth : src.width;
    const srcHeight = "naturalHeight" in src ? src.naturalHeight : src.height;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Contain-fit como base: la casa siempre se ve completa. En
    // contenedores anchos (desktop) se aplica un acercamiento moderado
    // que agranda la casa recortando solo cielo (arriba) y calle (abajo),
    // sin pasar nunca de cover. Los bordes sin cubrir se desvanecen.
    const containScale = Math.min(cssWidth / srcWidth, cssHeight / srcHeight);
    const coverScale = Math.max(cssWidth / srcWidth, cssHeight / srcHeight);
    const zoom = cssWidth > cssHeight ? 1.25 : 1;
    const scale = Math.min(containScale * zoom, coverScale);
    const drawWidth = srcWidth * scale;
    const drawHeight = srcHeight * scale;
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
      ctx.drawImage(src, dx, dy, drawWidth, drawHeight);
    } catch {
      // Fuente en estado inválido: se descarta para que el siguiente render
      // tire del vecino más cercano, en vez de dejar el hueco negro.
      bitmaps.delete(index);
      images.delete(index);
      schedule(true);
      return;
    }
    drawnIndex = index;

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
  };

  function schedule(force = false) {
    forceNext = forceNext || force;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const f = forceNext;
      forceNext = false;
      draw(f);
    });
  }

  // Un frame recién disponible solo merece redibujar si queda más cerca del
  // objetivo que el que ya está pintado.
  const scheduleIfBetter = () => {
    if (nearest(target) !== drawnIndex) schedule();
  };

  const loadImage = (index: number, onSettled?: () => void) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      scheduleIfBetter();
      onSettled?.();
    };
    img.onerror = () => {
      if (disposed) return;
      images.delete(index);
      onSettled?.();
    };
    img.src = frameSrc(index);
    images.set(index, img);
  };

  const windowRange = () => {
    const back = direction > 0 ? BEHIND : AHEAD;
    const forward = direction > 0 ? AHEAD : BEHIND;
    return [
      Math.max(0, target - back),
      Math.min(frameCount - 1, target + forward),
    ] as const;
  };

  // Libera los frames que salieron de la ventana y lanza la decodificación
  // de los que faltan, primero los más cercanos al objetivo y, a igual
  // distancia, los que quedan hacia donde avanza el scroll.
  const pump = () => {
    if (disposed || !useBitmaps || !visible) return;
    const [lo, hi] = windowRange();

    for (const [index, bitmap] of bitmaps) {
      if (isKeyframe.has(index)) continue;
      if (index < lo - KEEP_MARGIN || index > hi + KEEP_MARGIN) {
        bitmap.close();
        bitmaps.delete(index);
      }
    }

    if (decoding.size >= MAX_DECODES) return;
    const falta = (i: number) =>
      blobs[i] && !bitmaps.has(i) && !decoding.has(i) && !images.has(i);

    // Las claves van primero: hasta que estén, el scroll por delante del
    // frame actual no tendría nada cercano que mostrar.
    const pending = keyframes.filter(falta);

    const ventana: number[] = [];
    for (let i = lo; i <= hi; i++) if (!isKeyframe.has(i) && falta(i)) ventana.push(i);
    const cost = (index: number) => {
      const delta = index - target;
      return delta * direction >= 0 ? Math.abs(delta) : Math.abs(delta) * 2 + 1;
    };
    ventana.sort((a, b) => cost(a) - cost(b));
    pending.push(...ventana);

    for (const index of pending) {
      if (decoding.size >= MAX_DECODES) break;
      decoding.add(index);
      createImageBitmap(blobs[index]!).then(
        (bitmap) => {
          decoding.delete(index);
          if (disposed) return bitmap.close();
          const [curLo, curHi] = windowRange();
          const fuera = index < curLo - KEEP_MARGIN || index > curHi + KEEP_MARGIN;
          if (fuera && !isKeyframe.has(index)) {
            // El scroll ya se fue lejos mientras se decodificaba.
            bitmap.close();
          } else {
            bitmaps.set(index, bitmap);
            scheduleIfBetter();
          }
          markKey(index);
          pump();
        },
        () => {
          decoding.delete(index);
          if (disposed) return;
          // Este frame no se pudo decodificar como bitmap: se dibuja como <img>.
          loadImage(index, () => markKey(index));
          pump();
        }
      );
    }
  };

  // Un frame clave cuenta en cuanto se puede dibujar (o se descarta por
  // fallo). Los no clave no mueven la barra.
  const markKey = (index: number) => {
    if (!isKeyframe.has(index) || keysReady.has(index)) return;
    keysReady.add(index);
    onProgress(keysReady.size / keyframes.length);
  };

  // Descarga: primero las claves y luego el resto, para que la secuencia se
  // pueda recorrer entera cuanto antes. Sin prioridad baja: en el inicio la
  // casa es el contenido principal, no un extra.
  const ordenDescarga = [
    ...keyframes,
    ...Array.from({ length: frameCount }, (_, i) => i).filter(
      (i) => !isKeyframe.has(i)
    ),
  ];
  for (const i of ordenDescarga) {
    if (!useBitmaps) {
      loadImage(i, () => markKey(i));
      continue;
    }
    fetch(frameSrc(i), { signal: abort.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.blob();
      })
      .then((blob) => {
        if (disposed) return;
        blobs[i] = blob;
        pump();
      })
      .catch(() => {
        if (disposed) return;
        // Un fallo de red tiene que resolver igual la clave: si no, la
        // barra se queda clavada esperando algo que no va a llegar.
        markKey(i);
      });
  }

  return {
    // El hero ocupa 4 pantallas y la secuencia decodificada son ~100 MB. Al
    // salir de vista se liberan: el resto de la página (las tarjetas de
    // ventanería, justo debajo) se anima sin esa memoria encima. Los blobs
    // se conservan, así que volver a verla no vuelve a descargar nada.
    setVisible(next: boolean) {
      if (next === visible) return;
      visible = next;
      if (next) {
        pump();
        return;
      }
      for (const [index, bitmap] of bitmaps) {
        // Se conserva el que está pintado para que al volver no haya hueco.
        if (index === drawnIndex) continue;
        bitmap.close();
        bitmaps.delete(index);
      }
    },
    setProgress(progress: number) {
      const clamped = Math.min(1, Math.max(0, progress));
      const index = Math.min(frameCount - 1, Math.floor(clamped * frameCount));
      if (index === target) return;
      direction = index > target ? 1 : -1;
      target = index;
      pump();
      schedule();
    },
    redraw() {
      schedule(true);
    },
    dispose() {
      disposed = true;
      abort.abort();
      cancelAnimationFrame(raf);
      bitmaps.forEach((bitmap) => bitmap.close());
      bitmaps.clear();
      images.clear();
    },
  };
}

/**
 * Secuencia de imágenes controlada por scroll, estilo Apple.
 * - Descarga todos los frames e informa el progreso a quien lo pida (la
 *   pantalla de entrada del home).
 * - Mantiene decodificada solo una ventana de frames alrededor del actual
 *   (ver createSequence), fuera del hilo principal, para que el scroll no
 *   se trabe ni dispare el consumo de memoria.
 * - Dibuja con ctx.drawImage (cover-fit en horizontal, contain-fit con
 *   bordes desvanecidos en vertical) dentro de requestAnimationFrame.
 * - Multiplica la resolución interna por devicePixelRatio para nitidez HiDPI/Retina.
 */
export const ScrollCanvas = forwardRef<ScrollCanvasHandle, ScrollCanvasProps>(
  function ScrollCanvas({ frameCount, frameSrc, className, onLoadProgress }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sequenceRef = useRef<Sequence | null>(null);
    const onLoadProgressRef = useRef(onLoadProgress);
    useEffect(() => {
      onLoadProgressRef.current = onLoadProgress;
    }, [onLoadProgress]);

    useImperativeHandle(
      ref,
      () => ({
        drawProgress(progress: number) {
          sequenceRef.current?.setProgress(progress);
        },
      }),
      []
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const sequence = createSequence(canvas, frameCount, frameSrc, (p) =>
        onLoadProgressRef.current?.(p)
      );
      sequenceRef.current = sequence;

      // Redibuja al cambiar el tamaño del lienzo (rotación, resize, etc.).
      const observer = new ResizeObserver(() => sequence.redraw());
      observer.observe(canvas);

      // Libera la memoria de la secuencia mientras el hero no se ve.
      const visibility = new IntersectionObserver(
        ([entry]) => sequence.setVisible(entry.isIntersecting),
        { rootMargin: "100% 0px" }
      );
      visibility.observe(canvas);

      return () => {
        observer.disconnect();
        visibility.disconnect();
        sequence.dispose();
        sequenceRef.current = null;
      };
    }, [frameCount, frameSrc]);

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
