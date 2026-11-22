"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Margin ColorSwatch: a paper card with the colour as a block on top and its
 * name and value below. A press copies the value and the copy icon turns to
 * an oxblood tick for two seconds.
 */
export interface ColorSwatchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string;
  name?: string;
  showValue?: boolean;
  onCopy?: () => void;
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, color, name, showValue = true, onCopy, ...props }, ref) => {
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
        await navigator.clipboard.writeText(color);
        setCopied(true);
        onCopy?.();
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      } catch {
        // Copy is best effort; the swatch stays as it was.
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={copy}
        data-slot="color-swatch"
        aria-label={`Copy color ${name ?? color}`}
        className={cn(
          "group flex flex-col items-stretch gap-2 rounded-xl border border-border bg-card p-1.5 pb-2 text-left",
          "transition duration-fast ease-(--ease-out) hover:border-input hover:shadow-xs",
          "active:scale-97 motion-reduce:active:scale-100",
          focusRing,
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="h-14 w-full rounded-lg ring-1 ring-inset ring-border"
          style={{ backgroundColor: color }}
        />
        <span className="flex w-full items-center justify-between gap-2 px-1">
          <span className="min-w-0 flex-1">
            {name && <span className="block truncate text-xs font-medium text-foreground">{name}</span>}
            {showValue && (
              <span className="block truncate font-mono text-xs text-muted-foreground">{color}</span>
            )}
          </span>
          <Icon
            icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"}
            aria-hidden="true"
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              copied && "text-(--primary-text) opacity-100",
            )}
          />
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </button>
    );
  },
);
ColorSwatch.displayName = "ColorSwatch";

export { ColorSwatch };
