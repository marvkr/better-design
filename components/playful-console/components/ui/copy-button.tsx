"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

/** Props for CopyButton: the value it copies and the labels it reads out. */
export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string;
  copiedLabel?: string;
  label?: string;
}

const ICON_ONLY_SIZES = new Set(["icon", "icon-sm", "icon-lg"]);
const COPIED_MS = 2000;

/**
 * Playful console CopyButton: a small flat helper that copies a value.
 *
 * It stays a ghost button by default, so the orange key keeps the spotlight.
 * After a copy the clipboard turns into a bold green tick for two seconds and
 * a screen reader hears the copied label. Icon sizes show the icon alone;
 * other sizes add the label beside it.
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      copiedLabel = "Copied",
      label = "Copy",
      variant = "ghost",
      size = "icon",
      onClick,
      className,
      ...props
    },
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
      } catch {
        // The clipboard refused (no permission or an insecure page), so the
        // button stays at rest and never reports a copy that did not happen.
        return;
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    };

    const iconOnly = ICON_ONLY_SIZES.has(size ?? "icon");
    const currentLabel = copied ? copiedLabel : label;

    return (
      <>
        <Button
          ref={ref}
          data-slot="copy-button"
          data-copied={copied ? "" : undefined}
          variant={variant}
          size={size}
          aria-label={iconOnly ? currentLabel : undefined}
          className={cn(!iconOnly && "gap-1.5", className)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) void copy();
          }}
          {...props}
        >
          <Icon
            icon={copied ? "ph:check-bold" : "ph:copy-duotone"}
            className={cn("size-4", copied && "text-(--success-text)")}
            aria-hidden="true"
          />
          {!iconOnly && <span>{currentLabel}</span>}
        </Button>
        {/* Kept outside the button, so its accessible name is never read twice. */}
        <span className="sr-only" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
