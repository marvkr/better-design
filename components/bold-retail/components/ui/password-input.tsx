"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

/**
 * Bold retail PasswordInput: the checkout field with a round eye button at
 * its end. The button shows or hides the password, names the action it will
 * take next, and stays in the tab order.
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
          className={cn(formFieldBase, formFieldSingleLine, "pe-12", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={cn(
            "absolute end-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground",
            "transition-colors duration-fast ease-out",
            "hover:bg-secondary hover:text-foreground",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
          )}
        >
          <Icon
            icon={visible ? "mingcute:eye-close-line" : "mingcute:eye-line"}
            className="size-5"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
