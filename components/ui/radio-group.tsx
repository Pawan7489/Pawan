'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Circle, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Zap, Lock, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Logic Selector [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  }
>(({ className, meshNode = 'Drive-D', ...props }, ref) => {
  return (
    <div className="relative p-6 rounded-[2rem] glass-panel-strong border border-white/5 bg-black/40 backdrop-blur-3xl group">
      {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
      <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-white/10 shadow-2xl">
        <Activity className="h-3 w-3 text-primary animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-widest text-white/50 font-mono">
          Mesh Status: {meshNode} Active
        </span>
      </div>

      <RadioGroupPrimitive.Root
        className={cn('grid gap-4', className)}
        {...props}
        ref={ref}
      />

      {/* Ghost Module Stub: Placeholder for future RLHF feedback [cite: 2026-02-11] */}
      <div className="hidden" aria-hidden="true">def register_rlhf_selection(): pass</div>
    </div>
  )
})
RadioGroup.displayName = 'NeuralLogicSelector'

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    isDiagnosing?: boolean;
    riskLevel?: 'low' | 'high';
  }
>(({ className, isDiagnosing = false, riskLevel = 'low', ...props }, ref) => {
  return (
    <div className="flex items-center gap-4 group/item">
      <div className="relative flex items-center justify-center">
        {/* Layer 2: Ball-in-Ball Security Ring [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-primary/40"
            />
          )}
        </AnimatePresence>

        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            'aspect-square h-6 w-6 rounded-full border-2 transition-all duration-500 relative overflow-hidden',
            'glass-panel border-white/10 text-primary ring-offset-background',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-20',
            riskLevel === 'high' ? 'data-[state=checked]:border-red-500 shadow-red-500/20' : 'data-[state=checked]:border-primary shadow-primary/20',
            'data-[state=checked]:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center h-full w-full">
            {/* Core Logic Dot [cite: 2026-02-11] */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "h-2.5 w-2.5 rounded-full bg-current",
                riskLevel === 'high' ? "text-red-500" : "text-primary"
              )}
            />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      </div>

      {/* Layer 3: Guardian Protocol Labels [cite: 2026-02-11] */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white/80 uppercase tracking-wider group-hover/item:text-primary transition-colors">
            {props['aria-label'] || 'Neural Mode'}
          </span>
          {riskLevel === 'high' ? (
            <Lock className="h-3 w-3 text-red-500" />
          ) : (
            <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
          )}
        </div>
        {isDiagnosing && (
          <span className="text-[8px] font-mono text-primary animate-pulse flex items-center gap-1 mt-0.5">
            <Cpu className="h-2.5 w-2.5" /> RUNNING_SELF_DIAGNOSIS...
          </span>
        )}
      </div>
    </div>
  )
})
RadioGroupItem.displayName = 'NeuralLogicItem'

export { RadioGroup, RadioGroupItem }
