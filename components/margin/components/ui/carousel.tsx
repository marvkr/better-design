"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, pressScale } from "./_shared";

/**
 * Margin Carousel: slides on an Embla track, steered by two small white
 * toolbar pills over the edges. The arrows fade back when there is nothing
 * left to scroll, and the arrow keys move the track.
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

/** The carousel region that owns the track and listens for arrow keys. */
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    if (event.key === prevKey) {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev: () => api?.scrollPrev(),
        scrollNext: () => api?.scrollNext(),
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

/** The clipped viewport and the strip of slides inside it. */
const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden rounded-xl" data-slot="carousel-content">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-3" : "-mt-3 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

/** One slide; it fills the viewport unless you set a basis. */
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
          orientation === "horizontal" ? "pl-3" : "pt-3",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const navButtonStyles = cn(
  "absolute inline-flex size-7.5 items-center justify-center rounded-lg bg-card text-foreground shadow-sm",
  "hover:bg-muted",
  pressScale,
  focusRing,
  "disabled:pointer-events-none disabled:opacity-40",
);

/** The pill that moves the track back one slide. */
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
          ? "left-2.5 top-1/2 -translate-y-1/2"
          : "left-1/2 top-2.5 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Icon icon="solar:alt-arrow-left-linear" className="size-4" aria-hidden />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

/** The pill that moves the track forward one slide. */
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
          ? "right-2.5 top-1/2 -translate-y-1/2"
          : "bottom-2.5 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Icon icon="solar:alt-arrow-right-linear" className="size-4" aria-hidden />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
