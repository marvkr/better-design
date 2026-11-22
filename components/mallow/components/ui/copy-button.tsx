"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { Button, type ButtonProps } from "./button";

/**
 * Mallow CopyButton: copies a value. The outline turns to a check for two
 * seconds after a copy, and a screen reader hears "Copied".
 */
export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string;
  copiedLabel?: string;
  label?: string;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    { value, copiedLabel = "Copied", label = "Copy", size = "icon", variant = "ghost", className, ...props },
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
        // Copy is best effort; the button stays as it was.
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
        className={className}
        {...props}
      >
        <Icon icon={copied ? "iconoir:check" : "iconoir:copy"} className="size-4" />
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
