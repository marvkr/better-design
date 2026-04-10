/**
 * Agent State Configuration and Patterns
 *
 * Single Responsibility: Contains only state configuration data and icon patterns.
 * Open/Closed: Add new states by extending STATES and adding pattern to PATTERNS.
 */

import type { AgentState, StateConfig } from "./types";

export const GRID_SIZE = 7;
export const DOT_COUNT = GRID_SIZE * GRID_SIZE;

/**
 * State configurations with visual properties.
 * Uses theme-compatible colors that work with the dark theme.
 */
export const STATES: Record<AgentState, StateConfig> = {
  idle: {
    label: "Idle",
    description: "Waiting for input",
    color: "oklch(0.65 0.02 275)",
    glowColor: "oklch(0.65 0.02 275 / 0.4)",
  },
  thinking: {
    label: "Thinking",
    description: "Processing request",
    color: "oklch(0.75 0.18 85)",
    glowColor: "oklch(0.75 0.18 85 / 0.4)",
  },
  executing: {
    label: "Executing",
    description: "Executing task",
    color: "oklch(0.70 0.20 265)",
    glowColor: "oklch(0.70 0.20 265 / 0.4)",
  },
  paused: {
    label: "Paused",
    description: "Paused by user",
    color: "oklch(0.70 0.18 50)",
    glowColor: "oklch(0.70 0.18 50 / 0.4)",
  },
  question: {
    label: "Question",
    description: "Needs user input",
    color: "oklch(0.70 0.20 300)",
    glowColor: "oklch(0.70 0.20 300 / 0.4)",
  },
  success: {
    label: "Success",
    description: "Task completed",
    color: "oklch(0.70 0.20 145)",
    glowColor: "oklch(0.70 0.20 145 / 0.4)",
  },
  error: {
    label: "Error",
    description: "Something went wrong",
    color: "oklch(0.65 0.25 25)",
    glowColor: "oklch(0.65 0.25 25 / 0.4)",
  },
};

/**
 * Icon patterns for 7x7 grid.
 * Grid layout:
 *  0  1  2  3  4  5  6   <- edge (row 0)
 *  7  8  9 10 11 12 13   <- row 1, inner: 8-12
 * 14 15 16 17 18 19 20   <- row 2, inner: 15-19
 * 21 22 23 24 25 26 27   <- row 3, inner: 22-26
 * 28 29 30 31 32 33 34   <- row 4, inner: 29-33
 * 35 36 37 38 39 40 41   <- row 5, inner: 36-40
 * 42 43 44 45 46 47 48   <- edge (row 6)
 *
 * Inner 5x5 (safe zone):
 *  8  9 10 11 12
 * 15 16 17 18 19
 * 22 23 24 25 26
 * 29 30 31 32 33
 * 36 37 38 39 40
 */

// Pause icon (two vertical bars)
export const PAUSE_PATTERN = new Set([
  9, 16, 23, 30, 37,   // Left bar (col 2, rows 1-5)
  11, 18, 25, 32, 39,  // Right bar (col 4, rows 1-5)
]);

// Question mark pattern
export const QUESTION_PATTERN = new Set([
  9, 10, 11,   // Top curve
  18,          // Right side curving down
  24,          // Center stem
  38,          // Dot at bottom
]);

// Checkmark pattern ✓ (left side lower, right side higher)
export const CHECKMARK_PATTERN = new Set([
  22,          // Short left stroke start (row 3)
  30,          // Vertex at bottom (row 4)
  24,          // Long stroke going up
  18,          // Long stroke continues
  12,          // Long stroke end (row 1, highest point)
]);

// Exclamation mark pattern
export const EXCLAMATION_PATTERN = new Set([
  10,          // Top
  17,          // Middle top
  24,          // Middle
  38,          // Dot at bottom
]);

/**
 * Pattern lookup by state.
 * Dependency Inversion: Components depend on this abstraction, not concrete pattern checks.
 */
export const PATTERNS: Partial<Record<AgentState, Set<number>>> = {
  paused: PAUSE_PATTERN,
  question: QUESTION_PATTERN,
  success: CHECKMARK_PATTERN,
  error: EXCLAMATION_PATTERN,
};
