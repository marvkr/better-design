"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, quietFinish, pressScale } from "./_shared";

/**
 * Mallow InputCopy: a read-only white field with a small quiet copy button at
 * its right edge that turns to a check for a moment after a copy.
 */
interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string;
  label?: React.ReactNode;
  /** Milliseconds before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number;
}

function InputCopy({ value, label, copiedTimeoutMs = 1800, className, id: idProp, ...props }: InputCopyProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const [copied, setCopied] = React.useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // The clipboard can be unavailable; the field stays selectable for a manual copy.
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
        <label htmlFor={id} className="text-sm font-medium text-foreground">
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
          className={cn("absolute right-2 flex size-8 items-center justify-center rounded-full", quietFinish, pressScale, focusRing)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              className="flex"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.165, 0.84, 0.44, 1] }}
            >
              <Icon icon={copied ? "iconoir:check" : "iconoir:copy"} aria-hidden="true" className="size-3.5" />
            </motion.span>
          </AnimatePresence>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  );
}

export { InputCopy };
export type { InputCopyProps };
