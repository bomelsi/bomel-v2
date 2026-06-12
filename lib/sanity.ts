import { createClient, groq } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = "hk5cl9yf";
const dataset = "production";
const apiVersion = "2024-06-12";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// --- Types ---

export interface PostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  mainImage: { asset: { _ref: string }; alt: string; hotspot?: object };
  excerpt: string;
}

export interface PostFull extends PostSummary {
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}

// --- Queries ---

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    mainImage { asset, alt, hotspot },
    excerpt
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    mainImage { asset, alt, hotspot },
    excerpt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    mainImage { asset, alt, hotspot },
    excerpt,
    body,
    seoTitle,
    seoDescription
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    mainImage { asset, alt, hotspot },
    excerpt
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;

export const BLOG_CATEGORIES = [
  "Ventanería",
  "Construcción",
  "Fachadas",
  "Acabados",
  "Consejos",
  "Casos de éxito",
] as const;
