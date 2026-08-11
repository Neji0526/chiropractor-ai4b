import type { Faq } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * FAQ list built on native `<details>`/`<summary>`.
 *
 * No client JavaScript, keyboard accessible for free, and the answers are in the
 * HTML for crawlers even when collapsed. `name` groups items so only one is open
 * at a time in browsers that support it, degrading to independent toggles.
 */
export function FAQAccordion({
  items,
  groupName = "faq",
  className,
}: {
  items: Faq[];
  groupName?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((faq) => (
        <details
          key={faq.id}
          name={groupName}
          className="group rounded-lg border border-shell-200 bg-white px-5 open:border-brand-200"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[0.9375rem] font-medium text-ink-800 marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <Icon
              name="chevron-down"
              size={18}
              className="shrink-0 text-brand-500 transition-transform group-open:-rotate-180"
            />
          </summary>
          <div className="pb-5 text-sm leading-relaxed text-ink-600">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
