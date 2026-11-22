// Kanban Glass form-field base — shared across Input, Textarea, PasswordInput,
// SearchInput, NumberInput, PhoneInput, InputOTP.
// White card field on the off-white board: friendly radius, hairline border,
// a faint resting lift, and an indigo focus ring (the board's accent).
export const formFieldBase = [
  "w-full bg-card",
  "border border-border rounded-[var(--radius-md)]",
  "px-3.5 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground",
  "shadow-[var(--shadow-xs)]",
  "transition-[box-shadow,border-color,background] duration-fast ease-out",
  "hover:border-[color:oklch(0_0_0/0.14)]",
  "focus-visible:outline-none focus-visible:border-[color:var(--primary)] focus-visible:ring-2 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");
