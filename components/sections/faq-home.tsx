import React from "react";
import { Reveal } from "@/components/reveal";
import { WHATSAPP_URL } from "@/lib/site";

const FAQS = [
  {
    pregunta: "¿Atienden proyectos pequeños como cambiar una puerta o ventana?",
    respuesta:
      "Sí. Desde una sola ventana hasta un edificio completo — BOMEL atiende todos los tamaños de proyecto. Si tu necesidad es puntual, te cotizamos igual de rápido y con el mismo nivel de seriedad que una obra mayor.",
  },
  {
    pregunta: "¿Trabajan solo la ventanería si ya tengo constructor?",
    respuesta:
      "Por supuesto. Trabajamos como especialistas en ventanería, puertas o fachadas dentro de proyectos donde ya hay un constructor principal. Coordinamos planos, accesos y cronograma directamente con quien sea necesario.",
  },
  {
    pregunta: "¿Cuánto tarda una cotización?",
    respuesta:
      "En menos de 24 horas hábiles. Para proyectos que requieren visita técnica, agendamos la visita en el mismo día y enviamos el presupuesto formal al día siguiente. Sin demoras ni excusas.",
  },
  {
    pregunta: "¿Dan garantía por escrito?",
    respuesta:
      "Sí. Cada proyecto que entregamos incluye una garantía documentada. Los plazos varían según el tipo de trabajo, pero siempre van firmados en el contrato antes de iniciar. No hay letra pequeña.",
  },
  {
    pregunta: "¿Trabajan con empresas y licitaciones?",
    respuesta:
      "Sí. Hemos ejecutado obras para instituciones del sector público y empresas privadas a través de procesos de cotización y licitación. Contamos con la documentación legal y técnica requerida.",
  },
  {
    pregunta: "¿En qué zonas de El Salvador trabajan?",
    respuesta:
      "Atendemos todo el país. Hemos ejecutado obras en el Gran San Salvador, Santa Ana, Suchitoto y otras zonas. Los costos de traslado y logística se incluyen en la cotización de forma transparente.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.pregunta,
    acceptedAnswer: { "@type": "Answer", text: faq.respuesta },
  })),
};

export function FaqHome() {
  return (
    <section id="faq" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-brand-strong/15 blur-[120px]"
      />

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Columna izquierda — header + CTA */}
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="section-kicker mb-5">FAQ</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Preguntas que nos hacen{" "}
              <span className="text-brand-bright">antes de cotizar.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-10">
              Si tu duda no está aquí, escríbenos por WhatsApp. Respondemos en minutos durante el horario de atención.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-6 py-3 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Hacer una pregunta →
            </a>
          </div>
        </Reveal>

        {/* Columna derecha — acordeón */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.pregunta} delay={i * 0.07}>
              <details className="glass-panel group rounded-2xl px-6 py-5 open:pb-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading font-bold text-sm md:text-base list-none">
                  {faq.pregunta}
                  <span className="shrink-0 text-brand-bright transition-transform duration-300 group-open:rotate-45">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.respuesta}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
