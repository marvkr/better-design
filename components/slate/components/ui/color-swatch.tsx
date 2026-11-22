import * as React from "react"
import { cn } from "@/lib/utils"

// Ops Sharp Color Swatch: a small chip with a hairline rim and tight contact
// shadow, sharp corners, optional mono hex label.

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "md" | "lg"
  showHex?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6 rounded-sm",
  md: "h-8 w-8 rounded-md",
  lg: "h-12 w-12 rounded-lg",
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
          sizeClasses[size],
          "border border-border [box-shadow:var(--shadow-xs)]"
        )}
        style={{ backgroundColor: color }}
        title={color}
      />
      {(label || showHex) && (
        <div className="flex flex-col items-center gap-0.5">
          {label && (
            <span className="text-xs font-medium text-foreground">{label}</span>
          )}
          {showHex && (
            <span className="font-mono text-[0.625rem] text-muted-foreground">{color}</span>
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
