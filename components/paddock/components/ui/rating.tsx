"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Paddock Rating: a row of stars that light in the primary teal. Pointing at
 * a star previews the value without
 * moving it, and unlit stars stay a faint grey.
 */
export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onRatingChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-4",
  default: "size-5",
  lg: "size-6",
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
                "rounded-md p-0.5 transition-[color,scale] duration-fast ease-out",
                readOnly ? "cursor-default" : "cursor-pointer active:scale-90 motion-reduce:active:scale-100",
                focusRing,
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <Icon
                icon={active ? "mingcute:star-fill" : "mingcute:star-line"}
                aria-hidden
                className={cn(sizes[size], active ? "text-primary" : "text-input")}
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
