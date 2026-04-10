import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type ScrollFadeEffectProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

export function ScrollFadeEffect({
  className,
  orientation = "vertical",
  ...props
}: ScrollFadeEffectProps) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:overflow-y-auto",
        "data-[orientation=horizontal]:scroll-fade-effect-x data-[orientation=vertical]:scroll-fade-effect-y",
        className
      )}
      {...props}
    />
  )
}
