// Delphi form-field base — shared across Input, Textarea, PasswordInput, etc.
// White pill on cream, big radius, soft pillow shadow, no harsh border.
export const formFieldBase = [
  "w-full bg-card/80 backdrop-blur",
  "border border-border rounded-2xl",
  "px-4 py-3 text-sm text-foreground",
  "placeholder:text-muted-foreground",
  "shadow-[var(--shadow-xs)]",
  "transition-[box-shadow,border-color,background] duration-fast ease-out",
  "hover:bg-card",
  "focus-visible:outline-none focus-visible:border-primary/40 focus-visible:shadow-[var(--shadow-sm)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");
