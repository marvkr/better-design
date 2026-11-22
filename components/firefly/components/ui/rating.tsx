"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

export interface RatingProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: number;
  max?: number;
  onRatingChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
}

const starSizes = {
  sm: "size-4",
  default: "size-5",
  lg: "size-6",
} as const;

/**
 * Firefly Rating: a row of Carbon stars. Empty stars are warm grey outlines
 * and filled stars take the olive accent line, which holds its contrast on
 * a white page where the lit yellow-green would wash out. Hovering previews
 * the score; a read-only rating renders as one labelled image.
 */
const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      max = 5,
      onRatingChange,
      readOnly,
      size = "default",
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [hover, setHover] = React.useState<number | null>(null);
    const shown = hover ?? value;

    const star = (starValue: number) => (
      <Icon
        icon={shown >= starValue ? "carbon:star-filled" : "carbon:star"}
        aria-hidden="true"
        className={cn(
          starSizes[size],
          "transition-colors duration-fast ease-out",
          shown >= starValue ? "text-(--accent-line)" : "text-(--control)",
        )}
      />
    );

    if (readOnly) {
      return (
        <div
          ref={ref}
          role="img"
          aria-label={`Rated ${value} out of ${max}`}
          data-slot="rating"
          onMouseLeave={onMouseLeave}
          className={cn("inline-flex items-center gap-0.5", className)}
          {...props}
        >
          {Array.from({ length: max }, (_, i) => (
            <span key={i} className="p-0.5">
              {star(i + 1)}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`Rating: ${value} out of ${max}`}
        data-slot="rating"
        onMouseLeave={(event) => {
          setHover(null);
          onMouseLeave?.(event);
        }}
        className={cn("inline-flex items-center gap-0.5", className)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(starValue)}
              onClick={() => onRatingChange?.(starValue)}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              aria-pressed={value === starValue}
              className={cn(
                "rounded-full p-0.5 transition-transform duration-fast ease-out",
                "hover:scale-110 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
              )}
            >
              {star(starValue)}
            </button>
          );
        })}
      </div>
    );
  },
);
Rating.displayName = "Rating";

export { Rating };
