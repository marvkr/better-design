// LoadingButton: async action button that crossfades idle, pending, success, and error faces. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const INSTANT = { duration: 0 } as const;

export type AsyncActionStatus = "idle" | "pending" | "success" | "error";

export type UseAsyncActionOptions = {
  action: () => void;
  resetAfter?: number;
  onError?: (cause: unknown) => void;
};

export function useAsyncAction({
  action,
  resetAfter = 1400,
  onError,
}: UseAsyncActionOptions) {
  const [status, setStatus] = useState<AsyncActionStatus>("idle");

  const phase = useRef<AsyncActionStatus>("idle");
  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);

  const act = useRef(action);
  const fail = useRef(onError);

  useEffect(() => {
    act.current = action;
    fail.current = onError;
  });

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    runId.current += 1;
    clear();
    phase.current = "idle";
    setStatus("idle");
  }, [clear]);

  const run = useCallback(() => {
    if (phase.current === "pending") return;

    clear();
    const id = ++runId.current;
    phase.current = "pending";
    setStatus("pending");

    const settle = (next: "success" | "error") => {
      if (!alive.current || id !== runId.current) return;
      clear();
      phase.current = next;
      setStatus(next);
      timer.current = setTimeout(() => {
        if (!alive.current || id !== runId.current) return;
        phase.current = "idle";
        setStatus("idle");
      }, resetAfter);
    };

    Promise.resolve()
      .then(() => act.current())
      .then(
        () => settle("success"),
        (cause: unknown) => {
          fail.current?.(cause);
          settle("error");
        },
      );
  }, [clear, resetAfter]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clear();
    };
  }, [clear]);

  return {
    status,
    run,
    reset,
    pending: status === "pending",
  };
}

function Spinner({ still }: { still: boolean }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
      animate={still ? undefined : { rotate: 360 }}
      transition={
        still ? undefined : { duration: 0.85, repeat: Infinity, ease: "linear" }
      }
    >
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.22"
      />
      <path
        d="M10.5 6A4.5 4.5 0 0 0 6 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2.6 6.3 4.9 8.6 9.4 3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M6 2.9v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 9.05h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export type LoadingButtonProps = {
  onAction: () => void;
  children: string;
  pendingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  resetAfter?: number;
  disabled?: boolean;
  onError?: (cause: unknown) => void;
  renderIcon?: (status: AsyncActionStatus) => ReactNode;
  className?: string;
};

export function LoadingButton({
  onAction,
  children,
  pendingLabel = children,
  successLabel = "Done",
  errorLabel = "Try again",
  resetAfter = 1400,
  disabled = false,
  onError,
  renderIcon,
  className = "",
}: LoadingButtonProps) {
  const reduced = useReducedMotion();

  const { status, run, pending } = useAsyncAction({
    action: onAction,
    resetAfter,
    onError,
  });

  const fade = reduced ? INSTANT : CROSSFADE;


  const label =
    status === "pending"
      ? pendingLabel
      : status === "success"
        ? successLabel
        : status === "error"
          ? errorLabel
          : children;

  const faces = [
    {
      key: "idle",
      text: children,
      tone: "text-foreground",
      icon: null,
    },
    {
      key: "pending",
      text: pendingLabel,
      tone: "text-muted-foreground",
      icon: renderIcon?.("pending") ?? <Spinner still={reduced === true || status !== "pending"} />,
    },
    {
      key: "success",
      text: successLabel,
      tone: "text-[var(--success,oklch(0.63_0.15_155))]",
      icon: renderIcon?.("success") ?? <CheckMark />,
    },
    {
      key: "error",
      text: errorLabel,
      tone: "text-destructive",
      icon: renderIcon?.("error") ?? <AlertMark />,
    },
  ];

  return (
    <>
      <motion.button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-busy={pending || undefined}
        aria-disabled={pending || undefined}
        whileTap={disabled || pending || reduced ? undefined : { y: 1 }}
        transition={CELL}
        onClick={(event) => {
          if (pending) {
            event.preventDefault();
            return;
          }
          run();
        }}
        className={`relative inline-flex h-9 select-none items-center justify-center rounded-md border border-border bg-card px-3.5 text-[0.8125rem] font-medium text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-fast hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50 ${className}`}
        style={{ touchAction: "manipulation" }}
      >
        <span aria-hidden className="relative grid place-items-center">
          {faces.map((face) => (
            <motion.span
              key={face.key}
              initial={false}
              animate={
                face.key === status
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 3, filter: "blur(3px)" }
              }
              transition={fade}
              className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 whitespace-nowrap ${face.tone}`}
            >
              {face.icon}
              {face.text}
            </motion.span>
          ))}
        </span>
      </motion.button>

      <span role="status" aria-live="polite" className="sr-only">
        {status === "success" ? successLabel : status === "error" ? errorLabel : ""}
      </span>
    </>
  );
}
