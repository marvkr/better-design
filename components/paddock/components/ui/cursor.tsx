"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Paddock Cursor: text that types itself out behind a blinking caret.
 * The caret is a thin teal bar in the primary colour, so the one moving
 * mark on the page wears the one accent.
 */
export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
}

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  ({ className, text, speed = 60, loop = false, pauseMs = 1500, ...props }, ref) => {
    const [display, setDisplay] = React.useState("");
    const [phase, setPhase] = React.useState<"typing" | "paused" | "deleting">("typing");

    React.useEffect(() => {
      if (phase === "typing") {
        if (display.length < text.length) {
          const t = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed);
          return () => clearTimeout(t);
        }
        if (loop) {
          const t = setTimeout(() => setPhase("deleting"), pauseMs);
          return () => clearTimeout(t);
        }
        setPhase("paused");
      } else if (phase === "deleting") {
        if (display.length > 0) {
          const t = setTimeout(() => setDisplay(text.slice(0, display.length - 1)), speed / 2);
          return () => clearTimeout(t);
        }
        setPhase("typing");
      }
    }, [display, phase, text, speed, loop, pauseMs]);

    return (
      <span
        ref={ref}
        data-slot="cursor"
        aria-label={text}
        className={cn("inline-flex items-baseline font-mono text-foreground", className)}
        {...props}
      >
        <span aria-hidden>{display}</span>
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 rounded-xs bg-primary"
        />
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
