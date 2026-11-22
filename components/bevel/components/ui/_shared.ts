/** Shared surface, form-field and type recipes for Bevel. */

/**
 * The card recipe: no border, an inset highlight along the top edge, a 1px
 * ring and a soft drop shadow. Every raised surface in the system uses it, so
 * a card, a popover and a sheet read as the same material.
 */
export const surfaceBase =
  "bg-card text-card-foreground rounded-[1.25rem] [box-shadow:var(--shadow-card)]"

/**
 * A popover, menu or tooltip surface: the card recipe at a smaller radius with
 * a deeper drop, so it separates from the card it opens over.
 */
export const popoverSurface =
  "bg-popover text-popover-foreground rounded-[0.875rem] [box-shadow:var(--shadow-lg)]"

/**
 * An inner surface: a row, a well or a chip pressed into a card. It sits on
 * the inner token and takes the inset shadow instead of a raised one.
 */
export const innerSurface =
  "bg-[var(--inner)] text-[var(--inner-foreground)] rounded-[0.75rem] [box-shadow:var(--shadow-inset)]"

/**
 * Every form field starts here so an input, a textarea and a select share one
 * surface. The field is a pressed well, not a bordered box, and focus swaps
 * the well for a ring in the accent.
 */
export const formFieldBase =
  "w-full rounded-[0.75rem] px-3.5 text-sm text-foreground " +
  "bg-input placeholder:text-muted-foreground " +
  "[box-shadow:var(--shadow-inset)] " +
  "transition-[color,box-shadow] duration-fast ease-out " +
  "hover:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_var(--strong)] " +
  "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)] " +
  "aria-invalid:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_var(--destructive)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

/** A single-line field: 40px tall, dense enough for a stacked mobile form. */
export const formFieldSingleLine = "flex h-10 py-2"

/** A multi-line field: the same well, grown and resizable on the y axis. */
export const formFieldMultiLine = "flex min-h-[5.5rem] py-2.5 resize-y"

/**
 * The interactive-row recipe used by menu items, list rows and command items:
 * 8px radius, tight padding and an accent-tinted hover.
 */
export const rowBase =
  "relative flex cursor-default select-none items-center gap-2.5 rounded-[0.5rem] " +
  "px-2.5 py-2 text-sm outline-none transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground " +
  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

/**
 * The type ramp, as class strings. A screen picks a step instead of inventing
 * a size, which is what keeps a dense layout calm.
 */
export const type = {
  /** 26px greeting at the top of a screen. */
  greeting: "text-[1.625rem] leading-[1.875rem] font-semibold tracking-[-0.0563rem]",
  /** 22px screen or card title. */
  title: "text-[1.375rem] leading-7 font-semibold tracking-[-0.0438rem]",
  /** 19px section heading above a group of cards. */
  section: "text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem]",
  /** 16px lead copy. */
  lead: "text-[1rem] leading-[1.375rem] tracking-[-0.0063rem]",
  /** 14.5px body and day labels. */
  body: "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
  /** 12.5px label, the smallest readable step. */
  label: "text-[0.7813rem] leading-4 tracking-[0.0188rem]",
} as const

/**
 * The circular icon-button sizes the spec names, 38px to 46px. Row actions take
 * `sm`, a screen's primary action takes `lg`.
 */
export const iconButtonSize = {
  sm: "size-[2.375rem]",
  default: "size-[2.625rem]",
  lg: "size-[2.875rem]",
} as const
