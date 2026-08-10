import type { ReactNode } from "react";

/** Compact page introduction used at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** CTAs or meta details shown under the description. */
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-shell-200 bg-white">
      <div className="container-page py-12 lg:py-16">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="max-w-3xl text-[2rem] leading-[1.15] sm:text-4xl">{title}</h1>

        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </div>
  );
}
