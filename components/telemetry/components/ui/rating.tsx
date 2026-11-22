"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Control Room Rating: signal-strength stars. Filled stars glow in
// caution amber against the dark console.

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    { className, value = 0, max = 5, onChange, readonly = false, ...props },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(-1)

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-0.5", className)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type="button"
            disabled={readonly}
            aria-label={`Rate ${i + 1} ${i === 0 ? "star" : "stars"}`}
            aria-pressed={value >= i + 1}
            className={cn(
              "transition-transform duration-fast",
              !readonly && "cursor-pointer hover:scale-110",
              "disabled:cursor-default"
            )}
            onMouseEnter={() => !readonly && setHovered(i)}
            onMouseLeave={() => !readonly && setHovered(-1)}
            onClick={() => onChange?.(i + 1)}
          >
            <Icon
              icon={
                i < (hovered >= 0 ? hovered + 1 : value)
                  ? "tabler:star-filled"
                  : "tabler:star"
              }
              className={cn(
                "size-5",
                i < (hovered >= 0 ? hovered + 1 : value)
                  ? "text-(--warning) drop-shadow-[0_0_0.25rem_oklch(0.78_0.16_75/0.5)]"
                  : "text-border"
              )}
            />
          </button>
        ))}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating }
