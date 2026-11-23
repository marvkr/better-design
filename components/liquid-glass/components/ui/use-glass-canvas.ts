'use client'

// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

import { useCallback, useEffect, useRef } from 'react'

import type { GlassViewHandle, GlassViewSpec, GlassViewStats } from './glass-runtime'

/**
 * Registers a canvas with the shared glass renderer. The spec is read fresh every
 * frame, so callers keep animation state in refs and simply return a new spec.
 */
export function useGlassCanvas(spec: GlassViewSpec) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const specRef = useRef(spec)
  specRef.current = spec
  const handle = useRef<GlassViewHandle | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    // three.js loads lazily so the page still prerenders on the server.
    import('./glass-runtime')
      .then(({ getGlassRuntime }) => getGlassRuntime())
      .then((runtime) => runtime.createView(canvas, () => specRef.current))
      .then((view) => {
        if (disposed) view.dispose()
        else handle.current = view
      })
      .catch((error) => console.warn('Liquid glass renderer unavailable', error))
    return () => {
      disposed = true
      handle.current?.dispose()
      handle.current = null
    }
  }, [])

  // Any React render (new props, theme, size) repaints once.
  useEffect(() => {
    handle.current?.invalidate()
  })

  const invalidate = useCallback(() => handle.current?.invalidate(), [])
  /** Running totals of GPU passes for this canvas (zero until the renderer is up). */
  const stats = useCallback((): GlassViewStats => handle.current?.stats() ?? { renders: 0, ms: 0 }, [])
  return { canvasRef, invalidate, stats }
}
