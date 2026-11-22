/**
 * Shared styles for Airy docs components.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes. This keeps the background,
 * border, focus ring, hover, disabled and transition behaviour identical
 * across every form field in the design system.
 *
 * Airy docs fields are white boxes behind a quiet grey hairline, with a
 * 0.5rem corner. Focus turns the edge green and adds a soft green halo, the
 * same green that marks every active thing in the system.
 *
 * Do NOT copy-paste these classes into individual components - always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full min-w-0 rounded-md border border-(--line-strong) bg-(--field) px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-fast ease-out " +
  "hover:border-(--control) " +
  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring " +
  "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)";

/** Height + vertical padding for single-line form fields (2.5rem) */
export const formFieldSingleLine = "flex h-10 py-2";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-24 py-2.5";

/**
 * The floating panel shared by every menu, popover and dropdown: a white
 * panel with a 0.75rem corner, edged by a hairline ring held in the menu shadow
 * token, with no soft shadow, so it reads in both themes without a separate border.
 */
export const popoverSurface =
  "rounded-lg bg-popover text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel: pale tray, 0.5rem corner. */
export const menuItemBase =
  "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-(--foreground-disabled)";

/**
 * The primary fill: a flat deep green with no gradient. Hover
 * darkens the green one step and the press one more. The pill shape comes
 * from the caller.
 */
export const primaryFill =
  "bg-primary text-primary-foreground hover:bg-(--primary-hover) active:bg-(--primary-active)";

/**
 * The same flat green on a small checked control (checkbox, radio, switch
 * track). Radix marks the checked state with data-state="checked"; Base UI
 * with data-checked. A disabled control goes quiet even when checked.
 */
export const controlChecked =
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground " +
  "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground " +
  "disabled:data-[state=checked]:border-(--line-strong) disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:text-(--foreground-disabled) " +
  "data-[disabled]:data-[checked]:border-(--line-strong) data-[disabled]:data-[checked]:bg-muted data-[disabled]:data-[checked]:text-(--foreground-disabled)";

/** A selected chip, toggle or nav row: the faint green wash with green ink. */
export const activeWash =
  "data-[state=on]:bg-(--primary-wash) data-[state=on]:text-(--primary-text) data-[state=on]:border-(--primary-line)";

/** The focus ring every interactive element uses: a soft green halo. */
export const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-ring";
