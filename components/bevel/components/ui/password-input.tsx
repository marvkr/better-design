"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel PasswordInput.
 *
 * The shared field well with a reveal toggle in the right gutter. The toggle
 * is a quiet ghost target, not a second control, so the field still reads as
 * one row in a stacked sign-in form.
 */

/** Props for `PasswordInput`; the type is fixed, so it cannot be passed. */
export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-11 text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-[0.5rem]",
            "text-muted-foreground transition-colors duration-fast ease-out",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          <Icon
            icon={visible ? "solar:eye-closed-linear" : "solar:eye-linear"}
            className="size-4"
          />
        </button>
      </div>
    )
  },
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
