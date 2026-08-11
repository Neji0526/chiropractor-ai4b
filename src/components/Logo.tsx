import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The northstar mark: a four-pointed star inside a diamond. Drawn inline so it
 * stays crisp at any size and can be reused as a large faint watermark on the
 * closing CTA band. Swap for the practice's real logo file when there is one.
 */
export function LogoMark({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M12 2.4 21.6 12 12 21.6 2.4 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M12 6.6l1.55 3.85L17.4 12l-3.85 1.55L12 17.4l-1.55-3.85L6.6 12l3.85-1.55Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Wordmark: badge, clinic name and the short tagline beneath it. */
export function Logo({
  clinicName,
  tagline,
  onDark = false,
  className,
}: {
  clinicName: string;
  tagline?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={`${clinicName} — home`}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          onDark ? "bg-white/12 text-white" : "bg-brand-800 text-white",
        )}
      >
        <LogoMark className="size-5" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[0.9375rem] font-semibold tracking-tight sm:text-base lg:whitespace-nowrap",
            onDark ? "text-white" : "text-ink-900",
          )}
        >
          {clinicName}
        </span>
        {tagline ? (
          <span
            className={cn(
              "mt-1 text-[0.6875rem] font-medium",
              onDark ? "text-brand-200" : "text-ink-500",
            )}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
