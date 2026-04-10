"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  maxValue?: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const starSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" }

function Rating({ value = 0, maxValue = 5, onValueChange, readOnly, size = "md", className }: RatingProps) {
  const [hovered, setHovered] = React.useState(0)
  const display = hovered || value

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={`Rating: ${value} of ${maxValue}`}
    >
      {Array.from({ length: maxValue }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onValueChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={cn(
            "transition-all duration-100 active:scale-[0.97]",
            "disabled:pointer-events-none outline-none",
            "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring rounded"
          )}
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              starSizes[size],
              "transition-colors",
              star <= display
                ? "fill-[hsl(var(--warning))] text-[hsl(var(--warning))]"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  )
}

export { Rating }
export type { RatingProps }
