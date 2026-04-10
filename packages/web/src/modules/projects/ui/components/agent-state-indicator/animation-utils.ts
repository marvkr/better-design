/**
 * Animation Utilities
 *
 * Single Responsibility: Calculates animation styles based on state and position.
 * Open/Closed: Add new state animations without modifying existing switch cases.
 */

import type { AgentState, DotAnimationStyle, DotPosition } from "./types";
import { GRID_SIZE, PATTERNS } from "./constants";

/**
 * Calculate dot position metadata from index.
 */
export function calculateDotPosition(index: number): DotPosition {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  const centerX = (GRID_SIZE - 1) / 2;
  const centerY = (GRID_SIZE - 1) / 2;
  const distFromCenter = Math.sqrt(
    Math.pow(row - centerY, 2) + Math.pow(col - centerX, 2)
  );
  const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
  const normalizedDist = distFromCenter / maxDist;
  const angle = Math.atan2(row - centerY, col - centerX);
  const normalizedAngle = (angle + Math.PI) / (2 * Math.PI);

  return {
    row,
    col,
    distFromCenter,
    normalizedDist,
    angle,
    normalizedAngle,
  };
}

/**
 * Check if a dot index is part of a pattern for the given state.
 */
export function isInPattern(index: number, state: AgentState): boolean {
  const pattern = PATTERNS[state];
  return pattern?.has(index) ?? false;
}

/**
 * Get animation style for idle state.
 */
function getIdleAnimation(position: DotPosition): DotAnimationStyle {
  return {
    animation: `agent-breathe 3s ease-in-out infinite`,
    animationDelay: `${position.normalizedDist * 0.8}s`,
    opacity: 0.3 + (1 - position.normalizedDist) * 0.3,
  };
}

/**
 * Get animation style for thinking state.
 * Creates a clockwise spiral effect from center outward.
 */
function getThinkingAnimation(position: DotPosition): DotAnimationStyle {
  // Clockwise spiral: use angle directly for clockwise direction
  const spiralDelay =
    (position.normalizedAngle * 0.8 + position.normalizedDist * 0.4) * 1.2;
  return {
    animation: `agent-spiral 1.5s ease-in-out infinite`,
    animationDelay: `${spiralDelay}s`,
    opacity: 0.4 + Math.random() * 0.3,
  };
}

/**
 * Get animation style for executing state.
 */
function getExecutingAnimation(position: DotPosition): DotAnimationStyle {
  return {
    animation: `agent-scan-column 1.8s ease-in-out infinite`,
    animationDelay: `${position.col * 0.12}s`,
    opacity: 0.9,
  };
}

/**
 * Get animation style for paused state.
 */
function getPausedAnimation(
  index: number,
  _position: DotPosition
): DotAnimationStyle {
  if (isInPattern(index, "paused")) {
    return {
      animation: `agent-pause-pulse 2s ease-in-out infinite`,
      animationDelay: "0s",
      opacity: 1,
    };
  }
  return { opacity: 0.08 };
}

/**
 * Get animation style for question state.
 */
function getQuestionAnimation(
  index: number,
  position: DotPosition
): DotAnimationStyle {
  if (isInPattern(index, "question")) {
    return {
      animation: `agent-question-bounce 1.5s ease-in-out infinite`,
      animationDelay: `${Math.random() * 0.3}s`,
      opacity: 1,
    };
  }
  return {
    animation: `agent-gentle-pulse 3s ease-in-out infinite`,
    animationDelay: `${position.normalizedDist * 0.8}s`,
    opacity: 0.1,
  };
}

// Checkmark stroke order: left stroke down to vertex, then up the right stroke
const CHECKMARK_STROKE_ORDER: Record<number, number> = {
  22: 0,  // Short left stroke start
  30: 1,  // Vertex at bottom
  24: 2,  // Long stroke going up
  18: 3,  // Long stroke continues
  12: 4,  // Long stroke end (highest point)
};

/**
 * Get animation style for success state.
 * Checkmark animates in from left to right, then glows.
 */
function getSuccessAnimation(
  index: number,
  position: DotPosition
): DotAnimationStyle {
  // Checkmark dots animate in sequence then glow
  if (isInPattern(index, "success")) {
    const strokeOrder = CHECKMARK_STROKE_ORDER[index] ?? 0;
    const appearDelay = strokeOrder * 0.08; // 80ms between each dot
    return {
      animation: `agent-checkmark-appear 0.3s ease-out forwards, agent-success-glow 2s ease-in-out 0.7s infinite`,
      animationDelay: `${appearDelay}s`,
      opacity: 0,
    };
  }
  // Background dots animate radially from center
  return {
    animation: `agent-radial-pulse 2.5s ease-out infinite`,
    animationDelay: `${position.normalizedDist * 0.4}s`,
    opacity: 0.15,
  };
}

/**
 * Get animation style for error state.
 */
function getErrorAnimation(
  index: number,
  position: DotPosition
): DotAnimationStyle {
  if (isInPattern(index, "error")) {
    return {
      animation: `agent-wiggle 0.6s ease-out forwards`,
      animationDelay: "0s",
      opacity: 1,
    };
  }
  return {
    animation: `agent-gentle-pulse 2s ease-in-out infinite`,
    animationDelay: `${position.normalizedDist * 0.8}s`,
    opacity: 0.1,
  };
}

/**
 * Get animation style for a dot based on state and position.
 * Strategy Pattern: Each state has its own animation strategy.
 */
export function getAnimationStyle(
  index: number,
  state: AgentState
): DotAnimationStyle {
  const position = calculateDotPosition(index);

  switch (state) {
    case "idle":
      return getIdleAnimation(position);
    case "thinking":
      return getThinkingAnimation(position);
    case "executing":
      return getExecutingAnimation(position);
    case "paused":
      return getPausedAnimation(index, position);
    case "question":
      return getQuestionAnimation(index, position);
    case "success":
      return getSuccessAnimation(index, position);
    case "error":
      return getErrorAnimation(index, position);
    default:
      return { opacity: 0.5 };
  }
}
