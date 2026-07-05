import React from "react";
import {
  AppWindow,
  DoorClosed,
  DoorOpen,
  MoveHorizontal,
  PanelTop,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";

const PRODUCTOS: CardItem[] = [
  {
    id: "ventana-corrediza-espanola",
    title: "Ventana Corrediza Española",
    description:
      "El clásico que nunca falla, elevado con aluminio de alta resistencia. Deslizamiento suave y silencioso durante años.",
    imgSrc: "/ventana-corrediza-espanola.jpg",
    icon: <MoveHorizontal className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "ventana-fija",
    title: "Ventana Fija",
    description:
      "Luz natural sin límites. Paneles de gran formato con sellado hermético, para vistas que merecen un marco a su altura.",
    imgSrc: "/images/productos/pagina3_img5.jpeg",
    icon: <AppWindow className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "ventana-proyectable",
    title: "Ventana Proyectable",
    description:
      "Ventilación controlada incluso bajo la lluvia. Apertura hacia el exterior con herrajes de precisión que sellan al cerrar.",
    imgSrc: "/images/productos/pagina3_img2.jpeg",
    icon: <PanelTop className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "puerta-corrediza",
    title: "Puerta Corrediza",
    description:
      "Une interiores y exteriores sin esfuerzo. Máxima entrada de luz ocupando el mínimo espacio.",
    imgSrc: "/puerta-corrediza.jpg",
    icon: <DoorOpen className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "puerta-embisagrada",
    title: "Puerta Embisagrada",
    description:
      "Robustez clásica con cierre de precisión. Seguridad, elegancia y un sellado que mantiene el clima donde debe estar.",
    imgSrc: "/images/productos/pagina6_img3.jpeg",
    icon: <DoorClosed className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "puerta-automatica",
    title: "Puerta con Sistema Automático",
    description:
      "Apertura inteligente para espacios de alto tráfico. La tecnología que recibe a tus visitantes antes que tu recepcionista.",
    imgSrc: "/puerta-automatica.jpg",
    icon: <Zap className="h-6 w-6" aria-hidden="true" />,
  },
];

export function Ventanas() {
  return (
    <section id="ventanas" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-brand-strong/15 blur-[130px]"
      />

      <Reveal className="text-center">
        <p className="section-kicker justify-center mb-5">Ventanería &amp; Fachadas</p>
        <h2 className="font-heading mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Aluminio y vidrio que{" "}
          <span className="text-brand-bright">transforman espacios.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          Cada pieza se mide, fabrica e instala con sellado de precisión por
          especialistas. Explora la línea completa: toca o pasa el cursor sobre
          cada tarjeta para verla en grande.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <ExpandingCards items={PRODUCTOS} defaultActiveIndex={0} />
      </Reveal>
    </section>
  );
}
