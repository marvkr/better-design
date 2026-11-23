"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

/*
 * Plinth Carousel: a filmstrip of shots. The arrows are graphite tool
 * buttons that sit on the strip's edges; the arrow keys of the strip's own
 * axis move it.
 */
const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      const update = () => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }
      update()
      api.on("reInit", update).on("select", update)
      return () => {
        api.off("reInit", update).off("select", update)
      }
    }, [api, setApi])

    const onKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"
      const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown"
      if (event.key === prevKey) {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === nextKey) {
        event.preventDefault()
        scrollNext()
      }
    }

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation, opts, plugins }}
      >
        <div
          ref={ref}
          onKeyDownCapture={onKeyDownCapture}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          data-slot="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()
    return (
      <div ref={carouselRef} className="overflow-hidden rounded-2xl" data-slot="carousel-content">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-3" : "-mt-3 flex-col", className)}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        data-slot="carousel-item"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-3" : "pt-3", className)}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "secondary", size = "icon-sm", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        data-slot="carousel-previous"
        className={cn(
          "absolute rounded-full",
          orientation === "horizontal" ? "left-3 top-1/2 -translate-y-1/2" : "left-1/2 top-3 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ChevronLeftIcon />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "secondary", size = "icon-sm", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        data-slot="carousel-next"
        className={cn(
          "absolute rounded-full",
          orientation === "horizontal" ? "right-3 top-1/2 -translate-y-1/2" : "bottom-3 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ChevronRightIcon />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

// feather:chevron-left
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" />
    </svg>
  )
}

// feather:chevron-right
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18l6-6l-6-6" />
    </svg>
  )
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
