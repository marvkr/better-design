"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

// NOTE: Intentionally does NOT extend React.HTMLAttributes to avoid onChange type conflict
interface RatingProps {
  value?: number
  max?: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      onValueChange,
      readOnly = false,
      size = "md",
      className,
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState<number | null>(null)
    const display = hovered ?? value

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={`Rating: ${value} out of ${max}`}
        className={cn("flex items-center gap-0.5", className)}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1
          const filled = starValue <= display

          return (
            <button
              key={i}
              type="button"
              role={readOnly ? undefined : "radio"}
              aria-checked={readOnly ? undefined : starValue === value}
              aria-label={readOnly ? undefined : `Rate ${starValue} out of ${max}`}
              disabled={readOnly}
              onClick={() => !readOnly && onValueChange?.(starValue)}
              onMouseEnter={() => !readOnly && setHovered(starValue)}
              onMouseLeave={() => !readOnly && setHovered(null)}
              className={cn(
                "transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                !readOnly && "hover:scale-110 active:scale-[0.95] cursor-pointer",
                readOnly && "cursor-default",
              )}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  "transition-colors",
                  filled
                    ? "fill-foreground text-foreground"
                    : "fill-transparent text-muted-foreground/30",
                )}
              />
            </button>
          )
        })}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating }
export type { RatingProps }
