/**
 * Shared form-field styles for terminal.
 *
 * Fields are recessed cells in the CRT glass: a cyan-tinted inset surface with a
 * faint inner darkening, a hairline cyan rim, and a monospace caret. Focus lights
 * the rim and emits a cyan ring (the cell going "active" on the screen).
 */

export const formFieldBase =
  "w-full rounded-sm px-3 font-mono text-sm " +
  "bg-input text-foreground caret-primary " +
  "border border-border " +
  "placeholder:text-muted-foreground/70 " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring " +
  "focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "focus-visible:[box-shadow:var(--shadow-inset),0_0_0.625rem_oklch(0.80_0.15_205_/_0.18)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
