import { Hero } from "@/components/sections/hero";
import { MagneticCta } from "@/components/magnetic-cta";
import { Navbar } from "@/components/navbar";
import { ClientesBanner } from "@/components/sections/clientes";
import { Cotizador } from "@/components/cotizador";
import { Nosotros } from "@/components/sections/nosotros";
import { Testimonios } from "@/components/sections/testimonios";
import { Servicios } from "@/components/sections/servicios";
import { Ventanas } from "@/components/sections/ventanas";
import { BlogPreview } from "@/components/sections/blog-preview";
import { FaqHome } from "@/components/sections/faq-home";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Orden: primero qué hacemos (servicios y línea de ventanería) y cómo
          pedir precio, porque es lo que viene a buscar quien entra; después
          quiénes somos y las pruebas (obras, clientes, testimonios). */}
      <main className="flex-1">
        <Hero />
        <Servicios />
        <Ventanas />
        <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32">
          <Cotizador />
        </section>
        <MagneticCta />
        <Nosotros />
        <ClientesBanner />
        <Testimonios />
        <BlogPreview />
        <FaqHome />
      </main>
      <Footer />
    </>
  );
}
