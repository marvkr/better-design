/**
 * Shared form-field recipe for Playdesk.
 *
 * Playdesk has two materials. Raised controls carry a vertical gradient plus a
 * gloss sheen (the --fill-* tokens in globals.css). Fields are the inverse: a
 * recessed white well with a hairline rim and an inset shadow, lit in sky blue
 * on focus. Every field imports this one constant so that treatment lands in a
 * single place instead of eight.
 */

export const formFieldBase =
  "w-full rounded-lg px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast ease-out " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-foreground/20 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[0.1875rem] focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.5rem] py-2.5 resize-y"
