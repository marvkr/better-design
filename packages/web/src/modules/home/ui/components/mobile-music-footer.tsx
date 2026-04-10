"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

const DURATION = 96;
const START_AT = 36;

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function usePlaybackClock() {
  const [elapsed, setElapsed] = useState(START_AT);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setElapsed((e) => (e + 1) % DURATION);
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);

  return { elapsed, progress: elapsed / DURATION };
}

export function MobileMusicFooter() {
  const { elapsed, progress } = usePlaybackClock();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <footer className="lg:hidden w-full">
      <div ref={containerRef} className="relative w-full flex justify-center px-4 py-3">
        {isOpen && (
          <div className="absolute left-4 right-4 bottom-[calc(100%+8px)] bg-background border border-border rounded-xl p-3 shadow-lg z-50">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0273841bd9536f08626cd59dde"
                alt="ENDLESS RECESS"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">It&apos;s Pretty Lovely Out Here</p>
                <p className="text-xs text-muted-foreground truncate">Odymel · ENDLESS RECESS</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-[width] duration-1000 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{formatTime(elapsed)}</span>
                <span>{formatTime(DURATION)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground flex-1">Listen on</span>
              <a
                href="https://open.spotify.com/track/29lpeQztMQULdWq2n9ZrHU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="simple-icons:spotify" className="w-4 h-4 text-[#1DB954]" />
                Spotify
              </a>
              <a
                href="https://music.apple.com/us/song/its-pretty-lovely-out-here/1852813685"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="simple-icons:applemusic" className="w-4 h-4 text-[#FC3C44]" />
                Apple Music
              </a>
            </div>
          </div>
        )}
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border bg-background shadow-xs pl-1 pr-3 py-1"
          aria-label="Open now playing"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <img
            src="https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0273841bd9536f08626cd59dde"
            alt="It's Pretty Lovely Out Here"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-foreground truncate max-w-[180px]">
            It&apos;s Pretty Lovely Out Here
          </span>
        </button>
      </div>
    </footer>
  );
}
