"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

// Talentboard Rating: gold stars, the DS signature warm accent.

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const starSize = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-5 w-5",
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
  const display = hovered ?? value;

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < display;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i + 1 === value}
            aria-label={`${i + 1} of ${max}`}
            disabled={readonly}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => !readonly && setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "rounded-sm transition-transform duration-fast",
              !readonly && "cursor-pointer hover:scale-110",
              readonly && "cursor-default",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            )}
          >
            <Star
              className={cn(
                starSize[size],
                "transition-colors duration-fast",
                filled
                  ? "fill-[oklch(0.8_0.13_78)] text-[color:var(--tb-gold)]"
                  : "fill-transparent text-border"
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
