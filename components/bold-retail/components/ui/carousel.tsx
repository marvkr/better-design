"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

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
 * Bold retail Carousel: a shelf of product tiles that slides under two
 * round grey paddles.
 *
 * Slides sit in a row (or a column) with a 1rem gutter. The previous and
 * next paddles are soft grey circles with a black arrow, the same quiet
 * icon button the store uses elsewhere, and they go pale at either end of
 * the shelf. Arrow keys move one slide at a time.
 */
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

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);

      const sync = (current: CarouselApi) => {
        if (!current) return;
        setCanScrollPrev(current.canScrollPrev());
        setCanScrollNext(current.canScrollNext());
      };

      sync(api);
      api.on("reInit", sync).on("select", sync);
      return () => {
        api.off("reInit", sync).off("select", sync);
      };
    }, [api, setApi]);

    const onKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      if (event.key === back) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === forward) {
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
          data-slot="carousel"
          onKeyDownCapture={onKeyDownCapture}
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
    <div
      ref={carouselRef}
      data-slot="carousel-viewport"
      className="overflow-hidden"
    >
      <div
        ref={ref}
        data-slot="carousel-content"
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
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
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/** The paddle: a 2.5rem soft grey circle, placed over the shelf's edge. */
const paddle = "absolute size-10";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant="secondary"
      size="icon"
      data-slot="carousel-previous"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        paddle,
        orientation === "horizontal"
          ? "left-3 top-1/2 -translate-y-1/2"
          : "top-3 left-1/2 -translate-x-1/2",
        className,
      )}
      {...props}
    >
      <Icon
        icon={orientation === "horizontal" ? "mingcute:left-line" : "mingcute:up-line"}
        className="size-5"
        aria-hidden="true"
      />
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant="secondary"
      size="icon"
      data-slot="carousel-next"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        paddle,
        orientation === "horizontal"
          ? "right-3 top-1/2 -translate-y-1/2"
          : "bottom-3 left-1/2 -translate-x-1/2",
        className,
      )}
      {...props}
    >
      <Icon
        icon={orientation === "horizontal" ? "mingcute:right-line" : "mingcute:down-line"}
        className="size-5"
        aria-hidden="true"
      />
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
