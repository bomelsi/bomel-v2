"use client";

import React, { useEffect, useRef } from "react";

/*
 * Wordmark voxel isométrico "BOMEL" en <canvas> (JavaScript puro).
 *
 * - Cada letra se construye sobre una grilla pixel-art 5x7; cada píxel es un
 *   prisma extruido con 3 caras y 3 tonos: frontal (base), superior (clara)
 *   y lateral (oscura). Las caras laterales solo se dibujan en los bordes de
 *   la silueta (donde no hay píxel vecino).
 * - La dirección y profundidad de la extrusión siguen al mouse (estilo hero
 *   de baggystudio.com) con interpolación lerp ~0.07. En reposo, la extrusión
 *   deriva despacio en círculo; con prefers-reduced-motion la deriva se apaga.
 * - El orden de dibujado se recalcula cada frame según el vector de extrusión
 *   (painter's algorithm) para que los prismas se tapen correctamente.
 * - Al entrar en viewport, las letras aparecen una a una con easeOutBack.
 * - Hover sobre una letra: se levanta un poco y se ilumina.
 */

const GLYPHS: Record<string, string[]> = {
  B: ["XXXX.", "X...X", "X...X", "XXXX.", "X...X", "X...X", "XXXX."],
  O: [".XXX.", "X...X", "X...X", "X...X", "X...X", "X...X", ".XXX."],
  M: ["X...X", "XX.XX", "X.X.X", "X.X.X", "X...X", "X...X", "X...X"],
  E: ["XXXXX", "X....", "X....", "XXXX.", "X....", "X....", "XXXXX"],
  L: ["X....", "X....", "X....", "X....", "X....", "X....", "XXXXX"],
};

const WORD = "BOMEL";
const COLS = 5;
const ROWS = 7;
const GAP = 1.5; // columnas de separación entre letras

// Paleta teal BOMEL (monocromo): frontal base, tope claro, lateral oscuro
const C_FRONT: RGB = [17, 86, 79]; // #11564F
const C_TOP: RGB = [94, 234, 212]; // #5EEAD4
const C_SIDE: RGB = [4, 26, 23]; // #041A17
// Tonos encendidos al hacer hover
const H_FRONT: RGB = [45, 212, 191]; // #2DD4BF
const H_TOP: RGB = [204, 251, 241]; // #CCFBF1
const H_SIDE: RGB = [15, 118, 110]; // #0F766E

type RGB = [number, number, number];

interface VoxelPixel {
  li: number; // índice de letra
  col: number;
  row: number;
  t: boolean; // bordes de silueta (sin vecino)
  r: boolean;
  b: boolean;
  l: boolean;
}

