'use client'

// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

import { useEffect, useRef, useState } from 'react'

/** Per-component theme override; omit it to follow the page (data-theme="dark" or class="dark"). */
export type Theme = 'light' | 'dark'

// Mirrors a prop into local state so a component stays interactive on the
// canvas without a handler, yet still follows the prop when it changes.
export function useSyncedState<T>(value: T, onChange?: (value: T) => void) {
  const [state, setState] = useState(value)
  useEffect(() => setState(value), [value])
  const update = (next: T) => {
    setState(next)
    onChange?.(next)
  }
  return [state, update] as const
}

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

// Tracks an element's border-box size (0 × 0 until mounted).
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setSize({ width: el.offsetWidth, height: el.offsetHeight })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, size] as const
}
