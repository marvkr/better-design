import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark ColorSwatch: a paint chip set into the panel with a dark
// containment ring and a soft contact shadow.

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6 rounded-md",
  md: "h-8 w-8 rounded-lg",
  lg: "h-12 w-12 rounded-xl",
};

function ColorSwatch({
  color,
  label,
  size = "md",
  showHex,
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-1.5", className)}
      {...props}
    >
      <div
        className={cn(
          sizeClasses[size],
          "ring-1 ring-[oklch(0_0_0/0.35)] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.12),0_0.0625rem_0.125rem_oklch(0_0_0/0.4)]"
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
            <span className="font-mono text-[0.625rem] text-muted-foreground">
              {color}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>;
  size?: ColorSwatchProps["size"];
  showHex?: boolean;
}

function ColorPalette({
  colors,
  size,
  showHex,
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)} {...props}>
      {colors.map((c, i) => (
        <ColorSwatch
          key={i}
          color={c.color}
          label={c.label}
          size={size}
          showHex={showHex}
        />
      ))}
    </div>
  );
}

export { ColorSwatch, ColorPalette };
export type { ColorSwatchProps, ColorPaletteProps };
