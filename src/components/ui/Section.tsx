import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "plain" | "muted" | "brand" | "sage";

const TONES: Record<Tone, string> = {
  plain: "bg-shell-50",
  muted: "bg-shell-100",
  brand: "bg-brand-800 text-brand-50",
  sage: "bg-sage-50",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Tighter vertical rhythm, for narrow bands like the trust bar. */
  compact?: boolean;
  /** Accessible name for the region, when the visible heading isn't enough. */
  ariaLabel?: string;
}

export function Section({
  children,
  tone = "plain",
  id,
  className,
  compact = false,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(TONES[tone], compact ? "py-10" : "py-16 lg:py-24", className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Small label above the heading. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level — keep one `h1` per page. */
  as?: "h1" | "h2" | "h3";
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold tracking-[0.14em] uppercase",
            onDark ? "text-brand-200" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag
        className={cn(
          Tag === "h1"
            ? "text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
            : "text-2xl leading-tight sm:text-3xl",
          onDark && "text-white",
        )}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-relaxed",
            onDark ? "text-brand-100" : "text-ink-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
