/**
 * Shared form-field styles for lumen-dark.
 *
 * Inputs use the "inset shadow" direction (light source from above still applies,
 * but fields are pressed INTO the surface, so the contact shadow is on top/inside).
 * This creates the depth contrast: buttons feel raised, inputs feel recessed.
 */

export const formFieldBase =
  "w-full rounded-none px-3 text-sm " +
  "bg-[var(--mono-surface)] text-foreground " +
  "border border-[var(--mono-border-visible)] " +
  "font-[family-name:var(--font-mono)] " +
  "placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-[0.08em] " +
  "transition-colors duration-150 ease-out " +
  "hover:border-foreground/60 " +
  "focus-visible:outline-none focus-visible:border-[var(--mono-accent)] " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y"
