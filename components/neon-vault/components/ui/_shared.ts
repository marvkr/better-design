/**
 * Shared form-field styles for neon-vault.
 *
 * Fields are recessed dark tracks sunk into the vault surface: a deeper-than-
 * canvas --input fill with a soft inset contact shadow and a hairline border,
 * the inverse of the raised magenta and graphite buttons. Focus lights the
 * magenta ring. Single-line fields are pills to match the wallet's controls;
 * multi-line fields soften to a rounded panel.
 */

export const formFieldBase =
  "w-full px-4 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "[box-shadow:var(--shadow-inset)] " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "hover:border-ring/35 " +
  "focus-visible:outline-none focus-visible:border-ring/60 focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "aria-invalid:border-destructive aria-invalid:ring-destructive/30 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5 rounded-full"
export const formFieldMultiLine = "flex min-h-[5rem] py-2.5 resize-y rounded-xl"
