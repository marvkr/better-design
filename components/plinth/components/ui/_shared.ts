/**
 * Shared form-field styles for Plinth.
 *
 * A field is a recessed well cut into the panel: a fill one step darker
 * than the panel, light blocked along the top edge and a faint lit lip at
 * the bottom. Focus draws the ember ring with a dark gap, the same ring the
 * selected thumbnail wears.
 */

export const formFieldBase =
  "w-full px-3.5 text-sm text-foreground " +
  "bg-input border border-transparent " +
  "[box-shadow:var(--shadow-inset)] " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "hover:border-border " +
  "focus-visible:outline-none focus-visible:border-ring/70 focus-visible:ring-2 focus-visible:ring-ring/30 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5 rounded-lg"
export const formFieldMultiLine = "flex min-h-[5rem] py-2.5 resize-y rounded-xl"
