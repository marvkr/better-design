"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Rating: star rating — white filled stars (monochromatic premium)
// Empty stars are muted-foreground; hover previews fill; readonly mode supported

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  onChange?: (value: number) => void
  max?: number
  readonly?: boolean
  size?: "sm" | "default" | "lg"
}

const sizeMap = {
  sm:      "h-4 w-4",
  default: "h-5 w-5",
  lg:      "h-6 w-6",
}

function Rating({
  value = 0,
  onChange,
  max = 5,
  readonly = false,
  size = "default",
  className,
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const effective = hovered ?? value

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role={readonly ? "img" : "group"}
      aria-label={`Rating: ${value} out of ${max}`}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < effective
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => !readonly && setHovered(i + 1)}
            onMouseLeave={() => !readonly && setHovered(null)}
            aria-label={`Rate ${i + 1} out of ${max}`}
            className={cn(
              "transition-transform duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              !readonly && "hover:scale-110 active:scale-95 cursor-pointer",
              readonly && "cursor-default pointer-events-none"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={cn(
                sizeMap[size],
                "transition-colors duration-150",
                filled
                  ? "fill-primary text-primary"
                  : "fill-none text-muted-foreground/40 stroke-current stroke-2"
              )}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

export { Rating }
