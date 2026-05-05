"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface PhoneInputProps
 extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
 countryCode?: string
 onCountryCodeChange?: (code: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
 ({ className, countryCode = "+1", onCountryCodeChange, ...props }, ref) => {
 return (
 <div
 className={cn(
 "flex items-stretch rounded-none overflow-hidden",
 "bg-input border border-border ",
 "transition-[border-color,box-shadow] duration-150",
 "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
 )}
 >
 <div className="flex items-center gap-1 pl-3 pr-2 border-r border-border text-sm text-muted-foreground">
 <Icon icon="tabler:phone" className="h-4 w-4" />
 <input
 type="tel"
 value={countryCode}
 onChange={(e) => onCountryCodeChange?.(e.target.value)}
 className="w-12 bg-transparent outline-none text-foreground"
 aria-label="Country code"
 />
 </div>
 <input
 ref={ref}
 type="tel"
 className={cn(
 formFieldBase,
 formFieldSingleLine,
 "flex-1 border-0 bg-transparent [box-shadow:none] focus-visible:ring-0 focus-visible:border-0",
 className
 )}
 {...props}
 />
 </div>
 )
 }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
