/**
 * Agent State Types
 *
 * Single Responsibility: This file only defines type contracts for agent states.
 * Open/Closed: New states can be added to AgentState union without modifying existing code.
 */

export type AgentState =
  | "idle"
  | "thinking"
  | "executing"
  | "paused"
  | "question"
  | "success"
  | "error";

export interface StateConfig {
  label: string;
  description: string;
  color: string;
  glowColor: string;
}

export interface DotAnimationStyle {
  animation?: string;
  animationDelay?: string;
  opacity: number;
}

export interface DotPosition {
  row: number;
  col: number;
  distFromCenter: number;
  normalizedDist: number;
  angle: number;
  normalizedAngle: number;
}
