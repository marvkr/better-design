/**
 * Shared form-field styles for beam-lib.
 *
 * Mirrors beam-custom's surface treatment (recessed inset, rounded-xl pill)
 * so the only visible difference between the two DSes is which engine
 * draws the rainbow beam — our hand-rolled CSS, or the npm `border-beam`.
 */

export const formFieldBase =
  "w-full rounded-xl px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-150 " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/30 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y"
