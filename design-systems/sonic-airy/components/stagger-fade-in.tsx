"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StaggerFadeInProps {
  children: React.ReactNode
  staggerMs?: number
  durationMs?: number
  className?: string
}

function StaggerFadeIn({
  children,
  staggerMs = 20,
  durationMs = 400,
  className,
}: StaggerFadeInProps) {
  const items = React.Children.toArray(children)

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: 0,
            transform: "translateY(8px)",
            filter: "blur(4px)",
            animation: `staggerFadeIn ${durationMs}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * staggerMs}ms forwards`,
          }}
        >
          {child}
        </div>
      ))}
      <style>{`
        @keyframes staggerFadeIn {
          to {
            opacity: 1;
            transform: translateY(0px);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  charDelayMs?: number
}

function TextReveal({ text, className, charDelayMs = 20 }: TextRevealProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(2px)",
            animation: `charReveal 150ms cubic-bezier(0.215, 0.61, 0.355, 1) ${i * charDelayMs}ms forwards`,
            ...(char === " " ? { width: "0.25em" } : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <style>{`
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px);
          }
        }
      `}</style>
    </span>
  )
}

export { StaggerFadeIn, TextReveal }
export type { StaggerFadeInProps, TextRevealProps }
