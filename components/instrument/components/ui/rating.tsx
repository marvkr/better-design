"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

// Gauge Dark Rating: stars fill with the gauge gold, like lit indicator
// lamps; unlit stars stay as faint etched outlines.

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

function Rating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = "md",
  className,
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="radiogroup"
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled =
          hovered !== null ? starValue <= hovered : starValue <= value;

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className={cn(
              "transition-transform",
              !readonly && "cursor-pointer hover:scale-110",
              readonly && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled
                  ? "fill-primary text-[var(--gauge-rim)] drop-shadow-[0_0.0625rem_0.125rem_oklch(0.8_0.115_85/0.35)]"
                  : "fill-transparent text-[var(--gauge-well-border)]"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export { Rating };
export type { RatingProps };
