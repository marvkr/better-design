"use client";

import { getPatternOrder } from "./pattern-order";
import type { GridSize, LoaderPattern, LoaderShape } from "./types";

type DotGridProps = {
  size?: number;
  grid?: GridSize;
  shape?: LoaderShape;
  pattern?: LoaderPattern;
};

const GAP_RATIO = 0.32;
const TOTAL_DURATION_MS = 1400;

export function DotGrid({
  size = 28,
  grid = 3,
  shape = "circle",
  pattern = "sequential",
}: DotGridProps) {
  const order = getPatternOrder(grid, pattern);
  const steps = Math.max(...order) + 1;
  const dotSize = size / (grid + (grid - 1) * GAP_RATIO);
  const gap = dotSize * GAP_RATIO;

  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "square"
        ? "rounded-[1px]"
        : "rounded-[1px] rotate-45";

  return (
    <div
      className="grid"
      style={{
        width: size,
        height: size,
        gridTemplateColumns: `repeat(${grid}, 1fr)`,
        gap: `${gap}px`,
      }}
      role="status"
      aria-label="Loading"
    >
      {order.map((step, i) => {
        const delay = (step / steps) * TOTAL_DURATION_MS;
        return (
          <span
            key={i}
            className={`bg-current ${shapeClass}`}
            style={{
              width: dotSize,
              height: dotSize,
              animation: `loader-pulse ${TOTAL_DURATION_MS}ms ease-in-out infinite`,
              animationDelay: `${delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
