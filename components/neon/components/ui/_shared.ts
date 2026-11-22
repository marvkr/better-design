/**
 * Shared form-field styles for neon.
 *
 * Fields sit as quiet dark wells on the near-black ground: a soft inner shadow,
 * hairline border, and a neon-green focus glow with a smooth low-alpha falloff
 * (never a hard ring). The 7 form fields import this single base so they stay
 * in sync.
 */

export const formFieldBase =
  "w-full rounded-[0.625rem] px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)] " +
  "hover:border-[oklch(1_0_0_/_0.16)] " +
  "focus-visible:outline-none focus-visible:border-[oklch(0.86_0.22_145_/_0.6)] " +
  "focus-visible:[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4),0_0_0_0.1875rem_oklch(0.86_0.22_145_/_0.18),0_0.25rem_0.875rem_-0.25rem_oklch(0.86_0.22_145_/_0.22)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
