import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";
import {
  getBlogPosts,
  getConditions,
  getPractitioners,
  getServices,
} from "@/lib/content";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/request-appointment", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/conditions", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/team", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/testimonials", priority: 0.5 },
  { path: "/blog", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
];

/** Only published content reaches the sitemap — drafts are excluded by the content layer. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, conditions, practitioners, posts] = await Promise.all([
    getServices(),
    getConditions(),
    getPractitioners(),
    getBlogPosts(),
  ]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...conditions.map((condition) => ({
      url: absoluteUrl(`/conditions/${condition.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...practitioners.map((practitioner) => ({
      url: absoluteUrl(`/team/${practitioner.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
