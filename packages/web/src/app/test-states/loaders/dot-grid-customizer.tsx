"use client";

import { useState } from "react";
import { DotGrid } from "./dot-grid";
import type { GridSize, LoaderPattern, LoaderShape } from "./types";

const GRID_OPTIONS: GridSize[] = [3, 4, 5, 7];
const SHAPE_OPTIONS: LoaderShape[] = ["circle", "square", "diamond"];
const PATTERN_OPTIONS: LoaderPattern[] = [
  "sequential",
  "spiral",
  "snake",
  "rows",
  "columns",
  "center",
  "diagonal",
  "checker",
  "cross",
  "breathe",
  "reverse",
  "arch",
];

export function DotGridCustomizer() {
  const [size, setSize] = useState(44);
  const [grid, setGrid] = useState<GridSize>(3);
  const [shape, setShape] = useState<LoaderShape>("circle");
  const [pattern, setPattern] = useState<LoaderPattern>("sequential");

  return (
    <div className="rounded-xl border border-[#262626] bg-[#141414] p-6">
      <div className="flex items-start gap-6">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#0a0a0a] text-foreground">
          <DotGrid size={size} grid={grid} shape={shape} pattern={pattern} />
        </div>

        <div className="flex-1 space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Size</span>
              <span className="text-foreground">{size}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>

          <ControlRow label="Grid">
            {GRID_OPTIONS.map((g) => (
              <ChipButton
                key={g}
                active={grid === g}
                onClick={() => setGrid(g)}
              >
                {g}×{g}
              </ChipButton>
            ))}
          </ControlRow>

          <ControlRow label="Shape">
            {SHAPE_OPTIONS.map((s) => (
              <ChipButton
                key={s}
                active={shape === s}
                onClick={() => setShape(s)}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </ChipButton>
            ))}
          </ControlRow>

          <ControlRow label="Pattern">
            {PATTERN_OPTIONS.map((p) => (
              <ChipButton
                key={p}
                active={pattern === p}
                onClick={() => setPattern(p)}
              >
                {p[0].toUpperCase() + p.slice(1)}
              </ChipButton>
            ))}
          </ControlRow>
        </div>
      </div>
    </div>
  );
}

function ControlRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
        active
          ? "border-foreground/60 bg-foreground/10 text-foreground"
          : "border-[#262626] bg-[#0a0a0a] text-muted-foreground hover:border-[#3a3a3a] hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
