/**
 * Shared styles for form-field components in riso.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes. This guarantees identical
 * background, chunky ink border, focus ring, hover, disabled, and transition
 * behavior across every form field in the design system.
 *
 * Do NOT copy-paste these classes into individual components — always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.).
 *  Chunky 2px ink border + a subtle hard offset that deepens on focus —
 *  the retro poster material applied to data entry. */
export const formFieldBase =
  "w-full rounded-md px-3 text-sm font-medium " +
  "bg-card text-foreground " +
  "border-2 border-border " +
  "shadow-[var(--shadow-hard-sm)] " +
  "placeholder:text-muted-foreground placeholder:font-normal " +
  "transition-all duration-fast " +
  "hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--shadow-hard)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

/** Height + vertical padding for single-line form fields (h-10) */
export const formFieldSingleLine = "flex h-10 py-2";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2 resize-y";
