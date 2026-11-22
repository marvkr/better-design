"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

/** Props for InputGroup: an input with optional leading and trailing adornments. */
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
 * Playful console InputGroup: one white well with room for a prefix and a
 * suffix, such as a protocol, a unit or an icon. Text adornments sit in mono
 * type like console output. The whole shell takes the blue edge and ring
 * while the input inside has focus, and turns red when the value is wrong.
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
        size === "sm" ? "h-8" : "h-9",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-(--highlight-blue)",
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
          className="flex shrink-0 items-center font-mono text-[0.8125rem] text-muted-foreground [&_svg]:size-4"
        >
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span
          data-slot="input-group-suffix"
          className="flex shrink-0 items-center font-mono text-[0.8125rem] text-muted-foreground [&_svg]:size-4"
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
