import type { SiteSettings } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Closing call to action. Used at the foot of most pages, with copy tailored to
 * the page it sits on so it reads as a next step rather than a banner.
 */
export function CTASection({
  settings,
  title = "Ready to get it looked at?",
  description = "Send an appointment request and we'll come back to you with a time. If you'd rather talk it through first, call the clinic — we're happy to tell you whether we're the right people to see.",
  variant = "brand",
}: {
  settings: SiteSettings;
  title?: string;
  description?: string;
  variant?: "brand" | "light";
}) {
  const onDark = variant === "brand";

  return (
    <section
      aria-labelledby="final-cta-heading"
      className={onDark ? "bg-brand-800" : "border-y border-shell-200 bg-white"}
    >
      <div className="container-page py-14 lg:py-16">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="final-cta-heading"
              className={onDark ? "text-2xl text-white sm:text-3xl" : "text-2xl sm:text-3xl"}
            >
              {title}
            </h2>
            <p
              className={
                onDark
                  ? "mt-3 text-[1.0625rem] leading-relaxed text-brand-100"
                  : "mt-3 text-[1.0625rem] leading-relaxed text-ink-600"
              }
            >
              {description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href="/request-appointment"
              size="lg"
              icon="calendar"
              variant={onDark ? "secondary" : "primary"}
              className={cn("whitespace-nowrap", onDark && "border-transparent")}
            >
              {settings.primaryCtaLabel}
            </ButtonLink>

            <a
              href={`tel:${settings.phoneHref}`}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-base font-medium whitespace-nowrap transition-colors",
                onDark
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-brand-200 text-brand-700 hover:bg-brand-50",
              )}
            >
              <Icon name="phone" size={18} />
              {settings.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
