import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 placeholder:text-ink-500/70 transition-colors focus:border-brand-500";

function controlClasses(hasError: boolean, className?: string) {
  return cn(
    CONTROL,
    hasError ? "border-red-400 bg-red-50/40" : "border-shell-300 hover:border-shell-400",
    className,
  );
}

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/** Label + control + hint/error, wired together with matching ids. */
export function FieldWrapper({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink-800">
        {label}
        {required ? (
          <span className="ml-1 text-brand-600" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-500">(optional)</span>
        )}
      </label>

      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs leading-relaxed text-ink-500">
          {hint}
        </p>
      ) : null}

      <div className="mt-1.5">{children}</div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Ids to reference from `aria-describedby` for a field's hint and error text. */
export function describedBy(id: string, hasHint: boolean, hasError: boolean) {
  const ids = [hasHint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

type TextFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...rest
}: TextFieldProps) {
  return (
    <FieldWrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        id={id}
        name={rest.name ?? id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(hint), Boolean(error))}
        className={controlClasses(Boolean(error))}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({
  id,
  label,
  error,
  hint,
  className,
  required,
  rows = 4,
  ...rest
}: TextAreaFieldProps) {
  return (
    <FieldWrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        name={rest.name ?? id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(hint), Boolean(error))}
        className={controlClasses(Boolean(error), "resize-y")}
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  options,
  required,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        id={id}
        name={rest.name ?? id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(hint), Boolean(error))}
        className={controlClasses(Boolean(error), "appearance-none bg-[length:1rem] pr-9")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2326697c' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='M6 9.5 12 15l6-5.5'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
        }}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
