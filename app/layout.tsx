import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { StructuredData } from "@/components/structured-data";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { ScrollRootReset } from "@/components/scroll-root-reset";
import { SCROLL_ROOT_ID } from "@/lib/scroll-root";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BOMEL — Servicios Integrales | Construcción, Acabados y Ventanería",
  description:
    "Una sola empresa para todo tu proyecto: diseño arquitectónico, obra gris, instalaciones, acabados finos, fachadas ACM y ventanería de aluminio. Lo que se promete, se cumple.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "construcción El Salvador",
    "ventanería de aluminio",
    "fachadas ACM",
    "obra gris",
    "acabados finos",
    "diseño arquitectónico",
    "remodelación",
    "BOMEL",
  ],
  openGraph: {
    title: "BOMEL — Servicios Integrales",
    description:
      "De obra gris a realidad. Construcción, acabados y ventanería con una sola empresa.",
    url: "/",
    siteName: "BOMEL Servicios Integrales",
    locale: "es_SV",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Logo de BOMEL Servicios Integrales",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "BOMEL — Servicios Integrales",
    description:
      "De obra gris a realidad. Construcción, acabados y ventanería con una sola empresa.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
      // El script de abajo añade una clase a <html> antes de hidratar.
      suppressHydrationWarning
    >
      <head>
        {/* Se ejecuta antes del primer pintado: decide si el home abre con la
            entrada (components/intro-splash.tsx) para que la página no se
            alcance a ver detrás ni un instante. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <CustomCursor />
        <SmoothAnchors />
        <ScrollRootReset />
        {/* Contenedor de scroll solo en móvil: mantiene congelada la barra
            del navegador (ver lib/scroll-root.ts). En desktop es
            `display: contents`, así que no altera el layout de antes.
            Los elementos fijos (cursor, barra inferior) viven fuera. */}
        <div id={SCROLL_ROOT_ID}>{children}</div>
        <MobileStickyBar />
      </body>
    </html>
  );
}
