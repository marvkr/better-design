export const formFieldSurface = [
  "rounded-md bg-input text-sm text-foreground",
  "[box-shadow:var(--shadow-control)]",
  "placeholder:text-muted-foreground",
  "transition-[box-shadow,background-color] duration-fast",
  "hover:[box-shadow:var(--shadow-control-hover)]",
  "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]",
  "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
].join(" ")

export const formFieldBase = `${formFieldSurface} w-full`

export const searchFieldBase = [
  "w-full rounded-lg bg-muted text-sm text-foreground",
  "placeholder:text-muted-foreground",
  "transition-[background-color,box-shadow] duration-fast",
  "hover:bg-accent",
  "focus-visible:bg-background focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]",
  "disabled:cursor-not-allowed disabled:opacity-70",
].join(" ")

export const floatingSurface =
  "rounded-lg bg-popover text-popover-foreground [box-shadow:var(--shadow-popover)]"

export const dialogSurface =
  "rounded-xl bg-background [box-shadow:var(--shadow-dialog)]"
