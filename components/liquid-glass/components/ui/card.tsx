"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { GlassLayer, type GlassOptics } from "./glass-layer"

/*
 * Liquid Glass Card — the kit's GlassCard. The face frosts and tints whatever
 * lies behind the card so its text stays readable, and the rim pulls the
 * backdrop towards the centre. A card holds content, so it stays still under
 * the pointer. The classes are the same tint and frost in CSS, shown before
 * the first glass frame and kept without WebGL2.
 */

// The card's own glass, from the kit: a radial rim bend, a 5px frost over the
// bent picture, a 70% tint and a hairline white rim. No colour split, no light.
const CARD_OPTICS: GlassOptics = {
  bendMode: "radial",
  borderColor: "#ffffff",
  borderAlpha: 0.6,
  borderWidth: 1.3,
  frostMix: 1,
  frostEdge: 1,
  saturation: 1,
  refraction: 1,
  bendDepth: 1.35,
  bendCurve: 9.75,
  dispersion: 0,
  magnify: 0,
  light: 0,
  cursorLight: false,
  shadow: 0,
  dark: { borderAlpha: 0.25 },
}

interface CardProps extends React.ComponentProps<"div"> {
  /** Repaint the backdrop every frame, for content that moves behind the card. */
  live?: boolean
}

function Card({ className, live = false, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-glass-host=""
      className={cn(
        "flex flex-col rounded-[1.75rem] border border-(--glass-rim) bg-(--glass-fill) text-card-foreground backdrop-blur-[0.3125rem]",
        className
      )}
      {...props}
    >
      {/* The glass layer must be the host's first child. */}
      <GlassLayer material="clear" tint={0.7} blur={5} live={live} swell={false} optics={CARD_OPTICS} />
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-[1.0625rem] font-semibold leading-snug tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 pb-6", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center gap-2 px-6 pb-6", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
