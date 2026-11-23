"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"

/*
 * Plinth Input OTP: one recessed well per digit, set in Geist Mono like the
 * editor's readouts. The slot being typed in takes the ember focus ring.
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-1.5", className)} {...props} />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const context = React.useContext(OTPInputContext)
  const slot = context.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-11 w-10 items-center justify-center rounded-lg",
        "bg-input font-mono text-base tabular-nums text-foreground",
        "border border-transparent [box-shadow:var(--shadow-inset)]",
        "transition-[border-color,box-shadow] duration-fast",
        slot?.isActive && "z-10 border-ring/70 ring-2 ring-ring/30",
        className
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-0.5 animate-caret-blink rounded-full bg-primary duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("text-muted-foreground", className)} {...props}>
      <MinusIcon className="size-3.5" />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

// feather:minus
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
    </svg>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
