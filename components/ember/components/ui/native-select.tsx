"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass NativeSelect: platform select on the recessed well.

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full cursor-pointer appearance-none rounded-lg px-3 py-2 pr-9 text-sm",
          formFieldBase,
          "[&>option]:bg-[oklch(0.22_0.006_70)] [&>option]:text-foreground",
          error &&
            "border-[color:oklch(0.6_0.21_27/0.5)] focus-visible:border-[color:oklch(0.6_0.21_27/0.7)] focus-visible:ring-[oklch(0.6_0.21_27/0.3)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="tabler:chevron-down"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
export type { NativeSelectProps }
