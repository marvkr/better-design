// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/thinking-state
"use client"

import styles from "./thinking-state.module.css";

export function ThinkingState() {
  return <span className={styles.shimmer}>Thinking</span>;
}
