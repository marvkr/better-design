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

function AvatarGroup({
  avatars,
  max = 5,
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
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          className={cn(
            sizeClasses[size],
            "ring-2 ring-background transition-transform hover:translate-y-[-2px] hover:z-10",
            "relative"
          )}
        >
          {avatar.src && (
            <AvatarImage src={avatar.src} alt={avatar.alt ?? ""} />
          )}
          <AvatarFallback className={sizeClasses[size]}>
            {avatar.fallback ?? avatar.alt?.slice(0, 2).toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "ring-2 ring-background",
            "relative flex shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground font-medium"
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
