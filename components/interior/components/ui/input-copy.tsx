"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { CopyButton } from "./copy-button";

/*
 * Interior InputCopy — a read-only well holding an id, so its value runs mono
 * with tabular figures. The wrapper owns the field recipe; entering it (or
 * its copy action) brings the whole slot to the surface.
 */

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
        "items-center gap-1 py-0 pl-3 pr-1",
        "focus-within:border-ring focus-within:bg-card focus-within:shadow-none",
        className,
      )}
    >
      <input
        ref={ref}
        readOnly
        value={value}
        className="min-w-0 flex-1 bg-transparent font-mono text-[0.7813rem] tabular-nums text-foreground outline-none"
        {...props}
      />
      <CopyButton value={value} />
    </div>
  ),
);
InputCopy.displayName = "InputCopy";

export { InputCopy };
