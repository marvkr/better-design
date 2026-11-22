import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk ColorSwatch — a rounded chip with the window rim so a pale colour
 * still has an edge against a white panel.
 */

export interface ColorSwatchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  name?: string;
  value?: string;
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ className, color, name, value, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
      <div
        className="h-14 w-full rounded-lg [box-shadow:var(--shadow-rim)]"
        style={{ backgroundColor: color }}
      />
      {name ? (
        <p className="text-xs font-medium text-foreground">{name}</p>
      ) : null}
      {value ? (
        <p className="font-mono text-[0.6875rem] text-muted-foreground">{value}</p>
      ) : null}
    </div>
  ),
);
ColorSwatch.displayName = "ColorSwatch";

export interface ColorPaletteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  colors: ColorSwatchProps[];
}

const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  ({ className, colors, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}
      {...props}
    >
      {colors.map((swatch) => (
        <ColorSwatch key={swatch.color} {...swatch} />
      ))}
    </div>
  ),
);
ColorPalette.displayName = "ColorPalette";

export { ColorSwatch, ColorPalette };
