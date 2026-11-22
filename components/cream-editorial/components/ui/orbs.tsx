// Ported from the public AIcss React source.
// Source: https://www.aicss.dev/components/orbs
"use client"

import type { CSSProperties } from "react";
import styles from "./orbs.module.css";

/** The stage the geometry is tuned on; --orb-k scales it to `size`. */
const STAGE = 28;

/** Default rendered size — 20×20 indicator box. */
const SIZE = 20;

export type LatticeVariant = "S1" | "S2" | "S3" | "S4" | "S5";
export type LensVariant = "B1" | "B2" | "B3" | "B4" | "B5";
export type RingVariant = "C1" | "C2" | "C3" | "C4" | "C5";
export type HelixVariant = "G1" | "G2" | "G3" | "G4" | "G5";
export type MorphVariant = "M1" | "M2" | "M3" | "M4" | "M5";
export type OrbVariant = LatticeVariant | LensVariant | RingVariant | HelixVariant | MorphVariant;

export const LATTICE_VARIANTS: LatticeVariant[] = ["S1", "S2", "S3", "S4", "S5"];

export const LENS_VARIANTS: LensVariant[] = [
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
];

export const RING_VARIANTS: RingVariant[] = ["C1", "C2", "C3", "C4", "C5"];

export const HELIX_VARIANTS: HelixVariant[] = ["G1", "G2", "G3", "G4", "G5"];

export const MORPH_VARIANTS: MorphVariant[] = ["M1", "M2", "M3", "M4", "M5"];

export const ORB_TASKS: Record<OrbVariant, string> = {
  S1: "Thinking",
  S2: "Processing",
  S3: "Working",
  S4: "Searching",
  S5: "Finalizing",
  B1: "Thinking",
  B2: "Searching",
  B3: "Generating",
  B4: "Solving",
  B5: "Routing",
  C1: "Loading",
  C2: "Listening",
  C3: "Streaming",
  C4: "Analyzing",
  C5: "Compiling",
  G1: "Processing",
  G2: "Sequencing",
  G3: "Uploading",
  G4: "Syncing",
  G5: "Idling",
  M1: "Shaping",
  M2: "Expanding",
  M3: "Unfolding",
  M4: "Transforming",
  M5: "Dispersing",
};

function isLattice(v: OrbVariant): v is LatticeVariant {
  return (LATTICE_VARIANTS as OrbVariant[]).includes(v);
}

function isRing(v: OrbVariant): v is RingVariant {
  return (RING_VARIANTS as OrbVariant[]).includes(v);
}

function isHelix(v: OrbVariant): v is HelixVariant {
  return (HELIX_VARIANTS as OrbVariant[]).includes(v);
}

function isMorph(v: OrbVariant): v is MorphVariant {
  return (MORPH_VARIANTS as OrbVariant[]).includes(v);
}

const N = 3; // lattice is N×N
const PITCH = 6; // centre-to-centre spacing in stage px; the dot size is CSS
const MID = (N - 1) / 2;

/** Clockwise walk of the lattice perimeter — the track `orbit` runs on. */
const RING: [number, number][] = (() => {
  const ring: [number, number][] = [];
  for (let x = 0; x < N; x++) ring.push([x, 0]);
  for (let y = 1; y < N; y++) ring.push([N - 1, y]);
  for (let x = N - 2; x >= 0; x--) ring.push([x, N - 1]);
  for (let y = N - 2; y >= 1; y--) ring.push([0, y]);
  return ring;
})();

const RING_INDEX = new Map(RING.map(([x, y], i) => [x + "," + y, i]));

/**
 * Per-cell `animation-delay` in ms. Negative values seed a cell partway
 * into its cycle, which is what turns 8 identical animations into one
 * comet travelling the ring.
 */
function cellDelay(v: LatticeVariant, x: number, y: number): number {
  const dx = x - MID;
  const dy = y - MID;
  switch (v) {
    // Radiates from the centre on a round wavefront. Centre leads a beat
    // early so the next swell doesn't sit behind the outer fade.
    case "S1":
      return Math.hypot(dx, dy) * 700 - (dx === 0 && dy === 0 ? 180 : 0);
    // A broad band crosses the grid on the diagonal. The spread is close to
    // the wave duration, which both widens the band and makes the sweep
    // continuous — the far corner restarts as the near one does.
    case "S2":
      return ((x + y) / (2 * (N - 1))) * 1500;
    // One head with a decaying tail, running the perimeter clockwise.
    case "S3": {
      const i = RING_INDEX.get(x + "," + y);
      if (i === undefined) return 0;
      return -(((RING.length - i) % RING.length) / RING.length) * 1700;
    }
    // A soft column travels left to right.
    case "S4":
      return (x / (N - 1)) * 1100;
    // Like S3 but scrambled order — the pulse jumps pseudo-randomly.
    case "S5": {
      const i = RING_INDEX.get(x + "," + y);
      if (i === undefined) return 0;
      const scrambled = (i * 3) % RING.length;
      return -(scrambled / RING.length) * 1700;
    }
  }
}

