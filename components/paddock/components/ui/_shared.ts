/**
 * Shared styles for Paddock components.
 *
 * Paddock has one surface recipe: a flat white fill drawn by one 1px cool
 * border, with no drop at rest. A faint shadow appears only on floating
 * panels. White is the raised surface, a pale cool grey is the recessed well,
 * and deep teal is the action. The constants below are the only place those
 * tokens meet class names, so a component picks a finish here rather than
 * writing its own.
 *
 * Form fields (Input, Textarea, PasswordInput, SearchInput, NumberInput,
 * PhoneInput, InputOTP) MUST import `formFieldBase` instead of re-declaring
 * classes. Do NOT copy-paste these strings into a component.
 */

/** The focus ring every interactive part shares: a teal outline, set off the edge. */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * The teal fill: the primary's face, with a 1px highlight on its top edge. Checkbox, switch, radio and slider use
 * the same fill and shadow on their checked parts, so they read as one
 * material with the primary Button.
 */
export const primaryFace = "bg-primary text-primary-foreground shadow-(--primary-face)";

/** The teal fill, a step lighter, for hover. */
export const primaryFaceHover = "hover:bg-primary/88";

/** The edge of a small checked control: the teal fill, edge to edge. */
export const primaryEdge = "border border-transparent bg-primary shadow-(--primary-face)";

/**
 * The raised surface: the secondary button, the search field and every
 * neutral control. White with a 1px cool border; hover firms the border.
 */
export const raisedSurface =
  "bg-card text-foreground shadow-(--card-ring) " +
  "transition-[box-shadow,background-color] duration-fast ease-out " +
  "hover:bg-(--card-hover) hover:shadow-(--card-lift)";

/** The quiet chip: tags and quiet fills. Flat cool grey, darker on hover. */
export const quietChip =
  "bg-secondary text-secondary-foreground shadow-(--plate-ring) " +
  "transition-colors duration-fast ease-out hover:bg-(--track)";

/** The card: white with a 1px cool border, flat. */
export const cardSlab = "bg-card text-card-foreground shadow-(--shadow-card)";

/** The plate: a surface nested inside a card or column, a flat cool grey. */
export const surfacePlate = "bg-muted text-card-foreground shadow-(--plate-ring)";

/** The well: the segmented control's track and other recessed areas. */
export const wellInset = "bg-(--track) shadow-(--track-inset)";

/** The press every control shares: a small scale toward the page. */
export const pressScale =
  "transition-[transform,background-color,box-shadow] duration-fast ease-out active:scale-97 motion-reduce:active:scale-100";

/**
 * Base styles shared by every form-field surface: the patient search field.
 * A white rounded rectangle with a 1px slate border at 3:1. Hover firms the
 * border and focus adds the teal outline. The transparent border is there so an
 * invalid field can turn it red.
 */
export const formFieldBase =
  "w-full min-w-0 rounded-md border border-transparent bg-(--field) px-3 text-sm text-foreground " +
  "shadow-(--control-ring) placeholder:text-muted-foreground " +
  "transition-[box-shadow,border-color] duration-fast ease-out " +
  "hover:shadow-(--control-lift) " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Height + vertical padding for single-line form fields (2rem, the patient search field). */
export const formFieldSingleLine = "flex h-8 py-1.5";

/** Vertical padding, min-height and a softer corner for multi-line form fields. */
export const formFieldMultiLine = "flex min-h-20 rounded-md px-3 py-2 leading-normal";

/**
 * The floating panel shared by every menu, popover, select and tooltip: a
 * white panel with a 1px cool border and a faint drop, like the filter menu.
 */
export const popoverSurface =
  "rounded-lg bg-popover p-1.5 text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel. */
export const menuItemBase =
  "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * A checked small control (checkbox box, radio, switch track). Radix marks it
 * with data-state="checked"; Base UI with data-checked.
 */
export const controlChecked =
  "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-(--primary-face) " +
  "data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[checked]:shadow-(--primary-face)";
