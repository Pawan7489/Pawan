'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Lock, Thermometer 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Parameter Tuner [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Integration.
 */

interface NeuralSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud'
  isDiagnosing?: boolean
  riskLevel?: 'low' | 'high'
  label?: string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  NeuralSliderProps
>(({ className, meshNode = 'Drive-D', isDiagnosing = false, riskLevel = 'low', label = 'Neural Gain', ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(props.defaultValue?.[0] || props.value?.[0] || 0)

  return (
    <div className="w-full space-y-4 p-6 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-3xl glass-panel-strong group">
      
      {/* Layer 1: Neural HUD (Distributed Mesh Tracking) [cite: 2026-02-11] */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full animate-pulse shadow-[0_0_8px]",
            isDiagnosing ? "bg-amber-500 shadow-amber-500" : "bg-primary shadow-primary"
          )} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">
            {isDiagnosing ? 'DIAGNOSING_NODE...' : `${label}: ${currentValue}%`}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
            <HardDrive className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="text-[8px] font-mono text-muted-foreground uppercase">{meshNode}</span>
          </div>
          {riskLevel === 'high' ? (
            <Lock className="h-3 w-3 text-red-500 animate-bounce" />
          ) : (
            <ShieldCheck className="h-3 w-3 text-emerald-500/60" />
          )}
        </div>
      </div>

      {/* Layer 2: Ball-in-Ball Slider Core [cite: 2026-02-11] */}
      <div className="relative flex items-center">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            isDiagnosing && "opacity-50 blur-[1px] pointer-events-none",
            className
          )}
          onValueChange={(val) => setCurrentValue(val[0])}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/5 border border-white/5">
            {/* The Range (Glowing Logic Path) */}
            <SliderPrimitive.Range className={cn(
              "absolute h-full transition-colors duration-500",
              riskLevel === 'high' ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            )} />
            
            {/* 5-Second Self-Diagnosis Scan [cite: 2026-02-11] */}
            <AnimatePresence>
              {isDiagnosing && (
                <motion.div 
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </SliderPrimitive.Track>

          {/* Neural Pulse Thumb */}
          <SliderPrimitive.Thumb className={cn(
            "block h-6 w-6 rounded-full border-2 transition-all duration-300 cursor-pointer active:scale-125 focus:outline-none",
            "bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)]",
            riskLevel === 'high' ? "border-red-500" : "border-primary"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className={cn("h-2.5 w-2.5", riskLevel === 'high' ? "text-red-500" : "text-primary")} />
            </div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>

      {/* Layer 3: Telemetry Data Footer [cite: 2026-02-11] */}
      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[8px] font-mono text-white/20">
            <Cpu className="h-2.5 w-2.5" /> LOGIC_STABLE
          </span>
          <span className="flex items-center gap-1 text-[8px] font-mono text-white/20">
            <Activity className="h-2.5 w-2.5" /> SYNC_LATENCY: 1ms
          </span>
        </div>
        <div className="text-[8px] font-black uppercase text-primary/40 tracking-widest">
          A1 Neural Tuning Active
        </div>
      </div>
    </div>
  )
})
Slider.displayName = 'NeuralParameterTuner'

export { Slider }