const mix = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(
    a[1] + (b[1] - a[1]) * t
  )}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`;

const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export function FooterWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Construcción de la grilla de píxeles con bordes de silueta ---
    const pixels: VoxelPixel[] = [];
    const letterOffsets: number[] = [];
    {
      let cursor = 0;
      for (let i = 0; i < WORD.length; i++) {
        letterOffsets.push(cursor);
        const g = GLYPHS[WORD[i]];
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            if (g[row][col] !== "X") continue;
            pixels.push({
              li: i,
              col,
              row,
              t: row === 0 || g[row - 1][col] !== "X",
              b: row === ROWS - 1 || g[row + 1][col] !== "X",
              l: col === 0 || g[row][col - 1] !== "X",
              r: col === COLS - 1 || g[row][col + 1] !== "X",
            });
          }
        }
        cursor += COLS + GAP;
      }
    }
    const totalCols = COLS * WORD.length + GAP * (WORD.length - 1);

    // --- Estado de animación ---
    let s = 10; // tamaño de bloque (responsive)
    let width = 0;
    let height = 0;
    let offX = 0;
    let offY = 0;
    let maxDepth = 0;
    let ex = 8; // extrusión actual (lerp)
    let ey = -6;
    let tx = 8; // extrusión objetivo
    let ty = -6;
    let mouseX = -1;
    let mouseY = -1;
    let lastMove = 0;
    let hovered = -1;
    let entranceStart = -1;
    const lifts = new Array(WORD.length).fill(0);
    const glows = new Array(WORD.length).fill(0);

    const resize = () => {
      const w = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      s = w / totalCols;
      maxDepth = s * 1.9;
      width = w;
      height = Math.round(ROWS * s + 2 * maxDepth + s);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offX = 0;
      offY = maxDepth + s * 0.8;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // --- Entrada con stagger al ser visible ---
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          entranceStart = performance.now();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);

    // --- Lógica compartida para mouse y touch ---
    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
      lastMove = performance.now();
      hovered = -1;
      if (
        mouseX >= 0 &&
        mouseX <= rect.width &&
        mouseY >= 0 &&
        mouseY <= rect.height
      ) {
        for (let i = 0; i < WORD.length; i++) {
          const x0 = offX + letterOffsets[i] * s;
          if (
            mouseX >= x0 &&
            mouseX <= x0 + COLS * s &&
            mouseY >= offY - s &&
            mouseY <= offY + ROWS * s + s
          ) {
            hovered = i;
            break;
          }
        }
      }
    };

    const onMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });

    // Touch: el dedo sigue al puntero igual que el cursor (passive para no bloquear scroll)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => { mouseX = -1; hovered = -1; };
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    // --- Loop de render ---
    let raf = 0;
    const frame = (now: number) => {
      // Objetivo de extrusión: mouse activo o deriva circular en reposo
      if (mouseX >= 0 && now - lastMove < 1800) {
        const dx = mouseX - width / 2;
        const dy = mouseY - height / 2;
        const dist = Math.hypot(dx, dy) || 1;
        const depth = Math.min(1, dist / (width * 0.5)) * maxDepth;
        tx = (dx / dist) * depth;
        ty = (dy / dist) * depth;
      } else if (!reducedMotion) {
        const a = now * 0.00045;
        tx = Math.cos(a) * maxDepth * 0.6;
        ty = Math.sin(a) * maxDepth * 0.4 - maxDepth * 0.18;
      } else {
        tx = maxDepth * 0.55;
        ty = -maxDepth * 0.45;
      }

      // Lerp con inercia (~0.07): las letras "persiguen" al mouse
      ex += (tx - ex) * 0.07;
      ey += (ty - ey) * 0.07;

      for (let i = 0; i < WORD.length; i++) {
        const on = i === hovered;
        lifts[i] += ((on ? -s * 0.7 : 0) - lifts[i]) * 0.12;
        glows[i] += ((on ? 1 : 0) - glows[i]) * 0.12;
      }

      ctx.clearRect(0, 0, width, height);

      // Progreso de entrada por letra (stagger + easeOutBack)
      const entrance: number[] = [];
      for (let i = 0; i < WORD.length; i++) {
        if (entranceStart < 0) {
          entrance.push(0);
          continue;
        }
        const t = (now - entranceStart - i * 130) / 650;
        entrance.push(t <= 0 ? 0 : t >= 1 ? 1 : easeOutBack(t));
      }

      // Painter's algorithm: orden según el vector de extrusión
      const len = Math.hypot(ex, ey) || 1;
      const nx = ex / len;
      const ny = ey / len;
      const order = [...pixels].sort((A, B) => {
        const ka = (letterOffsets[A.li] + A.col) * nx + A.row * ny;
        const kb = (letterOffsets[B.li] + B.col) * nx + B.row * ny;
        return ka - kb;
      });

      for (const p of order) {
        const ent = entrance[p.li];
        if (ent <= 0) continue;

        const x = offX + (letterOffsets[p.li] + p.col) * s;
        const y =
          offY + p.row * s + lifts[p.li] + (1 - ent) * s * 5; // entra desde abajo
        const g = glows[p.li];
        ctx.globalAlpha = Math.max(0, Math.min(1, ent * 1.6));

        const front = mix(C_FRONT, H_FRONT, g);
        const top = mix(C_TOP, H_TOP, g);
        const side = mix(C_SIDE, H_SIDE, g);

        // Caras laterales (paralelogramos), solo en bordes de silueta
        const quad = (
          x1: number,
          y1: number,
          x2: number,
          y2: number,
          color: string
        ) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x2 + ex, y2 + ey);
          ctx.lineTo(x1 + ex, y1 + ey);
          ctx.closePath();
          ctx.fill();
        };
        if (p.t) quad(x, y, x + s, y, top);
        if (p.b) quad(x, y + s, x + s, y + s, side);
        if (p.l) quad(x, y, x, y + s, side);
        if (p.r) quad(x + s, y, x + s, y + s, side);

        // Cara frontal (el +0.5 evita hairlines entre píxeles vecinos)
        ctx.fillStyle = front;
        ctx.fillRect(x, y, s + 0.5, s + 0.5);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="wordmark-stage mt-14 w-full overflow-hidden px-[2vw] pt-8"
    >
      <span className="sr-only">BOMEL</span>
      <canvas
        ref={canvasRef}
        className="block w-full"
        aria-hidden="true"
      />
    </div>
  );
}
