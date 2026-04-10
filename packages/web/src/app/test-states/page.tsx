"use client";

import { useState } from "react";
import { DotMatrix } from "@/modules/projects/ui/components/agent-state-indicator/dot-matrix";
import type { AgentState } from "@/modules/projects/ui/components/agent-state-indicator/types";
import "@/modules/projects/ui/components/agent-state-indicator/animations.css";
import "./loaders/loaders.css";

import { BarWave } from "./loaders/bar-wave";
import { BouncingDots } from "./loaders/bouncing-dots";
import { BreathingCircle } from "./loaders/breathing-circle";
import { CrossFade } from "./loaders/cross-fade";
import { DashSpinner } from "./loaders/dash-spinner";
import { DiamondRotate } from "./loaders/diamond-rotate";
import { DotGrid } from "./loaders/dot-grid";
import { DotGridCustomizer } from "./loaders/dot-grid-customizer";
import { DotTrail } from "./loaders/dot-trail";
import { ElasticLine } from "./loaders/elastic-line";
import { FlipSquare } from "./loaders/flip-square";
import { HexDots } from "./loaders/hex-dots";
import { LineSweep } from "./loaders/line-sweep";
import { LoaderCard } from "./loaders/loader-card";
import { MorphingShape } from "./loaders/morphing-shape";
import { Orbit } from "./loaders/orbit";
import { PulseRing } from "./loaders/pulse-ring";
import { RingSpinner } from "./loaders/ring-spinner";
import { SquareCascade } from "./loaders/square-cascade";
import { StaggeredScale } from "./loaders/staggered-scale";

const states: AgentState[] = [
  "idle",
  "thinking",
  "executing",
  "paused",
  "question",
  "success",
  "error",
];

const dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

type LoaderEntry = {
  id: string;
  label: string;
  description: string;
  preview: React.ReactNode;
  customizable?: boolean;
};

const LOADERS: LoaderEntry[] = [
  {
    id: "dot-grid",
    label: "Dot Grid",
    description: "3×3 sequential pulse",
    preview: <DotGrid />,
    customizable: true,
  },
  {
    id: "ring-spinner",
    label: "Ring Spinner",
    description: "Classic border rotation",
    preview: <RingSpinner />,
  },
  {
    id: "pulse-ring",
    label: "Pulse Ring",
    description: "Expanding concentric rings",
    preview: <PulseRing />,
  },
  {
    id: "bar-wave",
    label: "Bar Wave",
    description: "Staggered vertical bars",
    preview: <BarWave />,
  },
  {
    id: "orbit",
    label: "Orbit",
    description: "Fading dots in rotation",
    preview: <Orbit />,
  },
  {
    id: "morphing-shape",
    label: "Morphing Shape",
    description: "Circle-to-square transitions",
    preview: <MorphingShape />,
  },
  {
    id: "line-sweep",
    label: "Line Sweep",
    description: "Horizontal scale cascade",
    preview: <LineSweep />,
  },
  {
    id: "bouncing-dots",
    label: "Bouncing Dots",
    description: "Classic three-dot bounce",
    preview: <BouncingDots />,
  },
  {
    id: "square-cascade",
    label: "Square Cascade",
    description: "2×2 grid with stagger",
    preview: <SquareCascade />,
  },
  {
    id: "diamond-rotate",
    label: "Diamond Rotate",
    description: "45° rotated pulse",
    preview: <DiamondRotate />,
  },
  {
    id: "cross-fade",
    label: "Cross Fade",
    description: "Alternating axis fade",
    preview: <CrossFade />,
  },
  {
    id: "staggered-scale",
    label: "Staggered Scale",
    description: "Rounded squares ripple",
    preview: <StaggeredScale />,
  },
  {
    id: "breathing-circle",
    label: "Breathing Circle",
    description: "Smooth scale & opacity",
    preview: <BreathingCircle />,
  },
  {
    id: "dash-spinner",
    label: "Dash Spinner",
    description: "Dual-ring counter-rotate",
    preview: <DashSpinner />,
  },
  {
    id: "flip-square",
    label: "Flip Square",
    description: "3D perspective rotation",
    preview: <FlipSquare />,
  },
  {
    id: "dot-trail",
    label: "Dot Trail",
    description: "Fading size trail",
    preview: <DotTrail />,
  },
  {
    id: "elastic-line",
    label: "Elastic Line",
    description: "Sliding progress bar",
    preview: <ElasticLine />,
  },
  {
    id: "hex-dots",
    label: "Hex Dots",
    description: "Hexagonal sequential pulse",
    preview: <HexDots />,
  },
];

export default function TestStatesPage() {
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">
        Agent State Indicators Test
      </h1>
      <div className="flex flex-col gap-6">
        {states.map((state) => (
          <div key={state} className="flex items-start gap-3">
            <div className="shrink-0">
              <DotMatrix state={state} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground capitalize">
                {state}
              </span>
              <p className="text-sm text-muted-foreground">{dummyText}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-baseline gap-3">
          <h2 className="text-xl font-bold text-foreground">
            Loader Experiments
          </h2>
          <span className="text-sm text-muted-foreground">
            18 loaders · click Dot Grid to customize
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LOADERS.map((loader) =>
            loader.customizable ? (
              <button
                key={loader.id}
                type="button"
                onClick={() => setShowCustomizer((v) => !v)}
                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-xl"
              >
                <LoaderCard
                  label={loader.label}
                  description={loader.description}
                  preview={loader.preview}
                  footer={
                    <span className="mt-1 text-[11px] text-muted-foreground/70">
                      {showCustomizer ? "close ×" : "customize →"}
                    </span>
                  }
                />
              </button>
            ) : (
              <LoaderCard
                key={loader.id}
                label={loader.label}
                description={loader.description}
                preview={loader.preview}
              />
            ),
          )}
        </div>

        {showCustomizer && (
          <div className="mt-4">
            <DotGridCustomizer />
          </div>
        )}
      </div>
    </div>
  );
}
