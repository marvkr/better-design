"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
  /** Name shown in an ink chip beside a pointer, like a collaborator's cursor. */
  label?: string;
  /** Fill for the pointer arrow; the caret and the chip stay in ink. */
  color?: string;
  /** Wait before the first letter, in milliseconds. */
  delay?: number;
}

/**
 * Cream editorial Cursor: text that writes itself out behind a terracotta
 * caret, the way an assistant's reply arrives on the page. The caret blinks
 * on a slow fade. Give it a label and a small ink pointer appears under the
 * text with the name in a warm ink chip. With reduced motion on, the full
 * text shows at once and the caret holds still.
 */
const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  (
    {
      className,
      text,
      speed = 60,
      loop = false,
      pauseMs = 1500,
      label,
      color,
      delay = 0,
      ...props
    },
    ref,
  ) => {
    const [display, setDisplay] = React.useState("");
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
      if (reduceMotion) {
        setDisplay(text);
        return;
      }

      let timer: ReturnType<typeof setTimeout>;
      let shown = 0;
      let deleting = false;
      setDisplay("");

      const tick = () => {
        if (!deleting) {
          if (shown < text.length) {
            shown += 1;
            setDisplay(text.slice(0, shown));
            timer = setTimeout(tick, speed);
            return;
          }
          if (!loop) return;
          deleting = true;
          timer = setTimeout(tick, pauseMs);
          return;
        }
        if (shown > 0) {
          shown -= 1;
          setDisplay(text.slice(0, shown));
          timer = setTimeout(tick, speed / 2);
          return;
        }
        deleting = false;
        timer = setTimeout(tick, speed * 4);
      };

      timer = setTimeout(tick, delay);
      return () => clearTimeout(timer);
    }, [text, speed, loop, pauseMs, delay, reduceMotion]);

    return (
      <span
        ref={ref}
        data-slot="cursor"
        className={cn("inline-flex flex-col items-start gap-1", className)}
        {...props}
      >
        <span className="sr-only">{text}</span>
        <span
          aria-hidden="true"
          className="inline-flex min-h-6 items-baseline text-[0.9375rem] leading-relaxed text-foreground"
        >
          <span className="whitespace-pre-wrap">{display}</span>
          <motion.span
            animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1, times: [0, 0.5, 0.6, 1], repeat: Infinity, ease: "linear" }
            }
            className="ms-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-primary"
          />
        </span>
        {label && (
          <span aria-hidden="true" className="inline-flex items-start">
            <svg
              viewBox="0 0 16 16"
              className="size-4 shrink-0 fill-foreground stroke-background"
              style={color ? { fill: color } : undefined}
              strokeWidth={1.25}
              strokeLinejoin="round"
            >
              <path d="M2.5 1.5 13 8.2 8.3 9.1 5.9 13.6Z" />
            </svg>
            <span className="mt-3 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 text-xs font-medium text-background">
              {label}
            </span>
          </span>
        )}
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
