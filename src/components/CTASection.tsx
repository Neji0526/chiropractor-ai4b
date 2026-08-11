import type { SiteSettings } from "@/content/types";
import { LogoMark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing call to action. Used at the foot of most pages, with copy tailored to
 * the page it sits on so it reads as a next step rather than a banner.
 */
export function CTASection({
  settings,
  title = "Ready to get it looked at?",
  description = "You don't have to live with pain. We're here to help you move better, feel better and get back to what matters most.",
}: {
  settings: SiteSettings;
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-brand-800">
      {/* Watermark of the clinic mark, echoing the design. */}
      <LogoMark
        className="pointer-events-none absolute top-1/2 left-6 hidden size-32 -translate-y-1/2 text-white/[0.09] lg:block"
        strokeWidth={0.9}
      />

      <div className="container-page relative py-12 lg:py-14">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:pl-36">
          <div className="max-w-xl">
            <h2 id="final-cta-heading" className="text-2xl text-white sm:text-[1.75rem]">
              {title}
            </h2>
            <p className="mt-3 leading-relaxed text-brand-100">{description}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href="/request-appointment"
              size="md"
              icon="calendar"
              variant="onDarkSolid"
              className="whitespace-nowrap"
            >
              {settings.primaryCtaLabel}
            </ButtonLink>

            <ButtonLink
              href={`tel:${settings.phoneHref}`}
              size="md"
              icon="phone"
              variant="onDark"
              className="whitespace-nowrap"
            >
              {settings.secondaryCtaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
