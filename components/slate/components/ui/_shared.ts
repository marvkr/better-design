/**
 * Shared form-field recipe for Ops Sharp.
 *
 * The reference's inputs are crisp white wells pressed into the panel: a pure
 * white surface, a hairline border, a tight inset shadow for depth, and a
 * graphite focus ring that mirrors the primary ink. Every form field (Input,
 * Textarea, PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP)
 * imports this one constant so the whole set stays in lockstep.
 */

export const formFieldBase =
  "w-full rounded-md px-3 text-sm " +
  "bg-card text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/30 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const formFieldSingleLine = "flex h-9 py-1.5";
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y";
