/**
 * Agent State Indicator Module
 *
 * Interface Segregation: Exports only what consumers need.
 */

import "./animations.css";

export { AgentStateIndicator } from "./agent-state-indicator";
export { DotMatrix } from "./dot-matrix";
export { STATES } from "./constants";
export type { AgentState, StateConfig } from "./types";
