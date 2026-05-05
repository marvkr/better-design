"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
 React.ElementRef<typeof CheckboxPrimitive.Root>,
 React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
 <CheckboxPrimitive.Root
 ref={ref}
 className={cn(
 "peer h-4 w-4 shrink-0 rounded-none border border-border",
 "bg-input ",
 "transition-[background-color,box-shadow,border-color] duration-150",
 "hover:border-ring/40",
 "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
 "disabled:cursor-not-allowed disabled:opacity-50",
 "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:",
 "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:",
 className
 )}
 {...props}
 >
 <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
 {props.checked === "indeterminate" ? (
 <Icon icon="tabler:minus" className="h-3 w-3" />
 ) : (
 <Icon icon="tabler:check" className="h-3 w-3" />
 )}
 </CheckboxPrimitive.Indicator>
 </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
