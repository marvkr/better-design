"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior CopyButton — a quiet 7px icon button that keeps its width when
 * the glyph swaps: both states share one grid cell and trade opacity, so
 * nothing on the row shifts. The confirmation check is moss — success has
 * its own colour; accent stays reserved for interaction.
 */

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy"}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-[0.4375rem]",
          "text-muted-foreground",
          "transition-[background-color,box-shadow,color,transform] duration-fast",
          "hover:bg-secondary hover:text-foreground",
          "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
          "active:translate-y-px",
          className,
        )}
        {...props}
      >
        <span className="grid">
          <Check
            className={cn(
              "col-start-1 row-start-1 size-3.5 text-success transition-opacity duration-fast",
              copied ? "opacity-100" : "opacity-0",
            )}
            strokeWidth={1.5}
          />
          <Copy
            className={cn(
              "col-start-1 row-start-1 size-3.5 transition-opacity duration-fast",
              copied ? "opacity-0" : "opacity-100",
            )}
            strokeWidth={1.5}
          />
        </span>
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
