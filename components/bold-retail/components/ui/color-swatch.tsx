import * as React from "react";

import { cn } from "@/lib/utils";

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "default" | "lg";
  /** Marks the colourway that is chosen: a black ring with a white gap. */
  selected?: boolean;
}

const swatchSizes = {
  sm: "size-2.5",
  default: "size-3",
  lg: "size-4",
} as const;

/**
 * Bold retail ColorSwatch: the small colourway dot under a product tile.
 * A hairline edge keeps a white dot visible on the page. The chosen colour
 * wears a black ring with a white gap around the dot. The name sits beside
 * it in medium ink and the value in small mono type.
 */
function ColorSwatch({
  color,
  label,
  size = "default",
  selected,
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div
      data-slot="color-swatch"
      data-selected={selected || undefined}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div
        role="img"
        aria-label={label ? `${label}, ${color}` : color}
        title={label ?? color}
        className={cn(
          swatchSizes[size],
          "shrink-0 rounded-full border border-border",
          selected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
        )}
        style={{ backgroundColor: color }}
      />
      {label && (
        <div className="flex flex-col">
          <p className="text-sm font-medium text-foreground">{label}</p>
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

/** Bold retail ColorPalette: a wrapping row of colourway dots. */
function ColorPalette({
  colors,
  size = "default",
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div
      data-slot="color-palette"
      className={cn("flex flex-wrap gap-x-6 gap-y-4", className)}
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
