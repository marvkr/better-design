"use client"

import { BorderBeam as LibBorderBeam } from "border-beam"
import * as React from "react"

/*
 * Thin re-export of the official `border-beam` package.
 *
 * This DS exists to demonstrate the same visual language as `beam-custom`
 * but using the published library at https://beam.jakubantalik.com (npm
 * package `border-beam`) rather than a hand-rolled CSS implementation.
 * The library auto-detects the wrapped child's border-radius and renders
 * the conic-gradient beam, masked stroke, and bloom layer for us.
 */

type BorderBeamProps = React.ComponentProps<typeof LibBorderBeam>

const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>((props, ref) => (
  <LibBorderBeam ref={ref} {...props} />
))
BorderBeam.displayName = "BorderBeam"

export { BorderBeam }
export type { BorderBeamProps }
