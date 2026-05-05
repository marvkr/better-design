import * as React from "react"
import { cn } from "@/lib/utils"

// Glassmorphic Dark Color Swatch: displays a color with glass border ring

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
          "ring-2 ring-white/10 ring-offset-2 ring-offset-transparent",
          "shadow-[0_0_12px_rgba(255,255,255,0.06),inset_0_0_4px_rgba(255,255,255,0.1)]",
          "backdrop-blur-sm"
        )}
        style={{ backgroundColor: color }}
        title={color}
      />
      {(label || showHex) && (
        <div className="flex flex-col items-center gap-0.5">
          {label && (
            <span className="text-xs font-medium text-white/80">{label}</span>
          )}
          {showHex && (
            <span className="font-mono text-[10px] text-white/40">{color}</span>
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
