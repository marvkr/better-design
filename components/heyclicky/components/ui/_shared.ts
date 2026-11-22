/**
 * Shared styles for form-field components in Heyclicky.
 *
 * Any component that renders a bordered text input surface (Input, Textarea,
 * PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) MUST import
 * these constants instead of re-declaring classes. This guarantees identical
 * background, border, focus ring, hover, disabled, and transition behavior
 * across every form field in the design system.
 *
 * Heyclicky fields read like a crisp white panel cut into the dotted desktop:
 * a hairline edge, an 8px corner, and a system-blue focus ring. No inner
 * shadow, no glow, no heavy border.
 *
 * Do NOT copy-paste these classes into individual components - always import.
 */

/** Base styles shared by every form-field surface (Input, Textarea, etc.) */
export const formFieldBase =
  "w-full rounded-md px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[border-color,box-shadow] duration-base ease-out " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring " +
  "focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted";

/** Height + vertical padding for single-line form fields (h-10, the pill height) */
export const formFieldSingleLine = "flex h-10 py-2";

/** Vertical padding and min-height for multi-line form fields */
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2.5 resize-y";

/**
 * The floating panel surface, shared by every menu that drops over the page.
 *
 * A white window body behind a hairline, a 10px window corner, and the one
 * soft far-throw shadow. This is the same recipe Select, Menubar and
 * NavigationMenu declare inline, so a panel built from it matches them.
 */
export const popoverSurface =
  "rounded-lg border border-border bg-popover text-popover-foreground " +
  "shadow-[var(--shadow-m)]";
