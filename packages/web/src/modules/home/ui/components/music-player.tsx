"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type MusicPlayerVariant = "desktop" | "mobile";

interface MusicPlayerProps {
  variant: MusicPlayerVariant;
  className?: string;
}

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

function MusicDetailsCard({ elapsed, progress }: { elapsed: number; progress: number }) {
  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg">
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
  );
}

function MusicPill({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-md border bg-background shadow-xs pl-1 pr-3 py-1">
      <img
        src="https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0273841bd9536f08626cd59dde"
        alt="It's Pretty Lovely Out Here"
        className="w-6 h-6 rounded-full object-cover"
      />
      <span className={cn("text-xs text-foreground truncate", compact ? "max-w-[180px]" : "max-w-[160px]")}>
        It&apos;s Pretty Lovely Out Here
      </span>
      {!compact && (
        <span className="flex items-center gap-[2px] h-3 shrink-0">
          <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }} />
          <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "200ms" }} />
          <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "400ms" }} />
          <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "600ms" }} />
        </span>
      )}
    </div>
  );
}

export function MusicPlayer({ variant, className }: MusicPlayerProps) {
  const { elapsed, progress } = usePlaybackClock();

  if (variant === "desktop") {
    return (
      <div className={cn("relative group", className)}>
        <MusicPill />
        <div className="absolute right-0 top-full w-64 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
          <MusicDetailsCard elapsed={elapsed} progress={progress} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full flex justify-center py-8", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <button type="button" aria-label="Open now playing">
            <MusicPill compact />
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Now Playing</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <MusicDetailsCard elapsed={elapsed} progress={progress} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

