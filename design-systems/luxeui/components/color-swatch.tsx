import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe ColorSwatch: color chip with hex/name label — useful in design system docs
// ColorPalette groups multiple swatches in a responsive grid

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "default" | "lg"
}

const swatchSizeMap = {
  sm:      "h-8 w-8",
  default: "h-12 w-12",
  lg:      "h-16 w-16",
}

function ColorSwatch({
  color,
  label,
  size = "default",
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)} {...props}>
      <div
        className={cn(
          swatchSizeMap[size],
          "rounded-xl border border-border/60 shadow-inner"
        )}
        style={{ backgroundColor: color }}
        aria-label={label ?? color}
        title={label ?? color}
      />
      {label && (
        <div className="text-center">
          <p className="text-xs font-medium text-foreground tracking-wide">{label}</p>
          <p className="text-[10px] font-mono text-muted-foreground">{color}</p>
        </div>
      )}
    </div>
  )
}

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>
  size?: "sm" | "default" | "lg"
}

function ColorPalette({
  colors,
  size = "default",
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-4", className)}
      {...props}
    >
      {colors.map((item, i) => (
        <ColorSwatch
          key={i}
          color={item.color}
          label={item.label}
          size={size}
        />
      ))}
    </div>
  )
}

export { ColorSwatch, ColorPalette }
