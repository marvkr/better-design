import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles match Input exactly so focus/hover/bg/border/radius/shadow are consistent.
        // Only multi-line-specific additions: min-h-16, field-sizing-content, py-2 (vs py-1 for Input).
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex field-sizing-content min-h-16 w-full min-w-0 rounded-md border bg-background px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
