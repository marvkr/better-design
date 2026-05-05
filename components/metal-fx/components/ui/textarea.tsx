import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldMultiLine } from "./_shared"
import { MetalRing } from "./metal-ring"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ring?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ring = true, ...props }, ref) => {
    const textarea = (
      <textarea
        ref={ref}
        className={cn(formFieldBase, formFieldMultiLine, className)}
        {...props}
      />
    )
    if (!ring) return textarea
    return <MetalRing shape="rect" block>{textarea}</MetalRing>
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
