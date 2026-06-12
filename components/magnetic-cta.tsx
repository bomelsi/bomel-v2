"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    // El botón "persigue" al cursor dentro de su zona de atracción
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="inline-block p-8 -m-8"
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.96 }}
        className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-9 py-5 font-heading text-base md:text-lg font-bold text-[#04211d] shadow-[0_0_60px_-12px_rgba(45,212,191,0.6),0_20px_40px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-shadow hover:shadow-[0_0_80px_-8px_rgba(45,212,191,0.8),0_24px_48px_-12px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.5)]"
      >
        {children}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </motion.a>
    </div>
  );
}

export function MagneticCta() {
  return (
    <section
      id="contacto-rapido"
      className="relative flex flex-col items-center justify-center px-6 py-28 md:py-40 text-center overflow-hidden"
    >
      {/* Resplandor ambiental teal */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-strong/20 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker justify-center mb-6">Hablemos</p>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
          Tu proyecto merece un equipo
          <br className="hidden md:block" /> que{" "}
          <span className="text-brand-bright text-glow-brand">dé la cara</span>.
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Cuéntanos qué quieres construir y recibe una respuesta directa, sin
          formularios eternos ni promesas al aire.
        </p>
        <div className="flex flex-col items-center gap-5">
          <MagneticButton href={WHATSAPP_URL}>
            Cotiza por WhatsApp
          </MagneticButton>
          <Link
            href="/contacto"
            className="rounded-full border border-brand/30 bg-brand-strong/10 px-7 py-3 text-sm font-bold text-brand-bright transition-all hover:-translate-y-0.5 hover:bg-brand-strong/20 hover:border-brand/50"
          >
            Agenda una visita técnica →
          </Link>
          <p className="text-xs text-muted-foreground/70 text-center max-w-xs leading-relaxed">
            Fecha de entrega por contrato.{" "}
            <span className="text-foreground/50">Lo que BOMEL firma, BOMEL cumple.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
