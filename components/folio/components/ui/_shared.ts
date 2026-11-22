/**
 * Shared surface + form-field recipes for Folio.
 *
 * Folio's material is the dark "folder body": a charcoal dome lit from above,
 * carrying a crisp top rim highlight, faint folded-edge side rims, a deep soft
 * ambient pool, and a faint fractal-noise grain. Form fields invert this — they
 * are recessed pockets pressed INTO the folder (inset shadow), so raised
 * controls (buttons) and recessed controls (inputs) read as one material.
 */

import type { CSSProperties } from "react"

/* Fractal-noise grain, the reference's signature texture. Mirrors --folio-noise
 * in globals.css so DS components keep the grain even when consumed standalone
 * via the shadcn registry (where the showcase's [data-ds] vars are absent). */
export const FOLIO_NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/* Folder-body radial dome + faint grain, layered as a single backgroundImage.
 * Use as an inline style on raised surfaces (cards, sheets, popovers) to get
 * the lit-from-above folder look without per-component pseudo-elements. */
export const folioSurfaceStyle: CSSProperties = {
  backgroundImage: `${FOLIO_NOISE}, radial-gradient(circle at 50% 0%, oklch(0.235 0.005 70) 0%, oklch(0.18 0.004 70) 55%, oklch(0.135 0.003 70) 100%)`,
  // Noise tiles at a fixed size so the grain density is constant on every
  // surface; without this the SVG (no intrinsic size) scales to the element and
  // washes out on small ones. The dome fills the whole surface.
  backgroundSize: "140px 140px, 100% 100%",
  backgroundRepeat: "repeat, no-repeat",
  backgroundBlendMode: "overlay, normal",
}

/* Grain-only overlay. Unlike folioSurfaceStyle this keeps the element's own
 * background color (bg-primary, bg-secondary, bg-popover, ...) and just blends
 * the fractal grain over it, so buttons, popovers, and filled controls carry
 * the same texture as cards without losing their token color. */
export const folioGrainStyle: CSSProperties = {
  backgroundImage: FOLIO_NOISE,
  // Fixed tile + repeat so the grain stays the same density on a small button as
  // on a large card (the SVG has no intrinsic size and would otherwise scale to
  // the element and wash out).
  backgroundSize: "140px 140px",
  backgroundRepeat: "repeat",
  backgroundBlendMode: "overlay",
}

/* Bright "paper sheet" surface — the white inner documents from the reference.
 * Used by accent/inverse slots that want the folder's contents look. */
export const folioPaperStyle: CSSProperties = {
  backgroundImage: `${FOLIO_NOISE}, linear-gradient(oklch(0.99 0.003 85) 0%, oklch(0.95 0.004 85) 100%)`,
  backgroundSize: "140px 140px, 100% 100%",
  backgroundRepeat: "repeat, no-repeat",
  backgroundBlendMode: "multiply, normal",
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
