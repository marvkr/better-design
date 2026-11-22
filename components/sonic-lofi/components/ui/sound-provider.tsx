"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Lofi — pink-noise burst through a bandpass, tape-machine click feel.
 *
 * playClick: pink noise → bandpass 1200 Hz Q=2, decay 0.06s → muted tape click.
 * playTick:  pink noise → bandpass 2000 Hz Q=2, decay 0.012s → reel chatter.
 */

const clickSound = defineSound({
  source: { type: "noise", color: "pink" },
  filter: { type: "bandpass", frequency: 1200, resonance: 2 },
  envelope: { attack: 0, decay: 0.06, sustain: 0, release: 0.02 },
  gain: 0.28,
})

const tickSound = defineSound({
  source: { type: "noise", color: "pink" },
  filter: { type: "bandpass", frequency: 2000, resonance: 2 },
  envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.005 },
  gain: 0.18,
})

let moduleEnabled = true

function getReducedMotion(): boolean {
  if (!("window" in globalThis)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function trigger(fn: () => void) {
  if (!moduleEnabled || getReducedMotion()) return
  void ensureReady().then(() => {
    fn()
  })
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
  playTick: () => trigger(tickSound),
  playClick: () => trigger(clickSound),
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
      tickSound()
    })
  }, [enabled, reducedMotion])

  const playClick = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void ensureReady().then(() => {
      clickSound()
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
