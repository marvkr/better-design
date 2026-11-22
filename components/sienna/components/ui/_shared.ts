/** Shared surface and form-field recipes for Sienna. */

import type { CSSProperties } from "react"

export const siennaSurfaceStyle: CSSProperties = {}
export const siennaGrainStyle: CSSProperties = {}

export const formFieldBase =
  "w-full rounded-lg px-3.5 text-sm " +
  "bg-input text-foreground border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-fast ease-out " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-foreground/20 hover:[box-shadow:var(--shadow-sm)] " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

export const formFieldSingleLine = "flex h-10 py-2"
export const formFieldMultiLine = "flex min-h-[5.25rem] py-2.5 resize-y"
