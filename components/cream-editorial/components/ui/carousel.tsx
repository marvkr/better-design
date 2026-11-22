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
 * Cream editorial Carousel: slides that turn like pages under two quiet
 * controls.
 *
 * Slides sit in a row (or a column) with a 1rem gutter. The previous and
 * next controls are small circles of the lightest paper behind a hairline
 * ring, so they read over a photo or an oat card, and they go quiet at
 * either end. Arrow keys move one slide at a time.
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

/**
 * A small circle of the lightest paper that reads over imagery and oat
 * cards. The Button supplies the focus ring and the disabled state.
 */
const controlDisc =
  "absolute size-9 rounded-full bg-popover text-foreground shadow-(--shadow-menu) hover:bg-secondary active:bg-muted";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant="secondary"
      size="icon-sm"
      data-slot="carousel-previous"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        controlDisc,
        orientation === "horizontal"
          ? "left-3 top-1/2 -translate-y-1/2"
          : "top-3 left-1/2 -translate-x-1/2",
        className,
      )}
      {...props}
    >
      <Icon
        icon={orientation === "horizontal" ? "ph:caret-left" : "ph:caret-up"}
        className="size-4"
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
      size="icon-sm"
      data-slot="carousel-next"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        controlDisc,
        orientation === "horizontal"
          ? "right-3 top-1/2 -translate-y-1/2"
          : "bottom-3 left-1/2 -translate-x-1/2",
        className,
      )}
      {...props}
    >
      <Icon
        icon={orientation === "horizontal" ? "ph:caret-right" : "ph:caret-down"}
        className="size-4"
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