/**
 * `settle` gathers each cell from a position rotated one way around the
 * centre and releases it to the mirror rotation, so the cycle keeps swirling
 * the same way instead of rewinding to where it came from.
 */
const SWIRL = 1.05; // radians of rotation at each end, ~60°
const SPREAD = 1.6; // outward push, on top of the rotation

/** Offset from a cell's own grid slot to its swirled position, in stage px. */
function swirl(x: number, y: number, angle: number): [number, number] {
  const dx = x - MID;
  const dy = y - MID;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    ((dx * cos - dy * sin) * SPREAD - dx) * PITCH,
    ((dx * sin + dy * cos) * SPREAD - dy) * PITCH,
  ];
}

interface Cell {
  key: string;
  left: number;
  top: number;
  delay: number;
  /** Where `settle` gathers this cell from, and releases it to. */
  ax: number;
  ay: number;
  bx: number;
  by: number;
  /** Sits out the choreography (interior cells during `orbit`). */
  still: boolean;
  /** Centre cell — the static frame under reduced motion. */
  mid: boolean;
}

/** The 9 lattice cells, with position, phase and swirl vectors. */
function latticeCells(v: LatticeVariant): Cell[] {
  const cells: Cell[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const [ax, ay] = swirl(x, y, -SWIRL);
      const [bx, by] = swirl(x, y, SWIRL);
      cells.push({
        key: x + "," + y,
        left: x * PITCH,
        top: y * PITCH,
        delay: cellDelay(v, x, y),
        ax,
        ay,
        bx,
        by,
        still: (v === "S3" || v === "S5") && !RING_INDEX.has(x + "," + y),
        mid: x === MID && y === MID,
      });
    }
  }
  return cells;
}

const RING_N = 8;
const RING_R = 8;

interface RingDot {
  key: number;
  rx: number;
  ry: number;
  delay: number;
}

function ringDuration(v: RingVariant): number {
  switch (v) {
    case "C1": return 1600;
    case "C2": return 2000;
    case "C3": return 1800;
    case "C4": return 1600;
    case "C5": return 2200;
  }
}

function ringDelay(v: RingVariant, i: number): number {
  const dur = ringDuration(v);
  switch (v) {
    case "C1":
      return -((RING_N - 1 - i) / RING_N) * dur;
    case "C2":
    case "C3":
      return -((RING_N - 1 - i) / RING_N) * dur;
    case "C4":
      return i % 2 === 0 ? 0 : -(dur / 2);
    case "C5": {
      const scrambled = (i * 3) % RING_N;
      return -(scrambled / RING_N) * dur;
    }
    default:
      return -(i / RING_N) * dur;
  }
}

function ringDots(v: RingVariant): RingDot[] {
  const dots: RingDot[] = [];
  for (let i = 0; i < RING_N; i++) {
    const angle = (i / RING_N) * Math.PI * 2 - Math.PI / 2;
    dots.push({
      key: i,
      rx: Math.cos(angle) * RING_R,
      ry: Math.sin(angle) * RING_R,
      delay: ringDelay(v, i),
    });
  }
  return dots;
}

const GLOBE_R = 8.5;
const GLOBE_TILT = (14 * Math.PI) / 180;
const GLOBE_STEPS = 8;

const GLOBE_RINGS: { lat: number; count: number }[] = [
  { lat: 52, count: 8 },
  { lat: 26, count: 8 },
  { lat: 0, count: 8 },
  { lat: -26, count: 8 },
  { lat: -52, count: 8 },
];

interface GlobeDot {
  key: number;
  style: Record<string, string>;
  css: string;
}

function projectGlobe(x: number, y: number, z: number, spin: number) {
  const cs = Math.cos(spin);
  const ss = Math.sin(spin);
  const x1 = x * cs - z * ss;
  const z1 = x * ss + z * cs;
  const y1 = y;
  const ct = Math.cos(GLOBE_TILT);
  const st = Math.sin(GLOBE_TILT);
  return {
    x: x1,
    y: y1 * ct - z1 * st,
    z: y1 * st + z1 * ct,
  };
}

