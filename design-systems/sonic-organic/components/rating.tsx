"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Tactile Minimal Rating: star rating with amber active stars

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onRatingChange?: (value: number) => void
  readonly?: boolean
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, onRatingChange, readonly = false, ...props }, ref) => {
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
            className={cn(
              "rounded-[6px] p-0.5",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              !readonly && "cursor-pointer active:scale-[0.98] hover:scale-110",
              "disabled:cursor-default"
            )}
            onMouseEnter={() => !readonly && setHovered(i)}
            onMouseLeave={() => !readonly && setHovered(-1)}
            onClick={() => onRatingChange?.(i + 1)}
          >
            <Icon
              icon={i < (hovered >= 0 ? hovered + 1 : value) ? "tabler:star-filled" : "tabler:star"}
              className={cn(
                "h-5 w-5",
                i < (hovered >= 0 ? hovered + 1 : value)
                  ? "text-amber-500"
                  : "text-muted"
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
