"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Margin PasswordInput: the grey filled field with a small eye button tucked
 * inside its right edge to show or hide the value.
 */
export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <div data-slot="password-input" className="relative">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(formFieldBase, formFieldSingleLine, "pr-8", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md",
            "text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
            focusRing,
          )}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <Icon icon={visible ? "solar:eye-closed-linear" : "solar:eye-linear"} className="size-4" aria-hidden />
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