function globeOpacity(z: number) {
  const t = Math.max(0, Math.min(1, (z / GLOBE_R + 0.15) / 1.15));
  return 0.12 + 0.88 * t * t;
}

type RingMove = { ring: number; angle: number };
const RING_HALF = Math.PI;
const RING_ARC = 3;

function ringDir(ring: number) {
  return ring % 2 === 0 ? -1 : 1;
}

const G3_MOVES: RingMove[] = (() => {
  const moves: RingMove[] = [];
  for (let pass = 0; pass < 2; pass++) {
    for (let r = 0; r < GLOBE_RINGS.length; r++) {
      moves.push({ ring: r, angle: ringDir(r) * RING_HALF });
    }
  }
  return moves;
})();

const G4_MOVES: RingMove[] = [2, 1, 3, 0, 4, 2, 1, 3, 0, 4].map((ring) => ({
  ring,
  angle: ringDir(ring) * RING_HALF,
}));

function ringTurnPoses(
  x0: number,
  y0: number,
  z0: number,
  ringIndex: number,
  moves: RingMove[],
): [number, number, number][] {
  let x = x0;
  let y = y0;
  let z = z0;
  const poses: [number, number, number][] = [[x, y, z]];
  for (let m = 0; m < moves.length; m++) {
    const move = moves[m];
    const xS = x;
    const yS = y;
    const zS = z;
    for (let s = 1; s <= RING_ARC; s++) {
      if (ringIndex === move.ring) {
        const a = move.angle * (s / RING_ARC);
        const c = Math.cos(a);
        const sn = Math.sin(a);
        x = xS * c - zS * sn;
        y = yS;
        z = xS * sn + zS * c;
      }
      poses.push([x, y, z]);
    }
  }
  return poses;
}

const G5_SLOW = 0.4;
const G5_BURST = (Math.PI * 2 - G5_SLOW * 4) / 4;
const G5_POSES: { s: number; spin: number }[] = (() => {
  const poses: { s: number; spin: number }[] = [{ s: 1.0, spin: 0 }];
  let spin = 0;
  const steps: { s: number; kind: "slow" | "burst" }[] = [
    { s: 1.0, kind: "slow" },
    { s: 0.9, kind: "burst" },
    { s: 0.9, kind: "slow" },
    { s: 0.8, kind: "burst" },
    { s: 0.8, kind: "slow" },
    { s: 0.9, kind: "burst" },
    { s: 0.9, kind: "slow" },
    { s: 1.0, kind: "burst" },
  ];
  for (const step of steps) {
    spin += step.kind === "slow" ? G5_SLOW : G5_BURST;
    poses.push({ s: step.s, spin });
  }
  return poses;
})();

function globeKeyframeStyle(
  x0: number,
  y0: number,
  z0: number,
  variant: HelixVariant,
  ringIndex: number,
  _j = 0,
): Record<string, string> {
  const style: Record<string, string> = {};

  if (variant === "G5") {
    for (let k = 0; k < G5_POSES.length; k++) {
      const sc = G5_POSES[k].s;
      const spin = G5_POSES[k].spin;
      const p = projectGlobe(x0 * sc, y0 * sc, z0 * sc, spin);
      style["--g" + k + "x"] = p.x.toFixed(2) + "px";
      style["--g" + k + "y"] = (-p.y).toFixed(2) + "px";
      style["--g" + k + "o"] = globeOpacity(p.z).toFixed(3);
    }
    return style;
  }

  if (variant === "G3" || variant === "G4") {
    const poses = ringTurnPoses(
      x0,
      y0,
      z0,
      ringIndex,
      variant === "G3" ? G3_MOVES : G4_MOVES,
    );
    for (let k = 0; k < poses.length; k++) {
      const pos = poses[k];
      const p = projectGlobe(pos[0], pos[1], pos[2], 0);
      style["--g" + k + "x"] = p.x.toFixed(2) + "px";
      style["--g" + k + "y"] = (-p.y).toFixed(2) + "px";
      style["--g" + k + "o"] = globeOpacity(p.z).toFixed(3);
    }
    return style;
  }

  const dir = variant === "G2" && ringIndex % 2 === 1 ? -1 : 1;

  for (let k = 0; k < GLOBE_STEPS; k++) {
    const phase = k / GLOBE_STEPS;
    const spin = dir * phase * Math.PI * 2;
    const p = projectGlobe(x0, y0, z0, spin);
    style["--g" + k + "x"] = p.x.toFixed(2) + "px";
    style["--g" + k + "y"] = (-p.y).toFixed(2) + "px";
    style["--g" + k + "o"] = globeOpacity(p.z).toFixed(3);
  }
  return style;
}

