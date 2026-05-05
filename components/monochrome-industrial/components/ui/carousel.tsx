"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

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
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
 const [carouselRef, api] = useEmblaCarousel(
 { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
 plugins
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
 if (e.key === "ArrowLeft") api?.scrollPrev()
 if (e.key === "ArrowRight") api?.scrollNext()
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
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
 ({ className, ...props }, ref) => {
 const { carouselRef, orientation } = useCarousel()
 return (
 <div ref={carouselRef} className="overflow-hidden">
 <div
 ref={ref}
 className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
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
 className={cn(
 "min-w-0 shrink-0 grow-0 basis-full",
 orientation === "horizontal" ? "pl-4" : "pt-4",
 className
 )}
 {...props}
 />
 )
 }
)
CarouselItem.displayName = "CarouselItem"

const navButtonStyles =
 "absolute top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full " +
 "bg-popover text-foreground border border-border " +
 " " +
 "transition-[background-color,box-shadow,color,transform] duration-150 " +
 "hover:bg-accent hover: " +
 "active:translate-y-px active: " +
 "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 " +
 "disabled:opacity-40 disabled:pointer-events-none"

const CarouselPrevious = React.forwardRef<
 HTMLButtonElement,
 React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
 const { scrollPrev, canScrollPrev } = useCarousel()
 return (
 <button
 ref={ref}
 className={cn(navButtonStyles, "left-3 -translate-y-1/2", className)}
 disabled={!canScrollPrev}
 onClick={scrollPrev}
 {...props}
 >
 <Icon icon="tabler:chevron-left" className="h-4 w-4" />
 <span className="sr-only">Previous slide</span>
 </button>
 )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
 HTMLButtonElement,
 React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
 const { scrollNext, canScrollNext } = useCarousel()
 return (
 <button
 ref={ref}
 className={cn(navButtonStyles, "right-3 -translate-y-1/2", className)}
 disabled={!canScrollNext}
 onClick={scrollNext}
 {...props}
 >
 <Icon icon="tabler:chevron-right" className="h-4 w-4" />
 <span className="sr-only">Next slide</span>
 </button>
 )
})
CarouselNext.displayName = "CarouselNext"

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
