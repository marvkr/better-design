"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, pressScale, raisedBevel } from "./_shared";

/**
 * Burnished InputCopy: a read-only graphite bevel field with a small
 * bevelled copy button inside its right edge. A copy swaps the icon for a
 * check in the glow colour for a moment.
 *
 * Usage:
 *   <InputCopy value="sk_live_abc123" />
 *   <InputCopy label="API key" value={apiKey} />
 */
interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string;
  label?: React.ReactNode;
  /** Milliseconds before the copied state resets. Default 1800. */
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
      // The clipboard can be unavailable (insecure context, permissions).
      // The field stays selectable, so the value can still be copied by hand.
    }
  }, [value]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs);
    return () => clearTimeout(t);
  }, [copied, copiedTimeoutMs]);

  return (
    <div data-slot="input-copy" className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold tracking-[0.016em] text-foreground">
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
          className={cn(formFieldBase, formFieldSingleLine, "pr-14 font-mono text-sm")}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-2 flex size-8 items-center justify-center rounded-full",
            raisedBevel,
            pressScale,
            focusRing,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              className="flex"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon
                icon={copied ? "ph:check-bold" : "ph:copy"}
                className={cn("size-3.5", copied && "text-primary-text")}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export { InputCopy };
export type { InputCopyProps };
