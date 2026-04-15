"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const DURATION = 96; // 1:36 in seconds
const START_AT = 36; // where to start (0:36)

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
    return () => { if (ref.current) clearInterval(ref.current); };
  }, []);

  return { elapsed, progress: elapsed / DURATION };
}

export const Navbar = () => {
  const isScrolled = useScroll();
  const { data: session, isPending } = authClient.useSession();
  const { elapsed, progress } = usePlaybackClock();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-background border-border",
      )}
    >
      <div className="w-full flex justify-between items-center">
        {/* Left spacer for symmetry */}
        <div className="flex-1" />

        {/* Center content */}
        <div className="max-w-5xl w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-semibold text-lg">Better Design</span>
          </Link>
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/manifesto">Manifesto</Link>
            </Button>
            {/* Sign up / Sign in hidden while in waitlist-only mode */}
            {/* {!isPending && !session?.user ? (
              <>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
                <UserControl showName />
              </>
            )} */}
            {!isPending && session?.user && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
                <UserControl showName />
              </>
            )}
          </div>
        </div>

        {/* Right corner - Now playing + Theme toggle */}
        <div className="flex-1 flex justify-end items-center gap-3 pl-4">
          <div className="relative group hidden lg:block">
            {/* Pill - same style as outline button / theme toggle */}
            <div className="flex items-center gap-2 rounded-md border bg-background shadow-xs pl-1 pr-2 sm:pr-3 py-1 cursor-default">
              <img
                src="https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0273841bd9536f08626cd59dde"
                alt="It's Pretty Lovely Out Here"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="hidden sm:inline text-xs text-foreground truncate max-w-[160px]">
                It&apos;s Pretty Lovely Out Here
              </span>
              <span className="hidden sm:flex items-center gap-[2px] h-3 shrink-0">
                <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }} />
                <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "200ms" }} />
                <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "400ms" }} />
                <span className="w-[2px] rounded-full bg-green-600/60 dark:bg-green-500/40 animate-[soundwave_1.2s_ease-in-out_infinite]" style={{ animationDelay: "600ms" }} />
              </span>
            </div>

            {/* Hover card */}
            <div className="absolute right-0 top-full w-64 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 hidden sm:block">
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

              {/* Progress bar */}
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

              {/* Links */}
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
            </div>
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Open menu">
                <Icon icon="tabler:menu-2" className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-4 flex flex-col gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/manifesto">Manifesto</Link>
                </Button>
                {/* Sign up / Sign in hidden while in waitlist-only mode */}
                {/* {!isPending && !session?.user ? (
                  <>
                    <Button variant="secondary" asChild>
                      <Link href="/sign-up">Sign up</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/sign-in">Sign in</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/projects">Projects</Link>
                    </Button>
                    <div className="pt-1">
                      <UserControl showName />
                    </div>
                  </>
                )} */}
                {!isPending && session?.user && (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/projects">Projects</Link>
                    </Button>
                    <div className="pt-1">
                      <UserControl showName />
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};
