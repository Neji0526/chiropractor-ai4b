/**
 * JSON-LD builders.
 *
 * Rule for everything in this file: only emit a property when the underlying
 * fact is actually configured. Structured data that claims a rating, a price or
 * an award the clinic can't evidence is worse than no structured data at all,
 * which is why `aggregateRating` is deliberately absent.
 */
import type {
  BlogPost,
  Faq,
  Location,
  Practitioner,
  Service,
  SiteSettings,
} from "@/content/types";
import { absoluteUrl } from "./config";
import { dayName } from "./format";

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function clinicSchema(settings: SiteSettings, location: Location) {
  const openingHours = location.hours
    .filter((h) => !h.isClosed && h.openTime && h.closeTime)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[h.dayOfWeek] ?? dayName(h.dayOfWeek)}`,
      opens: h.openTime,
      closes: h.closeTime,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Chiropractic",
    "@id": absoluteUrl("/#clinic"),
    name: settings.clinicName,
    legalName: settings.legalName,
    description: settings.shortDescription,
    url: absoluteUrl("/"),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: [location.addressLine1, location.addressLine2]
        .filter(Boolean)
        .join(", "),
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    ...(openingHours.length > 0 ? { openingHoursSpecification: openingHours } : {}),
    ...(location.mapUrl ? { hasMap: location.mapUrl } : {}),
    ...(settings.social.length > 0
      ? { sameAs: settings.social.map((s) => s.href) }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceSchema(
  service: Service,
  settings: SiteSettings,
  location: Location,
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: service.seoTitle ?? service.title,
    description: service.shortDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    about: {
      "@type": "MedicalTherapy",
      name: service.title,
    },
    provider: {
      "@type": "Chiropractic",
      "@id": absoluteUrl("/#clinic"),
      name: settings.clinicName,
      telephone: settings.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.addressLine1,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.postalCode,
        addressCountry: location.country,
      },
    },
  };
}

export function practitionerSchema(
  practitioner: Practitioner,
  settings: SiteSettings,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: practitioner.name,
    jobTitle: practitioner.title,
    url: absoluteUrl(`/team/${practitioner.slug}`),
    worksFor: {
      "@type": "Chiropractic",
      "@id": absoluteUrl("/#clinic"),
      name: settings.clinicName,
    },
    ...(practitioner.specialties.length > 0
      ? { knowsAbout: practitioner.specialties }
      : {}),
  };
}

export function articleSchema(
  post: BlogPost,
  author: Practitioner | null,
  settings: SiteSettings,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    ...(author ? { author: { "@type": "Person", name: author.name } } : {}),
    publisher: {
      "@type": "Organization",
      name: settings.clinicName,
      url: absoluteUrl("/"),
    },
    ...(post.featuredImage
      ? { image: [absoluteUrl(post.featuredImage.src)] }
      : {}),
  };
}
