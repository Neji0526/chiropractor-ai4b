import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { BlogCard } from "@/components/cards";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Avatar, MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import {
  getBlogPost,
  getBlogPosts,
  getPractitioner,
  getRelatedBlogPosts,
  getSiteSettings,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage?.src ?? null,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const [settings, author, related] = await Promise.all([
    getSiteSettings(),
    getPractitioner(post.authorSlug),
    getRelatedBlogPosts(post.slug, 3),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-white pb-16">
        <div className="container-page">
          <header className="mx-auto max-w-3xl pt-12 lg:pt-16">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 className="mt-4 text-[2rem] leading-[1.15] sm:text-4xl">{post.title}</h1>

            <p className="mt-4 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-shell-200 pt-5 text-sm text-ink-500">
              {author ? (
                <span className="flex items-center gap-2.5">
                  <Avatar
                    image={author.photo}
                    name={author.name}
                    ratio="aspect-square"
                    initials="sm"
                    className="size-9 rounded-full"
                    sizes="36px"
                  />
                  <span>
                    <Link
                      href={`/team/${author.slug}`}
                      className="font-medium text-ink-800 hover:text-brand-700"
                    >
                      {author.name}
                    </Link>
                    <span className="block text-xs">{author.title}</span>
                  </span>
                </span>
              ) : null}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </header>

          {post.featuredImage ? (
            <div className="mx-auto mt-10 max-w-4xl">
              <MediaPanel
                image={post.featuredImage}
                ratio="aspect-[16/9]"
                priority
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-3xl">
            <ArticleBody blocks={post.body} />

            <aside className="mt-12 flex items-start gap-3 rounded-card border border-shell-300 bg-shell-100 p-5 text-sm leading-relaxed text-ink-600">
              <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <p>
                This article is general information, not advice for your specific
                situation. For that, book an assessment — or if your symptoms are severe
                or getting rapidly worse, seek urgent medical care.
              </p>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-shell-200 bg-shell-50 py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading eyebrow="Keep reading" title="More from the clinic" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        settings={settings}
        title="Want this looked at properly?"
        description="An assessment tells you what's actually going on in your case. Send a request or call the clinic."
      />

      <JsonLd data={articleSchema(post, author, settings)} />
    </>
  );
}
