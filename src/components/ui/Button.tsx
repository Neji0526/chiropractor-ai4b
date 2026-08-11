import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkSolid";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-800 text-white shadow-sm hover:bg-brand-900 active:bg-brand-900",
  secondary:
    "border border-shell-300 bg-white text-ink-800 hover:border-brand-300 hover:text-brand-700",
  ghost: "text-brand-600 hover:bg-brand-50",
  /** Outlined, for use on the navy CTA band. */
  onDark: "border border-white/45 text-white hover:border-white hover:bg-white/10",
  /** Solid white, the primary action on the navy CTA band. */
  onDarkSolid: "bg-white text-brand-800 hover:bg-brand-50",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Put the icon after the label — used for "next"-style affordances. */
  iconAfter?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  /** Set for `tel:` and other links that leave the app. */
  external?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

function classes({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<CommonProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
}

function content({ icon, iconAfter, children }: Pick<CommonProps, "icon" | "iconAfter" | "children">) {
  const glyph = icon ? <Icon name={icon} size={18} /> : null;
  return (
    <>
      {!iconAfter && glyph}
      <span>{children}</span>
      {iconAfter && glyph}
    </>
  );
}

/** Anchor-styled-as-button. Use for navigation and `tel:` links. */
export function ButtonLink({
  href,
  external = false,
  variant,
  size,
  icon,
  iconAfter,
  fullWidth,
  className,
  children,
}: ButtonAsLink) {
  const shared = {
    className: classes({ variant, size, fullWidth, className }),
    children: content({ icon, iconAfter, children }),
  };

  // `tel:`/`mailto:` and off-site links bypass the client router.
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return <a href={href} {...shared} />;
  }

  return <Link href={href} {...shared} />;
}

export function Button({
  variant,
  size,
  icon,
  iconAfter,
  fullWidth,
  className,
  children,
  type = "button",
  ...rest
}: ButtonAsButton) {
  return (
    <button
      type={type}
      className={classes({ variant, size, fullWidth, className })}
      {...rest}
    >
      {content({ icon, iconAfter, children })}
    </button>
  );
}
