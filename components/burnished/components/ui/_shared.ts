/**
 * Shared styles for Burnished components.
 *
 * Burnished has one material and five finishes. Every raised thing is a bevel:
 * a vertical gradient fill (`--fill-*`), a lit line along the top edge, a
 * shaded line along the bottom edge, a dark rim and a soft drop (`--bevel-*`).
 * The constants below are the only place those tokens meet class names, so a
 * component picks a finish here rather than writing its own shadow.
 *
 * Form fields (Input, Textarea, PasswordInput, SearchInput, NumberInput,
 * PhoneInput, InputOTP) MUST import `formFieldBase` instead of re-declaring
 * classes. Do NOT copy-paste these strings into a component.
 */

/** The focus ring every interactive part shares: a soft glow halo, no offset. */
export const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-ring";

/**
 * The cream bevel: the primary's face. Checkbox, switch, radio and slider use
 * the same fill and shadow on their checked parts, so they read as one
 * material with the primary Button.
 */
export const creamBevel =
  "bg-(image:--fill-primary) text-primary-foreground shadow-(--bevel-primary)";

/** The cream bevel, a touch brighter, for hover on fine pointers. */
export const creamBevelHover =
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-(image:--fill-primary-hover)";

/**
 * The copper rim drawn on a small checked control: a static slice of the
 * primary's turning ring, painted on the border box behind the cream face.
 */
export const copperRim =
  "border-2 border-transparent [background:var(--fill-primary)_padding-box,var(--ring-sheen)_border-box,conic-gradient(var(--ring-flow))_border-box]";

/** The graphite bevel: chips, pills and every raised neutral control. */
export const raisedBevel =
  "bg-(image:--fill-raised) text-foreground shadow-(--bevel-raised) " +
  "transition-[box-shadow,background-image] duration-base ease-(--ease-out) " +
  "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-(--bevel-raised-hover)";

/** The quiet bevel: secondary buttons. Darker face, firmer rim. */
export const quietBevel =
  "bg-(image:--fill-quiet) text-foreground shadow-(--bevel-quiet) " +
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-(image:--fill-quiet-hover)";

/** The slab: cards. A deep umber block with a long soft drop. */
export const cardSlab =
  "bg-(image:--fill-card) text-card-foreground shadow-(--bevel-card)";

/** The plate: nested surfaces inside a card, one step flatter than a slab. */
export const surfacePlate =
  "bg-(image:--fill-surface) text-card-foreground shadow-(--bevel-surface)";

/** The well: tracks and recessed areas, lit along the bottom lip. */
export const wellInset = "bg-(image:--fill-well) shadow-(--bevel-well)";

/** The press every bevelled control shares: a small scale toward the page. */
export const pressScale =
  "transition-transform duration-fast ease-(--ease-out) active:scale-[0.975] motion-reduce:active:scale-100";

/**
 * Base styles shared by every form-field surface. A graphite bevel with a
 * 0.875rem corner; the rim brightens on hover and again on focus. The
 * transparent border is there so an invalid field can turn it red.
 */
export const formFieldBase =
  "w-full min-w-0 rounded-lg border border-transparent bg-(image:--fill-raised) px-4 text-[0.9375rem] text-foreground " +
  "shadow-(--bevel-raised) placeholder:text-muted-foreground " +
  "transition-[box-shadow,border-color] duration-base ease-(--ease-out) " +
  "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-(--bevel-raised-hover) " +
  "focus-visible:outline-none focus-visible:shadow-(--bevel-raised-focus) focus-visible:ring-3 focus-visible:ring-ring " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Height + vertical padding for single-line form fields (3rem). */
export const formFieldSingleLine = "flex h-12 py-2";

/** Vertical padding and min-height for multi-line form fields. */
export const formFieldMultiLine = "flex min-h-28 py-3 leading-normal";

/**
 * The floating panel shared by every menu, popover, select and tooltip: a
 * raised umber panel with a lit top edge and a dark rim.
 */
export const popoverSurface =
  "rounded-lg bg-popover text-popover-foreground shadow-(--bevel-menu)";

/** A highlighted row inside a floating panel. */
export const menuItemBase =
  "relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * A checked small control (checkbox box, radio dot ring, switch track). Radix
 * marks it with data-state="checked"; Base UI with data-checked.
 */
export const controlChecked =
  "data-[state=checked]:bg-(image:--fill-primary) data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-(--bevel-primary) " +
  "data-[checked]:bg-(image:--fill-primary) data-[checked]:text-primary-foreground data-[checked]:shadow-(--bevel-primary)";
