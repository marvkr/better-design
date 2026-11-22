// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/image-generation
"use client"

import styles from "./image-generation.module.css";

export function ImageGeneration({
  prompt = "a calm mountain lake at dawn",
  resolution = "1024 × 1024",
}: {
  prompt?: string;
  resolution?: string;
}) {
  return (
    <div className={styles.igWrap}>
      <div className={styles.igCanvas} role="img" aria-label="Generating image">
        <span className={styles.igDots} aria-hidden />
        <span className={styles.igGlow} aria-hidden />
        <span className={styles.igRes}>{resolution}</span>
      </div>
      <div className={styles.igMeta}>
        <span className={styles.igLabel}>Generating image</span>
        <span className={styles.igPrompt}>“{prompt}”</span>
      </div>
    </div>
  );
}
