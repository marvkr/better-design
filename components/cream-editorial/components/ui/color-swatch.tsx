import * as React from "react";

import { cn } from "@/lib/utils";

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "default" | "lg";
}

// The corner grows with the chip, so a small chip stays a square.
const swatchSizes = {
  sm: "size-8 rounded-sm",
  default: "size-12 rounded-md",
  lg: "size-16 rounded-lg",
} as const;

/**
 * Cream editorial ColorSwatch: a flat paint chip edged by the warm hairline,
 * so a cream colour still shows its edge on the cream page. No shadow. The
 * name sits under it in sans ink and the value in small mono type.
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

/** Cream editorial ColorPalette: a wrapping row of chips, 1.25rem apart. */
function ColorPalette({
  colors,
  size = "default",
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div
      data-slot="color-palette"
      className={cn("flex flex-wrap gap-5", className)}
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
