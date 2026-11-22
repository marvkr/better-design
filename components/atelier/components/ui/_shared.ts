/**
 * Shared form-field styles for atelier.
 *
 * Fields are quiet near-white surfaces resting a hair below the card plane:
 * a hairline warm border, a whisper of inset shade, generous pill rounding on
 * single-line fields. Focus draws the refined green ring, softly.
 */

export const formFieldBase =
  "w-full px-4 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/35 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5 rounded-full"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y rounded-xl"
