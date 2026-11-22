/**
 * Shared surface + form-field recipes for Cashmere.
 *
 * Cashmere's material is clean warm paper, NOT a glossy pillow. Cards and
 * floating surfaces are crisp white with a hairline ring + a very soft float
 * (the shadow tokens in globals.css) — no gradient sheen, no inset highlight.
 * The two surface helpers below are therefore intentionally flat (empty); they
 * exist so every surface component shares one import point, and so the DS can
 * dial in a tint later without touching 18 files.
 */

import type { CSSProperties } from "react"

/* Card / sheet surface: flat. Depth comes from the ring + float shadow tokens,
 * never a fill gradient — that is what makes Cashmere read as paper. */
export const cashmereSurfaceStyle: CSSProperties = {}

/* Popover / floating-surface: flat. Same reasoning — clean token background,
 * hairline ring from --shadow-l, no top sheen. */
export const cashmereGrainStyle: CSSProperties = {}

export const formFieldBase =
  "w-full rounded-lg px-3.5 text-sm " +
  "bg-input text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-foreground/20 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2.5 resize-y"
