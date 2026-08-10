/**
 * The site's single content boundary.
 *
 * Every page and component reads content through these functions and never
 * imports from `src/content/*` directly. When a CMS is added later, the bodies
 * of these functions become queries and nothing else in the app has to change —
 * which is why they are all async even though they resolve synchronously today.
 */
import { blogPosts } from "@/content/blog";
import { conditions } from "@/content/conditions";
import { faqs } from "@/content/faqs";
import { locations } from "@/content/locations";
import { practitioners } from "@/content/practitioners";
import { siteSettings } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import type {
  BlogPost,
  Condition,
  Faq,
  FaqCategory,
  Location,
  Practitioner,
  PublishStatus,
  Service,
  SiteSettings,
  Testimonial,
} from "@/content/types";
import { services } from "@/content/services";

const isPublished = <T extends { status: PublishStatus }>(item: T) =>
  item.status === "published";

const bySortOrder = <T extends { sortOrder: number }>(a: T, b: T) =>
  a.sortOrder - b.sortOrder;

/* ---------------------------------------------------------------- settings */

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

/* --------------------------------------------------------------- services */

export async function getServices(): Promise<Service[]> {
  return services.filter(isPublished).sort(bySortOrder);
}

export async function getService(slug: string): Promise<Service | null> {
  return services.find((s) => s.slug === slug && isPublished(s)) ?? null;
}

export async function getServiceTitles(): Promise<{ slug: string; title: string }[]> {
  const published = await getServices();
  return published.map(({ slug, title }) => ({ slug, title }));
}

/* ------------------------------------------------------------- conditions */

export async function getConditions(): Promise<Condition[]> {
  return conditions.filter(isPublished).sort(bySortOrder);
}

export async function getCondition(slug: string): Promise<Condition | null> {
  return conditions.find((c) => c.slug === slug && isPublished(c)) ?? null;
}

/* ---------------------------------------------------------- practitioners */

export async function getPractitioners(): Promise<Practitioner[]> {
  return practitioners.filter(isPublished).sort(bySortOrder);
}

export async function getPractitioner(slug: string): Promise<Practitioner | null> {
  return practitioners.find((p) => p.slug === slug && isPublished(p)) ?? null;
}

/* ----------------------------------------------------------- testimonials */

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials.filter(isPublished);
}

/** Featured reviews for the homepage. Falls back to the newest published ones. */
export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const published = await getTestimonials();
  const featured = published.filter((t) => t.featured);
  return (featured.length > 0 ? featured : published).slice(0, limit);
}

/* -------------------------------------------------------------------- faqs */

export async function getFaqs(): Promise<Faq[]> {
  return faqs.filter(isPublished).sort(bySortOrder);
}

/** FAQs grouped by category, in the order categories first appear. */
export async function getFaqsByCategory(): Promise<
  { category: FaqCategory; items: Faq[] }[]
> {
  const published = await getFaqs();
  const groups = new Map<FaqCategory, Faq[]>();
  for (const faq of published) {
    const existing = groups.get(faq.category);
    if (existing) existing.push(faq);
    else groups.set(faq.category, [faq]);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}

export async function getTopFaqs(limit = 6): Promise<Faq[]> {
  const published = await getFaqs();
  return published.slice(0, limit);
}

/* --------------------------------------------------------------- blog posts */

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
    .filter(isPublished)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((p) => p.slug === slug && isPublished(p)) ?? null;
}

export async function getRelatedBlogPosts(slug: string, limit = 2): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);

  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared);

  return scored.slice(0, limit).map(({ post }) => post);
}

/* ---------------------------------------------------------------- locations */

export async function getLocations(): Promise<Location[]> {
  return locations;
}

/** The clinic's main location. Used for the footer, contact page and schema. */
export async function getPrimaryLocation(): Promise<Location> {
  const all = await getLocations();
  if (all.length === 0) {
    throw new Error(
      "No locations configured. Add at least one entry to src/content/locations.ts.",
    );
  }
  return all[0];
}
