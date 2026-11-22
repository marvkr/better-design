"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { CopyButton } from "./copy-button";

export interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value: string;
}

const InputCopy = React.forwardRef<HTMLInputElement, InputCopyProps>(
  ({ className, value, ...props }, ref) => (
    <div
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "items-center gap-1 py-0 pl-3.5 pr-1",
        "focus-within:border-ring focus-within:ring-[0.1875rem] focus-within:ring-ring/25",
        className,
      )}
    >
      <input
        ref={ref}
        readOnly
        value={value}
        className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none"
        {...props}
      />
      <CopyButton value={value} />
    </div>
  ),
);
InputCopy.displayName = "InputCopy";

export { InputCopy };
