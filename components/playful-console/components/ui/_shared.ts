/**
 * Shared styles for Playful console components.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes, so every field in the
 * system shares one surface, edge, focus ring and disabled state.
 *
 * Playful console fields are plain white wells on the cream page: a firm
 * olive edge, a 0.25rem corner, and a bold blue edge plus ring on focus.
 * The chunky offset press belongs to buttons and checked controls only.
 *
 * Do NOT copy-paste these classes into individual components - always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full min-w-0 rounded-md border border-(--line-strong) bg-(--field) px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-fast ease-out " +
  "hover:border-(--control) " +
  "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-(--highlight-blue) " +
  "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)";

/** Height + vertical padding for single-line form fields (2.25rem) */
export const formFieldSingleLine = "flex h-9 py-1.5";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-24 py-2";

/**
 * The floating panel surface, shared by every menu that drops over the page:
 * a white card with the olive hairline, the card corner and a soft drop.
 */
export const popoverSurface =
  "rounded-lg border border-border bg-popover text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel: a cream wash, 0.25rem corner. */
export const menuItemBase =
  "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-(--foreground-disabled)";

/**
 * The press: a bordered face that sits on an offset slab. It lifts a little
 * under the pointer and drops into the slab when pressed. The bottom edge of
 * the slab never moves, so the button reads as a physical key.
 */
export const pressBase =
  "border-[0.09375rem] transition-[translate,box-shadow,background-color] duration-fast ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0.5";

/** The orange key: the primary action on a darker orange slab. */
export const pressPrimary =
  "border-[0.09375rem] transition-[translate,box-shadow,background-color] duration-fast ease-out hover:-translate-y-0.5 active:translate-y-0.5 border-(--primary-rim) bg-primary text-primary-foreground shadow-(--shadow-press-primary) " +
  "hover:shadow-(--shadow-press-primary-hover) active:shadow-(--shadow-press-primary-active)";

/** The white key on the orange slab: the friendly second action. */
export const pressSecondary =
  "border-[0.09375rem] transition-[translate,box-shadow,background-color] duration-fast ease-out hover:-translate-y-0.5 active:translate-y-0.5 border-(--primary-rim) bg-card text-foreground shadow-(--shadow-press-secondary) " +
  "hover:shadow-(--shadow-press-secondary-hover) active:shadow-(--shadow-press-secondary-active)";

/** The quiet key: a white face on a cream slab with an olive edge. */
export const pressOutline =
  "border-[0.09375rem] transition-[translate,box-shadow,background-color] duration-fast ease-out hover:-translate-y-0.5 active:translate-y-0.5 border-(--line-strong) bg-card text-foreground shadow-(--shadow-press-outline) " +
  "hover:shadow-(--shadow-press-outline-hover) active:shadow-(--shadow-press-outline-active)";

/** The red key, for an action that removes something. */
export const pressDestructive =
  "border-[0.09375rem] transition-[translate,box-shadow,background-color] duration-fast ease-out hover:-translate-y-0.5 active:translate-y-0.5 border-(--destructive-base) bg-destructive text-destructive-foreground shadow-(--shadow-press-destructive) " +
  "hover:shadow-(--shadow-press-destructive-hover) active:shadow-(--shadow-press-destructive-active)";

/**
 * A small checked control (checkbox, radio, switch track) wears the orange
 * key at a shorter slab. Radix marks the checked state with data-state="checked".
 */
export const controlChecked =
  "data-[state=checked]:border-(--primary-rim) data-[state=checked]:bg-primary " +
  "data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-(--shadow-control) " +
  // A disabled control goes quiet even when checked: cream fill, no slab.
  "disabled:data-[state=checked]:border-(--line-strong) disabled:data-[state=checked]:bg-secondary " +
  "disabled:data-[state=checked]:shadow-none disabled:data-[state=checked]:text-(--foreground-disabled)";

/** An unchecked small control: a white face with an olive edge and a thin slab. */
export const controlUnchecked =
  "border-[0.09375rem] border-(--line-strong) bg-(--field) shadow-(--shadow-control-off)";

/** A pressed toggle or chip: the orange wash behind the orange rim. */
export const pressedWash =
  "data-[state=on]:border-(--primary-rim) data-[state=on]:bg-(--primary-wash) data-[state=on]:text-foreground";
