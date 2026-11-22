import * as React from "react"
import { cn } from "@/lib/utils"

// Halo Color Swatch: displays a color with translucent border ring

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "md" | "lg"
  showHex?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
}

function ColorSwatch({
  color,
  label,
  size = "md",
  showHex,
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)} {...props}>
      <div
        className={cn(
          "rounded-full",
          sizeClasses[size],
          "ring-2 ring-border ring-offset-2 ring-offset-transparent",
          "shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_6%,transparent),inset_0_0_0.25rem_color-mix(in_oklch,var(--halo)_10%,transparent)]",
          "backdrop-blur-sm"
        )}
        style={{ backgroundColor: color }}
        title={color}
      />
      {(label || showHex) && (
        <div className="flex flex-col items-center gap-0.5">
          {label && (
            <span className="text-xs font-medium text-foreground/80">{label}</span>
          )}
          {showHex && (
            <span className="font-mono text-[0.625rem] text-foreground/40">{color}</span>
          )}
        </div>
      )}
    </div>
  )
}

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>
  size?: ColorSwatchProps["size"]
  showHex?: boolean
}

function ColorPalette({ colors, size, showHex, className, ...props }: ColorPaletteProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)} {...props}>
      {colors.map((c, i) => (
        <ColorSwatch key={i} color={c.color} label={c.label} size={size} showHex={showHex} />
      ))}
    </div>
  )
}

export { ColorSwatch, ColorPalette }
export type { ColorSwatchProps, ColorPaletteProps }
