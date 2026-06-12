import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICIOS_DATA } from "@/lib/data/servicios";
import { PROYECTOS_DATA } from "@/lib/data/proyectos";
import { sanityClient, postSlugsQuery } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let blogSlugs: { slug: string }[] = [];
  try {
    blogSlugs = await sanityClient.fetch(postSlugsQuery);
  } catch {
    blogSlugs = [];
  }

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...SERVICIOS_DATA.map((s) => ({
      url: `${SITE_URL}/servicios/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...PROYECTOS_DATA.map((p) => ({
      url: `${SITE_URL}/proyectos/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogSlugs.map((s) => ({
      url: `${SITE_URL}/blog/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
