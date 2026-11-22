/**
 * Shared form-field styles for pulse.
 *
 * Fields read as dark recessed wells on the analytics board: a faint inset
 * shadow for depth, a hairline border, and a violet focus glow that echoes
 * the primary accent. All seven form fields (input, textarea, password,
 * search, number, phone, otp) compose from this single base.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.3)] " +
  "placeholder:text-muted-foreground " +
  "transition-[color,border-color,box-shadow] duration-fast ease-out " +
  "hover:border-border/70 " +
  "focus-visible:outline-none focus-visible:border-primary/60 " +
  "focus-visible:[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.2),0_0_0_0.1875rem_oklch(from_var(--primary)_l_c_h/0.3)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
