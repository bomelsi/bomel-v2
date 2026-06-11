import { CinematicHero } from "@/components/ui/cinematic-hero";
import { MagneticCta } from "@/components/magnetic-cta";
import { Navbar } from "@/components/navbar";
import { Nosotros } from "@/components/sections/nosotros";
import { Servicios } from "@/components/sections/servicios";
import { Ventanas } from "@/components/sections/ventanas";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CinematicHero />
        <MagneticCta />
        <Nosotros />
        <Servicios />
        <Ventanas />
      </main>
      <Footer />
    </>
  );
}
