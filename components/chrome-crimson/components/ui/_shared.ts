/**
 * Shared styles for chrome-toggle.
 *
 * Form fields read as recessed channels milled into a steel plate: a glassy
 * dark surface pressed in with an inset shadow, hairline chrome edge, azure
 * focus ring. Interactive metal chips (buttons, chips, knobs) reuse the
 * material tokens declared in globals.css so the whole DS reads as one alloy.
 */

export const formFieldBase =
  "w-full rounded-lg px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-white/10 " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-white/20 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"

/**
 * Raised silver metal chip — the default (non-primary) interactive surface.
 * Beveled rim via a 1px ring + inset top highlight + soft drop shadow.
 */
export const metalChip =
  "[background:var(--surface-silver)] text-foreground " +
  "[box-shadow:var(--shadow-button)] " +
  "transition-[background,box-shadow,transform] duration-fast " +
  "hover:[box-shadow:var(--shadow-button-hover)] active:translate-y-px"

/**
 * Raised primary (azure) metal chip — mirrors the active toggle alloy.
 */
export const metalChipPrimary =
  "[background:var(--surface-on)] text-primary-foreground " +
  "[box-shadow:var(--shadow-primary)] " +
  "transition-[background,box-shadow,transform] duration-fast " +
  "hover:brightness-110 active:translate-y-px"

/**
 * Raised knob/dot (switch thumb, radio dot, slider thumb) in the OFF state.
 */
export const metalKnobOff =
  "[background:var(--knob-off)] [box-shadow:var(--shadow-knob)]"

/**
 * Raised knob/dot in the ON/filled state (azure).
 */
export const metalKnobOn =
  "[background:var(--knob-on)] [box-shadow:var(--shadow-knob)]"
