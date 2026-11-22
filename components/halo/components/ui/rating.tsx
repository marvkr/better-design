"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, onChange, readonly = false, ...props }, ref) => {
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
              "transition-all duration-base",
              !readonly && "cursor-pointer hover:scale-110",
              "disabled:cursor-default"
            )}
            onMouseEnter={() => !readonly && setHovered(i)}
            onMouseLeave={() => !readonly && setHovered(-1)}
            onClick={() => onChange?.(i + 1)}
          >
            <Icon
              icon={i < (hovered >= 0 ? hovered + 1 : value) ? "tabler:star-filled" : "tabler:star"}
              className={cn(
                "h-5 w-5",
                i < (hovered >= 0 ? hovered + 1 : value)
                  ? "text-amber-400 drop-shadow-[0_0_0.25rem_oklch(0.83_0.16_84/0.4)]"
                  : "text-foreground/20"
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
