import * as React from "react";

import { cn } from "@/lib/utils";

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "default" | "lg";
}

// The corner follows the system's size ladder: chip, field, panel.
const swatchSizes = {
  sm: "size-8 rounded-sm",
  default: "size-12 rounded-md",
  lg: "size-16 rounded-lg",
} as const;

/**
 * Airy docs ColorSwatch: a flat colour chip edged by the page hairline, so
 * white and near-white colours still show their edge. The name sits under it
 * in medium ink and the value in small mono type, like a token table row.
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
        className={cn(swatchSizes[size], "border border-border")}
        style={{ backgroundColor: color }}
      />
      {label && (
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-foreground">{label}</p>
          <p className="font-mono text-xs text-muted-foreground">{color}</p>
        </div>
      )}
    </div>
  );
}

export interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>;
  size?: "sm" | "default" | "lg";
}

/** Airy docs ColorPalette: a wrapping row of swatches, 1rem apart. */
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
