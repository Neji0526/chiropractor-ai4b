import type { Condition, SiteSettings } from "@/content/types";
import { ConditionCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";

/**
 * Symptom-first entry point plus the clinic's differentiators.
 *
 * The conditions are links rather than plain labels — someone who recognises
 * their own problem in this list should be one click from the page about it.
 */
export function WhoWeHelp({
  conditions,
  settings,
}: {
  conditions: Condition[];
  settings: SiteSettings;
}) {
  return (
    <section className="border-y border-shell-200 bg-shell-100 py-14 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Who we help"
            title="Not sure which service you need?"
            description="We treat a wide range of conditions and help patients of all ages feel and function their best. Start with what you're experiencing."
          />

          {conditions.length > 0 ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {conditions.map((condition) => (
                <ConditionCard key={condition.slug} condition={condition} />
              ))}
            </ul>
          ) : null}
        </div>

        <div className="grid items-center gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:gap-0">
          <MediaPanel
            image={settings.whoWeHelpImage}
            ratio="aspect-[3/4]"
            placeholderLabel="Photo"
            rounded="rounded-xl"
            className="h-full"
            sizes="(min-width: 1024px) 20vw, 50vw"
          />

          {/* Overlaps the photo slightly at wider sizes, as in the design.
              `relative` is required: the photo panel is positioned, so without a
              stacking context of its own the card would be painted underneath. */}
          <div className="relative z-10 rounded-xl border border-shell-200 bg-white p-6 shadow-card sm:-ml-6 sm:p-7">
            <h3 className="font-serif text-xl leading-snug">
              A clinic that tells you what it actually thinks.
            </h3>

            <ul className="mt-5 space-y-3">
              {settings.whyChooseUs.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white"
                  >
                    <Icon name="check" size={12} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">{reason}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href="/about"
              size="sm"
              icon="arrow-right"
              iconAfter
              className="mt-6"
            >
              Why Patients Choose Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
