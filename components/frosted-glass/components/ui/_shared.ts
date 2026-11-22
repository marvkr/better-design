// Frosted Glass — shared surface treatments.
// Centralizes the layered specular-rim + chromatic-fringe glass material so every
// primitive reads as the SAME piece of glass. All optical values live in
// globals.css :root as --fg-* tokens; edit them there to retune the whole DS.

// The signature glass surface: heavy backdrop blur+saturate (frosts + picks up
// backdrop chroma) + the layered --fg-shadow (specular rim + chromatic edge +
// depth + glow).
export const frostedGlassSurface =
  "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)] border border-[color:var(--fg-border)] shadow-[var(--fg-shadow)]";

// Hover state: brighter fill + intensified rim/glow (the glass "lights up").
export const frostedGlassHover =
  "hover:bg-[var(--fg-fill-hover)] hover:shadow-[var(--fg-shadow-hover)]";

// Every form field (Input, Textarea, PasswordInput, SearchInput, NumberInput,
// PhoneInput, InputOTP) imports this single base — same glass, same focus ring.
export const formFieldBase =
  "w-full text-foreground placeholder:text-muted-foreground transition-all duration-slow ease-out " +
  "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)] " +
  "border border-[color:var(--fg-border)] shadow-[var(--fg-shadow)] " +
  "hover:bg-[var(--fg-fill-hover)] " +
  "focus-visible:outline-none focus-visible:border-[color:var(--ring)] focus-visible:ring-2 focus-visible:ring-ring/50 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
