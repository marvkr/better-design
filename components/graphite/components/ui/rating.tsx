"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onRatingChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "default" | "lg"
}

const sizes = {
  sm: "h-4 w-4",
  default: "h-5 w-5",
  lg: "h-6 w-6",
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    { className, value = 0, max = 5, onRatingChange, readOnly, size = "default", ...props },
    ref
  ) => {
    const [hover, setHover] = React.useState<number | null>(null)
    const safeMax = Number.isFinite(max) && max > 0 ? Math.floor(max) : 5
    const safeValue = Number.isFinite(value) ? value : 0

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        role="group"
        aria-label={`Rating: ${safeValue} out of ${safeMax}`}
        {...props}
      >
        {Array.from({ length: safeMax }).map((_, i) => {
          const starValue = i + 1
          const active = (hover ?? safeValue) >= starValue

          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              onMouseEnter={() => !readOnly && setHover(starValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
              onClick={() => !readOnly && onRatingChange?.(starValue)}
              className={cn(
                "rounded-md p-0.5 transition-[color,transform,box-shadow] duration-fast",
                !readOnly &&
                  "cursor-pointer hover:scale-110 focus:outline-none focus-visible:[box-shadow:0_0_0_0.125rem_var(--ring)]",
                readOnly && "cursor-default"
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <Icon
                icon={active ? "tabler:star-filled" : "tabler:star"}
                className={cn(
                  sizes[size],
                  active ? "text-foreground" : "text-muted-foreground/40"
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
