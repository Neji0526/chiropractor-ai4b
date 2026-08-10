"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { isActivePath, type NavItem } from "@/lib/navigation";

interface MobileNavigationProps {
  items: NavItem[];
  phone: string;
  phoneHref: string;
  primaryCtaLabel: string;
}

/**
 * Slide-over navigation for small screens. Closes on route change, on Escape and
 * on backdrop click; locks background scroll and moves focus into the panel
 * while open.
 */
export function MobileNavigation({
  items,
  phone,
  phoneHref,
  primaryCtaLabel,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close whenever the visitor lands on a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="inline-flex items-center gap-2 rounded-full border border-shell-300 bg-white px-3 py-2 text-sm font-medium text-ink-700 sm:px-3.5 xl:hidden"
      >
        <Icon name="menu" size={18} title="Open menu" />
        {/* Label drops below 640px, where header space is tightest. */}
        <span className="hidden sm:inline">Menu</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-900/40"
          />

          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-white shadow-raised"
          >
            <div className="flex items-center justify-between border-b border-shell-200 px-5 py-4">
              <span className="font-serif text-lg font-semibold text-ink-900">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-full text-ink-600 hover:bg-shell-100"
              >
                <Icon name="close" size={20} title="Close menu" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-3 py-3 text-base font-medium",
                          active
                            ? "bg-brand-50 text-brand-700"
                            : "text-ink-700 hover:bg-shell-100",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-2 border-t border-shell-200 px-4 py-4">
              <Link
                href="/request-appointment"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-base font-medium text-white"
              >
                <Icon name="calendar" size={18} />
                {primaryCtaLabel}
              </Link>
              <a
                href={`tel:${phoneHref}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 px-5 py-3 text-base font-medium text-brand-700"
              >
                <Icon name="phone" size={18} />
                {phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
