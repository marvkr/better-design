import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback?: string
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[]
  max?: number
  size?: "sm" | "default" | "lg"
}

const sizeClasses = {
  sm:      "h-7 w-7 text-xs",
  default: "h-9 w-9 text-sm",
  lg:      "h-11 w-11 text-base",
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 4, size = "default", className, ...props }, ref) => {
    const shown = avatars.slice(0, max)
    const overflow = avatars.length - max

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {shown.map((avatar, i) => (
          <Avatar
            key={i}
            className={cn(
              sizeClasses[size],
              "ring-2 ring-background -ml-2 first:ml-0",
            )}
          >
            {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt ?? ""} />}
            <AvatarFallback className={sizeClasses[size]}>
              {avatar.fallback ?? avatar.alt?.slice(0, 2).toUpperCase() ?? "??"}
            </AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 && (
          <div
            className={cn(
              "flex items-center justify-center rounded-full ring-2 ring-background -ml-2",
              "bg-secondary text-secondary-foreground font-semibold border border-border",
              sizeClasses[size],
            )}
          >
            +{overflow}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
