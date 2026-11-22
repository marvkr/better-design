// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/streaming-text
"use client"

import styles from "./aicss-streaming-text.module.css";
import { useEffect, useState } from "react";

export function StreamingText({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 9);
    return () => clearInterval(id);
  }, [text]);
  const streaming = shown.length < text.length;
  return (
    <p className={styles.prose}>
      {shown}
      <span className={streaming ? styles.caret + " " + styles.caretSteady : styles.caret} />
    </p>
  );
}

export { StreamingText as AiCssStreamingText }
