/**
 * Shared surface + form-field recipes for Emerald Analytics.
 *
 * Emerald Analytics' material is the dark dashboard panel: a flat charcoal-green
 * surface with a faint top-down sheen, lit from above, separated from the canvas
 * by a hairline border and a quiet ambient shadow. Raised controls (buttons) and
 * recessed controls (inputs) read as one material: panels sit slightly above the
 * canvas, fields press slightly into it. There is no texture or grain: the look
 * is clean, calm and data-first.
 */

import type { CSSProperties } from "react"

/* Raised panel sheen: a subtle vertical lift from a touch lighter at the top to
 * a touch darker at the base, mirroring --emerald-sheen in globals.css so DS
 * components keep the sheen even when consumed standalone via the shadcn
 * registry (where the showcase's [data-ds] vars are absent). Use on cards,
 * sheets and other large raised surfaces. */
export const emeraldSurfaceStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(oklch(0.235 0.024 164) 0%, oklch(0.205 0.021 163) 100%)",
}

/* Panel sheen overlay. Unlike emeraldSurfaceStyle this keeps the element's own
 * background colour (bg-primary, bg-secondary, bg-popover, ...) and lays a very
 * faint top-light gradient over it, so buttons, popovers and filled controls
 * carry the same lit-from-above sheen as cards without losing their token
 * colour. */
export const emeraldPanelStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(oklch(1 0 0 / 0.04) 0%, oklch(1 0 0 / 0) 45%)",
}

/* Bright emerald surface — the vivid accent fill used by primary/inverse slots
 * that want the dashboard's CTA look. */
export const emeraldBrightStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(oklch(0.78 0.16 158) 0%, oklch(0.7 0.17 158) 100%)",
}

export const formFieldBase =
  "w-full rounded-lg px-3 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-9 py-1.5"
export const formFieldMultiLine = "flex min-h-[5rem] py-2 resize-y"
