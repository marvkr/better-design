"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  maxValue?: number
  onValueChange?: (v: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

function Rating({
  value = 0,
  maxValue = 5,
  onValueChange,
  readOnly = false,
  size = "md",
  className,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)
  const displayValue = hovered ?? value

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5",
        !readOnly && "cursor-pointer",
        className
      )}
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: maxValue }, (_, i) => {
        const starValue = i + 1
        const filled = displayValue >= starValue

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            disabled={readOnly}
            onClick={() => !readOnly && onValueChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={cn(
              "transition-all duration-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
            )}
          >
            <Star
              className={cn(
                sizeMap[size],
                "transition-colors",
                filled
                  ? "fill-primary text-primary"
                  : "fill-transparent text-muted-foreground/40"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export { Rating }
export type { RatingProps }
