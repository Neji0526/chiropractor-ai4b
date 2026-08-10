import Link from "next/link";
import type { BlogPost, Condition, Practitioner, Service, Testimonial } from "@/content/types";
import { Avatar } from "@/components/ui/MediaPanel";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";

const CARD_BASE =
  "group flex h-full flex-col rounded-card border border-shell-200 bg-white p-6 shadow-card transition-colors hover:border-brand-200";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={CARD_BASE}>
      <h3 className="text-xl">
        <Link
          href={`/services/${service.slug}`}
          className="transition-colors hover:text-brand-700"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
        {service.shortDescription}
      </p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
        Read about this service
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </p>
    </article>
  );
}

/** Condition tile, rendered inside a `<ul>` in the conditions grid. */
export function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <li>
      <Link
        href={`/conditions/${condition.slug}`}
        className="group flex h-full flex-col rounded-card border border-shell-200 bg-white px-5 py-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="font-medium text-ink-900">{condition.title}</span>
          <Icon
            name="arrow-right"
            size={16}
            className="shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5"
          />
        </span>
        <span className="mt-1.5 text-sm leading-relaxed text-ink-600">
          {condition.shortDescription}
        </span>
      </Link>
    </li>
  );
}

export function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/team/${practitioner.slug}`} className="block">
        <Avatar image={practitioner.photo} name={practitioner.name} />
      </Link>
      <h3 className="mt-4 text-lg">
        <Link
          href={`/team/${practitioner.slug}`}
          className="transition-colors hover:text-brand-700"
        >
          {practitioner.name}
        </Link>
      </h3>
      <p className="text-sm font-medium text-brand-700">{practitioner.title}</p>
      {practitioner.specialties.length > 0 ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {practitioner.specialties.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card border border-shell-200 bg-white p-6 shadow-card",
        className,
      )}
    >
      <Icon name="quote" size={22} className="text-brand-200" />

      {testimonial.rating ? (
        <div className="mt-3 flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              name="star"
              size={15}
              className={index < testimonial.rating! ? "text-sage-500" : "text-shell-300"}
            />
          ))}
          <span className="sr-only">{testimonial.rating} out of 5</span>
        </div>
      ) : null}

      <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
        <p>{testimonial.quote}</p>
      </blockquote>

      <figcaption className="mt-5 border-t border-shell-200 pt-4 text-sm">
        <span className="font-medium text-ink-900">{testimonial.displayName}</span>
        {testimonial.context ? (
          <span className="block text-ink-500">{testimonial.context}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className={CARD_BASE}>
      <div className="flex items-center gap-2 text-xs text-ink-500">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="mt-3 text-lg">
        <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-700">
          {post.title}
        </Link>
      </h3>

      <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
        {post.excerpt}
      </p>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
        Read article
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </p>
    </article>
  );
}
