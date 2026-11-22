/**
 * Shared form-field styles for telemetry.
 *
 * Fields read as recessed instrument wells: near-black fill, hairline border,
 * inner shadow. Focus does not lift the field; it energizes it with the
 * signal-green ring glow, matching the console's glow-based elevation.
 */

export const formFieldBase =
  "w-full rounded-sm px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "[box-shadow:var(--shadow-inset)] " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-fast " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring/70 " +
  "focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.78_0.21_148/0.5),0_0_0.625rem_oklch(0.78_0.21_148/0.25)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-20 py-2 resize-y"
