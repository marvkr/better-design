/**
 * Shared form-field styles for Command Noir.
 *
 * Fields read like the palette's search row: a shallow recessed well on the
 * near-black surface, a hairline rim, mono-leaning text, and a cool accent
 * focus ring that matches the selection accent used across the system.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-well)] " +
  "hover:border-border/80 " +
  "focus-visible:outline-none focus-visible:border-transparent focus-visible:[box-shadow:var(--shadow-well),0_0_0_0.125rem_var(--ring)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
