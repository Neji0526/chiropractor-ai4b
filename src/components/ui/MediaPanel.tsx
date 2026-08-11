import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
import { Icon } from "./Icon";

interface MediaPanelProps {
  image: ImageRef;
  /** Aspect ratio class, e.g. "aspect-[4/3]". */
  ratio?: string;
  className?: string;
  /** Description shown inside the placeholder while no photo exists. */
  placeholderLabel?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
  /** Border around the placeholder. Off when the panel is flush inside a card. */
  bordered?: boolean;
}

/**
 * Renders clinic photography when it exists, and a calm neutral panel when it
 * doesn't — so layouts look finished before the photoshoot, without resorting to
 * stock imagery that misrepresents the practice.
 */
export function MediaPanel({
  image,
  ratio = "aspect-[4/3]",
  className,
  placeholderLabel = "Clinic photo",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  rounded = "rounded-card",
  bordered = true,
}: MediaPanelProps) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-shell-200", ratio, rounded, className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-shell-100",
        bordered && "border border-shell-200",
        ratio,
        rounded,
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 28%, var(--color-brand-100) 0, transparent 42%), radial-gradient(circle at 78% 72%, var(--color-accent-100) 0, transparent 45%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <Icon name="image" size={26} className="text-ink-500/70" />
        <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
          {placeholderLabel}
        </p>
      </div>
    </div>
  );
}

interface AvatarProps {
  image: ImageRef;
  name: string;
  className?: string;
  sizes?: string;
  ratio?: string;
  /** Scale of the initials fallback — "sm" suits inline bylines. */
  initials?: "sm" | "lg";
}

/** Practitioner photo, falling back to initials on a soft brand tint. */
export function Avatar({
  image,
  name,
  className,
  sizes = "(min-width: 768px) 20rem, 100vw",
  ratio = "aspect-[4/5]",
  initials: initialsSize = "lg",
}: AvatarProps) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden rounded-card bg-shell-200", ratio, className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-card border border-brand-100 bg-brand-50",
        ratio,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "font-serif font-semibold text-brand-500",
          initialsSize === "sm" ? "text-xs tracking-tight" : "text-4xl",
        )}
      >
        {initials(name)}
      </span>
    </div>
  );
}
