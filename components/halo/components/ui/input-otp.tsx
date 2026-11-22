"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Halo OTP Input: translucent rounded slots

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
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-12 w-10 items-center justify-center text-sm font-medium text-foreground/90",
        "rounded-xl border border-border backdrop-blur-xl bg-foreground/[0.06]",
        "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
        "transition-all duration-base",
        isActive && "z-10 shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] border-primary/50",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground/80 duration-1000" />
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
    <Icon icon="tabler:point" className="h-4 w-4 text-foreground/40" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
