"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * Bevel InputOTP.
 *
 * One code, six wells. Each slot is the shared field surface squared off to
 * 44px, so a passcode screen uses the same material as the form behind it.
 * The active slot swaps its well for the accent ring and lifts above its
 * neighbours. The separator is one pixel of the track token.
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2.5 has-[:disabled]:opacity-50",
      containerClassName,
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
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

/** Props for `InputOTPSlot`; `index` picks which character the slot shows. */
export interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  index: number
}

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = inputOTPContext.slots[index]
    const char = slot?.char
    const hasFakeCaret = slot?.hasFakeCaret
    const isActive = slot?.isActive

    return (
      <div
        ref={ref}
        className={cn(
          formFieldBase,
          "relative flex size-11 items-center justify-center px-0",
          "text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem]",
          isActive &&
            "z-10 [box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink h-5 w-px bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  },
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center justify-center px-0.5", className)}
    {...props}
  >
    <span className="block h-px w-2.5 bg-[var(--track)]" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
