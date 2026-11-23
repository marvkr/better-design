/**
 * Shared recipes for Liquid Glass.
 *
 * Fields are quiet wells on the stage: a faint wash, a hairline rim and the
 * kit's one focus ring. Popover surfaces are frosted glass in CSS, the same
 * tint, blur and white rim the kit's GlassCard draws before WebGL takes over,
 * with the card's two-layer drop shadow under them.
 */

export const formFieldBase =
  "w-full rounded-xl px-3.5 text-sm " +
  "bg-input text-foreground border border-border [box-shadow:var(--shadow-inset)] " +
  "placeholder:text-muted-foreground " +
  "transition-[color,background-color,border-color,box-shadow] duration-fast ease-out " +
  "hover:border-foreground/15 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring/30 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2.5 resize-y"

/** A frosted glass panel: menus, popovers, tooltips and dialogs. */
export const glassSurface =
  "border border-(--glass-rim) bg-popover/80 text-popover-foreground " +
  "backdrop-blur-xl backdrop-saturate-150 [box-shadow:var(--shadow-glass)]"

/** The row of a glass menu: a soft wash under the pointer, pill corners. */
export const glassMenuItem =
  "relative flex cursor-default select-none items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-(--glass-wash) focus:text-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
