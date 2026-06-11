import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
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
  title: "BOMEL — Servicios Integrales | Construcción, Acabados y Ventanería",
  description:
    "Una sola empresa para todo tu proyecto: diseño arquitectónico, obra gris, instalaciones, acabados finos, fachadas ACM y ventanería de aluminio. Lo que se promete, se cumple.",
  openGraph: {
    title: "BOMEL — Servicios Integrales",
    description:
      "De obra gris a realidad. Construcción, acabados y ventanería con una sola empresa.",
    locale: "es_SV",
    type: "website",
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
