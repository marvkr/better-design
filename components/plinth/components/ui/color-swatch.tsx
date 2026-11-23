import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Color Swatch: a colour chip seated in a recessed well, the way the
 * editor shows a background choice, with a mono readout of the value.
 */

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  name?: string
  size?: "sm" | "md" | "lg"
  showHex?: boolean
  showValue?: boolean
}

const chipSize = {
  sm: "size-7 rounded-md",
  md: "size-10 rounded-lg",
  lg: "size-14 rounded-xl",
}

function ColorSwatch({
  color,
  label,
  name,
  size = "md",
  showHex,
  showValue,
  className,
  ...props
}: ColorSwatchProps) {
  const title = label ?? name
  const showCode = showHex ?? showValue
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)} {...props}>
      <div className="rounded-xl bg-input p-1 [box-shadow:var(--shadow-inset)]">
        <div
          className={cn(chipSize[size], "[box-shadow:inset_0_0_0_0.0625rem_oklch(1_0_0/0.12)]")}
          style={{ backgroundColor: color }}
          title={color}
        />
      </div>
      {(title || showCode) && (
        <div className="flex flex-col items-center gap-0.5">
          {title && <span className="text-xs font-medium text-foreground">{title}</span>}
          {showCode && <span className="font-mono text-[0.625rem] uppercase text-muted-foreground">{color}</span>}
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
        <ColorSwatch key={`${c.color}-${i}`} color={c.color} label={c.label} size={size} showHex={showHex} />
      ))}
    </div>
  )
}

export { ColorSwatch, ColorPalette }
export type { ColorSwatchProps, ColorPaletteProps }
