"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { DesignSystemPreviewCard } from "@/app/design-systems/preview-card"

interface DesignSystemInfo {
  id: string
  slug?: string
  name: string
  description: string
  theme: "light" | "dark"
  tokens: Record<string, string>
}

const ANIMATION_DURATION = 120 // seconds

function getCurrentTranslateX(track: HTMLDivElement): number {
  const matrix = new DOMMatrix(getComputedStyle(track).transform)
  return matrix.m41
}

function resumeAnimationFromPosition(track: HTMLDivElement, currentX: number) {
  const scrollWidth = track.scrollWidth
  const loopWidth = scrollWidth / 2
  const normalizedX = ((currentX % loopWidth) - loopWidth) % loopWidth
  const fraction = Math.abs(normalizedX) / loopWidth
  const delay = -(fraction * ANIMATION_DURATION)

  track.style.transform = ""
  track.style.animation = "none"
  // Force reflow
  void track.offsetWidth
  track.style.animation = `marquee ${ANIMATION_DURATION}s linear infinite`
  track.style.animationDelay = `${delay}s`
  track.style.animationPlayState = "running"
}

export function DesignSystemsCarousel({ systems }: { systems: DesignSystemInfo[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Drag state
  const isPointerDownRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const currentOffsetRef = useRef(0)

  // Wheel resume timeout
  const wheelResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const getLoopWidth = () => track.scrollWidth / 2

    // --- Wheel ---
    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta === 0) return
      e.preventDefault()

      if (isDraggingRef.current) return

      // Stop animation entirely so inline transform takes effect
      if (track.style.animation !== "none") {
        currentOffsetRef.current = getCurrentTranslateX(track)
        track.style.animation = "none"
        void track.offsetWidth
      }

      currentOffsetRef.current -= delta
      // Wrap around loop
      const loopWidth = getLoopWidth()
      currentOffsetRef.current = ((currentOffsetRef.current % loopWidth) - loopWidth) % loopWidth
      track.style.transform = `translateX(${currentOffsetRef.current}px)`

      // Auto-resume after 1.5s of no wheel events
      if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current)
      wheelResumeTimerRef.current = setTimeout(() => {
        resumeAnimationFromPosition(track, currentOffsetRef.current)
      }, 1500)
    }

    // --- Pointer drag ---
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return

      isPointerDownRef.current = true
      dragDistanceRef.current = 0
      dragStartXRef.current = e.clientX
      dragStartOffsetRef.current = getCurrentTranslateX(track)

      if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return

      const delta = e.clientX - dragStartXRef.current
      dragDistanceRef.current = Math.abs(delta)

      if (!isDraggingRef.current) {
        if (dragDistanceRef.current < 5) return
        // Threshold crossed — start drag
        isDraggingRef.current = true
        currentOffsetRef.current = dragStartOffsetRef.current
        track.style.animation = "none"
        void track.offsetWidth
        track.style.transform = `translateX(${currentOffsetRef.current}px)`
        container.dataset.dragging = "true"
        container.setPointerCapture(e.pointerId)
      }

      const loopWidth = getLoopWidth()
      const raw = dragStartOffsetRef.current + delta
      currentOffsetRef.current = ((raw % loopWidth) - loopWidth) % loopWidth
      track.style.transform = `translateX(${currentOffsetRef.current}px)`
    }

    const handlePointerUp = () => {
      isPointerDownRef.current = false
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      delete container.dataset.dragging

      resumeAnimationFromPosition(track, currentOffsetRef.current)
    }

    // --- Prevent accidental link clicks after drag ---
    const handleClick = (e: MouseEvent) => {
      if (dragDistanceRef.current > 5) {
        e.preventDefault()
        e.stopPropagation()
      }
      dragDistanceRef.current = 0
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("pointerdown", handlePointerDown)
    container.addEventListener("pointermove", handlePointerMove)
    container.addEventListener("pointerup", handlePointerUp)
    container.addEventListener("pointercancel", handlePointerUp)
    container.addEventListener("click", handleClick, { capture: true })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("pointerdown", handlePointerDown)
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("pointerup", handlePointerUp)
      container.removeEventListener("pointercancel", handlePointerUp)
      container.removeEventListener("click", handleClick, { capture: true })
      if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    const track = trackRef.current
    if (!track) return
    const x = getCurrentTranslateX(track)
    currentOffsetRef.current = x
    track.style.animation = "none"
    void track.offsetWidth
    track.style.transform = `translateX(${x}px)`
  }

  const handleMouseLeave = () => {
    const track = trackRef.current
    if (!track || isDraggingRef.current) return
    if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current)
    resumeAnimationFromPosition(track, currentOffsetRef.current)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 -my-4"
      style={{ overflowX: "clip", touchAction: "pan-y", cursor: "grab" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-0 inset-y-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 inset-y-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-5 w-max py-3 [data-dragging_&]:select-none"
        style={{ animation: `marquee ${ANIMATION_DURATION}s linear infinite` }}
      >
        {[...systems, ...systems].map((system, i) => (
          <Link
            key={i}
            href={`/design-systems/${system.slug ?? system.id}`}
            className="block group w-[180px] md:w-[260px] shrink-0"
            draggable={false}
          >
            <DesignSystemPreviewCard system={system} />
          </Link>
        ))}
      </div>
    </div>
  )
}
