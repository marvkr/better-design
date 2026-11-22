import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard ColorSwatch: token chips with hairline rims.

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
}

const swatchSize = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

function ColorSwatch({ color, label, size = "md", showHex = false, className, ...props }: ColorSwatchProps) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-1.5", className)} {...props}>
      <span
        className={cn(
          "rounded-lg",
          "shadow-[0_0_0_0.0625rem_oklch(0.27_0.03_60/0.08),var(--tb-shadow-sm)]",
          swatchSize[size]
        )}
        style={{ backgroundColor: color }}
        aria-label={label ?? color}
      />
      {label && <span className="text-xs font-medium text-foreground">{label}</span>}
      {showHex && <span className="font-mono text-[0.625rem] text-muted-foreground">{color}</span>}
    </div>
  );
}

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: Array<{ color: string; label?: string }>;
  size?: ColorSwatchProps["size"];
  showHex?: boolean;
}

function ColorPalette({ colors, size = "md", showHex = false, className, ...props }: ColorPaletteProps) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3", className)} {...props}>
      {colors.map((entry, index) => (
        <ColorSwatch
          key={`${entry.color}-${index}`}
          color={entry.color}
          label={entry.label}
          size={size}
          showHex={showHex}
        />
      ))}
    </div>
  );
}

export { ColorSwatch, ColorPalette };
export type { ColorSwatchProps, ColorPaletteProps };
