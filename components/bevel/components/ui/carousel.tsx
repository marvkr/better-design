"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { IconButton } from "./icon-button"

/*
 * Bevel Carousel.
 *
 * Slides scroll with Embla and the arrow keys. The two nav controls are the
 * system's circular icon button at its 38px step: the card surface, six pixels
 * of inset highlight and a soft drop, never a bordered circle. They sit inside
 * the frame so a slide keeps its full width on a phone.
 */

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
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      const update = () => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }
      api.on("reInit", update).on("select", update)
      update()
    }, [api, setApi])

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
          onKeyDownCapture={(e) => {
            const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"
            const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown"
            if (e.key === prevKey) {
              e.preventDefault()
              api?.scrollPrev()
            } else if (e.key === nextKey) {
              e.preventDefault()
              api?.scrollNext()
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
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden rounded-[1.25rem]">
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
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
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
  )
})
CarouselItem.displayName = "CarouselItem"

/* The nav control is the system's 38px circular icon button. */
/* The nav controls are the system's own 38px circular icon button, placed over
   the track. Only the placement is local; the surface comes from IconButton. */
const navButtonPlacement = "absolute top-1/2 -translate-y-1/2 disabled:opacity-40"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <IconButton
      ref={ref}
      size="sm"
      aria-label="Previous slide"
      className={cn(navButtonPlacement, "left-3", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Icon icon="solar:alt-arrow-left-linear" />
    </IconButton>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <IconButton
      ref={ref}
      size="sm"
      aria-label="Next slide"
      className={cn(navButtonPlacement, "right-3", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Icon icon="solar:alt-arrow-right-linear" />
    </IconButton>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
