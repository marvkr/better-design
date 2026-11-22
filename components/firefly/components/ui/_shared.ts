/**
 * Shared styles for Firefly components.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes. This guarantees identical
 * background, border, focus ring, hover, disabled, and transition behavior
 * across every form field in the design system.
 *
 * Firefly fields are warm paper wells: a strong hairline around a warm field,
 * a 0.75rem corner, and an olive outline that sits flush on focus. No inner
 * shadow and no glow: the glow belongs to the one primary action.
 *
 * Do NOT copy-paste these classes into individual components - always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full min-w-0 rounded-lg border border-(--line-strong) bg-(--field) px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color] duration-fast ease-out " +
  "hover:border-(--control) " +
  "focus-visible:border-(--accent-line) focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring " +
  "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)";

/** Height + vertical padding for single-line form fields (2.5rem, the control height) */
export const formFieldSingleLine = "flex h-10 py-2";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-24 py-2.5";

/**
 * The floating panel surface, shared by every menu that drops over the page.
 *
 * A raised white panel with a 1rem corner and a soft far shadow, and no
 * border: the shadow edges it. Dark mode adds a hairline ring inside the
 * same shadow token, so the panel still reads against a dark page.
 */
export const popoverSurface =
  "rounded-xl bg-popover text-popover-foreground shadow-(--shadow-menu)";

/** A highlighted row inside a floating panel: warm surface, 0.625rem corner. */
export const menuItemBase =
  "relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-3 py-1.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-(--foreground-disabled)";

/**
 * The lit pill. A two-stop yellow-green gradient sits under three white
 * highlights, with an inner top line and a soft bloom. A brighter layer
 * fades in under the pointer, and the press drops to a deeper gradient.
 * Pair it with a rounded shape; the overlay inherits the corner.
 */
export const glowPrimary =
  "relative isolate overflow-hidden bg-primary bg-(image:--gradient-primary) text-primary-foreground shadow-(--shadow-primary) " +
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] " +
  "before:bg-(image:--gradient-primary-hover) before:shadow-(--shadow-primary-hover) " +
  "before:opacity-0 before:transition-opacity before:duration-base before:ease-out " +
  "hover:before:opacity-100 active:bg-(image:--gradient-primary-active) active:before:opacity-0";

/** The destructive twin of the lit pill: a deep red gradient, lit more softly. */
export const glowDestructive =
  "relative isolate overflow-hidden bg-destructive bg-(image:--gradient-destructive) text-destructive-foreground shadow-(--shadow-destructive) " +
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] " +
  "before:bg-(image:--gradient-destructive-hover) before:shadow-(--shadow-destructive-hover) " +
  "before:opacity-0 before:transition-opacity before:duration-base before:ease-out " +
  "hover:before:opacity-100 active:bg-(image:--gradient-destructive-active) active:before:opacity-0";

/**
 * The lit material on a small checked control (checkbox, radio, switch track).
 * Radix marks the checked state with data-state="checked".
 */
export const glowControlChecked =
  "data-[state=checked]:border-transparent data-[state=checked]:bg-primary " +
  "data-[state=checked]:bg-(image:--gradient-primary) data-[state=checked]:text-primary-foreground " +
  "data-[state=checked]:shadow-(--shadow-control) " +
  // A disabled control goes quiet even when checked: no glow, warm paper fill.
  "disabled:data-[state=checked]:bg-secondary disabled:data-[state=checked]:bg-none " +
  "disabled:data-[state=checked]:shadow-none disabled:data-[state=checked]:text-(--foreground-disabled)";

/** A pressed toggle or chip: the pale accent wash behind an olive line. */
export const pressedWash =
  "data-[state=on]:border-(--accent-line) data-[state=on]:bg-(--accent-wash) data-[state=on]:text-foreground";
