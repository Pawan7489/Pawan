'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Brain, 
  Cpu, Activity, HardDrive, Zap 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Mesh Engine [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Nested Encapsulation).
 * Rule: Distributed Mesh Connectivity.
 */

type CarouselApi = UseEmblaCarouselType[1]
type CarouselProps = {
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  isDiagnosing?: boolean // 5-Second Self-Diagnosis Rule [cite: 2026-02-11]
}

const CarouselContext = React.createContext<any>(null)

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = 'horizontal', setApi, isDiagnosing = false, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({
      axis: orientation === 'horizontal' ? 'x' : 'y',
    })

    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [activeNode, setActiveNode] = React.useState<string>("Mesh-Alpha")

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      // Simulate switching between Mesh Nodes (D/E/Cloud) [cite: 2026-02-11]
      const nodes = ["Drive-D", "Drive-E", "Secure-Cloud"]
      setActiveNode(nodes[api.selectedScrollSnap() % nodes.length])
    }, [])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on('select', onSelect)
      if (setApi) setApi(api)
    }, [api, onSelect, setApi])

    return (
      <CarouselContext.Provider value={{ carouselRef, api, orientation, canScrollPrev, canScrollNext, activeNode }}>
        <div
          ref={ref}
          className={cn('relative group', className)}
          role="region"
          {...props}
        >
          {/* Top HUD: Neural Status [cite: 2026-02-11] */}
          <div className="absolute -top-10 inset-x-0 flex justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">
                Node: {activeNode}
              </span>
            </div>
            {isDiagnosing && (
              <div className="flex items-center gap-2 text-[10px] text-primary font-mono animate-pulse">
                <Cpu className="h-3 w-3" /> ANALYZING_BUFFER...
              </div>
            )}
          </div>

          <div className="glass-panel-strong rounded-[2.5rem] border border-white/5 overflow-hidden p-1 shadow-2xl">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  },
)

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = React.useContext(CarouselContext)
    return (
      <div ref={carouselRef} className="overflow-hidden rounded-[2.2rem]">
        <div
          ref={ref}
          className={cn('flex', orientation === 'horizontal' ? '-ml-2' : '-mt-2 flex-col', className)}
          {...props}
        />
      </div>
    )
  },
)

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { isVerified?: boolean }>(
  ({ className, isVerified = true, ...props }, ref) => {
    const { orientation } = React.useContext(CarouselContext)
    return (
      <div
        ref={ref}
        className={cn('min-w-0 shrink-0 grow-0 basis-full relative', orientation === 'horizontal' ? 'pl-2' : 'pt-2', className)}
        {...props}
      >
        {/* Internal Critique Badge [cite: 2026-02-11] */}
        {isVerified && (
          <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-emerald-500/20 backdrop-blur-xl">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            <span className="text-[8px] font-bold text-emerald-500 uppercase">Guardian Verified</span>
          </div>
        )}
        <div className="h-full w-full rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02]">
          {props.children}
        </div>
      </div>
    )
  },
)

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof motion.button>>(
  ({ className, ...props }, ref) => {
    const { orientation, api, canScrollPrev } = React.useContext(CarouselContext)
    return (
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        disabled={!canScrollPrev}
        onClick={() => api?.scrollPrev()}
        className={cn(
          'absolute z-30 h-12 w-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white transition-all hover:bg-primary/20 disabled:opacity-20 shadow-xl',
          orientation === 'horizontal' ? '-left-6 top-1/2 -translate-y-1/2' : '-top-6 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
      >
        <ArrowLeft className="h-5 w-5" />
      </motion.button>
    )
  },
)

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof motion.button>>(
  ({ className, ...props }, ref) => {
    const { orientation, api, canScrollNext } = React.useContext(CarouselContext)
    return (
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        disabled={!canScrollNext}
        onClick={() => api?.scrollNext()}
        className={cn(
          'absolute z-30 h-12 w-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white transition-all hover:bg-primary/20 disabled:opacity-20 shadow-xl',
          orientation === 'horizontal' ? '-right-6 top-1/2 -translate-y-1/2' : '-bottom-6 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
      >
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    )
  },
)

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
