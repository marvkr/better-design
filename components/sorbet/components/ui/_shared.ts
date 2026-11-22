/**
 * Shared surface + form-field recipes for Amie Pastel.
 *
 * Amie's material is soft and pillowy: a light off-white ground, generous
 * rounding, and gentle low-contrast shadows. There is no grain or dome here.
 * Raised surfaces (cards, sheets, popovers) carry a barely-there top sheen so
 * they read as soft inflated panels; recessed controls (inputs) get a faint
 * inset so raised and recessed parts read as one airy material.
 */

import type { CSSProperties } from "react"

/* Card / sheet surface: a soft vertical lift from pure card white to a hair of
 * warmth at the base, giving the panel a gentle pillowed body without any hard
 * edges. Layered under the soft ambient shadow tokens in globals.css. */
export const amieSurfaceStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.992 0.004 95) 100%)",
}

/* Popover / floating-surface sheen: keeps the element's own token background
 * (bg-popover, bg-primary, ...) and lays a faint top-light highlight over it so
 * floating surfaces look softly inflated rather than flat. Replaces Folio's
 * fractal grain; Amie has no texture, only soft light. */
export const amieGrainStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, oklch(1 0 0 / 0.5) 0%, oklch(1 0 0 / 0) 42%)",
}

export const formFieldBase =
  "w-full rounded-xl px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/40 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2.5 resize-y"
