import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-2xl px-5 py-3 text-[15px] text-foreground",
          "backdrop-blur-xl bg-white/[0.05]",
          "border border-white/[0.12]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "placeholder:text-muted-foreground",
          "transition-all duration-300 ease-out",
          "hover:bg-white/[0.08] hover:border-white/[0.18]",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
