'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, Info 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Insight Fragment [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis HUD.
 */

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

interface NeuralTooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  isDiagnosing?: boolean; // 5-Second Diagnosis Hook [cite: 2026-02-11]
  isVerified?: boolean; // Guardian Protocol Verified
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  NeuralTooltipProps
>(({ className, sideOffset = 8, meshNode = 'Drive-D', isDiagnosing = false, isVerified = true, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/80 px-0 py-0 text-xs text-white shadow-2xl backdrop-blur-3xl glass-panel-strong',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      className
    )}
    {...props}
  >
    {/* Layer 1: Security Encapsulation (Onion Architecture) [cite: 2026-02-11] */}
    <div className="relative p-3 flex flex-col gap-2 min-w-[180px]">
      
      {/* Layer 2: Distributed Mesh HUD Telemetry [cite: 2026-02-11] */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 px-1">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Node_{meshNode}</span>
        </div>
        {isVerified && <ShieldCheck className="h-3 w-3 text-emerald-500/50" />}
      </div>

      {/* Layer 3: Self-Diagnosis Scan Visual [cite: 2026-02-11] */}
      <AnimatePresence>
        {isDiagnosing && (
          <motion.div 
            initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-[1.5px] bg-primary shadow-[0_0_10px_#3b82f6]"
            transition={{ duration: 5 }} // Musk Rule: Efficiency in Visual Diagnosis
          />
        )}
      </AnimatePresence>

      <div className="px-1 py-1 leading-relaxed text-white/80">
        {isDiagnosing ? (
          <div className="flex items-center gap-2">
            <Cpu className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[9px] font-mono uppercase text-primary animate-pulse">Running Diagnosis...</span>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Footer: Internal Critique Branding [cite: 2026-02-11] */}
      <div className="mt-1 flex items-center justify-between opacity-20 hover:opacity-50 transition-opacity px-1">
        <span className="text-[7px] font-black uppercase tracking-tighter italic">Neural_A1_Insight</span>
        <Zap className="h-2.5 w-2.5" />
      </div>
    </div>

    {/* Ghost Module Protocol: Hidden stub for Voice feedback [cite: 2026-02-11] */}
    <div className="hidden">def trigger_neural_voice_overlay(): pass</div>
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = 'NeuralInsightFragment'

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
                      
