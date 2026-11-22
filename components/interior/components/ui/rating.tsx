"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Rating — a row of stars in the warning amber, which is allowed here
 * because a rating is a genuine scale, not decoration. Unfilled stars sit at
 * border weight so the empty part of the scale stays quiet.
 *
 * Interactive ratings are a real radio group: each star carries role="radio"
 * with aria-checked, only the selected star is tabbable, and the arrow keys
 * move the selection. A read-only rating drops out of the tab order entirely
 * and reports its value once, as an image.
 */

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  label?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    { className, value, max = 5, readOnly, onChange, label = "Rating", ...props },
    ref,
  ) => {
    // Controlled when a value prop is present, uncontrolled otherwise. Keying
    // off onChange instead would leave a handler-only Rating stuck at zero.
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(value ?? 0);
    const current = isControlled ? value : internal;

    const select = (next: number) => {
      if (readOnly) return;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return;
      const delta =
        event.key === "ArrowRight" || event.key === "ArrowUp"
          ? 1
          : event.key === "ArrowLeft" || event.key === "ArrowDown"
            ? -1
            : 0;
      if (!delta) return;
      event.preventDefault();
      select(Math.min(max, Math.max(1, current + delta)));
    };

    const stars = Array.from({ length: max }, (_, index) => index + 1);

    if (readOnly) {
      return (
        <div
          ref={ref}
          role="img"
          aria-label={`${label}: ${current} out of ${max}`}
          className={cn("inline-flex items-center gap-0.5", className)}
          {...props}
        >
          {stars.map((step) => (
            <span
              key={step}
              className="inline-flex size-6 items-center justify-center"
            >
              <Star
                aria-hidden
                strokeWidth={1.5}
                className={cn(
                  "size-4",
                  step <= current
                    ? "fill-warning text-warning"
                    : "text-border",
                )}
              />
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className={cn("inline-flex items-center gap-0.5", className)}
        {...props}
      >
        {stars.map((step) => (
          <button
            key={step}
            type="button"
            role="radio"
            aria-checked={step === current}
            aria-label={`${step} of ${max}`}
            // Roving tab index: the group is one tab stop, arrows move within it.
            tabIndex={step === current || (current === 0 && step === 1) ? 0 : -1}
            onClick={() => select(step)}
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-[0.375rem]",
              "transition-[background-color,box-shadow] duration-fast",
              "hover:bg-secondary",
              "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
            )}
          >
            <Star
              aria-hidden
              strokeWidth={1.5}
              className={cn(
                "size-4",
                step <= current
                  ? "fill-warning text-warning"
                  : "text-border",
              )}
            />
          </button>
        ))}
      </div>
    );
  },
);
Rating.displayName = "Rating";

export { Rating };
