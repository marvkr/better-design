// LoadMore: infinite-list sentinel with a status button that auto-loads, caps auto runs, and recovers from errors. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const INSTANT = { duration: 0 } as const;
const SPIN = { duration: 0.7, ease: "linear", repeat: Infinity } as const;

export type LoadMoreStatus = "idle" | "loading" | "error" | "end";

/**
 * What a load callback may report back. Returning `false` says the list is
 * exhausted; anything else leaves the loader ready for another page.
 */
export type LoadMoreResult = false | void;

export type UseLoadMoreOptions = {
  onLoad: () => LoadMoreResult | Promise<LoadMoreResult>;
  hasMore?: boolean;
  auto?: boolean;
  rootRef?: RefObject<Element | null>;
  rootMargin?: string;
  maxAutoLoads?: number;
  onError?: (cause: unknown) => void;
};

export type UseLoadMoreReturn = {
  status: LoadMoreStatus;
  paused: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
  load: () => void;
};

export function useLoadMore({
  onLoad,
  hasMore = true,
  auto = true,
  rootRef,
  rootMargin = "600px 0px",
  maxAutoLoads = 3,
  onError,
}: UseLoadMoreOptions): UseLoadMoreReturn {
  const [phase, setPhase] = useState<"idle" | "loading" | "error">("idle");
  const [ended, setEnded] = useState(false);
  const [paused, setPaused] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const seq = useRef(0);
  const busy = useRef(false);
  const alive = useRef(true);
  const runs = useRef(0);
  const done = useRef(false);
  const blocked = useRef(false);

  const fetchMore = useRef(onLoad);
  fetchMore.current = onLoad;
  const fail = useRef(onError);
  fail.current = onError;
  const more = useRef(hasMore);
  more.current = hasMore;

  const reobserve = useCallback(() => {
    const io = observer.current;
    const el = sentinelRef.current;
    if (io && el) {
      io.unobserve(el);
      io.observe(el);
    }
  }, []);

  const run = useCallback(
    (manual: boolean) => {
      if (busy.current || done.current || !more.current) return;

      if (manual) {
        runs.current = 0;
        blocked.current = false;
        setPaused(false);
      } else {
        if (blocked.current) return;
        if (runs.current >= maxAutoLoads) {
          setPaused(true);
          return;
        }
        runs.current += 1;
      }

      busy.current = true;
      const id = ++seq.current;
      setPhase("loading");

      Promise.resolve()
        .then(() => fetchMore.current())
        .then(
          (result) => {
            busy.current = false;
            if (!alive.current || id !== seq.current) return;
            setPhase("idle");
            if (result === false) {
              done.current = true;
              setEnded(true);
              return;
            }
            reobserve();
          },
          (cause: unknown) => {
            busy.current = false;
            if (!alive.current || id !== seq.current) return;
            blocked.current = true;
            fail.current?.(cause);
            setPhase("error");
          },
        );
    },
    [maxAutoLoads, reobserve],
  );

  useEffect(() => {
    if (hasMore) {
      done.current = false;
      setEnded(false);
    }
  }, [hasMore]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    if (!auto || ended) return;
    const el = sentinelRef.current;
    if (!el || !("IntersectionObserver" in globalThis)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.isIntersecting) {
          run(false);
          return;
        }
        runs.current = 0;
        setPaused(false);
      },
      { root: rootRef?.current ?? null, rootMargin, threshold: 0 },
    );

    observer.current = io;
    io.observe(el);

    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, [auto, ended, rootMargin, rootRef, run]);

  const load = useCallback(() => run(true), [run]);

  const status: LoadMoreStatus = ended || !hasMore ? "end" : phase;

  return { status, paused, sentinelRef, load };
}

function ChevronMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M2.6 4.2 5.5 7.1 8.4 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M2.2 5.7 4.5 8 8.8 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5.5 2.4v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4.7" y="7.5" width="1.6" height="1.6" rx="0.4" fill="currentColor" />
    </svg>
  );
}

function SpinnerMark({ spinning }: { spinning: boolean }) {
  return (
    <motion.svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
      style={{ transformOrigin: "50% 50%" }}
      initial={false}
      animate={spinning ? { rotate: 360 } : { rotate: 0 }}
      transition={spinning ? SPIN : INSTANT}
    >
      <circle cx="5.5" cy="5.5" r="3.9" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <path
        d="M5.5 1.6a3.9 3.9 0 0 1 3.9 3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export type LoadMoreLabels = Record<LoadMoreStatus, string>;

const DEFAULT_LABELS = {
  idle: "Load more",
  loading: "Loading",
  error: "Couldn’t load. Try again",
  end: "You’re all caught up",
} satisfies LoadMoreLabels;

const ORDER: LoadMoreStatus[] = ["idle", "loading", "error", "end"];

const TONE = {
  idle: "text-foreground",
  loading: "text-muted-foreground",
  error: "text-destructive",
  end: "text-muted-foreground",
} satisfies Record<LoadMoreStatus, string>;

export type LoadMoreProps = {
  onLoad: () => LoadMoreResult | Promise<LoadMoreResult>;
  hasMore?: boolean;
  auto?: boolean;
  rootRef?: RefObject<Element | null>;
  rootMargin?: string;
  maxAutoLoads?: number;
  labels?: Partial<LoadMoreLabels>;
  onError?: (cause: unknown) => void;
  className?: string;
};

export function LoadMore({
  onLoad,
  hasMore = true,
  auto = true,
  rootRef,
  rootMargin = "600px 0px",
  maxAutoLoads = 3,
  labels,
  onError,
  className = "",
}: LoadMoreProps) {
  const reduced = useReducedMotion();

  const { status, sentinelRef, load } = useLoadMore({
    onLoad,
    hasMore,
    auto,
    rootRef,
    rootMargin,
    maxAutoLoads,
    onError,
  });

  const fade = reduced ? INSTANT : CROSSFADE;

  const text = { ...DEFAULT_LABELS, ...labels } satisfies LoadMoreLabels;
  const icons = {
    idle: <ChevronMark />,
    loading: <SpinnerMark spinning={status === "loading" && !reduced} />,
    error: <AlertMark />,
    end: <CheckMark />,
  } satisfies Record<LoadMoreStatus, ReactNode>;

  const inert = status === "loading" || status === "end";

  return (
    <div className={`relative flex w-full justify-center ${className}`}>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />

      <button
        type="button"
        aria-busy={status === "loading" || undefined}
        aria-disabled={inert || undefined}
        aria-label={text[status]}
        onClick={(event) => {
          if (inert) {
            event.preventDefault();
            return;
          }
          load();
        }}
        className={`group relative inline-flex h-8 select-none items-center justify-center rounded-md px-3 text-[0.7813rem] font-medium outline-none transition-[background-color,box-shadow,transform] duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 ${
          inert
            ? "cursor-default"
            : "cursor-pointer hover:bg-muted active:translate-y-px"
        }`}
        style={{ touchAction: "manipulation" }}
      >
        <motion.span
          aria-hidden
          initial={false}
          animate={{ y: status === "loading" ? 1 : 0 }}
          transition={reduced ? INSTANT : CROSSFADE}
          className="relative grid place-items-center"
        >
          {ORDER.map((s) => (
            <motion.span
              key={s}
              initial={false}
              animate={
                s === status
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 3, filter: "blur(3px)" }
              }
              transition={fade}
              className={`col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap ${TONE[s]}`}
            >
              {icons[s]}
              {text[s]}
            </motion.span>
          ))}
        </motion.span>
      </button>

      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "error" || status === "end" ? text[status] : ""}
      </span>
    </div>
  );
}
