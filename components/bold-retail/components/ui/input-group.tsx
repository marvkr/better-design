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
 * Bold retail InputGroup: one checkout field shell with room for a prefix
 * and a suffix in grey, such as a currency sign, a size unit or an icon. The
 * whole shell takes the black edge and grey halo while the input inside has
 * focus, and the edge turns red when the value is wrong.
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
        size === "sm" ? "h-10" : "h-12",
        "focus-within:border-foreground focus-within:ring-4 focus-within:ring-(--halo)",
        "data-[invalid]:border-destructive data-[invalid]:focus-within:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:bg-secondary data-[disabled]:text-(--foreground-disabled) data-[disabled]:hover:border-(--line-strong)",
        "[&>input]:h-full [&>input]:min-w-0 [&>input]:flex-1 [&>input]:bg-transparent [&>input]:text-base [&>input]:outline-none",
        "[&>input]:placeholder:text-muted-foreground [&>input:disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {prefix && (
        <span
          data-slot="input-group-prefix"
          className="flex shrink-0 items-center text-base text-muted-foreground [&_svg]:size-5"
        >
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span
          data-slot="input-group-suffix"
          className="flex shrink-0 items-center text-base text-muted-foreground [&_svg]:size-5"
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
