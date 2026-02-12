'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Sync Monitor [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

interface NeuralProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  isDiagnosing?: boolean; // 5-Second Diagnosis Hook
  statusLabel?: string;
  isSafe?: boolean; // Guardian Protocol Check
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  NeuralProgressProps
>(({ className, value, meshNode = 'Drive-D', isDiagnosing = false, statusLabel, isSafe = true, ...props }, ref) => {
  
  // Rule: Musk Rule (Efficiency) - Using Framer Motion for zero-lag neural pulse
  return (
    <div className="w-full space-y-3 p-4 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-3xl glass-panel-strong group">
      
      {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full animate-pulse shadow-[0_0_8px]",
            isDiagnosing ? "bg-amber-500 shadow-amber-500" : "bg-primary shadow-primary"
          )} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">
            {isDiagnosing ? 'DIAGNOSING_SYSTEM...' : statusLabel || 'NEURAL_SYNC_ACTIVE'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
            <HardDrive className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="text-[8px] font-mono text-muted-foreground uppercase">{meshNode}</span>
          </div>
          {isSafe ? (
            <ShieldCheck className="h-3 w-3 text-emerald-500/60" />
          ) : (
            <AlertCircle className="h-3 w-3 text-red-500 animate-bounce" />
          )}
        </div>
      </div>

      {/* Layer 2: Ball-in-Ball Progress Core [cite: 2026-02-11] */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('h-full w-full flex-1', className)}
          {...props}
        >
          {/* Main Progress Indicator */}
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full flex-1 transition-all duration-1000 ease-in-out relative",
              isDiagnosing ? "bg-gradient-to-r from-amber-500 to-orange-600" : "bg-primary"
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          >
            {/* Neural Pulse Overlay */}
            <motion.div 
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>

        {/* 5-Second Self-Diagnosis Scan [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div 
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Layer 3: Telemetry Data Footer [cite: 2026-02-11] */}
      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[8px] font-mono text-white/20">
            <Cpu className="h-2.5 w-2.5" /> GPU_LOAD: OPTIMIZED
          </span>
          <span className="flex items-center gap-1 text-[8px] font-mono text-white/20">
            <Activity className="h-2.5 w-2.5" /> LATENCY: 2ms
          </span>
        </div>
        <span className="text-[10px] font-black font-mono text-primary/80">{value || 0}%</span>
      </div>

      {/* Ghost Module stub for future Neural Analytics [cite: 2026-02-11] */}
      <div className="hidden">def calculate_predictive_completion(): pass</div>
    </div>
  )
})
Progress.displayName = 'NeuralSyncMonitor'

export { Progress }
