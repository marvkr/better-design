"use client";

import { useEffect, useRef } from "react";
import type { AgentState } from "./types";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  trail: { x: number; y: number }[];
  angle: number;
  baseR?: number;
  speed?: number;
  phase?: number;
  opacity?: number;
  r?: number;
  targetR?: number;
  vx?: number;
  vy?: number;
}

const W = 60;
const H = 60;
const CX = W / 2;
const CY = H / 2;
const N = 50;

const STATE_COLORS: Record<AgentState, string> = {
  idle: "#6b7280",
  thinking: "#EF9F27",
  executing: "#378ADD",
  paused: "#a78bfa",
  question: "#7F77DD",
  success: "#639922",
  error: "#E24B4A",
};

function initParticle(p: Particle, state: AgentState, i: number) {
  const a = (i / N) * Math.PI * 2;
  p.trail = [];
  p.angle = a;

  if (state === "idle") {
    p.baseR = 14 + Math.random() * 6;
    p.speed = 0.002 + Math.random() * 0.001;
    p.phase = Math.random() * Math.PI * 2;
    p.size = 1 + Math.random() * 1.5;
    p.opacity = 0.2 + Math.random() * 0.3;
  } else if (state === "thinking") {
    p.baseR = 16 + Math.random() * 8;
    p.speed = 0.004 + Math.random() * 0.003;
    p.phase = Math.random() * Math.PI * 2;
    p.size = 1.2 + Math.random() * 1.5;
    p.opacity = 0.4 + Math.random() * 0.5;
  } else if (state === "executing") {
    p.speed = 0.04 + (i % 3) * 0.015;
    p.r = 14 + (i % 4) * 3;
    p.size = 0.8 + Math.random() * 1.2;
    p.opacity = 0.7 + Math.random() * 0.3;
    p.phase = Math.random() * Math.PI * 2;
  } else if (state === "paused") {
    p.baseR = 14 + Math.random() * 6;
    p.speed = 0.001;
    p.phase = Math.random() * Math.PI * 2;
    p.size = 1 + Math.random() * 1.5;
    p.opacity = 0.15 + Math.random() * 0.2;
  } else if (state === "question") {
    p.baseR = 12 + Math.random() * 10;
    p.phase = Math.random() * Math.PI * 2;
    p.speed = 0.006 + Math.random() * 0.004;
    p.size = 1 + Math.random() * 1.5;
    p.opacity = 0.5 + Math.random() * 0.4;
  } else if (state === "error") {
    p.baseR = 12 + Math.random() * 6;
    p.speed = 0.008 + Math.random() * 0.006;
    p.phase = Math.random() * Math.PI * 2;
    p.size = 1 + Math.random() * 1.2;
    p.opacity = 0.6 + Math.random() * 0.4;
  } else if (state === "success") {
    p.baseR = 10 + (i % 3) * 5;
    p.speed = 0.018 + Math.random() * 0.012;
    p.phase = a; // wave ripples from angle position
    p.size = 1 + Math.random() * 1.8;
    p.opacity = 0.7 + Math.random() * 0.3;
  }
}

