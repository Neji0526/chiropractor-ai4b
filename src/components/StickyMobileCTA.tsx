"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

/**
 * Thumb-reachable call and appointment actions on small screens.
 *
 * Hidden on the appointment and contact pages, where the form itself is the
 * action and a floating bar would only cover it.
 */
export function StickyMobileCTA({
  phone,
  phoneHref,
}: {
  phone: string;
  phoneHref: string;
}) {
  const pathname = usePathname();

  if (pathname === "/request-appointment" || pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-shell-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={`tel:${phoneHref}`}
          className="flex items-center justify-center gap-2 rounded-full border border-brand-200 py-2.5 text-[0.9375rem] font-medium text-brand-700"
        >
          <Icon name="phone" size={17} />
          Call
          <span className="sr-only">{phone}</span>
        </a>
        <Link
          href="/request-appointment"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-600 py-2.5 text-[0.9375rem] font-medium text-white"
        >
          <Icon name="calendar" size={17} />
          Book
        </Link>
      </div>
    </div>
  );
}
