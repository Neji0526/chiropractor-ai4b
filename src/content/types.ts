/**
 * Content types for the public website.
 *
 * These shapes mirror the CMS tables the site is intended to read from later
 * (services, conditions, practitioners, testimonials, faqs, blog_posts,
 * locations, business_hours, site_settings). Today every value is served from
 * local files in `src/content` through `src/lib/content.ts`, so swapping in a
 * real data source later means rewriting only that one module.
 */

export type PublishStatus = "draft" | "published";

/** A `/public`-relative image path, or `null` while no real photo exists yet. */
export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null;

export interface Service {
  slug: string;
  title: string;
  /** One sentence, used on cards and in meta descriptions. */
  shortDescription: string;
  /** Longer explanation, rendered as paragraphs. */
  body: string[];
  benefits: string[];
  /** Plain-language description of a first visit for this service. */
  goodFitFor: string[];
  featuredImage: ImageRef;
  /** Slugs from `conditions`, used for cross-linking. */
  relatedConditions: string[];
  sortOrder: number;
  status: PublishStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Condition {
  slug: string;
  title: string;
  shortDescription: string;
  body: string[];
  /** Common experiences patients describe. Not a diagnostic checklist. */
  commonSigns: string[];
  featuredImage: ImageRef;
  /** Slugs from `services`. */
  relatedServices: string[];
  sortOrder: number;
  status: PublishStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Practitioner {
  slug: string;
  name: string;
  /** Role line, e.g. "Chiropractor". */
  title: string;
  credentials: string[];
  education: string[];
  specialties: string[];
  bio: string[];
  photo: ImageRef;
  sortOrder: number;
  status: PublishStatus;
}

export interface Testimonial {
  id: string;
  displayName: string;
  quote: string;
  /** 1–5, or null when the review has no rating attached. */
  rating: number | null;
  /** Optional context line, e.g. "Neck pain care". */
  context?: string;
  featured: boolean;
  status: PublishStatus;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  sortOrder: number;
  status: PublishStatus;
}

export type FaqCategory =
  | "Appointments"
  | "Your first visit"
  | "Treatment"
  | "Payment & insurance";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Simple block content: paragraphs, headings and lists. */
  body: ContentBlock[];
  featuredImage: ImageRef;
  authorSlug: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  status: PublishStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface Location {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  /** Link out to a maps listing. Leave empty to hide the "Get directions" link. */
  mapUrl: string;
  /** Optional embed URL for an inline map. Leave empty to render a static panel. */
  mapEmbedUrl: string;
  parkingNote?: string;
  hours: BusinessHours[];
}

export interface BusinessHours {
  /** 0 = Sunday … 6 = Saturday, matching PostgreSQL's `dow`. */
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

export interface SiteSettings {
  clinicName: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  phone: string;
  /** Digits only, for `tel:` links. */
  phoneHref: string;
  email: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  /** Short, factual reassurances shown in the trust bar. Keep these verifiable. */
  trustPoints: TrustPoint[];
  whatToExpect: ExpectationStep[];
  social: SocialLink[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    /** `/public`-relative Open Graph image, or null to fall back to the generated one. */
    ogImage: string | null;
  };
  /** Shown near forms. Edit to match the clinic's privacy policy. */
  formConsentText: string;
}

export interface TrustPoint {
  label: string;
  description: string;
  icon: TrustIcon;
}

export type TrustIcon = "clock" | "map" | "phone" | "shield" | "heart" | "users";

export interface ExpectationStep {
  step: number;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "google" | "youtube" | "linkedin";
  label: string;
  href: string;
}
