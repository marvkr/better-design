"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Metal Ring — wraps an element with an animated iridescent ring that traces
 * its silhouette, mimicking the jakubantalik/metal-fx WebGL liquid-metal effect
 * with pure CSS (conic-gradient + mask).
 *
 * Two layers:
 *   ::after — the masked chromatic stroke (the visible "ring")
 *   ::before — the outer bloom (soft glow that bleeds beyond bounds)
 *
 * Both pointer-events: none.
 */

type RingShape = "pill" | "rect"

interface MetalRingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  shape?: RingShape
  active?: boolean
  block?: boolean
}

const MetalRing = React.forwardRef<HTMLDivElement, MetalRingProps>(
  ({ children, shape = "pill", active = true, block = false, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-metal-shape={shape}
        data-metal-active={active ? "true" : "false"}
        className={cn("metal-fx-ring", block ? "block w-full" : "inline-flex align-middle", className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  },
)
MetalRing.displayName = "MetalRing"

export { MetalRing }
export type { MetalRingProps }
