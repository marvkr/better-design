import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

/*
 * Plinth AvatarGroup: overlapping avatars, each cut out of the next by a
 * ring in the stage colour. The overflow count is a graphite chip in mono.
 * Pass `items`, or pass Avatar children.
 */

interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback?: string
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: AvatarGroupItem[]
  max?: number
  total?: number
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-6 text-[0.625rem]",
  md: "size-8 text-[0.6875rem]",
  lg: "size-10 text-xs",
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ items, max = 5, total, size = "md", className, children, ...props }, ref) => {
    const entries: React.ReactNode[] = items
      ? items.map((item, index) => (
          <Avatar key={index} className={sizeClasses[size]}>
            {item.src && <AvatarImage src={item.src} alt={item.alt ?? ""} />}
            <AvatarFallback>{item.fallback ?? "?"}</AvatarFallback>
          </Avatar>
        ))
      : React.Children.toArray(children)
    const visible = entries.slice(0, max)
    const hidden = (total ?? entries.length) - visible.length

    return (
      <div ref={ref} data-slot="avatar-group" className={cn("flex items-center -space-x-2", className)} {...props}>
        {visible.map((entry, index) => (
          <div key={index} className="relative rounded-full ring-2 ring-background">
            {entry}
          </div>
        ))}
        {hidden > 0 && (
          <div
            className={cn(
              "relative flex items-center justify-center rounded-full ring-2 ring-background",
              "font-mono font-medium text-secondary-foreground [background:var(--graphite-gradient)]",
              sizeClasses[size]
            )}
          >
            +{hidden}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
export type { AvatarGroupProps, AvatarGroupItem }
