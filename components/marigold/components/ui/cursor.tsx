"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

// Talentboard Cursor: typewriter caret in the DS orange with a tidy label pill.

interface CursorProps {
  text: string;
  label?: string;
  color?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

function Cursor({
  text,
  label,
  color = "oklch(0.7 0.17 52)",
  speed = 60,
  delay = 500,
  loop = false,
  className,
}: CursorProps) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let index = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        setIsTyping(index < text.length);
        index += 1;
        timeout = setTimeout(type, speed);
      } else if (loop) {
        timeout = setTimeout(() => {
          index = 0;
          type();
        }, delay * 2);
      }
    };

    timeout = setTimeout(type, delay);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [text, speed, delay, loop]);

  return (
    <span className={cn("relative inline-flex items-center font-medium", className)}>
      <span>{displayedText}</span>
      <motion.span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1.1em] w-[0.125rem] rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: isTyping ? 1 : [1, 0, 1] }}
        transition={isTyping ? { duration: 0 } : { duration: 1, repeat: Infinity }}
      />
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="ml-2 rounded-md px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: color,
              color: "oklch(0.99 0.005 80)",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export { Cursor };
export type { CursorProps };
