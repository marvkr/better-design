/**
 * Shared form-field styles for cornflower.
 *
 * One clean fintech input surface: bright near-white fill, soft 1px border, a
 * faint recessed inset, and a calm cornflower-blue focus ring. Every text-entry
 * primitive (input, textarea, password, search, number, phone, input-otp)
 * imports this so the whole form layer reads as one material.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast ease-out " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/35 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[0.1875rem] focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
