export const formFieldBase =
  "w-full rounded-[0.125rem] px-3 font-mono text-sm " +
  "bg-input text-foreground caret-accent " +
  "border-2 border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,background-color,transform] duration-fast " +
  "[box-shadow:var(--shadow-sm)] " +
  "hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:var(--shadow-md)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.5rem] py-2 resize-y"
