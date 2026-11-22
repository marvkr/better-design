import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

/* AvatarGroup — overlapping assignee avatars, like the spec's project table. */

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

function AvatarGroup({
  items,
  max = 5,
  size = "md",
  className,
  ...props
}: AvatarGroupProps) {
  const visibleItems = items.slice(0, max)
  const remaining = items.length - max

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visibleItems.map((item, i) => (
        <Avatar
          key={i}
          className={cn(sizeClasses[size], "ring-2 ring-card")}
        >
          {item.src && <AvatarImage src={item.src} alt={item.alt} />}
          <AvatarFallback>{item.fallback ?? "?"}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "flex items-center justify-center rounded-full ring-2 ring-card",
            "border border-border [background-image:var(--bezel)]",
            "font-medium text-muted-foreground"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps, AvatarGroupItem }
