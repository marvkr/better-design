"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { formFieldBase, formFieldSingleLine } from "./_shared";

// InputCopy: read-only field built on the shared slate field surface
// (formFieldBase) with a copy-to-clipboard button and animated success tick.
//
// Usage:
//   <InputCopy value="sk_live_abc123" />
//   <InputCopy label="API key" value={apiKey} />

interface InputCopyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
  > {
  value: string;
  label?: React.ReactNode;
  /** ms before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number;
}

function InputCopy({
  value,
  label,
  copiedTimeoutMs = 1800,
  className,
  id: idProp,
  ...props
}: InputCopyProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard may be unavailable (insecure context, permissions).
      // Fail silently: the field stays selectable for manual copy.
    }
  }, [value]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs);
    return () => clearTimeout(t);
  }, [copied, copiedTimeoutMs]);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          readOnly
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-10 font-mono",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1 flex h-7 w-7 items-center justify-center rounded-sm",
            "text-muted-foreground transition-colors",
            "hover:bg-secondary hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

export { InputCopy };
export type { InputCopyProps };
