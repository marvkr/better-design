import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

// Luxe AvatarGroup: overlapping ring-2 ring-background stacking
// Premium detail: hover expands the group slightly via hover:gap-0.5 on wrapper

export interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback: string
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[]
  max?: number
  size?: "sm" | "default" | "lg"
}

const sizeMap = {
  sm:      "h-7 w-7 text-xs",
  default: "h-9 w-9 text-sm",
  lg:      "h-11 w-11 text-base",
}

function AvatarGroup({
  avatars,
  max = 4,
  size = "default",
  className,
  ...props
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visible.map((av, i) => (
        <Avatar
          key={i}
          className={cn(
            sizeMap[size],
            "ring-2 ring-background transition-transform duration-200 hover:z-10 hover:scale-110"
          )}
        >
          {av.src && <AvatarImage src={av.src} alt={av.alt ?? av.fallback} />}
          <AvatarFallback>{av.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <Avatar
          className={cn(
            sizeMap[size],
            "ring-2 ring-background bg-muted"
          )}
        >
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            +{overflow}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export { AvatarGroup }
