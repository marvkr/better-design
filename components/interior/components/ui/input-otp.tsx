"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior InputOTP — the field recipe, one cell at a time. Every digit sits
 * in its own recessed well; the active cell rises to the surface with an
 * accent border and the well shadow gone, exactly like a focused Input.
 * Verdicts stay on the border: aria-invalid turns it destructive, a
 * data-status="success" container turns it moss.
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "group flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-[0.625rem]",
        "border-2 border-border bg-input text-[0.9375rem] font-medium tabular-nums text-foreground",
        "shadow-[var(--shadow-well)]",
        "transition-[background-color,border-color,box-shadow] duration-fast",
        "group-data-[status=success]:border-success",
        "aria-invalid:border-destructive aria-invalid:bg-card aria-invalid:shadow-none",
        slot?.isActive && "z-10 border-ring bg-card shadow-none",
        className,
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      ) : null}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus className="size-4 text-muted-foreground" strokeWidth={1.5} />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
