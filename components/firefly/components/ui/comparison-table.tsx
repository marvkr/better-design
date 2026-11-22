// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/comparison-table
"use client"

import styles from "./comparison-table.module.css";

type Feature = { label: string; values: boolean[] };

const PLANS = ["Personal", "Enterprise"];
const FEATURES: Feature[] = [
  { label: "Unlimited projects", values: [true, true] },
  { label: "All components", values: [true, true] },
  { label: "Team-wide usage", values: [false, true] },
  { label: "Priority support", values: [false, true] },
];

export function ComparisonTable({
  plans = PLANS,
  features = FEATURES,
}: {
  plans?: string[];
  features?: Feature[];
}) {
  return (
    <div className={styles.tbl}>
      <div className={styles.tblHead}>
        <div className={styles.tblCell}>Feature</div>
        {plans.map((p) => (
          <div key={p} className={styles.tblCell}>{p}</div>
        ))}
      </div>
      <div className={styles.tblBody}>
        {features.map((f) => (
          <div key={f.label} className={styles.tblRow}>
            <div className={styles.tblCell}>
              <span className={styles.tblCellText}>{f.label}</span>
            </div>
            {f.values.map((v, i) => (
              <div key={i} className={styles.tblCell}>
                {v ? <span className={styles.yes}>✓</span> : <span className={styles.no} aria-label="No">–</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
