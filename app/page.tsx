import { CinematicHero } from "@/components/ui/cinematic-hero";
import { MagneticCta } from "@/components/magnetic-cta";
import { Navbar } from "@/components/navbar";
import { ClientesBanner } from "@/components/sections/clientes";
import { Nosotros } from "@/components/sections/nosotros";
import { Testimonios } from "@/components/sections/testimonios";
import { Servicios } from "@/components/sections/servicios";
import { Ventanas } from "@/components/sections/ventanas";
import { FaqHome } from "@/components/sections/faq-home";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CinematicHero />
        <ClientesBanner />
        <MagneticCta />
        <Nosotros />
        <Testimonios />
        <Servicios />
        <Ventanas />
        <FaqHome />
      </main>
      <Footer />
    </>
  );
}
