"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton, type IconButtonProps } from "./icon-button";

/*
 * Interior Carousel: panels on a track, steered by two caps.
 *
 * The track is not a material. It adds no surface, so a slide keeps the
 * panel or the well it already is. The two controls are caps, the same key
 * as the secondary Button at the icon footprint: a bottom lip, a hairline all
 * round, a 1px press. A vertical carousel swaps the glyph and never turns the
 * key, because a turned cap would carry its lip on the side. A cap is centred
 * with auto margins, not a transform, so the press keeps its 1px travel.
 *
 * Arrow keys follow the axis, and a handled key never scrolls the page.
 * Under reduced motion a slide jumps into place.
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

/**
 * True when the person asked the system for less motion. A click or a key
 * calls it at the moment of the move, so the window is always there.
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const scrollPrev = React.useCallback(
      () => api?.scrollPrev(prefersReducedMotion()),
      [api],
    );
    const scrollNext = React.useCallback(
      () => api?.scrollNext(prefersReducedMotion()),
      [api],
    );

    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);

      const readEnds = () => {
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
      };

      readEnds();
      api.on("reInit", readEnds).on("select", readEnds);
      return () => {
        api.off("reInit", readEnds).off("select", readEnds);
      };
    }, [api, setApi]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          plugins,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-3" : "-mt-3 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-3" : "pt-3",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/** A cap takes its label from the carousel, so a caller may leave it out. */
type CarouselCapProps = Omit<IconButtonProps, "aria-label"> & {
  "aria-label"?: string;
};

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselCapProps>(
  ({ className, variant = "secondary", size = "sm", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    const Glyph = orientation === "horizontal" ? ChevronLeft : ChevronUp;

    return (
      <IconButton
        ref={ref}
        variant={variant}
        size={size}
        aria-label="Previous slide"
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "inset-y-0 -left-10 my-auto"
            : "inset-x-0 -top-10 mx-auto",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <Glyph strokeWidth={1.5} />
      </IconButton>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselCapProps>(
  ({ className, variant = "secondary", size = "sm", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    const Glyph = orientation === "horizontal" ? ChevronRight : ChevronDown;

    return (
      <IconButton
        ref={ref}
        variant={variant}
        size={size}
        aria-label="Next slide"
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "inset-y-0 -right-10 my-auto"
            : "inset-x-0 -bottom-10 mx-auto",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <Glyph strokeWidth={1.5} />
      </IconButton>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
