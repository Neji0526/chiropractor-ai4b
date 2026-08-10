import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/cards";
import { Icon } from "@/components/ui/Icon";
import { getBlogPosts, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resources and Articles",
  description:
    "Practical articles from our Riverton chiropractic clinic on back pain, neck pain, desk setup, training injuries and what to expect from care.",
  path: "/blog",
});

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getBlogPosts()]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/blog" },
        ]}
      />

      <PageHeader
        eyebrow="Resources"
        title="Articles from the clinic"
        description="Short, practical pieces written by the team. General information rather than advice for your particular situation — for that, book in and we'll assess you properly."
      />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-ink-600">
              There are no published articles yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          <p className="mt-10 flex items-start gap-2 rounded-card border border-shell-300 bg-shell-100 p-5 text-sm leading-relaxed text-ink-600">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <span>
              Anything you read here is general information. If you have severe or
              worsening symptoms, numbness, weakness, or loss of bladder or bowel
              control, seek urgent medical care rather than waiting for an appointment.
            </span>
          </p>
        </div>
      </section>

      <CTASection settings={settings} />
    </>
  );
}
