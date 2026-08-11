import Link from "next/link";
import Image from "next/image";
import type {
  BlogPost,
  Condition,
  Practitioner,
  Service,
  ServiceIcon,
  Testimonial,
} from "@/content/types";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { cn } from "@/lib/cn";
import { formatDate, initials } from "@/lib/format";

const CARD_BASE =
  "group flex h-full flex-col rounded-card border border-shell-200 bg-white p-6 transition-colors hover:border-brand-300";

const SERVICE_ICONS: Record<ServiceIcon, IconName> = {
  spine: "spine",
  back: "back",
  neck: "neck",
  activity: "activity",
  posture: "posture",
  headache: "headache",
  heart: "heart",
};

/** "Learn more →" style link, shown at the foot of a card. */
function CardLink({ label }: { label: string }) {
  return (
    <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
      {label}
      <Icon
        name="arrow-right"
        size={15}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </p>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={CARD_BASE}>
      <div className="flex gap-4">
        <span aria-hidden className="icon-tile size-11 shrink-0">
          <Icon name={SERVICE_ICONS[service.icon]} size={22} />
        </span>

        <div>
          <h3 className="font-sans text-base leading-snug font-semibold">
            <Link
              href={`/services/${service.slug}`}
              className="transition-colors hover:text-brand-700"
            >
              {service.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            {service.shortDescription}
          </p>
          <CardLink label="Learn more" />
        </div>
      </div>
    </article>
  );
}

/**
 * Service card with photography, for the services index page.
 *
 * The homepage uses the icon-tile card above, per the approved design; this
 * fuller variant is for the listing page, where photos help people recognise the
 * service they came for.
 */
export function ServicePhotoCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-shell-200 bg-white transition-colors hover:border-brand-300">
      <MediaPanel
        image={service.featuredImage}
        ratio="aspect-[16/10]"
        rounded="rounded-none"
        bordered={false}
        placeholderLabel={service.title}
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span aria-hidden className="icon-tile size-9 shrink-0">
            <Icon name={SERVICE_ICONS[service.icon]} size={18} />
          </span>
          <h3 className="font-sans text-base leading-snug font-semibold">
            <Link
              href={`/services/${service.slug}`}
              className="transition-colors hover:text-brand-700"
            >
              {service.title}
            </Link>
          </h3>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
          {service.shortDescription}
        </p>
        <CardLink label="Learn more" />
      </div>
    </article>
  );
}

/** Condition card with photography, for the conditions index page. */
export function ConditionPhotoCard({ condition }: { condition: Condition }) {
  return (
    <li className="group flex h-full flex-col overflow-hidden rounded-card border border-shell-200 bg-white transition-colors hover:border-brand-300">
      <MediaPanel
        image={condition.featuredImage}
        ratio="aspect-[16/10]"
        rounded="rounded-none"
        bordered={false}
        placeholderLabel={condition.title}
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-base leading-snug font-semibold">
          <Link
            href={`/conditions/${condition.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {condition.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
          {condition.shortDescription}
        </p>
        <CardLink label="Read more" />
      </div>
    </li>
  );
}

/** Condition chip, rendered inside a `<ul>`. */
export function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <li>
      <Link
        href={`/conditions/${condition.slug}`}
        className="group flex items-center gap-2.5 rounded-lg border border-shell-200 bg-white px-4 py-3 transition-colors hover:border-brand-300"
      >
        <Icon name="check" size={15} className="shrink-0 text-accent-600" />
        <span className="text-sm font-medium text-ink-800">{condition.title}</span>
        <Icon
          name="arrow-right"
          size={14}
          className="ml-auto shrink-0 text-brand-400 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </li>
  );
}

/** Circular practitioner portrait, falling back to initials on navy. */
function PractitionerAvatar({ practitioner }: { practitioner: Practitioner }) {
  if (practitioner.photo) {
    return (
      <span className="relative block size-20 overflow-hidden rounded-full bg-shell-200">
        <Image
          src={practitioner.photo.src}
          alt={practitioner.photo.alt}
          fill
          sizes="80px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span className="flex size-20 items-center justify-center rounded-full bg-brand-800">
      <span aria-hidden className="font-serif text-xl font-semibold text-white">
        {initials(practitioner.name)}
      </span>
    </span>
  );
}

export function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-shell-200 bg-shell-100 p-6">
      <div className="flex justify-center">
        <Link href={`/team/${practitioner.slug}`} aria-hidden tabIndex={-1}>
          <PractitionerAvatar practitioner={practitioner} />
        </Link>
      </div>

      <h3 className="mt-6 font-sans text-base font-semibold">
        <Link
          href={`/team/${practitioner.slug}`}
          className="transition-colors hover:text-brand-700"
        >
          {practitioner.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-600">{practitioner.title}</p>

      {practitioner.specialties.length > 0 ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
          {practitioner.specialties.join(", ")}
        </p>
      ) : null}

      <CardLink label="View Profile" />
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
        "flex h-full flex-col rounded-card border border-shell-200 bg-white p-6",
        className,
      )}
    >
      {testimonial.rating ? (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              name="star"
              size={16}
              className={
                index < testimonial.rating! ? "text-gold-500" : "text-shell-300"
              }
            />
          ))}
          <span className="sr-only">{testimonial.rating} out of 5</span>
        </div>
      ) : (
        <Icon name="quote" size={20} className="text-brand-200" />
      )}

      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-ink-900">{testimonial.displayName}</span>
        {testimonial.context ? (
          <span className="block text-ink-500">{testimonial.context}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-shell-200 bg-white transition-colors hover:border-brand-300">
      <MediaPanel
        image={post.featuredImage}
        ratio="aspect-[16/9]"
        rounded="rounded-none"
        bordered={false}
        placeholderLabel="Article image"
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-ink-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3 className="mt-3 font-sans text-base font-semibold">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>

        <CardLink label="Read More" />
      </div>
    </article>
  );
}

/**
 * Wide resource card: image on the left, copy on the right. Used in the homepage
 * resources row, where three cards sit across the full width.
 */
export function BlogCardWide({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full overflow-hidden rounded-card border border-shell-200 bg-white transition-colors hover:border-brand-300">
      <div className="w-[40%] shrink-0">
        <MediaPanel
          image={post.featuredImage}
          ratio="h-full min-h-32"
          rounded="rounded-none"
          bordered={false}
          placeholderLabel="Article image"
          sizes="(min-width: 1024px) 15vw, 40vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-[0.9375rem] leading-snug font-semibold">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {post.title}
          </Link>
        </h3>
        {/* Clamped to two lines: it keeps the card short, which in turn keeps the
            image slot close to square so photos crop sensibly. */}
        <p className="mt-2 line-clamp-2 flex-1 text-[0.8125rem] leading-relaxed text-ink-600">
          {post.excerpt}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brand-600">
          Read More
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </p>
      </div>
    </article>
  );
}
