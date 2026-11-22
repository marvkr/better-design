/**
 * Shared form-field styles for graphite.
 *
 * Fields are recessed wells: a dark top inset shadow presses them into the
 * card surface, the way the segmented nav track does. Buttons feel raised
 * (gradient + outer shadow); fields feel pressed in. On focus the well keeps
 * its depth and gains a soft white ring instead of a hue.
 */

export const formFieldBase =
  "w-full rounded-lg px-3 text-sm " +
  "bg-input text-foreground " +
  "border-0 " +
  "placeholder:text-muted-foreground/70 " +
  "transition-[color,box-shadow] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:[box-shadow:var(--shadow-inset-deep)] " +
  "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0_/_0.2)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
