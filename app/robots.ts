import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Abierto a todos los crawlers, incluidos los de búsqueda de IA
// (OAI-SearchBot, Claude-SearchBot, PerplexityBot…): la visibilidad en
// buscadores de IA exige no bloquearlos.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
