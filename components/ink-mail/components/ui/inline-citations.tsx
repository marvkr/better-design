// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/inline-citations
"use client"

import styles from "./inline-citations.module.css";

type CiteRef = { n: number; label: string; host: string; url: string };

const TEXT =
  "Transformers scale well with data and compute[1], though attention is quadratic in sequence length[2].";
const REFS: CiteRef[] = [
  { n: 1, label: "Attention Is All You Need", host: "arxiv.org", url: "https://arxiv.org/abs/1706.03762" },
  { n: 2, label: "Efficient Transformers: A Survey", host: "arxiv.org", url: "https://arxiv.org/abs/2009.06732" },
];

function CiteArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
  );
}

export function InlineCitations({
  text = TEXT,
  refs = REFS,
}: {
  text?: string;
  refs?: CiteRef[];
}) {
  // Markers like [1] in the text become small numbered chips that link to
  // the source and reveal the reference name in a tooltip on hover.
  const parts = text.split(/(\[\d+\])/g);
  return (
    <div className={styles.citeProse}>
      <p>
        {parts.map((part, i) => {
          const m = part.match(/^\[(\d+)\]$/);
          if (!m) return <span key={i}>{part}</span>;
          const r = refs.find((x) => x.n === Number(m[1]));
          return r ? (
            <span key={i} className={styles.citeTip}>
              <a className={styles.citeMark} href={r.url} target="_blank" rel="noreferrer">{r.n}</a>
              <span className={styles.citeTipBox} role="tooltip">{r.label}</span>
            </span>
          ) : (
            <span key={i} className={styles.citeMark}>{m[1]}</span>
          );
        })}
      </p>
      <div className={styles.citeFooter}>
        {refs.map((r) => (
          <a key={r.n} className={styles.citeRef} href={r.url} target="_blank" rel="noreferrer">
            <span className={styles.citeMark}>{r.n}</span>
            <span className={styles.citeRefLabel}>{r.label}</span>
            <span className={styles.citeSep}>·</span>
            <span className={styles.citeRefHost}>{r.host}</span>
            <span className={styles.citeArrow} aria-hidden><CiteArrow /></span>
          </a>
        ))}
      </div>
    </div>
  );
}