function updateParticle(p: Particle, state: AgentState, t: number) {
  if (state === "idle") {
    p.angle! += p.speed!;
    const breathe = Math.sin(t * 0.0004 + p.phase!) * 4;
    p.x = CX + Math.cos(p.angle!) * (p.baseR! + breathe);
    p.y = CY + Math.sin(p.angle!) * (p.baseR! + breathe) * 0.6;
    p.alpha = p.opacity! * (0.5 + 0.5 * Math.sin(t * 0.0005 + p.phase!));
  } else if (state === "thinking") {
    p.angle! += p.speed!;
    const breathe = Math.sin(t * 0.0008 + p.phase!) * 6;
    p.x = CX + Math.cos(p.angle!) * (p.baseR! + breathe);
    p.y = CY + Math.sin(p.angle!) * (p.baseR! + breathe) * 0.6;
    p.alpha = p.opacity! * (0.6 + 0.4 * Math.sin(t * 0.001 + p.phase!));
  } else if (state === "executing") {
    p.angle! += p.speed!;
    p.x = CX + Math.cos(p.angle!) * p.r!;
    p.y = CY + Math.sin(p.angle!) * p.r! * 0.55;
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 6) p.trail.shift();
    p.alpha = p.opacity!;
  } else if (state === "paused") {
    p.angle! += p.speed!;
    p.x = CX + Math.cos(p.angle!) * p.baseR!;
    p.y = CY + Math.sin(p.angle!) * p.baseR! * 0.6;
    p.alpha = p.opacity! * (0.6 + 0.4 * Math.sin(t * 0.0003 + p.phase!));
  } else if (state === "question") {
    p.angle! += p.speed! * (Math.sin(t * 0.0005 + p.phase!) > 0 ? 1 : -0.3);
    const drift = Math.abs(Math.sin(t * 0.0012 + p.phase!)) * 10;
    p.x = CX + Math.cos(p.angle!) * (p.baseR! + drift);
    p.y = CY + Math.sin(p.angle!) * (p.baseR! + drift) * 0.65;
    p.alpha = p.opacity! * (0.5 + 0.5 * Math.abs(Math.sin(t * 0.0015 + p.phase!)));
  } else if (state === "error") {
    // orbit with a high-frequency radial shake
    p.angle! += p.speed!;
    const shake = Math.sin(t * 0.12 + p.phase!) * 4;
    const r = p.baseR! + shake;
    p.x = CX + Math.cos(p.angle!) * r;
    p.y = CY + Math.sin(p.angle!) * r * 0.6;
    p.alpha = p.opacity! * (0.7 + 0.3 * Math.sin(t * 0.08 + p.phase!));
  } else if (state === "success") {
    // ripple wave outward from center — celebratory burst
    p.angle! += p.speed!;
    const wave = Math.sin(t * 0.04 - p.phase!) * 6;
    const r = p.baseR! + wave;
    p.x = CX + Math.cos(p.angle!) * r;
    p.y = CY + Math.sin(p.angle!) * r * 0.6;
    p.alpha = p.opacity! * (0.5 + 0.5 * Math.sin(t * 0.04 - p.phase!));
  }
}

export function OrbV2({ state }: { state: AgentState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const particlesRef = useRef<Particle[]>([]);
  const tRef = useRef(0);
  const rafRef = useRef<number>(0);

  // reinit particles when state changes
  useEffect(() => {
    stateRef.current = state;
    particlesRef.current = Array.from({ length: N }, (_, i) => {
      const p: Particle = { x: CX, y: CY, alpha: 0, size: 1.5, trail: [], angle: 0 };
      initParticle(p, state, i);
      return p;
    });
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    particlesRef.current = Array.from({ length: N }, (_, i) => {
      const p: Particle = { x: CX, y: CY, alpha: 0, size: 1.5, trail: [], angle: 0 };
      initParticle(p, stateRef.current, i);
      return p;
    });

    function loop() {
      tRef.current++;
      const t = tRef.current;
      const s = stateRef.current;
      const color = STATE_COLORS[s];

      ctx!.clearRect(0, 0, W, H);

      for (const p of particlesRef.current) {
        updateParticle(p, s, t);

        if (s === "executing" && p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const prog = i / p.trail.length;
            ctx!.beginPath();
            ctx!.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
            ctx!.lineTo(p.trail[i].x, p.trail[i].y);
            ctx!.strokeStyle = color;
            ctx!.globalAlpha = prog * p.alpha * 0.4;
            ctx!.lineWidth = p.size * prog;
            ctx!.stroke();
          }
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }

      // core dot
      const now = Date.now();
      const pulse =
        s === "paused" ? 1 :
        s === "success" ? Math.sin(now * 0.006) * 0.25 + 0.85 :
        Math.sin(now * 0.002) * 0.12 + 0.88;
      ctx!.beginPath();
      ctx!.arc(CX, CY, 4 * pulse, 0, Math.PI * 2);
      ctx!.fillStyle = color;
      ctx!.globalAlpha = s === "paused" ? 0.4 : 0.9;
      ctx!.fill();

      // inner glow
      ctx!.beginPath();
      ctx!.arc(CX, CY, 8 * pulse, 0, Math.PI * 2);
      ctx!.fillStyle = color;
      ctx!.globalAlpha = s === "paused" ? 0.06 : s === "success" ? 0.25 : 0.15;
      ctx!.fill();

      ctx!.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} width={W} height={H} />;
}
