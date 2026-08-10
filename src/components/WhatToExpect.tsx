import type { ExpectationStep } from "@/content/types";
import { SectionHeading } from "@/components/ui/Section";

/**
 * "What happens when you come in" — one of the highest-value trust sections on a
 * clinic site, because uncertainty about the first visit is the most common
 * reason people put off booking.
 */
export function WhatToExpect({
  steps,
  heading = "What happens at your first visit",
  description = "No surprises. Here's how an appointment runs from the moment you arrive.",
}: {
  steps: ExpectationStep[];
  heading?: string;
  description?: string;
}) {
  if (steps.length === 0) return null;

  return (
    <section className="bg-shell-100 py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="What to expect" title={heading} description={description} />

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.step}
              className="relative rounded-card border border-shell-200 bg-white p-6"
            >
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full bg-brand-50 font-serif text-base font-semibold text-brand-700"
              >
                {step.step}
              </span>
              <h3 className="mt-4 text-lg">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
