"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Mallow PasswordInput: the white form field with a round eye button inside its
 * trailing edge that shows or hides the value.
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
          className={cn(formFieldBase, formFieldSingleLine, "pe-13", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute end-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full",
            "text-muted-foreground transition-colors duration-fast",
            "hover:bg-(--option-face) hover:text-foreground",
            focusRing,
          )}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <Icon icon={visible ? "iconoir:eye-closed" : "iconoir:eye"} className="size-4" />
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
