/**
 * Shared form-field recipe for Interior.
 *
 * The input standard, derived from the OTP cell: an empty field is
 * a slot cut into the panel; entering it brings it to the surface. At rest the
 * field is a recessed well — a 2px quiet border, a tinted fill, an inset
 * shadow. On focus the border goes accent blue, the fill rises to white, and
 * the well shadow disappears. No focus ring: a 2px border plus the surface
 * lifting is already two signals.
 */

export const formFieldBase =
  "w-full rounded-[0.625rem] px-3 text-[0.8125rem] leading-[1.25rem] " +
  "border-2 border-border bg-input text-foreground " +
  "shadow-[var(--shadow-well)] " +
  "placeholder:text-muted-foreground " +
  "transition-[background-color,border-color,box-shadow] duration-fast " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:bg-card focus-visible:shadow-none " +
  "aria-invalid:border-destructive aria-invalid:bg-card " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.5rem] py-2.5 resize-y"
