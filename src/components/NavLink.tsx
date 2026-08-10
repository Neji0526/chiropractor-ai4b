"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";

/** Desktop navigation link that marks the current section. */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-2 text-[0.9375rem] font-medium transition-colors",
        active ? "text-brand-700" : "text-ink-600 hover:text-ink-900",
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-brand-500 transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
