import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import {
  sanityClient,
  urlFor,
  postsQuery,
  postsByCategoryQuery,
  BLOG_CATEGORIES,
  type PostSummary,
} from "@/lib/sanity";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — BOMEL | Consejos de construcción, ventanería y fachadas",
  description:
    "Recursos prácticos, casos de éxito y consejos de expertos en ventanería, fachadas, construcción y acabados de Servicios Integrales BOMEL.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog BOMEL — Expertos en ventanería y construcción",
    description:
      "Aprende de los mejores: guías prácticas y casos de éxito en aluminio, vidrio y fachadas desde El Salvador.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { cat } = await searchParams;

  const posts: PostSummary[] = cat
    ? await sanityClient.fetch(postsByCategoryQuery, { category: cat })
    : await sanityClient.fetch(postsQuery);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="section-kicker justify-center mb-4">Recursos y casos de éxito</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl">
            Blog{" "}
            <span className="text-brand-bright">BOMEL</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Guías prácticas, proyectos realizados y consejos de nuestros especialistas
            en ventanería, fachadas y construcción.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          <Link
            href="/blog"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              !cat
                ? "bg-brand-bright text-[#04211d]"
                : "border border-white/10 text-muted-foreground hover:border-brand-bright/40 hover:text-brand-bright"
            }`}
          >
            Todos
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/blog?cat=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                cat === c
                  ? "bg-brand-bright text-[#04211d]"
                  : "border border-white/10 text-muted-foreground hover:border-brand-bright/40 hover:text-brand-bright"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {posts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-muted-foreground">
              {cat
                ? `No hay artículos en la categoría "${cat}" todavía.`
                : "El blog está en camino. Pronto publicaremos el primer artículo."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function PostCard({ post }: { post: PostSummary }) {
  const imgUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(640).height(400).auto("format").url()
    : null;

  const date = new Date(post.publishedAt).toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="glass-panel glass-panel-hover group flex flex-col overflow-hidden rounded-2xl"
    >
      {imgUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imgUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand-strong/20 px-3 py-0.5 text-xs font-bold text-brand-bright">
            {post.category}
          </span>
          <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
            {date}
          </time>
        </div>
        <h2 className="font-heading font-bold leading-snug text-foreground/90 transition-colors group-hover:text-brand-bright line-clamp-2">
          {post.title}
        </h2>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        <span className="mt-1 text-xs font-bold text-brand-bright">
          Leer artículo →
        </span>
      </div>
    </Link>
  );
}
