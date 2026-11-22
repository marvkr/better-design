/**
 * Shared form-field styles for velour.
 *
 * Fields are recessed velvet wells: they sink below the canvas plane
 * (darker --input fill + deep inset top shadow + a whisper of light along
 * the bottom lip), the inverse of the raised velour buttons. Focus wakes
 * the champagne ring softly; nothing glows hard in this DS.
 */

export const formFieldBase =
  "w-full px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground/80 " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/30 " +
  "focus-visible:outline-none focus-visible:border-ring/60 focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5 rounded-lg"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y rounded-lg"
