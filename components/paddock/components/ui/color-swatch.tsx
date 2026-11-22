"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, pressScale } from "./_shared";

/** Props for a swatch that shows one colour and copies its value on press. */
export interface ColorSwatchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  color: string;
  name?: string;
  showValue?: boolean;
  onCopy?: () => void;
}

/**
 * Paddock ColorSwatch: a small white card with the colour as a soft tile on
 * top and its name and value under it; a press copies the value.
 */
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
        // The clipboard can be unavailable; the swatch stays as it was.
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
          "group flex flex-col items-stretch gap-2 rounded-xl p-1.5 text-left",
          cardSlab,
          "transition-shadow duration-fast ease-out hover:shadow-(--card-lift)",
          pressScale,
          focusRing,
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="h-14 w-full rounded-lg shadow-(--track-inset)"
          style={{ backgroundColor: color }}
        />
        <span className="flex w-full items-center justify-between gap-2 px-1 pb-0.5">
          <span className="min-w-0 flex-1">
            {name && <span className="block truncate text-[0.8125rem] font-medium text-foreground">{name}</span>}
            {showValue && (
              <span className="block truncate font-mono text-xs text-muted-foreground">{color}</span>
            )}
          </span>
          <Icon
            icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"}
            aria-hidden="true"
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              copied && "text-success-text opacity-100",
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
