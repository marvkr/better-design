/**
 * Shared form-field recipe for Electric Fintech.
 *
 * Fields are recessed cool-charcoal pockets pressed into the near-black page
 * (inset shadow), with a hairline border that brightens to the electric-yellow
 * ring on focus. Every form field (Input, Textarea, PasswordInput, SearchInput,
 * NumberInput, PhoneInput, InputOTP) imports formFieldBase so they share one
 * material; raised controls (Button) lift, recessed controls (fields) sink.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-border/70 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
