"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

// Mood: retro. Generated from @web-kits/audio core patch + mood mutation rules.
const clickDef = {
  "source": {
    "type": "square",
    "frequency": {
      "start": 200,
      "end": 700
    }
  },
  "filter": {
    "type": "lowpass",
    "frequency": 3000
  },
  "envelope": {
    "attack": 0,
    "decay": 0.06,
    "sustain": 0,
    "release": 0.02
  },
  "effects": [
    {
      "type": "bitcrusher",
      "bits": 8,
      "sampleRateReduction": 3,
      "mix": 1
    }
  ],
  "gain": 0.25
} as const

const tickDef = {
  "source": {
    "type": "square",
    "frequency": 1500
  },
  "filter": {
    "type": "lowpass",
    "frequency": 3000
  },
  "envelope": {
    "attack": 0,
    "decay": 0.01,
    "sustain": 0,
    "release": 0.004
  },
  "effects": [
    {
      "type": "bitcrusher",
      "bits": 8,
      "sampleRateReduction": 3,
      "mix": 1
    }
  ],
  "gain": 0.15
} as const

let moduleEnabled = true
let modulePlayClick: ((opts?: unknown) => unknown) | null = null
let modulePlayTick: ((opts?: unknown) => unknown) | null = null
let moduleReady = false

function lazyInit() {
  if (typeof window === "undefined" || moduleReady) return
  try {
    modulePlayClick = defineSound(clickDef as never) as never
    modulePlayTick = defineSound(tickDef as never) as never
    moduleReady = true
    void ensureReady()
  } catch {
    // ignore; will retry on next call
  }
}

function safePlay(fn: ((opts?: unknown) => unknown) | null) {
  if (!moduleEnabled || typeof window === "undefined") return
  lazyInit()
  if (!fn) return
  try { fn() } catch { /* swallow */ }
}

const defaultPlayClick = () => safePlay(modulePlayClick)
const defaultPlayTick = () => safePlay(modulePlayTick)

const SoundContext = React.createContext<SoundContextValue>({
  enabled: true,
  toggle: () => { moduleEnabled = !moduleEnabled },
  playTick: defaultPlayTick,
  playClick: defaultPlayClick,
})

function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true)

  React.useEffect(() => { lazyInit() }, [])

  const toggle = React.useCallback(() => {
    setEnabled((prev) => {
      moduleEnabled = !prev
      return !prev
    })
  }, [])

  const playTick = React.useCallback(() => {
    if (!enabled) return
    safePlay(modulePlayTick)
  }, [enabled])

  const playClick = React.useCallback(() => {
    if (!enabled) return
    safePlay(modulePlayClick)
  }, [enabled])

  const value = React.useMemo(
    () => ({ enabled, toggle, playTick, playClick }),
    [enabled, toggle, playTick, playClick]
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

function useSound() {
  return React.useContext(SoundContext)
}

export { SoundProvider, useSound }
