import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor, latestPostsQuery, type PostSummary } from "@/lib/sanity";
import { Reveal } from "@/components/reveal";

export async function BlogPreview() {
  let posts: PostSummary[] = [];
  try {
    posts = await sanityClient.fetch(latestPostsQuery);
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-brand-strong/10 blur-[120px]"
      />

      <Reveal className="mb-12 text-center">
        <p className="section-kicker justify-center mb-4">Desde el blog</p>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl mx-auto max-w-2xl mb-6">
          Construir bien empieza{" "}
          <span className="text-brand-bright">por saber más.</span>
        </h2>
        <Link
          href="/blog"
          className="inline-block rounded-full border border-brand/40 px-5 py-2 text-sm font-semibold text-brand-bright transition-colors hover:bg-brand-strong/15"
        >
          Ver todos los artículos →
        </Link>
      </Reveal>

      <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imgUrl = post.mainImage?.asset
            ? urlFor(post.mainImage).width(640).height(400).auto("format").url()
            : null;
          const date = new Date(post.publishedAt).toLocaleDateString("es-SV", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="glass-panel glass-panel-hover group flex flex-col overflow-hidden rounded-2xl"
            >
              {imgUrl && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={post.mainImage?.alt ?? post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-strong/20 px-2.5 py-0.5 text-[11px] font-bold text-brand-bright">
                    {post.category}
                  </span>
                  <time className="text-[11px] text-muted-foreground" dateTime={post.publishedAt}>
                    {date}
                  </time>
                </div>
                <h3 className="font-heading text-sm font-bold leading-snug text-foreground/90 transition-colors group-hover:text-brand-bright line-clamp-2">
                  {post.title}
                </h3>
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </Reveal>
    </section>
  );
}
