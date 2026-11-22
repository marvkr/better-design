// Pagination: numbered pager with sliding selection thumb, sibling/boundary windowing, and rolled-in digits. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { isNumber } from "@/lib/better-design-guards";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;

const EASE = [0.23, 1, 0.32, 1] as const;
const ROLL = { duration: 0.18, ease: EASE } as const;
const STILL = { duration: 0 } as const;

const slotFor = (digits: number) => Math.max(32, 18 + digits * 8);
const GAP = 4;

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const arrow = (can: boolean) =>
  `flex h-8 w-8 shrink-0 items-center justify-center rounded-md outline-none transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 ${
    can
      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
      : "text-muted-foreground/70"
  }`;

export type PaginationItem = number | "gap-l" | "gap-r";

export function paginate(
  page: number,
  count: number,
  siblings: number,
  boundaries: number,
): PaginationItem[] {
  const total = 2 * boundaries + 2 * siblings + 3;
  if (count <= total) return range(1, count);

  const nearStart = page < boundaries + siblings + 2;
  const nearEnd = page > count - boundaries - siblings - 1;

  if (nearStart) {
    return [
      ...range(1, 2 * siblings + boundaries + 2),
      "gap-r",
      ...range(count - boundaries + 1, count),
    ];
  }
  if (nearEnd) {
    return [
      ...range(1, boundaries),
      "gap-l",
      ...range(count - 2 * siblings - boundaries - 1, count),
    ];
  }
  return [
    ...range(1, boundaries),
    "gap-l",
    ...range(page - siblings, page + siblings),
    "gap-r",
    ...range(count - boundaries + 1, count),
  ];
}

export type UsePaginationOptions = {
  count: number;
  page?: number;
  defaultPage?: number;
  siblings?: number;
  boundaries?: number;
  onPageChange?: (page: number) => void;
};

export function usePagination({
  count,
  page,
  defaultPage = 1,
  siblings = 1,
  boundaries = 1,
  onPageChange,
}: UsePaginationOptions) {
  const clampTo = useCallback(
    (value: number) => Math.min(Math.max(1, value), Math.max(1, count)),
    [count],
  );

  const [internal, setInternal] = useState(() => clampTo(defaultPage));
  const controlled = page !== undefined;
  const current = clampTo(controlled ? page : internal);

  const emit = useRef(onPageChange);
  emit.current = onPageChange;

  const previous = useRef(current);
  const direction = current >= previous.current ? 1 : -1;
  useEffect(() => {
    previous.current = current;
  }, [current]);

  const goTo = useCallback(
    (value: number) => {
      const next = clampTo(value);
      if (next === previous.current) return;
      if (!controlled) setInternal(next);
      emit.current?.(next);
    },
    [clampTo, controlled],
  );

  const items = paginate(current, count, siblings, boundaries);

  return {
    page: current,
    count,
    items,
    direction,
    thumbIndex: items.indexOf(current),
    canPrev: current > 1,
    canNext: current < count,
    goTo,
    prev: () => goTo(current - 1),
    next: () => goTo(current + 1),
  };
}

export type PaginationProps = {
  count: number;
  page?: number;
  defaultPage?: number;
  siblings?: number;
  boundaries?: number;
  onPageChange?: (page: number) => void;
  label?: string;
  className?: string;
};

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
      className={flip ? "-scale-x-100" : undefined}
    >
      <path
        d="M4.75 2.75 8 6l-3.25 3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pagination({
  count,
  page,
  defaultPage,
  siblings,
  boundaries,
  onPageChange,
  label = "Pagination",
  className = "",
}: PaginationProps) {
  const pagination = usePagination({
    count,
    page,
    defaultPage,
    siblings,
    boundaries,
    onPageChange,
  });
  const { items, direction, thumbIndex, canPrev, canNext } = pagination;
  const current = pagination.page;

  const reduced = useReducedMotion();
  const digits = String(Math.max(1, count)).length;
  const slot = slotFor(digits);

  const [spoken, setSpoken] = useState("");
  useEffect(() => {
    const t = setTimeout(
      () => setSpoken(`Page ${current} of ${Math.max(1, count)}`),
      500,
    );
    return () => clearTimeout(t);
  }, [current, count]);

  return (
    <nav aria-label={label} className={`inline-block ${className}`}>
      <div className="flex items-center" style={{ gap: GAP }}>
        <button
          type="button"
          aria-label="Previous page"
          aria-disabled={!canPrev}
          onClick={() => canPrev && pagination.prev()}
          className={arrow(canPrev)}
        >
          <Chevron flip />
        </button>
        <div className="relative">
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: thumbIndex * (slot + GAP) }}
            transition={reduced ? STILL : CELL}
            style={{ width: slot }}
            className="absolute inset-y-0 left-0 rounded-md bg-primary"
          />
          <ol className="relative flex" style={{ gap: GAP }}>
            {items.map((item) => {
              if (!isNumber(item)) {
                return (
                  <li
                    key={item}
                    aria-hidden
                    style={{ width: slot }}
                    className="flex h-8 items-center justify-center text-[0.7813rem] text-muted-foreground/70"
                  >
                    &hellip;
                  </li>
                );
              }

              const selected = item === current;
              return (
                <li key={`slot-${item}`} style={{ width: slot }}>
                  <button
                    type="button"
                    aria-label={`Page ${item}`}
                    aria-current={selected ? "page" : undefined}
                    onClick={() => pagination.goTo(item)}
                    className={`flex h-8 w-full items-center justify-center rounded-md text-[0.7813rem] tabular-nums outline-none transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 ${
                      selected
                        ? "font-medium text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <motion.span
                      key={item}
                      initial={
                        reduced ? false : { opacity: 0, x: 8 * direction }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={reduced ? STILL : ROLL}
                    >
                      {item}
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <button
          type="button"
          aria-label="Next page"
          aria-disabled={!canNext}
          onClick={() => canNext && pagination.next()}
          className={arrow(canNext)}
        >
          <Chevron />
        </button>
      </div>
      <span role="status" className="sr-only">
        {spoken}
      </span>
    </nav>
  );
}
