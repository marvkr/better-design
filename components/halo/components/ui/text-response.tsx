// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/text-response
"use client"

import styles from "./text-response.module.css";
import { useState, type ReactNode } from "react";

/** Where a model's answer stands. Anything but "complete" says so on screen. */
export type AiResponseStatus = "complete" | "streaming" | "stopped" | "failed" | "refused";

/** What a refusal tells the person: the topic it will not cover, and what they can do instead. */
export interface AiRefusal {
  topic: string;
  alternative: string;
}

export function TextResponse({
  children,
  status = "complete",
  label = "AI-generated",
  refusal,
  onRetry,
  onFeedback,
}: {
  children?: ReactNode;
  status?: AiResponseStatus;
  /** The visible marker that a model wrote this. Keep it on every answer. */
  label?: string;
  refusal?: AiRefusal;
  onRetry?: () => void;
  /** Where a rating goes. Without it no rating buttons show, because a rating must reach someone. */
  onFeedback?: (rating: "helpful" | "not-helpful") => void;
}) {
  const [rated, setRated] = useState<"helpful" | "not-helpful" | null>(null);

  const rate = (rating: "helpful" | "not-helpful") => {
    setRated(rating);
    onFeedback?.(rating);
  };

  return (
    <div className={styles.response} data-status={status} aria-busy={status === "streaming" || undefined}>
      <p className={styles.aiLabel}>{label}</p>
      {status === "refused" ? (
        <div className={styles.notice}>
          <p>I can&apos;t help with {refusal?.topic ?? "this request"}.</p>
          {refusal?.alternative && <p className={styles.noticeHint}>{refusal.alternative}</p>}
        </div>
      ) : (
        <div className={styles.prose}>{children}</div>
      )}
      {status === "stopped" && (
        <p className={styles.notice} role="status">
          Stopped. The answer above is incomplete.
        </p>
      )}
      {status === "failed" && (
        <div className={styles.notice} role="alert">
          <p>The answer failed before it finished. Nothing above was changed.</p>
          {onRetry && (
            <button type="button" className={styles.action} onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      )}
      {status === "complete" && onFeedback && (
        <div className={styles.feedback} role="group" aria-label="Rate this answer">
          {rated ? (
            <p role="status" className={styles.noticeHint}>
              Thanks. Your rating was sent.
            </p>
          ) : (
            <>
              <button type="button" className={styles.action} onClick={() => rate("helpful")}>
                Helpful
              </button>
              <button type="button" className={styles.action} onClick={() => rate("not-helpful")}>
                Not helpful
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
