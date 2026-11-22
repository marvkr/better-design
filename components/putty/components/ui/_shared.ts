/**
 * Shared form-field styles for putty.
 *
 * Clay fields are pressed INTO the surface: a soft recessed well rather than a
 * raised pillow. The recipe is the clay inset shadow (--shadow-clay-inset) on a
 * warm --input fill, so fields read as scooped-out clay next to the raised,
 * pillowy buttons. Focus brings up a soft blue ring that tracks --primary.
 */

export const formFieldBase =
  "w-full rounded-[var(--radius-lg)] px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-base " +
  "[box-shadow:var(--shadow-clay-inset)] " +
  "hover:border-ring/30 " +
  "focus-visible:outline-none focus-visible:border-ring " +
  "focus-visible:[box-shadow:var(--shadow-clay-inset),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_28%,transparent)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.5rem] py-2.5 resize-y"
