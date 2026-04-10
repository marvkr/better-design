/**
 * AgentStateIndicator Component
 *
 * Single Responsibility: Composes DotMatrix with status text.
 * Open/Closed: New display modes can be added without modifying existing code.
 * Dependency Inversion: Depends on DotMatrix abstraction.
 */

import type { AgentState } from "./types";
import { STATES } from "./constants";
import { DotMatrix } from "./dot-matrix";

interface AgentStateIndicatorProps {
  state: AgentState;
  message?: string;
  showLabel?: boolean;
}

export function AgentStateIndicator({
  state,
  message,
  showLabel = true,
}: AgentStateIndicatorProps) {
  const stateConfig = STATES[state];
  const displayMessage = message ?? stateConfig.description;

  return (
    <div className="flex items-center gap-3">
      <DotMatrix state={state} />
      {showLabel ? (
        <div className="flex flex-col gap-0.5">
          <span
            className="text-sm font-medium transition-colors duration-400"
            style={{ color: stateConfig.color }}
          >
            {stateConfig.label}
          </span>
          <span className="text-xs text-muted-foreground">{displayMessage}</span>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">{displayMessage}</span>
      )}
    </div>
  );
}
