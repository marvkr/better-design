// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/task-list
"use client"

import styles from "./task-list.module.css";
import { useEffect, useRef, useState } from "react";

const LABELS = [
  "Scaffold the project structure",
  "Build the component registry",
  "Implement entitlement gating",
  "Wire up Stripe checkout",
  "Polish the landing page",
];

const START_DELAY = 700;
const STEP_MS = 2250; // how long each task stays "working"

const cls = (base: string, on?: boolean) => base + (on ? " " + styles.on : "");
const CheckIcon = ({ on }: { on?: boolean }) => (
  <svg className={cls(styles.todoIcon, on)} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowIcon = ({ on }: { on?: boolean }) => (
  <svg className={cls(styles.todoIcon + " " + styles.strong, on)} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DashedIcon = ({ on }: { on?: boolean }) => (
  <svg className={cls(styles.todoIcon, on)} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="1.8 3.6" strokeLinecap="round" />
  </svg>
);

// one character slot that rolls the old glyph up and the new one in on change
const RollDigit = ({ char }: { char: string }) => {
  const prev = useRef(char);
  const [roll, setRoll] = useState<{ from: string; to: string } | null>(null);
  const [up, setUp] = useState(false);
  useEffect(() => {
    if (char === prev.current) return;
    const from = prev.current;
    prev.current = char;
    setRoll({ from, to: char });
    setUp(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setUp(true)));
    const done = setTimeout(() => setRoll(null), 380);
    return () => { cancelAnimationFrame(raf); clearTimeout(done); };
  }, [char]);
  if (!roll) return <span className={styles.rollDigit}>{char}</span>;
  return (
    <span className={styles.rollDigit}>
      <span className={cls(styles.rollInner, up)}>
        <span>{roll.from}</span>
        <span>{roll.to}</span>
      </span>
    </span>
  );
};
const RollingCount = ({ value }: { value: string }) => (
  <span className={styles.rollCount} aria-label={value}>
    {value.split("").map((c, i) => <RollDigit key={i} char={c} />)}
  </span>
);
const FilledCheckIcon = () => (
  <svg className={styles.todoHeadCheck} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" fill="currentColor" />
  </svg>
);

export function TodoList() {
  const [collapsed, setCollapsed] = useState(false);
  // -1 = not started (plan shown), 0..n-1 = working on that task, n = all done
  const [current, setCurrent] = useState(-1);
  const n = LABELS.length;

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(n);
      return;
    }
    const timers = [setTimeout(() => setCurrent(0), START_DELAY)];
    for (let i = 0; i < n; i++) {
      timers.push(setTimeout(() => setCurrent(i + 1), START_DELAY + (i + 1) * STEP_MS));
    }
    return () => timers.forEach(clearTimeout);
  }, [n]);

  const started = current >= 0;
  const allDone = current >= n;
  const running = started && !allDone;
  const pct = Math.round((Math.min(Math.max(current, 0), n) / n) * 100);

  return (
    <div className={styles.todo}>
      <button
        type="button"
        className={styles.todoHead}
        aria-expanded={!collapsed}
        aria-label="Toggle to-dos"
        onClick={() => setCollapsed((c) => !c)}
      >
        <span className={styles.todoHeadIcon}>
          {allDone ? (
            <FilledCheckIcon />
          ) : running ? (
            <span className={styles.todoHeadPie} style={{ ["--todo-pie" as string]: pct + "%" }} aria-hidden="true">
              <svg className={styles.todoHeadPieRing} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.2 4.4" strokeLinecap="round" />
              </svg>
            </span>
          ) : (
            <svg className={styles.todoListIcon} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <svg className={styles.todoChevron} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className={styles.todoTitle}>To-dos</span>
        <span className={styles.todoCount}>
          <RollingCount value={Math.min(Math.max(current, 0), n) + "/" + n} />
        </span>
      </button>

      <div className={styles.todoCollapsible + (collapsed ? " " + styles.isCollapsed : "")}>
        <div className={styles.todoInner}>
          <ul className={styles.todoList}>
            {LABELS.map((label, i) => {
              const done = started && i < current;
              const active = started && i === current && !allDone;
              return (
                <li
                  key={i}
                  className={styles.todoItem + (done ? " " + styles.done : active ? " " + styles.active : "")}
                  style={{ ["--i" as string]: i }}
                >
                  <span className={styles.todoIconWrap}>
                    <DashedIcon on={!done && !active} />
                    <ArrowIcon on={active} />
                    <CheckIcon on={done} />
                  </span>
                  <span className={styles.todoLabel} data-label={label}>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export { TodoList as TaskList }
