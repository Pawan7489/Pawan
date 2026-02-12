'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, Activity, ShieldCheck, 
  Brain, HardDrive, Zap, Info 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Memory Stream [cite: 2026-02-11]
 * Rule: Onion Architecture (Nested Encapsulation).
 * Rule: Distributed Mesh Connectivity.
 */

interface NeuralScrollProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis visual [cite: 2026-02-11]
  showTelemetry?: boolean;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  NeuralScrollProps
>(({ className, children, meshNode = 'Drive-D', isDiagnosing = false, showTelemetry = true, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden group/scroll glass-panel-strong rounded-3xl border border-white/5 bg-black/20', className)}
    {...props}
  >
    {/* Layer 1: Neural HUD Overlay [cite: 2026-02-11] */}
    {showTelemetry && (
      <div className="absolute top-2 right-4 z-30 flex items-center gap-3 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Activity className="h-2.5 w-2.5 text-primary animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest text-white/40 font-mono">
            Stream Node: {meshNode}
          </span>
        </div>
        <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
      </div>
    )}

    {/* Layer 2: Self-Diagnosis Loading Scan [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <Cpu className="h-6 w-6 text-primary animate-spin" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] animate-pulse">
              Analysing Memory Blocks...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] relative z-10">
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />

    {/* Ghost Module stub for future Neural Relevance Sorting [cite: 2026-02-11] */}
    <div className="hidden">def calculate_stream_relevance(): pass</div>
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = "NeuralScrollArea"

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-all duration-300 p-0.5',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-white/5 hover:bg-white/5',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-white/5 hover:bg-white/5',
      className
    )}
    {...props}
  >
    {/* Musk Rule: High Efficiency Thumb Design [cite: 2026-02-11] */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-white/10 transition-colors hover:bg-primary/40 active:bg-primary">
      <div className="absolute inset-0 rounded-full blur-[2px] bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </ScrollAreaPrimitive.Thumb>
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = "NeuralScrollBar"

export { ScrollArea, ScrollBar }
      
