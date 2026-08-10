import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Breadcrumb trail plus matching BreadcrumbList structured data.
 * Pass the full trail including Home and the current page; the last item is
 * rendered as plain text rather than a link.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-shell-200 bg-white">
        <div className="container-page">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-sm text-ink-500">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span aria-current="page" className="text-ink-700">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link href={item.href} className="hover:text-brand-700 hover:underline">
                        {item.name}
                      </Link>
                      <span aria-hidden className="text-shell-400">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
