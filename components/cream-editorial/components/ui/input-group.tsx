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
 * Cream editorial InputGroup: one paper field shell with room for a prefix
 * and a suffix in the caption ink, such as a currency sign, a unit or an
 * icon. The whole shell takes the terracotta edge and halo while the input
 * inside has focus, and turns the deep red when the value is wrong.
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
        size === "sm" ? "h-8 px-3" : "h-10",
        "focus-within:border-primary focus-within:ring-3 focus-within:ring-ring",
        "data-[invalid]:border-destructive data-[invalid]:focus-within:border-destructive data-[invalid]:focus-within:ring-(--destructive-tint)",
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
