"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { formFieldBase } from "./_shared";

// Talentboard InputCopy: read-only token field like the portal's customer id
// chip (cus_9BJEcuJ_X35q0T), with one-tap copy.

interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string;
  label?: React.ReactNode;
  /** ms before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number;
}

const InputCopy = React.forwardRef<HTMLInputElement, InputCopyProps>(
  ({ className, value, label, copiedTimeoutMs = 1800, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const id = React.useId();

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      } catch {
        // Clipboard may be unavailable (insecure context, permissions).
        // Fail silently, the input remains selectable for manual copy.
      }
    };

    React.useEffect(() => {
      if (!copied) return;
      const t = setTimeout(() => setCopied(false), copiedTimeoutMs);
      return () => clearTimeout(t);
    }, [copied, copiedTimeoutMs]);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            readOnly
            value={value}
            className={cn(
              formFieldBase,
              "flex h-9 rounded-lg px-3 py-1 pr-10 font-mono text-xs",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy value"}
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    );
  }
);
InputCopy.displayName = "InputCopy";

export { InputCopy };
export type { InputCopyProps };
