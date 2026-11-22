"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass ColorSwatch: glass-rimmed color chips.

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "md" | "lg"
  showHex?: boolean
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ className, color, label, size = "md", showHex, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-start gap-1.5", className)}
      {...props}
    >
      <span
        className={cn(
          "rounded-lg ring-1 ring-[oklch(1_0_0/0.12)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.15),0_0.125rem_0.5rem_oklch(0_0_0/0.3)]",
          sizeClasses[size]
        )}
        style={{ backgroundColor: color }}
        role="img"
        aria-label={label ?? color}
      />
      {label && (
        <span className="text-xs font-semibold tracking-[-0.01em]">{label}</span>
      )}
      {showHex && (
        <span className="font-mono text-[0.625rem] text-muted-foreground">{color}</span>
      )}
    </div>
  )
)
ColorSwatch.displayName = "ColorSwatch"

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>
  size?: ColorSwatchProps["size"]
  showHex?: boolean
}

const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  ({ className, colors, size, showHex, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-start gap-3", className)}
      {...props}
    >
      {colors.map((entry, i) => (
        <ColorSwatch
          key={i}
          color={entry.color}
          label={entry.label}
          size={size}
          showHex={showHex}
        />
      ))}
    </div>
  )
)
ColorPalette.displayName = "ColorPalette"

export { ColorSwatch, ColorPalette }
export type { ColorSwatchProps, ColorPaletteProps }
