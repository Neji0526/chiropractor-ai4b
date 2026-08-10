import type { TrustPoint } from "@/content/types";
import { Icon, type IconName } from "@/components/ui/Icon";

const ICONS: Record<TrustPoint["icon"], IconName> = {
  clock: "clock",
  map: "map",
  phone: "phone",
  shield: "shield",
  heart: "heart",
  users: "users",
};

/**
 * Band of short, verifiable reassurances. No statistics, review counts or
 * years-in-practice claims — every point here should be something the clinic can
 * stand behind.
 */
export function TrustBar({ points }: { points: TrustPoint[] }) {
  if (points.length === 0) return null;

  return (
    <section aria-label="Why patients choose us" className="border-b border-shell-200 bg-shell-100">
      <div className="container-page py-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <li key={point.label} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                <Icon name={ICONS[point.icon]} size={18} />
              </span>
              <span>
                <span className="block text-[0.9375rem] font-semibold text-ink-900">
                  {point.label}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">
                  {point.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
