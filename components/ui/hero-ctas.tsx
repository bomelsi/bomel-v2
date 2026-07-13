import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/site";

export interface HeroCtasProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Botones CTA del hero ("Recibe tu cotización en 24h" / "Agenda una visita
 * técnica"), extraídos a un componente aparte al fusionar el hero de texto
 * con la sección cinemática de la casa (ya no caben en esa primera pantalla).
 * Pendiente reubicar en el sitio — ver componente Hero.
 */
export function HeroCtas({ className, ...props }: HeroCtasProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 sm:flex-row",
        className
      )}
      {...props}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-7 py-3.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.7)]"
      >
        Recibe tu cotización en 24h →
      </a>
      <Link
        href="/contacto"
        className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-strong/10 px-7 py-3.5 text-sm font-bold text-brand-bright transition-all hover:-translate-y-0.5 hover:bg-brand-strong/20 hover:border-brand/60"
      >
        Agenda una visita técnica
      </Link>
    </div>
  );
}
