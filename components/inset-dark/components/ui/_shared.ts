/**
 * Shared form-field styles for inset-dark.
 *
 * Fields use the same "recessed well" treatment as the toggle track:
 * deep top inset shadow + a faint bottom highlight. Buttons feel raised
 * (gradient + outer shadows); fields feel pressed into the surface.
 */

export const formFieldBase =
  "w-full rounded-[0.5625rem] px-3 text-sm " +
  "bg-input text-foreground " +
  "border-0 " +
  "placeholder:text-[oklch(1_0_0/0.35)] " +
  "transition-[color,box-shadow] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:[box-shadow:var(--shadow-inset-deep)] " +
  "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0/0.18)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
