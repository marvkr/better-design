import * as React from "react";

import { cn } from "@/lib/utils";

/** Props for ColorSwatch: one colour value with an optional name. */
export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "default" | "lg";
}

// The corner grows a little with the chip, but stays a chip, never a circle.
const swatchSizes = {
  sm: "size-8 rounded-md",
  default: "size-12 rounded-lg",
  lg: "size-16 rounded-lg",
} as const;

/**
 * Playful console ColorSwatch: a paint chip with a firm olive edge and a
 * thin slab under it, so a white or cream colour still shows its edge on
 * the page. The name sits under it in bold ink and the value in mono.
 */
function ColorSwatch({
  color,
  label,
  size = "default",
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div
      data-slot="color-swatch"
      className={cn("flex flex-col items-start gap-2", className)}
      {...props}
    >
      <div
        role="img"
        aria-label={label ? `${label}, ${color}` : color}
        title={label ?? color}
        className={cn(
          swatchSizes[size],
          "border-[0.09375rem] border-(--line-strong) shadow-(--shadow-control-off)",
        )}
        style={{ backgroundColor: color }}
      />
      {label && (
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-bold text-foreground">{label}</p>
          <p className="font-mono text-xs text-muted-foreground">{color}</p>
        </div>
      )}
    </div>
  );
}

/** Props for ColorPalette: a list of colours shown as swatches. */
export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>;
  size?: "sm" | "default" | "lg";
}

/** Playful console ColorPalette: a wrapping row of swatches, 1rem apart. */
function ColorPalette({
  colors,
  size = "default",
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div
      data-slot="color-palette"
      className={cn("flex flex-wrap gap-4", className)}
      {...props}
    >
      {colors.map((item, i) => (
        <ColorSwatch
          key={`${item.color}-${i}`}
          color={item.color}
          label={item.label}
          size={size}
        />
      ))}
    </div>
  );
}

export { ColorSwatch, ColorPalette };
