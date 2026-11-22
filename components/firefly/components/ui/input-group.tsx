"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

interface InputGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "prefix"
> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "default" | "sm";
  disabled?: boolean;
  error?: boolean;
}

/**
 * Firefly InputGroup: one warm field shell with room for a prefix and a
 * suffix in muted ink, such as a currency sign, a unit or an icon. The
 * whole shell takes the olive line and flush outline while the input inside
 * has focus, and turns red when the value is wrong.
 */
const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      className,
      prefix,
      suffix,
      size = "default",
      disabled,
      error,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="input-group"
      data-disabled={disabled || undefined}
      data-invalid={error || undefined}
      className={cn(
        formFieldBase,
        "flex items-center gap-2",
        size === "sm" ? "h-8" : "h-10",
        "focus-within:border-(--accent-line) focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-ring",
        "data-[invalid]:border-destructive data-[invalid]:focus-within:border-destructive data-[invalid]:focus-within:outline-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:bg-secondary data-[disabled]:text-(--foreground-disabled) data-[disabled]:hover:border-(--line-strong)",
        "[&>input]:h-full [&>input]:min-w-0 [&>input]:flex-1 [&>input]:bg-transparent [&>input]:text-sm [&>input]:outline-none",
        "[&>input]:placeholder:text-muted-foreground [&>input:disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {prefix && (
        <span
          data-slot="input-group-prefix"
          className="flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:size-4"
        >
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span
          data-slot="input-group-suffix"
          className="flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:size-4"
        >
          {suffix}
        </span>
      )}
    </div>
  ),
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
export type { InputGroupProps };
