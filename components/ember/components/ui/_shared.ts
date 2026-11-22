// Amber Glass: shared material recipes.
// Centralizes the dark-glass surface, the recessed input well and the amber
// primary material so every primitive reads as the SAME pane of glass lit by
// the same warm glow. All optical values live in globals.css :root as
// --ag-* / --shadow-* tokens; edit them there to retune the whole DS.

// Raised translucent panel: blur + hairline rim + top sheen + soft drop.
export const glassSurface =
  "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)] border border-[color:var(--ag-border)] shadow-[var(--shadow-glass)]";

// Hover state: the glass brightens and its rim sharpens.
export const glassHover =
  "hover:bg-[var(--ag-fill-hover)] hover:border-[color:var(--ag-border-strong)]";

// Floating glass: dropdown, select, popover, context-menu, tooltip,
// hover-card, menubar, command and navigation-menu all share this surface.
export const popoverSurface =
  "bg-popover text-popover-foreground backdrop-blur-[var(--ag-blur)] border border-[color:var(--ag-border)] shadow-[var(--shadow-popover)]";

// The amber primary material: gradient fill, rim, sheen and warm glow.
// Shared by the Button default variant and every filled control (checkbox,
// switch track, radio dot, slider range and thumb), scaled to size.
export const primaryMaterial =
  "text-primary-foreground bg-[image:var(--ag-primary-grad)] shadow-[var(--shadow-primary)] border-0";

export const primaryMaterialHover =
  "hover:shadow-[var(--shadow-primary-hover)] hover:brightness-[1.04]";

// Every form field (Input, Textarea, PasswordInput, SearchInput, NumberInput,
// PhoneInput, InputOTP) imports this single base: same recessed well, same
// amber focus glow.
export const formFieldBase =
  "w-full bg-[var(--ag-well)] text-foreground placeholder:text-muted-foreground " +
  "border border-[color:var(--ag-border)] shadow-[var(--shadow-well)] " +
  "transition-[border-color,box-shadow,background-color] duration-fast ease-out " +
  "hover:border-[color:var(--ag-border-strong)] " +
  "focus-visible:outline-none focus-visible:border-[color:oklch(0.69_0.195_42/0.55)] focus-visible:ring-2 focus-visible:ring-ring/35 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
