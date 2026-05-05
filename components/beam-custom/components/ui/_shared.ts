/**
 * Shared form-field styles for beam-custom.
 *
 * Form fields sit recessed beneath the surface plane (inset shadow), so the
 * rainbow beam wrapping them reads cleanly as "light catching the rim".
 * Larger radius (rounded-xl, 12-14px) matches the soft pill aesthetic of
 * beam.jakubantalik.com.
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
