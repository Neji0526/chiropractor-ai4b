import type { Metadata } from "next";
import { siteSettings } from "@/content/site";
import { absoluteUrl } from "./config";

interface PageMetaInput {
  title: string;
  description: string;
  /** Root-relative path, used for the canonical URL and og:url. */
  path: string;
  /** `/public`-relative image, or null to use the site default. */
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Builds page metadata with a canonical URL and Open Graph tags.
 * `title.template` in the root layout appends the clinic name, so titles passed
 * here should not repeat it.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = null,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? siteSettings.seo.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings.clinicName,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      ...(ogImage ? { images: [{ url: absoluteUrl(ogImage) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [absoluteUrl(ogImage)] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Trim a longer body of copy down to a usable meta description. */
export function truncateForMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
