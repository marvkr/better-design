/**
 * Shared form-field styles for tv-style.
 *
 * Form fields are styled as recessed "tile wells" — flat dark surface with a
 * deep inset shadow and a thin uppercase caret-label vibe. Amber focus ring
 * picks up the signature scramble accent.
 */

export const formFieldBase =
  "w-full rounded-[3px] px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-wider " +
  "font-mono tracking-wide " +
  "transition-[color,box-shadow,border-color] duration-150 " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y"
