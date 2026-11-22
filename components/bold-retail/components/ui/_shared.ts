/**
 * Shared styles for Bold retail components.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes. This keeps the background,
 * border, focus ring, hover, disabled and transition behaviour identical
 * across every form field in the design system.
 *
 * Bold retail fields are white boxes behind a grey edge with a 0.75rem
 * corner, the way a checkout form reads. Focus turns the edge black and adds
 * a soft grey halo around it, the only focus halo the system uses.
 *
 * Do NOT copy-paste these classes into individual components - always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full min-w-0 rounded-lg border border-(--line-strong) bg-(--field) px-4 text-base text-foreground " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-fast ease-out " +
  "hover:border-(--control) " +
  "focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--halo) " +
  "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)";

/** Height + vertical padding for single-line form fields (3rem, the button height) */
export const formFieldSingleLine = "flex h-12 py-3";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-28 py-3";

/**
 * The soft grey search pill from the store header: filled, borderless, a
 * 1.5rem corner. Focus turns it white with a black edge and the grey halo.
 */
export const searchPill =
  "w-full min-w-0 rounded-3xl border border-transparent bg-secondary px-4 text-base text-foreground " +
  "placeholder:text-muted-foreground transition-[background-color,border-color,box-shadow] duration-fast ease-out " +
  "hover:bg-(--secondary-hover) " +
  "focus-visible:border-foreground focus-visible:bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--halo) " +
  "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)";

/**
 * The floating panel shared by every menu, popover and dropdown: a white
 * panel with a 1rem corner, edged by a hairline ring folded into a soft
 * shadow token, so it reads in both themes without a separate border.
 */
export const popoverSurface =
  "rounded-xl bg-popover text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel: soft grey fill, 0.5rem corner. */
export const menuItemBase =
  "relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-(--foreground-disabled)";

/**
 * The primary fill: flat black, no gradient and no shadow. Hover lifts it to
 * charcoal; the press shrinks the pill a little. The pill shape comes from
 * the caller.
 */
export const primaryFill =
  "bg-primary text-primary-foreground hover:bg-(--primary-hover) active:bg-(--primary-active)";

/**
 * The same flat black on a small checked control (checkbox, radio, switch
 * track). Radix marks the checked state with data-state="checked"; Base UI
 * with data-checked. A disabled control goes quiet even when checked.
 */
export const controlChecked =
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground " +
  "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground " +
  "disabled:data-[state=checked]:border-(--line-strong) disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:text-(--foreground-disabled) " +
  "data-[disabled]:data-[checked]:border-(--line-strong) data-[disabled]:data-[checked]:bg-muted data-[disabled]:data-[checked]:text-(--foreground-disabled)";

/**
 * A selected filter chip, toggle or segment: it flips fully to black with
 * white text. There is no middle state.
 */
export const activeInvert =
  "data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground";

/** The focus ring every interactive element uses: a black ring offset from the part. */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
