import * as React from "react"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────────────────────
// Single Color Swatch
// ──────────────────────────────────────────────────────────────────────────────
export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "default" | "lg"
  selected?: boolean
  onSelect?: () => void
}

const swatchSizeMap = {
  sm:      "h-6 w-6",
  default: "h-9 w-9",
  lg:      "h-12 w-12",
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ color, label, size = "default", selected = false, onSelect, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-1", className)}
        {...props}
      >
        <button
          type="button"
          onClick={onSelect}
          aria-label={label ?? color}
          aria-pressed={selected}
          className={cn(
            "rounded-lg border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            swatchSizeMap[size],
            selected
              ? "border-primary ring-2 ring-primary/30 scale-110"
              : "border-border hover:border-primary/50 hover:scale-105",
          )}
          style={{ backgroundColor: color }}
        />
        {label && (
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
        )}
      </div>
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"

// ──────────────────────────────────────────────────────────────────────────────
// Color Palette (group of swatches)
// ──────────────────────────────────────────────────────────────────────────────
export interface ColorPaletteItem {
  color: string
  label?: string
}

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: ColorPaletteItem[]
  value?: string
  onValueChange?: (color: string) => void
  swatchSize?: ColorSwatchProps["size"]
  label?: string
}

const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  ({ colors, value, onValueChange, swatchSize = "default", label, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <p className="text-sm font-semibold text-foreground">{label}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {colors.map((item) => (
            <ColorSwatch
              key={item.color}
              color={item.color}
              label={item.label}
              size={swatchSize}
              selected={value === item.color}
              onSelect={() => onValueChange?.(item.color)}
            />
          ))}
        </div>
      </div>
    )
  }
)
ColorPalette.displayName = "ColorPalette"

export { ColorSwatch, ColorPalette }
