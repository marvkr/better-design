/**
 * Shared styles for form-field components in clicky.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, etc.) MUST import these
 * constants instead of re-declaring classes. This guarantees identical
 * background, border, focus ring, hover, disabled, and transition behavior
 * across every form field in the design system.
 *
 * Do NOT copy-paste these classes into individual components — always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full rounded-[0.375rem] px-3 text-sm " +
  "bg-background text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-colors duration-fast " +
  "hover:border-ring/50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Height + vertical padding for single-line form fields (h-9) */
export const formFieldSingleLine = "flex h-9 py-1.5";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y";
