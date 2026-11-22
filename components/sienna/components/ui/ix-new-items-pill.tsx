// NewItemsPill: scroll-position tracker with a floating "N new items" jump pill and polite announcements. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { isBrowser } from "@/lib/better-design-guards";

const EASE = [0.23, 1, 0.32, 1] as const;

const ARRIVE = { type: "spring", stiffness: 540, damping: 34, mass: 0.5 } as const;
const INSTANT = { duration: 0 } as const;

const useIsoLayoutEffect =
  !isBrowser() ? useEffect : useLayoutEffect;

export type NewItemsAnchor = "top" | "bottom";

export type UseNewItemsOptions = {
  itemCount: number;
  anchor?: NewItemsAnchor;
  threshold?: number;
};

export type UseNewItemsResult<T extends HTMLElement> = {
  scrollProps: {
    ref: React.RefObject<T | null>;
    tabIndex: number;
    style: React.CSSProperties;
  };
  unread: number;
  pinned: boolean;

  jump: () => number;
};

export function useNewItems<T extends HTMLElement = HTMLDivElement>({
  itemCount,
  anchor = "top",
  threshold = 24,
}: UseNewItemsOptions): UseNewItemsResult<T> {
  const ref = useRef<T | null>(null);
  const pinnedRef = useRef(true);
  const prevCount = useRef(itemCount);
  const bottomGap = useRef(0);

  const [unread, setUnread] = useState(0);
  const [pinned, setPinned] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const read = () =>
      anchor === "bottom"
        ? el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
        : el.scrollTop <= threshold;

    const onScroll = () => {
      bottomGap.current = el.scrollHeight - el.scrollTop;
      const next = read();
      if (next === pinnedRef.current) return;
      pinnedRef.current = next;
      setPinned(next);
      if (next) setUnread(0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [anchor, threshold]);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const added = itemCount - prevCount.current;
    prevCount.current = itemCount;
    if (!el || added <= 0) return;

    if (pinnedRef.current) {
      el.scrollTop = anchor === "bottom" ? el.scrollHeight : 0;
      bottomGap.current = el.scrollHeight - el.scrollTop;
      return;
    }

    if (anchor === "top") {
      const target = el.scrollHeight - bottomGap.current;
      if (target > el.scrollTop) el.scrollTop = target;
    }
    setUnread((n) => n + added);
  }, [itemCount, anchor]);

  const unreadRef = useRef(0);
  unreadRef.current = unread;

  const jump = useCallback(() => {
    const el = ref.current;
    const caught = unreadRef.current;
    if (!el) return caught;
    pinnedRef.current = true;
    setPinned(true);
    setUnread(0);

    el.focus({ preventScroll: true });
    el.scrollTo({
      top: anchor === "bottom" ? el.scrollHeight : 0,
      behavior: reduced ? "auto" : "smooth",
    });
    return caught;
  }, [anchor, reduced]);

  return {
    scrollProps: { ref, tabIndex: 0, style: { overflowAnchor: "none" } },
    unread,
    pinned,
    jump,
  };
}

export type NewItemsPillProps = {
  count: number;
  onJump: () => void;
  anchor?: NewItemsAnchor;
  label?: (count: number) => string;
  max?: number;
  className?: string;
};

const defaultLabel = (n: number) => `${n} new ${n === 1 ? "item" : "items"}`;

export function NewItemsPill({
  count,
  onJump,
  anchor = "top",
  label = defaultLabel,
  max = 99,
  className = "",
}: NewItemsPillProps) {
  const reduced = useReducedMotion();
  const [announced, setAnnounced] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setAnnounced(0);
      return;
    }
    const t = setTimeout(() => setAnnounced(count), 700);
    return () => clearTimeout(t);
  }, [count]);

  const phrase = (n: number) => (n > max ? `${max}+ new items` : label(n));
  const text = phrase(count);
  const off = anchor === "bottom" ? 10 : -10;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center ${
        anchor === "bottom" ? "bottom-2" : "top-2"
      } ${className}`}
    >
      <AnimatePresence initial={false}>
        {count > 0 && (
          <motion.button
            type="button"
            onClick={onJump}
            aria-label={text}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: off }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduced
                ? { opacity: 0, transition: INSTANT }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: off * 0.5,
                    transition: { duration: 0.16, ease: EASE },
                  }
            }
            transition={
              reduced
                ? INSTANT
                : { ...ARRIVE, opacity: { duration: 0.16, ease: EASE } }
            }
            className="pointer-events-auto inline-flex h-8 select-none items-center gap-1.5 rounded-md border border-border bg-card pl-2 pr-2.5 text-[0.7813rem] font-medium text-card-foreground shadow-lg outline-none transition-shadow duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 256 256"
              fill="none"
              aria-hidden="true"
              className={anchor === "bottom" ? "rotate-180" : ""}
            >
              <line
                x1="128"
                y1="216"
                x2="128"
                y2="48"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <polyline
                points="56 120 128 48 200 120"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="tabular-nums" aria-hidden="true">
              {text}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <span role="status" aria-live="polite" className="sr-only">
        {announced > 0 ? phrase(announced) : ""}
      </span>
    </div>
  );
}
