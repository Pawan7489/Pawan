'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GripVertical, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Zap, Lock, Maximize2 
} from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Grid Resizer [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const ResizablePanelGroup = ({
  className,
  meshNode = 'Drive-D', // Mesh Source [cite: 2026-02-11]
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup> & { meshNode?: string }) => (
  <div className="relative h-full w-full group/grid">
    {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
    <div className="absolute -top-6 left-2 flex items-center gap-3 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500 z-50">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md">
        <Activity className="h-2.5 w-2.5 text-primary animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest text-white/40 font-mono">
          Grid Sync: {meshNode} [cite: 2026-02-11]
        </span>
      </div>
      <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-500/50 uppercase">
        <ShieldCheck className="h-2.5 w-2.5" /> Guardian Verified
      </div>
    </div>

    <ResizablePrimitive.PanelGroup
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col rounded-3xl overflow-hidden border border-white/5 bg-black/20 backdrop-blur-3xl glass-panel-strong',
        className
      )}
      {...props}
    />
  </div>
)

const ResizablePanel = React.forwardRef<
  ResizablePrimitive.ImperativePanelHandle,
  React.ComponentProps<typeof ResizablePrimitive.Panel> & { moduleName?: string }
>(({ children, moduleName = "Core-Module", ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    className="relative group/panel"
    {...props}
  >
    {/* Internal Critique Visualization [cite: 2026-02-11] */}
    <div className="absolute top-3 right-3 z-20 flex items-center gap-2 opacity-0 group-hover/panel:opacity-100 transition-all">
      <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter italic">
        {moduleName} Status: Optimized [cite: 2026-02-11]
      </span>
      <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
    </div>

    <div className="h-full w-full p-1">
      <div className="h-full w-full rounded-[1.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
        {children}
      </div>
    </div>
  </ResizablePrimitive.Panel>
))
ResizablePanel.displayName = 'NeuralPanel'

const ResizableHandle = ({
  withHandle,
  isDiagnosing = false, // 5-Second Self-Diagnosis [cite: 2026-02-11]
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
  isDiagnosing?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-2 items-center justify-center transition-all duration-300',
      'hover:bg-primary/10 data-[panel-group-direction=vertical]:h-2 data-[panel-group-direction=vertical]:w-full',
      className
    )}
    {...props}
  >
    {/* Layer 2: Self-Diagnosis Pulse [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-primary/5 animate-pulse"
        />
      )}
    </AnimatePresence>

    {withHandle && (
      <div className="z-10 flex h-8 w-5 items-center justify-center rounded-full border border-white/10 bg-black/80 shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
        <div className="flex flex-col gap-0.5">
          <motion.div 
            animate={isDiagnosing ? { scaleY: [1, 1.5, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-3 w-0.5 bg-primary/50 rounded-full" 
          />
          <GripVertical className="h-2.5 w-2.5 text-primary" />
        </div>
      </div>
    )}

    {/* Intent over Syntax Hub: Resizer Label [cite: 2026-02-11] */}
    <div className="absolute top-1/2 -translate-y-1/2 left-4 hidden group-hover:block pointer-events-none">
      <span className="text-[6px] font-black text-primary/30 uppercase vertical-text">Logic_Resizer</span>
    </div>
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
