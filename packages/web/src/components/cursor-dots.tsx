"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const DOT_SIZE = 3;
const SPACING = 24;
const AREA_OF_EFFECT = 64;
const BASE_OPACITY = 40;
const LIT_OPACITY = 255;
const FADE_SPEED = 10;

class Dot {
  x: number;
  y: number;
  size: number;
  transparency: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.transparency = BASE_OPACITY;
  }

  update(mouseX: number, mouseY: number, mouseIsMoving: boolean) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (mouseIsMoving && distance < AREA_OF_EFFECT) {
      this.transparency = LIT_OPACITY;
    } else {
      this.transparency = Math.max(BASE_OPACITY, this.transparency - FADE_SPEED);
    }
  }

  render(ctx: CanvasRenderingContext2D, dotColor: [number, number, number]) {
    ctx.fillStyle = `rgba(${dotColor[0]}, ${dotColor[1]}, ${dotColor[2]}, ${this.transparency / 255})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Parse LAB color to RGB (browser returns computed colors in LAB format)
const parseLabToRgb = (labStr: string): [number, number, number] | null => {
  const match = labStr.match(/lab\(([\d.]+)%?\s+([-\d.]+)\s+([-\d.]+)\)/);
  if (!match) return null;

  // LAB values
  const L = parseFloat(match[1]);
  const a = parseFloat(match[2]);
  const b = parseFloat(match[3]);

  // LAB to XYZ
  let y = (L + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  const delta = 6 / 29;
  const _delta3 = delta * delta * delta;

  x = x > delta ? x * x * x : (x - 16 / 116) * 3 * delta * delta;
  y = y > delta ? y * y * y : (y - 16 / 116) * 3 * delta * delta;
  z = z > delta ? z * z * z : (z - 16 / 116) * 3 * delta * delta;

  // D65 white point
  x *= 0.95047;
  z *= 1.08883;

  // XYZ to RGB
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let bl = x * 0.0557 + y * -0.204 + z * 1.057;

  // Gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1 / 2.4) - 0.055 : 12.92 * bl;

  return [
    Math.round(Math.max(0, Math.min(1, r)) * 255),
    Math.round(Math.max(0, Math.min(1, g)) * 255),
    Math.round(Math.max(0, Math.min(1, bl)) * 255),
  ];
};

// Parse RGB color string
const parseRgbString = (rgbStr: string): [number, number, number] | null => {
  const match = rgbStr.match(/rgb\(([\d.]+),?\s*([\d.]+),?\s*([\d.]+)\)/);
  if (!match) return null;
  return [
    Math.round(parseFloat(match[1])),
    Math.round(parseFloat(match[2])),
    Math.round(parseFloat(match[3])),
  ];
};

// Parse any CSS color format to RGB
const parseCssColorToRgb = (color: string): [number, number, number] => {
  // Try LAB format (browser computed style)
  const lab = parseLabToRgb(color);
  if (lab) return lab;

  // Try RGB format
  const rgb = parseRgbString(color);
  if (rgb) return rgb;

  // Fallback to dark theme colors
  return [30, 30, 35]; // Dark background fallback
};

export function CursorDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for both mount and theme to be resolved
    if (!mounted || !resolvedTheme || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseIsMoving = false;
    let moveTimeout: NodeJS.Timeout | null = null;
    let animationId: number;
    let initTimeout: NodeJS.Timeout | null = null;

    const initCanvas = () => {
      // Read CSS variables after a small delay to ensure they've updated
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue("--primary").trim();
      const backgroundColor = computedStyle.getPropertyValue("--background").trim();
      const dotColor = parseCssColorToRgb(primaryColor);
      const bgColor = parseCssColorToRgb(backgroundColor);

      const createDots = () => {
        dots = [];
        for (let i = 0; i < canvas.width; i += SPACING) {
          for (let j = 0; j < canvas.height; j += SPACING) {
            dots.push(new Dot(i + SPACING / 2, j + SPACING / 2, DOT_SIZE));
          }
        }
      };

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createDots();
      };

      const draw = () => {
        ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        dots.forEach((dot) => {
          dot.update(mouseX, mouseY, mouseIsMoving);
          dot.render(ctx, dotColor);
        });

        animationId = requestAnimationFrame(draw);
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseIsMoving = true;

        if (moveTimeout) clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
          mouseIsMoving = false;
        }, 100);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", handleMouseMove);
      animationId = requestAnimationFrame(draw);

      return { resize, handleMouseMove };
    };

    // Small delay to ensure CSS variables have updated after theme change
    let handlers: { resize: () => void; handleMouseMove: (e: MouseEvent) => void } | null = null;
    initTimeout = setTimeout(() => {
      handlers = initCanvas();
    }, 50);

    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      if (handlers) {
        window.removeEventListener("resize", handlers.resize);
        window.removeEventListener("mousemove", handlers.handleMouseMove);
      }
      cancelAnimationFrame(animationId);
      if (moveTimeout) clearTimeout(moveTimeout);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
  );
}
