// Shared material recipes.
// A light recruiting platform: crisp white surfaces over a warm off-white
// canvas, quiet depth from a hairline rim plus a soft low-alpha ambient
// shadow, and one confident orange material on the primary actions. All
// optical values live in globals.css :root as --tb-* tokens; retune there.

// The raised orange primary material. The primary Button and every filled
// control (checkbox checked, switch track, radio dot, slider range + thumb)
// share this exact treatment so they read as one material.
export const tbPrimaryRaised =
  "bg-[image:var(--tb-primary-gradient)] text-primary-foreground shadow-[var(--tb-shadow-primary)]";

export const tbPrimaryRaisedHover =
  "hover:shadow-[var(--tb-shadow-primary-hover)] hover:brightness-[1.03]";

// Scaled-down primary material for small filled controls.
export const tbControlFill =
  "bg-[image:var(--tb-primary-gradient)] shadow-[var(--tb-shadow-primary-sm)]";

// Quiet neutral panel: secondary buttons, toolbar chips, kbd.
export const tbRaisedPanel =
  "bg-card text-secondary-foreground border border-border shadow-[var(--tb-shadow-raise)]";

// Card surface: white panel lifted off the canvas by the soft card shadow.
export const tbCardSurface =
  "bg-card text-card-foreground border border-border shadow-[var(--tb-shadow-card)]";

// Floating surface: dropdowns, selects, popovers, tooltips, command,
// context menus, menubar, navigation menu, hover cards. One shadow token.
export const tbPopSurface =
  "bg-popover text-popover-foreground border border-border shadow-[var(--tb-shadow-pop)]";

// Every form field (Input, Textarea, PasswordInput, SearchInput, NumberInput,
// PhoneInput, InputOTP) imports this single base: white fill, hairline border,
// orange focus ring.
export const formFieldBase =
  "w-full bg-input text-foreground placeholder:text-muted-foreground " +
  "border border-border shadow-[var(--tb-shadow-inset)] " +
  "transition-[border-color,box-shadow,background-color] duration-fast ease-out " +
  "hover:border-muted-foreground/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
