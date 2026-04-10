/**
 * Dot Component
 *
 * Single Responsibility: Renders a single animated dot.
 * Liskov Substitution: Can be replaced with any component that accepts the same props.
 */

import type { AgentState } from "./types";
import { STATES } from "./constants";
import { getAnimationStyle } from "./animation-utils";

interface DotProps {
  index: number;
  state: AgentState;
  dotSize?: number;
}

export function Dot({ index, state, dotSize = 4 }: DotProps) {
  const stateConfig = STATES[state];
  const animStyle = getAnimationStyle(index, state);

  return (
    <div
      className="rounded-full transition-colors duration-400"
      style={{
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        backgroundColor: stateConfig.color,
        boxShadow: `0 0 ${dotSize + 2}px ${stateConfig.glowColor}`,
        animation: animStyle.animation,
        animationDelay: animStyle.animationDelay,
        opacity: animStyle.opacity,
      }}
    />
  );
}
