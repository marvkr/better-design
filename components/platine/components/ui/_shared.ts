/**
 * Shared form-field styles for platine.
 *
 * Fields are recessed dark tracks (the snippet's sunken nav track): a deep inset
 * top shadow over the --input surface, so they read as pressed INTO the bezel,
 * the inverse of the raised metal buttons. Focus lights the silver ring.
 * Single-line fields are full pills; multi-line softens to a rounded panel.
 */

export const formFieldBase =
  "w-full px-4 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5 rounded-full"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y rounded-2xl"
