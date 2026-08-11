import type { ExpectationStep } from "@/content/types";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";

const STEP_ICONS: Record<ExpectationStep["icon"], IconName> = {
  notes: "notes",
  sliders: "sliders",
  calendar: "calendar",
  heart: "heart",
  check: "check",
  clock: "clock",
  map: "map",
  phone: "phone",
  shield: "shield",
  users: "users",
  sparkle: "sparkle",
};

/**
 * "What happens at your first visit" — one of the highest-value trust sections on
 * a clinic site, because uncertainty about the first visit is the most common
 * reason people put off booking.
 */
export function WhatToExpect({
  steps,
  heading = "What happens at your first visit",
  description = "Simple steps to start feeling better.",
  tone = "plain",
}: {
  steps: ExpectationStep[];
  heading?: string;
  description?: string;
  tone?: "plain" | "muted";
}) {
  if (steps.length === 0) return null;

  return (
    <section
      id="what-to-expect"
      className={
        tone === "muted"
          ? "scroll-mt-24 border-y border-shell-200 bg-shell-100 py-14 lg:py-20"
          : "scroll-mt-24 bg-white py-14 lg:py-20"
      }
    >
      <div className="container-page">
        <SectionHeading eyebrow="How it works" title={heading} description={description} />

        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.step}
              className="rounded-card border border-shell-200 bg-white p-5"
            >
              <span aria-hidden className="icon-tile size-10">
                <Icon name={STEP_ICONS[step.icon]} size={20} />
              </span>

              <p className="mt-4 font-serif text-lg font-semibold text-ink-900">
                <span className="text-brand-500">{step.step}</span>
              </p>
              <h3 className="mt-0.5 font-sans text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
