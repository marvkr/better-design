"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Margin Rating: a row of small stars that fill in amber. Pointing at a star
 * previews the value without moving it, and unfilled stars stay a pale grey
 * outline.
 */
export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onRatingChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, onRatingChange, readOnly, size = "default", ...props }, ref) => {
    const [hover, setHover] = React.useState<number | null>(null);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`Rating: ${value} out of ${max}`}
        data-slot="rating"
        className={cn("inline-flex items-center gap-0.5", className)}
        onMouseLeave={() => !readOnly && setHover(null)}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const active = (hover ?? value) >= starValue;

          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              aria-pressed={value >= starValue}
              onMouseEnter={() => !readOnly && setHover(starValue)}
              onClick={() => !readOnly && onRatingChange?.(starValue)}
              className={cn(
                "rounded-sm p-0.5 transition-colors duration-fast ease-(--ease-out)",
                readOnly ? "cursor-default" : "cursor-pointer",
                focusRing,
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <Icon
                icon={active ? "solar:star-bold" : "solar:star-linear"}
                className={cn(sizes[size], active ? "text-warning" : "text-muted-foreground/40")}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    );
  },
);
Rating.displayName = "Rating";

export { Rating };
