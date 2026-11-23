import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/* The browser's own select, drawn as a Plinth well with a Feather chevron. */
const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        data-slot="native-select"
        className={cn(formFieldBase, formFieldSingleLine, "cursor-pointer appearance-none pr-9", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
)
NativeSelect.displayName = "NativeSelect"

// feather:chevron-down
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
    </svg>
  )
}

export { NativeSelect }
