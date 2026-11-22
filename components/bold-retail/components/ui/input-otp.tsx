"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

/**
 * Bold retail InputOTP: one white box per digit, 3rem by 3.5rem, with the
 * digit set large in tabular figures. The box waiting for the next digit
 * takes the black edge and grey halo of a focused field, and a thin black
 * caret blinks inside it.
 */
const InputOTP = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    data-slot="input-otp"
    containerClassName={cn(
      "group/otp flex items-center gap-3 has-[:disabled]:cursor-not-allowed",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/** A run of boxes that belong together, such as the first three digits. */
const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-group"
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

/** One digit's box. It reads its character and caret from the OTP input. */
const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={slot?.isActive || undefined}
      className={cn(
        formFieldBase,
        "relative flex h-14 w-12 items-center justify-center px-0",
        "text-xl font-medium tabular-nums",
        "data-[active]:z-10 data-[active]:border-foreground data-[active]:ring-4 data-[active]:ring-(--halo)",
        "group-has-[:disabled]/otp:bg-secondary group-has-[:disabled]/otp:text-(--foreground-disabled) group-has-[:disabled]/otp:hover:border-(--line-strong)",
        className,
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/** A short dash between two groups of boxes. */
const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    data-slot="input-otp-separator"
    className={cn("flex items-center text-muted-foreground", className)}
    {...props}
  >
    <Icon icon="mingcute:minimize-line" className="size-4" aria-hidden="true" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
