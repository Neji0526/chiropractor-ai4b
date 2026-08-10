import type { BusinessHours as BusinessHoursType } from "@/content/types";
import { cn } from "@/lib/cn";
import { dayName, formatHoursRange, sortHoursForDisplay } from "@/lib/format";

/**
 * Opening hours table, Monday first.
 *
 * Deliberately does not highlight "open now": that needs the clinic's timezone
 * and would either mismatch between server and client render or require client
 * JavaScript for something a visitor can read in two seconds.
 */
export function BusinessHours({
  hours,
  className,
}: {
  hours: BusinessHoursType[];
  className?: string;
}) {
  const ordered = sortHoursForDisplay(hours);
  if (ordered.length === 0) return null;

  return (
    <dl className={cn("divide-y divide-shell-200 text-sm", className)}>
      {ordered.map((entry) => (
        <div
          key={entry.dayOfWeek}
          className="flex items-baseline justify-between gap-4 py-2"
        >
          <dt className="text-ink-600">{dayName(entry.dayOfWeek)}</dt>
          <dd
            className={cn(
              "text-right font-medium tabular-nums",
              entry.isClosed ? "text-ink-500" : "text-ink-800",
            )}
          >
            {formatHoursRange(entry)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
