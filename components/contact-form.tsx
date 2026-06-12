"use client";

import React, { useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const TIPOS_PROYECTO = [
  "Ventanería / Puertas",
  "Fachada ACM",
  "Remodelación",
  "Obra gris / Construcción",
  "Acabados",
  "Otro",
];

export function ContactForm() {
  const [state, handleSubmit] = useForm("mjgdpkvb");
  const [submitCount, setSubmitCount] = useState(0);
  const lastSubmit = useRef(0);

  const rateLimitedSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const now = Date.now();
    if (now - lastSubmit.current < 30_000) {
      e.preventDefault();
      return;
    }
    lastSubmit.current = now;
    setSubmitCount((n) => n + 1);
    void handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-bright/15 border border-brand/30">
          <svg
            className="h-8 w-8 text-brand-bright"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
          Recibido.
        </h3>
        <p className="text-muted-foreground">
          Te respondemos en menos de 24 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={rateLimitedSubmit}
      className="glass-panel rounded-3xl p-7 md:p-10 space-y-5"
      noValidate
    >
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
            Nombre *
          </label>
          <input
            id="cf-nombre"
            type="text"
            name="nombre"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors"
          />
          <ValidationError prefix="Nombre" field="nombre" errors={state.errors} className="mt-1.5 text-xs text-red-400" />
        </div>

        <div>
          <label htmlFor="cf-empresa" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
            Empresa <span className="text-muted-foreground/50 font-normal normal-case">(opcional)</span>
          </label>
          <input
            id="cf-empresa"
            type="text"
            name="empresa"
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-telefono" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
            Teléfono *
          </label>
          <input
            id="cf-telefono"
            type="tel"
            name="telefono"
            required
            autoComplete="tel"
            placeholder="+503 0000-0000"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors"
          />
          <ValidationError prefix="Teléfono" field="telefono" errors={state.errors} className="mt-1.5 text-xs text-red-400" />
        </div>

        <div>
          <label htmlFor="cf-email" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1.5 text-xs text-red-400" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-tipo" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
          Tipo de proyecto *
        </label>
        <select
          id="cf-tipo"
          name="tipo_proyecto"
          required
          defaultValue=""
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors appearance-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.2rem" }}
        >
          <option value="" disabled className="bg-card text-muted-foreground">Selecciona una opción</option>
          {TIPOS_PROYECTO.map((tipo) => (
            <option key={tipo} value={tipo} className="bg-card text-foreground">
              {tipo}
            </option>
          ))}
        </select>
        <ValidationError prefix="Tipo" field="tipo_proyecto" errors={state.errors} className="mt-1.5 text-xs text-red-400" />
      </div>

      <div>
        <label htmlFor="cf-mensaje" className="block text-xs font-bold uppercase tracking-widest text-brand-bright mb-2">
          Mensaje
        </label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          rows={4}
          placeholder="Cuéntanos sobre tu proyecto: ubicación, dimensiones, materiales en mente, fecha tentativa..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-colors resize-none"
        />
        <ValidationError prefix="Mensaje" field="mensaje" errors={state.errors} className="mt-1.5 text-xs text-red-400" />
      </div>

      {submitCount > 0 && state.errors && (
        <ValidationError errors={state.errors} className="text-sm text-red-400" />
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-full bg-gradient-to-b from-brand-bright to-brand-strong py-4 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.7)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {state.submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          "Enviar solicitud"
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground/60">
        Te respondemos en menos de 24 horas hábiles.
      </p>
    </form>
  );
}
