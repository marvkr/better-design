"use client"

import * as React from "react"
import { MetalFx } from "metal-fx"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Metal Ring — animated WebGL liquid-metal frame from `metal-fx` (the
 * official npm package by Jakub Antalik). The shader paints a gold ring
 * with proximity reflections; the wrapped child stays the actual
 * interactive element.
 *
 * `corners="rect"` falls back to no ring — `metal-fx` only ships button
 * (pill) and circle variants, and the rect/input use case isn't part of
 * the library's design.
 */

type RingCorners = "pill" | "rect"

interface MetalRingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  corners?: RingCorners
  active?: boolean
  block?: boolean
}

// Probe runs once per package module (each metal-fx variant holds its own
// copy) and a single in-flight promise dedupes concurrent mounts, so a showcase
// page spins up at most one throwaway WebGL context per module — far under the
// browser's live-context cap. The context is released immediately.
let cachedWebGLSupport: boolean | null = null
let webglProbe: Promise<boolean> | null = null

function probeWebGLSupport(): Promise<boolean> {
  if (webglProbe) return webglProbe
  webglProbe = Promise.resolve().then(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      cachedWebGLSupport = !!gl
      if (gl instanceof WebGLRenderingContext) {
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      }
    } catch {
      cachedWebGLSupport = false
    }
    return cachedWebGLSupport
  })
  return webglProbe
}

/*
 * `metal-fx` calls `getContext("webgl")` inside a mount effect and throws
 * synchronously when WebGL is unavailable (older/locked-down mobile Safari,
 * some restricted browsers), which crashed the whole preview subtree. We
 * feature-detect after mount with the same context-type probe the library uses
 * and only upgrade to the WebGL ring when it's supported. Lazy-init from the
 * cache avoids a no-ring flicker on mounts that happen after the probe settles.
 */
function useWebGLSupported(): boolean {
  const [supported, setSupported] = React.useState(() => cachedWebGLSupport ?? false)
  React.useEffect(() => {
    if (cachedWebGLSupport !== null) {
      setSupported(cachedWebGLSupport)
      return
    }
    let active = true
    void probeWebGLSupport().then((result) => {
      if (active) setSupported(result)
    })
    return () => {
      active = false
    }
  }, [])
  return supported
}

/*
 * The ring animates for as long as it is on screen, and `metal-fx` has no
 * reduced-motion setting of its own. Under reduced motion the ring draws two
 * frames and then holds still. Pausing before the first frame would leave it
 * blank, because a paused renderer draws nothing, so the wait starts once the
 * ring is mounted. The Figma capture reads the page under reduced motion, so
 * the capture and the audit screenshot get the same frame. `paused` drives
 * one renderer that every ring in the system shares, so the first ring to
 * hold freezes them all, and a ring that mounts later restarts them for its
 * own two frames. [BD-722]
 */
function useHeldStill(mounted: boolean): boolean {
  const reduced = useReducedMotion() === true
  const [still, setStill] = React.useState(false)
  React.useEffect(() => {
    // A ring that unmounts lets go, so it draws again when it comes back.
    if (!reduced || !mounted) {
      setStill(false)
      return
    }
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setStill(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [reduced, mounted])
  return still
}

const MetalRing = React.forwardRef<HTMLDivElement, MetalRingProps>(
  ({ children, corners = "pill", active = true, block = false, className, ...props }, ref) => {
    const webglSupported = useWebGLSupported()
    const ringed = webglSupported && corners !== "rect"
    const still = useHeldStill(ringed)
    const wrapperClassName = cn(block ? "block w-full" : "inline-flex align-middle", className)

    // No WebGL ring for rect, or when the browser can't create a WebGL context.
    if (!ringed) {
      return (
        <div ref={ref} className={wrapperClassName} {...props}>
          {children}
        </div>
      )
    }
    return (
      <div ref={ref} className={wrapperClassName} {...props}>
        <MetalFx variant="button" preset="silver" theme="dark" paused={!active || still} disableGlow>
          {children}
        </MetalFx>
      </div>
    )
  },
)
MetalRing.displayName = "MetalRing"

export { MetalRing }
export type { MetalRingProps }
