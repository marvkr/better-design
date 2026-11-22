"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Cursor — progressive typing behind a blinking sky-blue caret, the
 * same accent the focus ring uses.
 */

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
}

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  (
    { className, text, speed = 60, loop = false, pauseMs = 1500, ...props },
    ref,
  ) => {
    const [display, setDisplay] = React.useState("");
    const [phase, setPhase] = React.useState<"typing" | "paused" | "deleting">(
      "typing",
    );

    // A new text prop restarts the animation; without this the old string
    // keeps typing out and the new one never appears.
    React.useEffect(() => {
      setDisplay("");
      setPhase("typing");
    }, [text]);

    React.useEffect(() => {
      if (phase === "typing") {
        if (display.length < text.length) {
          const timer = setTimeout(
            () => setDisplay(text.slice(0, display.length + 1)),
            speed,
          );
          return () => clearTimeout(timer);
        }
        if (loop) {
          const timer = setTimeout(() => setPhase("deleting"), pauseMs);
          return () => clearTimeout(timer);
        }
        setPhase("paused");
      } else if (phase === "deleting") {
        if (display.length > 0) {
          const timer = setTimeout(
            () => setDisplay(text.slice(0, display.length - 1)),
            speed / 2,
          );
          return () => clearTimeout(timer);
        }
        setPhase("typing");
      }
    }, [display, phase, text, speed, loop, pauseMs]);

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-baseline font-mono", className)}
        aria-label={text}
        {...props}
      >
        <span>{display}</span>
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 inline-block h-[1em] w-[0.125rem] translate-y-[0.125rem] rounded-full bg-primary"
        />
      </span>
    );
  },
);
Cursor.displayName = "Cursor";

export { Cursor };
