"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

// Amber Glass AvatarGroup: overlapping chips with canvas-colored separation rings.

interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback?: string
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[]
  max?: number
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-6 w-6 text-[0.625rem]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, items, max = 4, size = "md", ...props }, ref) => {
    const visible = items.slice(0, max)
    const overflow = items.length - visible.length

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {visible.map((item, i) => (
          <Avatar
            key={i}
            className={cn(
              sizeClasses[size],
              "ring-2 ring-[oklch(0.19_0.005_75)]"
            )}
          >
            {item.src && <AvatarImage src={item.src} alt={item.alt ?? ""} />}
            <AvatarFallback className={sizeClasses[size]}>
              {item.fallback ?? "?"}
            </AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 && (
          <span
            className={cn(
              "relative flex shrink-0 items-center justify-center rounded-full font-bold",
              "bg-[var(--ag-fill-hover)] text-muted-foreground",
              "ring-2 ring-[oklch(0.19_0.005_75)]",
              sizeClasses[size]
            )}
          >
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
export type { AvatarGroupProps, AvatarGroupItem }
