import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import {
  sanityClient,
  urlFor,
  postBySlugQuery,
  postSlugsQuery,
  latestPostsQuery,
  type PostFull,
  type PostSummary,
} from "@/lib/sanity";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(postSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: PostFull | null = await sanityClient.fetch(postBySlugQuery, { slug });
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const imgUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).auto("format").url()
    : undefined;

  return {
    title: `${title} — Blog BOMEL`,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: `${title} — Blog BOMEL`,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.publishedAt,
      ...(imgUrl && {
        images: [{ url: imgUrl, width: 1200, height: 630, alt: post.mainImage?.alt ?? title }],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, related]: [PostFull | null, PostSummary[]] = await Promise.all([
    sanityClient.fetch(postBySlugQuery, { slug }),
    sanityClient.fetch(latestPostsQuery),
  ]);

  if (!post) notFound();

  const imgUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).auto("format").url()
    : null;

  const date = new Date(post.publishedAt).toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const relatedPosts = related.filter((p) => p.slug.current !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    ...(imgUrl && { image: imgUrl }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  return (
    <>
      <Navbar />
      <main className="pb-24 pt-28">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-3xl px-6 mb-6">
          <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-brand-bright transition-colors">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-brand-bright transition-colors">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground/60 line-clamp-1">{post.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <article className="mx-auto max-w-3xl px-6">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-brand-strong/20 px-3 py-1 text-xs font-bold text-brand-bright">
                {post.category}
              </span>
              <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
                {date}
              </time>
            </div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight leading-[1.15] md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          {imgUrl && (
            <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl md:h-96">
              <Image
                src={imgUrl}
                alt={post.mainImage?.alt ?? post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Body */}
          <div className="prose-bomel">
            <PortableText
              value={post.body as Parameters<typeof PortableText>[0]["value"]}
              components={{
                types: {
                  image: ({ value }) => {
                    const src = urlFor(value).width(800).auto("format").url();
                    return (
                      <figure className="my-8">
                        <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                          <Image
                            src={src}
                            alt={value.alt ?? ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                          />
                        </div>
                        {value.caption && (
                          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },
                },
              }}
            />
          </div>

          {/* CTA bajo artículo */}
          <div className="glass-panel mt-12 rounded-2xl p-8 text-center">
            <p className="font-heading text-xl font-bold mb-2">
              ¿Listo para tu proyecto?
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              Cuéntanos qué necesitas. Te respondemos con tu cotización en menos de 24 horas hábiles.
            </p>
            <Link
              href="/contacto"
              className="inline-flex rounded-full bg-gradient-to-b from-brand-bright to-brand-strong px-6 py-2.5 text-sm font-bold text-[#04211d] shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)] hover:-translate-y-0.5 transition-transform"
            >
              Agenda una visita técnica →
            </Link>
          </div>
        </article>

        {/* Artículos relacionados */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 mt-20">
            <h2 className="font-heading text-2xl font-bold mb-8">
              Más del blog
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => {
                const thumb = p.mainImage?.asset
                  ? urlFor(p.mainImage).width(480).height(300).auto("format").url()
                  : null;
                return (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug.current}`}
                    className="glass-panel glass-panel-hover group flex flex-col overflow-hidden rounded-2xl"
                  >
                    {thumb && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={thumb}
                          alt={p.mainImage?.alt ?? p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 p-4">
                      <span className="text-xs font-bold text-brand-bright">{p.category}</span>
                      <p className="font-heading text-sm font-bold leading-snug text-foreground/90 group-hover:text-brand-bright transition-colors line-clamp-2">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Footer />
    </>
  );
}
