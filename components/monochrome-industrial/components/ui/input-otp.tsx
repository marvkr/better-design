"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
 React.ElementRef<typeof OTPInput>,
 React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
 <OTPInput
 ref={ref}
 containerClassName={cn(
 "flex items-center gap-2 has-[:disabled]:opacity-50",
 containerClassName
 )}
 className={cn("disabled:cursor-not-allowed", className)}
 {...props}
 />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
 React.ElementRef<"div">,
 React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
 <div ref={ref} className={cn("flex items-center gap-1.5", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
 React.ElementRef<"div">,
 React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
 const inputOTPContext = React.useContext(OTPInputContext)
 const slot = inputOTPContext.slots[index]
 const char = slot?.char
 const hasFakeCaret = slot?.hasFakeCaret
 const isActive = slot?.isActive

 return (
 <div
 ref={ref}
 className={cn(
 "relative flex h-10 w-10 items-center justify-center rounded-none text-base",
 "bg-input text-foreground border border-border",
 "",
 "transition-[border-color,box-shadow] duration-150",
 isActive && "border-ring ring-2 ring-ring/40 z-10",
 className
 )}
 {...props}
 >
 {char}
 {hasFakeCaret && (
 <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
 <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
 </div>
 )}
 </div>
 )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
 React.ElementRef<"div">,
 React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
 <div ref={ref} role="separator" {...props}>
 <Icon icon="tabler:minus" className="h-4 w-4 text-muted-foreground" />
 </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
