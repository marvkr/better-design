"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

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
          "inline-flex size-8 items-center justify-center rounded-full",
          "text-muted-foreground transition-colors duration-fast",
          "hover:bg-foreground/[0.05] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
          className,
        )}
        {...props}
      >
        {copied ? (
          <Check className="size-3.5 text-primary" strokeWidth={3} />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
