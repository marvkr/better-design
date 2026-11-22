"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "./icon-button";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    opts?: CarouselOptions;
    setApi?: (api: CarouselApi) => void;
  }
>(({ opts, setApi, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(opts);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((instance: CarouselApi) => {
    if (!instance) return;
    setCanScrollPrev(instance.canScrollPrev());
    setCanScrollNext(instance.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  React.useEffect(() => {
    if (!api) return;
    setApi?.(api);
    onSelect(api);
    api.on("reInit", onSelect).on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={(e) => {
          const prevKey = opts?.axis === "y" ? "ArrowUp" : "ArrowLeft";
          const nextKey = opts?.axis === "y" ? "ArrowDown" : "ArrowRight";
          if (e.key === prevKey) {
            e.preventDefault();
            scrollPrev();
          } else if (e.key === nextKey) {
            e.preventDefault();
            scrollNext();
          }
        }}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("-ml-4 flex", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof IconButton>, "aria-label"> & { "aria-label"?: string }
>(({ className, "aria-label": ariaLabel = "Previous slide", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <IconButton
      ref={ref}
      aria-label={ariaLabel}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn("absolute -left-4 top-1/2 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowLeft />
    </IconButton>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof IconButton>, "aria-label"> & { "aria-label"?: string }
>(({ className, "aria-label": ariaLabel = "Next slide", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <IconButton
      ref={ref}
      aria-label={ariaLabel}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn("absolute -right-4 top-1/2 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowRight />
    </IconButton>
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