function globeDots(v: HelixVariant): GlobeDot[] {
  const dots: GlobeDot[] = [];
  let idx = 0;
  for (let ringIndex = 0; ringIndex < GLOBE_RINGS.length; ringIndex++) {
    const ring = GLOBE_RINGS[ringIndex];
    const latRad = (ring.lat * Math.PI) / 180;
    const y0 = Math.sin(latRad) * GLOBE_R;
    const ringR = Math.cos(latRad) * GLOBE_R;
    for (let j = 0; j < ring.count; j++) {
      const lon = (j / ring.count) * Math.PI * 2;
      const style = globeKeyframeStyle(
        Math.cos(lon) * ringR,
        y0,
        Math.sin(lon) * ringR,
        v,
        ringIndex,
        j,
      );
      dots.push({
        key: idx,
        style,
        css: Object.keys(style)
          .map((k) => k + ":" + style[k])
          .join(";"),
      });
      idx++;
    }
  }
  return dots;
}

const MORPH_N = 8;
const MORPH_R = 7;

type ShapeFn = (i: number) => [number, number];

const shapeCircle: ShapeFn = (i) => {
  const a = (i / MORPH_N) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(a) * MORPH_R, Math.sin(a) * MORPH_R];
};


const shapeSquare: ShapeFn = (i) => {
  const h = MORPH_R * 0.85;
  const corners: [number, number][] = [[-h, -h], [h, -h], [h, h], [-h, h]];
  const t = ((i / MORPH_N) * 4 + 0.5) % 4;
  const side = Math.floor(t) % 4;
  const frac = t - Math.floor(t);
  const from = corners[side];
  const to = corners[(side + 1) % 4];
  return [from[0] + (to[0] - from[0]) * frac, from[1] + (to[1] - from[1]) * frac];
};

const shapeCircleAt =
  (turn: number): ShapeFn =>
  (i) => {
    const a = (i / MORPH_N) * Math.PI * 2 - Math.PI / 2 + turn;
    return [Math.cos(a) * MORPH_R, Math.sin(a) * MORPH_R];
  };


const shapeScatterA: ShapeFn = (i) => {
  const a = (i / MORPH_N) * Math.PI * 2 - Math.PI / 2;
  return [-Math.cos(a) * MORPH_R, Math.sin(a) * MORPH_R];
};

const shapeScatterB: ShapeFn = shapeCircle;
const shapeScatterC: ShapeFn = shapeScatterA;

const shapeDiamond: ShapeFn = (i) => {
  const corners: [number, number][] = [[0, -MORPH_R], [MORPH_R, 0], [0, MORPH_R], [-MORPH_R, 0]];
  const t = (i / MORPH_N) * 4;
  const side = Math.floor(t) % 4;
  const frac = t - Math.floor(t);
  const from = corners[side];
  const to = corners[(side + 1) % 4];
  return [from[0] + (to[0] - from[0]) * frac, from[1] + (to[1] - from[1]) * frac];
};

const shapeCenter: ShapeFn = (i) => {
  const a = (i / MORPH_N) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(a) * 1.5, Math.sin(a) * 1.5];
};

function morphShapes(v: MorphVariant): [ShapeFn, ShapeFn, ShapeFn, ShapeFn] {
  switch (v) {
    case "M1": return [shapeCircle, shapeSquare, shapeDiamond, shapeSquare];
    case "M2": return [shapeCenter, shapeCircle, shapeCenter, shapeCircle];
    case "M3":
      return [
        shapeCircleAt(0),
        shapeCircleAt(Math.PI / 2),
        shapeCircleAt(Math.PI),
        shapeCircleAt(Math.PI * 1.5),
      ];
    case "M4": return [shapeCircle, shapeDiamond, shapeCircle, shapeDiamond];
    case "M5": return [shapeCircle, shapeScatterA, shapeScatterB, shapeScatterC];
  }
}

interface MorphDot {
  key: number;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  delay?: string;
  depth?: string;
}

