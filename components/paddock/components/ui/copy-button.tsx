"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

/** Props for a button that copies one value to the clipboard. */
export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string;
  copiedLabel?: string;
  label?: string;
}

/**
 * Paddock CopyButton: the white bordered button that copies a value. The icon turns to
 * a green check for two seconds after a copy, and the change is announced.
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    { value, copiedLabel = "Copied", label = "Copy", size = "icon-sm", variant = "secondary", ...props },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      } catch {
        // The clipboard can be unavailable; the button stays as it was.
      }
    };

    const iconOnly = size === "icon" || size === "icon-sm" || size === "icon-lg";

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        onClick={copy}
        aria-label={copied ? copiedLabel : label}
        data-slot="copy-button"
        {...props}
      >
        <Icon
          icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"}
          aria-hidden="true"
          className={cn("size-4", copied && "text-success-text")}
        />
        {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
        <span className="sr-only" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </Button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
