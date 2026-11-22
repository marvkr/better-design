"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for PasswordInput: every input prop except `type`, which the reveal toggle owns. */
export interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

/**
 * Playful console PasswordInput: the white well with a small square eye
 * button tucked inside its end. The button shows or hides the password, says
 * which it will do next, and stays in the tab order for keyboard users.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <div data-slot="password-input" className="relative">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={cn(formFieldBase, formFieldSingleLine, "pe-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={cn(
            "absolute end-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground",
            "transition-colors duration-fast ease-out",
            "hover:bg-secondary hover:text-foreground active:bg-(--surface-3)",
            "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
            "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
          )}
        >
          <Icon
            icon={visible ? "ph:eye-slash-duotone" : "ph:eye-duotone"}
            className="size-4"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
