"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Hand-rolled border beam — replicates beam.jakubantalik.com without a
 * runtime dependency. The effect is two stacked layers:
 *
 *   1. ::after — the masked beam stroke. A conic-gradient fills the wrapper,
 *      then a CSS mask (matrix subtract: full minus inner) clips it to the
 *      border-only region. CSS @property + @keyframes rotate the gradient.
 *
 *   2. ::before — the outer bloom. A radial-gradient + blur creates a soft
 *      glow around the wrapper that bleeds out beyond the element bounds.
 *
 * Both layers use pointer-events: none so they never intercept input.
 * The effect respects prefers-reduced-motion via `data-beam-static`.
 */

type BeamSize = "sm" | "md" | "line"
type BeamVariant = "colorful" | "mono" | "ocean" | "sunset"

interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: BeamSize
  variant?: BeamVariant
  active?: boolean
  borderRadius?: number
}

const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    { children, size = "md", variant = "colorful", active = true, borderRadius, className, style, ...props },
    ref,
  ) => {
    const radius = borderRadius != null ? `${borderRadius}px` : undefined
    return (
      <div
        ref={ref}
        data-beam-size={size}
        data-beam-variant={variant}
        data-beam-active={active ? "true" : "false"}
        className={cn("beam-custom-wrap", className)}
        style={{ ...(radius ? { ["--beam-radius" as string]: radius } : null), ...style }}
        {...props}
      >
        {children}
      </div>
    )
  },
)
BorderBeam.displayName = "BorderBeam"

export { BorderBeam }
export type { BorderBeamProps }
