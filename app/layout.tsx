import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { StructuredData } from "@/components/structured-data";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
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
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <CustomCursor />
        <SmoothAnchors />
        {children}
        <MobileStickyBar />
      </body>
    </html>
  );
}
