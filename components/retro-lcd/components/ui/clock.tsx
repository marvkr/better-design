"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Retro LCD Clock — the signature readout of the retro-lcd design system.
// A digital-watch face: greenish-grey LCD field, dark-olive 7-segment ink with
// ghost "8" backers, AM/PM flags, and a recessed glass screen. The active ink
// maps to --foreground and the screen to --background so it tracks the theme.

const formatTwoDigits = (num: number) => num.toString().padStart(2, "0");

type RetroLCDClockProps = {
  format?: "12" | "24";
  className?: string;
  /** Optional fixed time for deterministic previews and exported mockups. */
  time?: Date;
};

export const RetroLCDClock = ({
  format = "12",
  className,
  time: fixedTime,
}: RetroLCDClockProps) => {
  const [time, setTime] = React.useState(() => new Date(2000, 0, 1, 10, 8, 36));

  React.useEffect(() => {
    if (fixedTime) return;
    const update = () => setTime(new Date());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [fixedTime]);

  const now = fixedTime ?? time;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isPM = hours >= 12;
  const displayHours = format === "12" ? hours % 12 || 12 : hours;
  const hoursStr = formatTwoDigits(displayHours);
  const minutesStr = formatTwoDigits(minutes);
  const secondsStr = formatTwoDigits(seconds);

  const Digit = ({ value }: { value: string }) => (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Ghost 8 background for the 7-segment effect */}
      <div className="absolute inset-0 flex select-none items-center justify-center font-mono text-4xl font-bold tracking-tighter text-foreground/5 blur-[0.0313rem] sm:text-6xl">
        8
      </div>
      {/* Active digit */}
      <div className="relative z-10 flex select-none items-center justify-center font-mono text-4xl font-bold leading-none tracking-tighter text-foreground drop-shadow-sm transition-all duration-fast sm:text-6xl">
        {value}
      </div>
    </div>
  );

  const Separator = () => (
    <div className="mx-1.5 flex h-full w-2 shrink-0 flex-col items-center justify-center gap-3 opacity-85 sm:mx-3 sm:w-3 sm:pt-1">
      <div className="h-1 w-1 rounded-full bg-foreground shadow-sm sm:h-1.5 sm:w-1.5" />
      <div className="h-1 w-1 rounded-full bg-foreground shadow-sm sm:h-1.5 sm:w-1.5" />
    </div>
  );

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-xl select-none rounded-3xl p-3",
        "border border-[oklch(1_0_0/0.05)] bg-[oklch(0.2686_0_89.88)]",
        "shadow-[0_1.25rem_3.125rem_-0.75rem_oklch(0_0_0/0.5)] ring-1 ring-[oklch(0_0_0/0.2)]",
        className,
      )}
      style={{ maxWidth: "430px" }}
    >
      {/* Inner plate / bezel */}
      <div className="rounded-3xl bg-[oklch(0.3715_0_89.88)] p-1 shadow-[inset_0_0.0625rem_0.25rem_oklch(0_0_0/0.5)]">
        {/* Screen container */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-[oklch(0_0_0/0.05)] bg-background px-6 py-6 shadow-[inset_0_0.25rem_0.625rem_oklch(0_0_0/0.2)] sm:px-10">
          {/* 1. Gradient overlay for depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[oklch(0_0_0/0.05)] to-transparent mix-blend-overlay" />

          {/* 2. Pixel grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0 0 0) 0.6px, oklch(0 0 0 / 0) 0.6px), linear-gradient(90deg, oklch(0 0 0) 0.6px, oklch(0 0 0 / 0) 0.6px)",
              backgroundSize: "3px 3px",
            }}
          />

          {/* 3. Reflection / glare — top left */}
          <div className="pointer-events-none absolute -left-10 -top-10 z-20 h-40 w-40 rounded-full bg-[oklch(1_0_0/0.1)] blur-3xl mix-blend-soft-light" />

          {/* 4. Reflection / glare — top right sharp */}
          <div className="pointer-events-none absolute right-4 top-2 z-20 h-16 w-16 rounded-full bg-[oklch(1_0_0/0.2)] blur-2xl mix-blend-soft-light" />

          {/* 5. General glass sheen */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-[oklch(1_0_0/0.03)] to-transparent" />

          {/* AM/PM indicators */}
          <div className="absolute left-4 top-3 z-10 flex flex-col gap-0.5 sm:left-6 sm:top-4">
            <div
              className={cn(
                "font-sans text-[0.5rem] font-bold tracking-widest transition-opacity duration-slow sm:text-[0.6rem]",
                !isPM ? "text-foreground opacity-90 drop-shadow-sm" : "text-foreground/5",
              )}
            >
              AM
            </div>
            <div
              className={cn(
                "font-sans text-[0.5rem] font-bold tracking-widest transition-opacity duration-slow sm:text-[0.6rem]",
                isPM ? "text-foreground opacity-90 drop-shadow-sm" : "text-foreground/5",
              )}
            >
              PM
            </div>
          </div>

          <div className="relative z-10 flex h-12 w-full items-center justify-center sm:h-20">
            {/* Hours */}
            <div className="flex h-full w-14 shrink-0 gap-0.5 sm:w-20 sm:gap-1">
              <Digit value={hoursStr[0]} />
              <Digit value={hoursStr[1]} />
            </div>

            <Separator />

            {/* Minutes */}
            <div className="flex h-full w-14 shrink-0 gap-0.5 sm:w-20 sm:gap-1">
              <Digit value={minutesStr[0]} />
              <Digit value={minutesStr[1]} />
            </div>

            <Separator />

            {/* Seconds */}
            <div className="flex h-full w-14 shrink-0 gap-0.5 sm:w-20 sm:gap-1">
              <Digit value={secondsStr[0]} />
              <Digit value={secondsStr[1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
