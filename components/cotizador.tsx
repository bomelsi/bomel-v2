"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TIPOS = [
  {
    id: "Ventana corrediza española",
    img: "/images/productos/pagina3_img1.jpeg",
    icon: "🪟",
  },
  {
    id: "Ventana fija",
    img: "/images/productos/pagina3_img5.jpeg",
    icon: "🔳",
  },
  {
    id: "Ventana proyectable",
    img: "/images/productos/pagina3_img2.jpeg",
    icon: "↗️",
  },
  {
    id: "Puerta corrediza",
    img: "/images/productos/pagina6_img1.png",
    icon: "🚪",
  },
  {
    id: "Puerta embisagrada",
    img: "/images/productos/pagina6_img3.jpeg",
    icon: "🚪",
  },
  {
    id: "Puerta automática",
    img: "/images/productos/pagina6_img2.jpeg",
    icon: "⚡",
  },
];

interface Item {
  tipo: string;
  ancho: string;
  alto: string;
  cantidad: string;
}

const STEPS = ["Tipo", "Medidas", "Cotizar"] as const;

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export function Cotizador() {
  const [step, setStep] = useState(0);
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    { tipo: "", ancho: "", alto: "", cantidad: "1" },
  ]);
  const [nombre, setNombre] = useState("");
  const [zona, setZona] = useState("");

  const addItem = () =>
    setItems((prev) => [...prev, { tipo: selectedTipo, ancho: "", alto: "", cantidad: "1" }]);

  const removeItem = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  const updateItem = (i: number, field: keyof Item, val: string) =>
    setItems((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item))
    );

  const goNext = () => {
    if (step === 0 && !selectedTipo) return;
    if (step === 1) {
      setItems((prev) =>
        prev.map((it) => ({ ...it, tipo: it.tipo || selectedTipo }))
      );
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const buildWhatsApp = () => {
    const lineas = items
      .filter((it) => it.ancho && it.alto)
      .map(
        (it) =>
          `• ${it.cantidad} ${it.tipo || selectedTipo} de ${it.ancho}×${it.alto} m`
      )
      .join("%0A");

    const identidad =
      nombre || zona
        ? `%0AMi nombre es ${nombre || "—"}, estoy en ${zona || "—"}.`
        : "";

    return `https://wa.me/50370401212?text=Hola%20BOMEL%2C%20quiero%20cotizar%3A%0A${lineas}${identidad}`;
  };

  const canProceedStep1 = !!selectedTipo;
  const canProceedStep2 = items.some((it) => it.ancho && it.alto);

  return (
    <section
      id="cotizador"
      className="scroll-mt-28 glass-panel rounded-3xl p-7 md:p-10"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="section-kicker mb-3">Cotizador rápido</p>
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
          Arma tu solicitud en{" "}
          <span className="text-brand-bright">3 pasos</span>.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sin precios en pantalla — BOMEL te responde con tu cotización exacta por WhatsApp en menos de 24 horas.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                i === step
                  ? "bg-brand-bright text-[#04211d]"
                  : i < step
                  ? "bg-brand/30 text-brand-bright cursor-pointer"
                  : "bg-white/5 text-muted-foreground"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </button>
            <span className={`text-xs font-semibold ${i === step ? "text-brand-bright" : "text-muted-foreground/50"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px transition-colors ${i < step ? "bg-brand/40" : "bg-white/10"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-sm font-semibold text-foreground/80">
              ¿Qué necesitas?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIPOS.map((tipo) => (
                <button
                  key={tipo.id}
                  type="button"
                  onClick={() => setSelectedTipo(tipo.id)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    selectedTipo === tipo.id
                      ? "border-brand/60 bg-brand/10 shadow-[0_0_20px_-5px_rgba(45,212,191,0.3)]"
                      : "border-white/10 bg-white/5 hover:border-brand/30 hover:bg-white/8"
                  }`}
                >
                  <div className="mb-3 h-20 w-full overflow-hidden rounded-xl">
                    <Image
                      src={tipo.img}
                      alt={tipo.id}
                      width={200}
                      height={80}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs font-bold leading-tight">
                    {tipo.id}
                  </p>
                  {selectedTipo === tipo.id && (
                    <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-bright text-[10px] font-black text-[#04211d]">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!canProceedStep1}
              className="mt-6 w-full rounded-full bg-gradient-to-b from-brand-bright to-brand-strong py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              Siguiente: ingresar medidas →
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-sm font-semibold text-foreground/80">
              Ingresa las medidas de cada pieza
            </p>

            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="min-w-[120px] flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                      Tipo
                    </label>
                    <select
                      value={item.tipo || selectedTipo}
                      onChange={(e) => updateItem(i, "tipo", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-brand/50 focus:outline-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.2rem" }}
                    >
                      {TIPOS.map((t) => (
                        <option key={t.id} value={t.id} className="bg-card">
                          {t.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                      Ancho (m)
                    </label>
                    <input
                      type="number"
                      min="0.2"
                      max="10"
                      step="0.01"
                      placeholder="1.20"
                      value={item.ancho}
                      onChange={(e) => updateItem(i, "ancho", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-brand/50 focus:outline-none text-center"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="w-24">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                      Alto (m)
                    </label>
                    <input
                      type="number"
                      min="0.2"
                      max="10"
                      step="0.01"
                      placeholder="1.50"
                      value={item.alto}
                      onChange={(e) => updateItem(i, "alto", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-brand/50 focus:outline-none text-center"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="w-20">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      step="1"
                      value={item.cantidad}
                      onChange={(e) => updateItem(i, "cantidad", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-brand/50 focus:outline-none text-center"
                      inputMode="numeric"
                    />
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      aria-label="Eliminar ítem"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-400/20 text-red-400/60 transition-colors hover:border-red-400/50 hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand/30 py-3 text-sm font-semibold text-brand-bright/70 transition-colors hover:border-brand/60 hover:text-brand-bright"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Agregar otra ventana / puerta
            </button>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
              >
                ← Atrás
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceedStep2}
                className="flex-1 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                Ver resumen →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-sm font-semibold text-foreground/80">
              Resumen de tu solicitud
            </p>

            <div className="mb-5 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              {items
                .filter((it) => it.ancho && it.alto)
                .map((it, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-semibold">{it.tipo || selectedTipo}</span>
                    <span className="text-muted-foreground">
                      {it.cantidad} × {it.ancho}×{it.alto} m
                    </span>
                  </div>
                ))}
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cot-nombre" className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                  Tu nombre <span className="text-muted-foreground/50 font-normal normal-case">(opcional)</span>
                </label>
                <input
                  id="cot-nombre"
                  type="text"
                  placeholder="Juan Martínez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-brand/50 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="cot-zona" className="block text-[10px] font-bold uppercase tracking-widest text-brand-bright mb-1.5">
                  Zona / Municipio <span className="text-muted-foreground/50 font-normal normal-case">(opcional)</span>
                </label>
                <input
                  id="cot-zona"
                  type="text"
                  placeholder="San Salvador"
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-brand/50 focus:outline-none"
                />
              </div>
            </div>

            <a
              href={buildWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-5 py-4 text-xs font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.7)] sm:text-sm"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.12 1.526 5.853L0 24l6.347-1.503A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.853 9.853 0 0 1-5.025-1.371l-.36-.214-3.735.883.928-3.634-.235-.374A9.852 9.852 0 0 1 2.118 12c0-5.45 4.432-9.882 9.882-9.882 5.45 0 9.882 4.432 9.882 9.882 0 5.45-4.432 9.882-9.882 9.882z" />
              </svg>
              Recibir mi cotización por WhatsApp →
            </a>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Te respondemos con tu cotización en menos de 24 horas hábiles.
            </p>
            <p className="mt-1 text-center text-[10px] text-muted-foreground/50">
              * El precio podría variar según distancia, nivel de piso de instalación y condiciones específicas del sitio.
            </p>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-5 flex w-full items-center justify-center gap-1 text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              ← Editar medidas
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
