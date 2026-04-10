"use client";

/**
 * DotMatrix Component
 *
 * Single Responsibility: Renders the grid of dots.
 * Dependency Inversion: Depends on Dot abstraction, not concrete implementation.
 */

import { useMemo } from "react";

import type { AgentState } from "./types";
import { GRID_SIZE, DOT_COUNT } from "./constants";
import { Dot } from "./dot";

interface DotMatrixProps {
  state: AgentState;
}

// Fixed size to match Logo (18px) - 7x7 grid with smaller dots
const DOT_SIZE = 2;
const GAP = "0.5px";

export function DotMatrix({ state }: DotMatrixProps) {
  const dots = useMemo(
    () =>
      Array.from({ length: DOT_COUNT }, (_, i) => (
        <Dot key={i} index={i} state={state} dotSize={DOT_SIZE} />
      )),
    [state]
  );

  return (
    <div
      className="rounded-md"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: GAP,
        ...(state === "error" && {
          animation: "agent-wiggle 3s ease-out infinite",
        }),
      }}
    >
      {dots}
    </div>
  );
}
