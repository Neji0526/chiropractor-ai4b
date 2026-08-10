import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark with a small abstract spine glyph. Text-based on purpose: it stays
 * crisp at every size and is trivial to swap for the practice's real logo file.
 */
export function Logo({
  clinicName,
  onDark = false,
  className,
}: {
  clinicName: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${clinicName} — home`}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          onDark ? "bg-white/15" : "bg-brand-600",
        )}
      >
        <svg viewBox="0 0 24 24" width={20} height={20} focusable="false">
          <path
            d="M12 4.5c-2 0-3.2 1.1-3.2 2.4 0 1.3 1.2 1.9 3.2 1.9s3.2.6 3.2 1.9-1.2 2.4-3.2 2.4-3.2 1.1-3.2 2.4 1.2 1.9 3.2 1.9"
            fill="none"
            stroke="white"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
          <circle cx="12" cy="19.2" r="1.5" fill="white" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.0625rem] font-semibold tracking-tight sm:text-lg lg:whitespace-nowrap",
            onDark ? "text-white" : "text-ink-900",
          )}
        >
          {clinicName}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6875rem] font-medium tracking-[0.12em] uppercase",
            onDark ? "text-brand-200" : "text-brand-600",
          )}
        >
          Chiropractic care
        </span>
      </span>
    </Link>
  );
}
