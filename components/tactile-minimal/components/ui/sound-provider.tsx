"use client"

import * as React from "react"

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

// Module-level singleton so sounds work even without a SoundProvider wrapping the tree
let moduleCtx: AudioContext | null = null
let moduleEnabled = true

function getModuleCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!moduleCtx) {
    try { moduleCtx = new AudioContext() } catch { return null }
  }
  return moduleCtx
}

function playTickSound(ctx: AudioContext) {
  if (ctx.state === "suspended") ctx.resume()

  const time = ctx.currentTime + 0.01
  const buffer = ctx.createBuffer(1, 0.008 * ctx.sampleRate, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (2 * Math.random() - 1) * Math.exp(-i / 40)
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = "bandpass"
  filter.frequency.value = 3200
  filter.Q.value = 3

  const gain = ctx.createGain()
  gain.gain.value = 1

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.onended = () => source.disconnect()
  source.start(time)
}

function playClickSound(ctx: AudioContext) {
  if (ctx.state === "suspended") ctx.resume()

  const time = ctx.currentTime + 0.01
  const osc = ctx.createOscillator()
  osc.type = "sine"
  osc.frequency.setValueAtTime(800, time)
  osc.frequency.exponentialRampToValueAtTime(300, time + 0.015)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.06, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.018)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(time)
  osc.stop(time + 0.02)
}

const defaultPlayTick = () => {
  if (!moduleEnabled) return
  const ctx = getModuleCtx()
  if (ctx) playTickSound(ctx)
}
const defaultPlayClick = () => {
  if (!moduleEnabled) return
  const ctx = getModuleCtx()
  if (ctx) playClickSound(ctx)
}

const SoundContext = React.createContext<SoundContextValue>({
  enabled: true,
  toggle: () => { moduleEnabled = !moduleEnabled },
  playTick: defaultPlayTick,
  playClick: defaultPlayClick,
})

function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true)
  const audioCtxRef = React.useRef<AudioContext | null>(null)

  const getAudioContext = React.useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    return audioCtxRef.current
  }, [])

  const toggle = React.useCallback(() => setEnabled((prev) => !prev), [])

  const playTick = React.useCallback(() => {
    if (!enabled) return
    playTickSound(getAudioContext())
  }, [enabled, getAudioContext])

  const playClick = React.useCallback(() => {
    if (!enabled) return
    playClickSound(getAudioContext())
  }, [enabled, getAudioContext])

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
