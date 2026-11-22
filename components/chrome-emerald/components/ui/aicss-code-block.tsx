// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/code-block
"use client"

import styles from "./aicss-code-block.module.css";
import { useState } from "react";

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className={styles.cb}>
      <div className={styles.cbHead}>
        <span className={styles.cbFile}>
          <svg className={styles.cbIcon} viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="m8 6-6 6 6 6M16 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className={styles.cbLang}>{lang}</span>
        </span>
        <button className={styles.cbCopy} onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4.5 12.75 6 6 9-13.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2" /></svg>
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className={styles.cbBody}>
        {lines.map((line, i) => (
          <div className={styles.cbRow} key={i}>
            <span className={styles.cbLn}>{i + 1}</span>
            <code className={styles.cbCode}>{line || "\u00A0"}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CodeBlock as AiCssCodeBlock }
