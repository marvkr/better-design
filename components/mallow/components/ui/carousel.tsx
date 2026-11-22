"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, selectedLift } from "./_shared";

/**
 * Mallow Carousel: slides on an Embla track inside a 0.875rem frame, steered
 * by two round violet-ringed buttons over the edges. The buttons dim when there is
 * nothing left to scroll, and slides jump instead of gliding under reduced
 * motion.
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
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  const reduceMotion = useReducedMotion() ?? false;
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    setApi?.(api);
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("reInit", update).on("select", update);
    update();
    return () => {
      api.off("reInit", update).off("select", update);
    };
  }, [api, setApi]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(reduceMotion), [api, reduceMotion]);
  const scrollNext = React.useCallback(() => api?.scrollNext(reduceMotion), [api, reduceMotion]);

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
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
        opts,
        plugins,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden rounded-2xl" data-slot="carousel-content">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        data-slot="carousel-item"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "ps-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const navButtonStyles = cn(
  selectedLift,
  "absolute inline-flex size-10 items-center justify-center rounded-full",
  pressScale,
  focusRing,
  "disabled:pointer-events-none disabled:opacity-40",
);

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();
  return (
    <button
      ref={ref}
      type="button"
      data-slot="carousel-previous"
      className={cn(
        navButtonStyles,
        orientation === "horizontal"
          ? "left-3 top-1/2 -translate-y-1/2"
          : "left-1/2 top-3 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Icon icon="iconoir:nav-arrow-left" aria-hidden="true" className="size-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext, orientation } = useCarousel();
  return (
    <button
      ref={ref}
      type="button"
      data-slot="carousel-next"
      className={cn(
        navButtonStyles,
        orientation === "horizontal"
          ? "right-3 top-1/2 -translate-y-1/2"
          : "bottom-3 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Icon icon="iconoir:nav-arrow-right" aria-hidden="true" className="size-4" />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
