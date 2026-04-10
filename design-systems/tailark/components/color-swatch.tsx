import * as React from "react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Individual swatch
// ---------------------------------------------------------------------------

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: "sm" | "default" | "lg"
}

function ColorSwatch({
  color,
  label,
  size = "default",
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div
      className={cn("inline-flex flex-col items-center gap-1.5", className)}
      {...props}
    >
      <div
        className={cn(
          "rounded-[10px] border border-border/50",
          size === "sm"      && "h-8 w-8",
          size === "default" && "h-10 w-10",
          size === "lg"      && "h-14 w-14"
        )}
        style={{ background: color }}
        aria-label={label ?? color}
        title={label ?? color}
      />
      {label && (
        <span className="text-[10px] font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Palette group
// ---------------------------------------------------------------------------

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  swatches: Array<{ color: string; label?: string }>
  size?: ColorSwatchProps["size"]
  label?: string
}

function ColorPalette({
  swatches,
  size = "default",
  label,
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {swatches.map((s, i) => (
          <ColorSwatch key={i} color={s.color} label={s.label} size={size} />
        ))}
      </div>
    </div>
  )
}

export { ColorSwatch, ColorPalette }
