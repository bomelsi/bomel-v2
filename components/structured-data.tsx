import React from "react";
import { PHONE_E164, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/site";

/**
 * JSON-LD (schema.org) para SEO y visibilidad en buscadores de IA:
 * identifica a BOMEL como contratista general en El Salvador, con
 * teléfono, redes y catálogo de servicios. Solo datos verificados.
 */
const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#empresa`,
  name: SITE_NAME,
  alternateName: "BOMEL",
  slogan: "Lo que se promete, se cumple.",
  description:
    "Una sola empresa para todo tu proyecto: diseño arquitectónico, obra civil y obra gris, instalaciones eléctricas e hidráulicas, acabados finos, fachadas ACM y ventanería de aluminio y vidrio en El Salvador.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: PHONE_E164,
  areaServed: {
    "@type": "Country",
    name: "El Salvador",
  },
  sameAs: Object.values(SOCIALS),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de construcción BOMEL",
    itemListElement: [
      "Obra civil, urbanización y obra gris",
      "Diseño arquitectónico",
      "Instalaciones eléctricas, hidráulicas y pluviales",
      "Acabados finos y revestimientos",
      "Ventanería y puertas de aluminio y vidrio",
      "Fachadas ACM",
    ].map((servicio) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: servicio },
    })),
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS) }}
    />
  );
}
