import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

// Dynamic Avatar Group: overlapping avatars with ring-2 ring-background

interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback: string
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[]
  max?: number
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
}

function AvatarGroup({ avatars, max = 5, size = "md", className, ...props }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visible.map((av, i) => (
        <Avatar
          key={i}
          className={cn(
            sizeClasses[size],
            "ring-2 ring-background",
            i > 0 && "-ml-2"
          )}
        >
          {av.src && <AvatarImage src={av.src} alt={av.alt} />}
          <AvatarFallback>{av.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full ring-2 ring-background",
            "bg-secondary text-secondary-foreground font-medium -ml-2",
            sizeClasses[size]
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps }
