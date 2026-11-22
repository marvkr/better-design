/**
 * Shared material recipes for Leather Luxe.
 *
 * Three materials make the whole system read as one object:
 *  - leather: the cognac CTA surface (gradient + glass sheen + warm drop)
 *  - raised: dark charcoal glass pills that catch light on the top edge
 *  - well: recessed tracks and fields pressed into the card surface
 *
 * Every form field imports formFieldBase; every popover surface imports
 * popoverSurface, so the depth language never drifts between components.
 */

/** Recessed field well: pressed into the card, cognac focus halo. */
export const formFieldBase =
  "w-full rounded-md bg-well px-3 text-sm text-foreground " +
  "border border-border " +
  "[box-shadow:var(--shadow-well)] " +
  "placeholder:text-muted-foreground/70 " +
  "transition-[border-color,box-shadow,background-color] duration-base " +
  "hover:border-highlight " +
  "focus-visible:outline-none focus-visible:border-primary/60 " +
  "focus-visible:[box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.55_0.115_52/0.25)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

/** Cognac leather material: shared by the primary Button and every filled control. */
export const leatherSurface =
  "[background-image:var(--gradient-leather)] text-primary-foreground " +
  "border border-[oklch(0.68_0.115_58/0.55)] " +
  "[box-shadow:var(--shadow-leather)]"

/** Scaled-down leather for small filled controls (checkbox, switch, slider). */
export const leatherSurfaceSm =
  "[background-image:var(--gradient-leather)] text-primary-foreground " +
  "border border-[oklch(0.68_0.115_58/0.55)] " +
  "[box-shadow:var(--shadow-leather-sm)]"

/** Raised dark glass pill: secondary buttons, thumbs, kbd, active tabs. */
export const raisedSurface =
  "[background-image:var(--gradient-raised)] text-foreground " +
  "border border-highlight " +
  "[box-shadow:var(--shadow-raised)]"

/** Floating glass panel: every popover-family surface shares this. */
export const popoverSurface =
  "rounded-lg border border-highlight " +
  "bg-popover text-popover-foreground backdrop-blur-xl " +
  "[box-shadow:var(--shadow-popover)]"
