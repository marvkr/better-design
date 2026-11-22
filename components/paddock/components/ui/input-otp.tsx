"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

/**
 * Paddock InputOTP: a row of small white field tiles with a soft corner.
 * The active tile takes the focus outline and a blinking slate caret.
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    data-slot="input-otp"
    containerClassName={cn("flex items-center gap-2.5 has-disabled:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/** A run of tiles that belong together. */
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center gap-1.5", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

/** One character tile, read from the OTP context by its index. */
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  const char = slot?.char;
  const hasFakeCaret = slot?.hasFakeCaret;
  const isActive = slot?.isActive;

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive || undefined}
      className={cn(
        formFieldBase,
        "relative flex size-11 items-center justify-center rounded-lg px-0 text-base font-semibold tabular-nums",
        isActive && "z-10 ring-2 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-pulse rounded-xs bg-foreground" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/** A short dash between two groups of tiles. */
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" data-slot="input-otp-separator" {...props}>
    <Icon icon="mingcute:minimize-line" aria-hidden className="size-4 text-muted-foreground" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
