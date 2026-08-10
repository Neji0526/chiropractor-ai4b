import type { BusinessHours, Location } from "@/content/types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Monday-first display order, matching how opening hours are normally read. */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

export function dayName(dayOfWeek: number): string {
  return DAY_NAMES[dayOfWeek] ?? "";
}

/** "08:00" → "8:00am". Returns an empty string for missing times. */
export function formatTime(time: string | null): string {
  if (!time) return "";
  const [hoursPart, minutesPart = "00"] = time.split(":");
  const hours = Number(hoursPart);
  if (Number.isNaN(hours)) return "";
  const suffix = hours >= 12 ? "pm" : "am";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutesPart}${suffix}`;
}

export function formatHoursRange(hours: BusinessHours): string {
  if (hours.isClosed || !hours.openTime || !hours.closeTime) return "Closed";
  return `${formatTime(hours.openTime)} – ${formatTime(hours.closeTime)}`;
}

/** Opening hours sorted Monday-first for display. */
export function sortHoursForDisplay(hours: BusinessHours[]): BusinessHours[] {
  return DISPLAY_ORDER.map((day) => hours.find((h) => h.dayOfWeek === day)).filter(
    (h): h is BusinessHours => Boolean(h),
  );
}

/** "148 North Bridge Street, Suite 2, Riverton, OH 45042" */
export function formatAddress(location: Location): string {
  return [
    location.addressLine1,
    location.addressLine2,
    location.city,
    `${location.state} ${location.postalCode}`.trim(),
  ]
    .filter(Boolean)
    .join(", ");
}

/** "18 June 2026" — stable across server and client with a fixed locale. */
export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Initials for the photo-less avatar placeholder: "Dr. Alex Moreno" → "AM". */
export function initials(name: string): string {
  return name
    .replace(/^(dr\.?|prof\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
