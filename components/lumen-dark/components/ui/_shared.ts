/**
 * Shared form-field styles for lumen-dark.
 *
 * Inputs use the "inset shadow" direction (light source from above still applies,
 * but fields are pressed INTO the surface, so the contact shadow is on top/inside).
 * This creates the depth contrast: buttons feel raised, inputs feel recessed.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-150 " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y"
