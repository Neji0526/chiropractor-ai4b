import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-brand-200 bg-white text-brand-700 hover:border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
  onDark:
    "border border-white/40 bg-white/10 text-white hover:border-white/70 hover:bg-white/20",
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
