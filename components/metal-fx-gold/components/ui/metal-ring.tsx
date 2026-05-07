"use client"

import * as React from "react"
import { MetalFx } from "metal-fx"

import { cn } from "@/lib/utils"

/*
 * Metal Ring — animated WebGL liquid-metal frame from `metal-fx` (the
 * official npm package by Jakub Antalik). The shader paints a gold ring
 * with proximity reflections; the wrapped child stays the actual
 * interactive element.
 *
 * `shape="rect"` falls back to no ring — `metal-fx` only ships button
 * (pill) and circle variants, and the rect/input use case isn't part of
 * the library's design.
 */

type RingShape = "pill" | "rect"

interface MetalRingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  shape?: RingShape
  active?: boolean
  block?: boolean
}

const MetalRing = React.forwardRef<HTMLDivElement, MetalRingProps>(
  ({ children, shape = "pill", active = true, block = false, className, ...props }, ref) => {
    if (shape === "rect") {
      return (
        <div
          ref={ref}
          className={cn(block ? "block w-full" : "inline-flex align-middle", className)}
          {...props}
        >
          {children}
        </div>
      )
    }
    return (
      <div
        ref={ref}
        className={cn(block ? "block w-full" : "inline-flex align-middle", className)}
        {...props}
      >
        <MetalFx variant="button" preset="gold" theme="dark" paused={!active} disableGlow>
          {children}
        </MetalFx>
      </div>
    )
  },
)
MetalRing.displayName = "MetalRing"

export { MetalRing }
export type { MetalRingProps }