function morphDots(v: MorphVariant): MorphDot[] {
  const [s1, s2, s3, s4] = morphShapes(v);
  const dots: MorphDot[] = [];
  for (let i = 0; i < MORPH_N; i++) {
    const [x1, y1] = s1(i);
    const [x2, y2] = s2(i);
    const [x3, y3] = s3(i);
    const [x4, y4] = s4(i);
    dots.push({
      key: i,
      m1: x1.toFixed(1) + "px, " + y1.toFixed(1) + "px",
      m2: x2.toFixed(1) + "px, " + y2.toFixed(1) + "px",
      m3: x3.toFixed(1) + "px, " + y3.toFixed(1) + "px",
      m4: x4.toFixed(1) + "px, " + y4.toFixed(1) + "px",
      delay: v === "M5" ? -i * 10 + "ms" : undefined,
      depth: v === "M5" ? Math.abs(Math.cos((i / MORPH_N) * Math.PI * 2 - Math.PI / 2)).toFixed(2) : undefined,
    });
  }
  return dots;
}

export interface OrbProps {
  variant?: OrbVariant;
  /** Rendered edge length in px. The 28px geometry scales to fit. */
  size?: number;
  /** Accessible label, and the status text when `pill` is set. */
  label?: string;
  /** Wraps the orb and its label in a status pill. */
  pill?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Orb({
  variant = "S1",
  size = SIZE,
  label,
  pill,
  className,
  style,
}: OrbProps) {
  const text = label ?? ORB_TASKS[variant] + "…";
  return (
    <span
      className={styles.root + (className ? " " + className : "")}
      data-pill={pill ? "" : undefined}
      style={style}
    >
      <span
        className={styles.glyph}
        // In pill form the visible label already carries the meaning, so
        // the glyph steps out of the accessibility tree.
        role={pill ? undefined : "img"}
        aria-label={pill ? undefined : text}
        aria-hidden={pill ? true : undefined}
        style={
          { width: size, height: size, "--orb-k": size / STAGE } as CSSProperties
        }
      >
        {isLattice(variant) ? (
          <span className={styles.lattice} data-variant={variant}>
            {latticeCells(variant).map((c) => (
              <span
                key={c.key}
                className={styles.cell}
                data-still={c.still ? "" : undefined}
                data-mid={c.mid ? "" : undefined}
                style={
                  {
                    left: c.left,
                    top: c.top,
                    animationDelay: c.delay + "ms",
                    "--orb-ax": c.ax + "px",
                    "--orb-ay": c.ay + "px",
                    "--orb-bx": c.bx + "px",
                    "--orb-by": c.by + "px",
                  } as CSSProperties
                }
              />
            ))}
          </span>
        ) : isRing(variant) ? (
          <span className={styles.ring} data-variant={variant}>
            {ringDots(variant).map((d) => (
              <span
                key={d.key}
                className={styles.ringDot}
                style={
                  {
                    "--orb-rx": d.rx + "px",
                    "--orb-ry": d.ry + "px",
                    animationDelay: d.delay + "ms",
                  } as CSSProperties
                }
              />
            ))}
          </span>
        ) : isHelix(variant) ? (
          <span className={styles.helix} data-variant={variant}>
            {globeDots(variant).map((d) => (
              <span
                key={d.key}
                className={styles.helixDot}
                style={d.style as CSSProperties}
              />
            ))}
          </span>
        ) : isMorph(variant) ? (
          <span className={styles.morph} data-variant={variant}>
            {morphDots(variant).map((d) => (
              <span
                key={d.key}
                className={styles.morphDot}
                style={
                  {
                    "--m-1": d.m1,
                    "--m-2": d.m2,
                    "--m-3": d.m3,
                    "--m-4": d.m4,
                    "--m-depth": d.depth,
                    animationDelay: d.delay,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        ) : (
          <span className={styles.lens} data-variant={variant}>
            <span className={styles.shape + " " + styles.shapeA} />
            <span className={styles.shape + " " + styles.shapeB} />
            <span className={styles.shape + " " + styles.shapeC} />
            {/* focus is the one variant that needs a fourth circle: its cast
                sits on the corners of a square, and three corners do not
                make a square. */}
            {variant === "B1" && (
              <span className={styles.shape + " " + styles.shapeD} />
            )}
          </span>
        )}
      </span>
      {pill && <span className={styles.pillLabel}>{text}</span>}
    </span>
  );
}

/* Usage:
       <Orb variant="S4" />
       <Orb variant="B4" size={40} />
       <Orb variant="C3" />
       <Orb variant="B2" label="Searching the web…" pill />
 */

export { Orb as Orbs }
