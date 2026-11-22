"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Retro — 8-bit square sweep with detune jitter.
 *
 * playClick: square 800 → 200 Hz sweep, decay 0.06s + ±60 cents jitter per voice → chip beep.
 * playTick:  square 1500 Hz, decay 0.01s → arcade pip.
 */

const clickSound = defineSound({
  source: { type: "square", frequency: { start: 800, end: 200 } },
  envelope: { attack: 0, decay: 0.06, sustain: 0, release: 0.02 },
  gain: 0.20,
})

const tickSound = defineSound({
  source: { type: "square", frequency: 1500 },
  envelope: { attack: 0, decay: 0.01, sustain: 0, release: 0.004 },
  gain: 0.14,
})

let moduleEnabled = true

function getReducedMotion(): boolean {
  if (!("window" in globalThis)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

const SoundContext = React.createContext<SoundContextValue>({
  enabled: true,
  toggle: () => {
    moduleEnabled = !moduleEnabled
  },
  playTick: () => {
    if (!moduleEnabled || getReducedMotion()) return
    void ensureReady().then(() => {
      tickSound({ detune: (Math.random() * 2 - 1) * 30 })
    })
  },
  playClick: () => {
    if (!moduleEnabled || getReducedMotion()) return
    void ensureReady().then(() => {
      clickSound({ detune: (Math.random() * 2 - 1) * 60 })
    })
  },
})

function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true)
  const reducedMotion = React.useSyncExternalStore(
    (cb) => {
      if (!("window" in globalThis)) return () => {}
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
      mql.addEventListener("change", cb)
      return () => mql.removeEventListener("change", cb)
    },
    () => getReducedMotion(),
    () => false,
  )

  const toggle = React.useCallback(() => setEnabled((prev) => !prev), [])

  const playTick = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void ensureReady().then(() => {
      tickSound({ detune: (Math.random() * 2 - 1) * 30 })
    })
  }, [enabled, reducedMotion])

  const playClick = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void ensureReady().then(() => {
      clickSound({ detune: (Math.random() * 2 - 1) * 60 })
    })
  }, [enabled, reducedMotion])

  const value = React.useMemo(
    () => ({ enabled, toggle, playTick, playClick }),
    [enabled, toggle, playTick, playClick],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

function useSound() {
  return React.useContext(SoundContext)
}

export { SoundProvider, useSound }
