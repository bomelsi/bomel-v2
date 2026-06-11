"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <nav
        className={cn(
          "mx-4 mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 md:px-6 lg:mx-auto transition-all duration-500",
          scrolled
            ? "glass-panel"
            : "bg-transparent border border-transparent"
        )}
        aria-label="Navegación principal"
      >
        <a href="#" className="flex items-center gap-3" aria-label="BOMEL — inicio">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading text-lg font-extrabold tracking-tight">
            BOMEL
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-5 py-2.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Cotizar ahora
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-full bg-foreground transition-transform duration-300",
                  menuOpen && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-full bg-foreground transition-transform duration-300",
                  menuOpen && "-translate-y-[5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-panel mx-4 mt-2 rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/5 hover:text-brand-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-gradient-to-b from-brand-bright to-brand-strong px-4 py-3 text-center font-bold text-[#04211d]"
                >
                  Cotizar ahora
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
