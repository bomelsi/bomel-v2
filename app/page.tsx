import { Hero } from "@/components/sections/hero";
import { MagneticCta } from "@/components/magnetic-cta";
import { Navbar } from "@/components/navbar";
import { ClientesBanner } from "@/components/sections/clientes";
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
      <main className="flex-1">
        <Hero />
        <MagneticCta />
        <Nosotros />
        <Testimonios />
        <ClientesBanner />
        <Servicios />
        <Ventanas />
        <BlogPreview />
        <FaqHome />
      </main>
      <Footer />
    </>
  );
}
