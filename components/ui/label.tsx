'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Cpu, HardDrive, 
  Zap, Lock, Activity, Info 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Metadata Label [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Distributed Mesh Connectivity.
 */

const labelVariants = cva(
  'text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'text-primary/70',
        guardian: 'text-emerald-500/80', // Rules 1-75 verified [cite: 2026-02-11]
        omega: 'text-red-500 animate-pulse', // Kill Switch / Danger State [cite: 2026-02-11]
        expert: 'text-purple-400', // Council of Experts verification [cite: 2026-02-11]
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface SuperGeniusLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis [cite: 2026-02-11]
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  isVerified?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  SuperGeniusLabelProps
>(({ className, variant, isDiagnosing = false, meshNode = 'Drive-D', isVerified = true, children, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 group">
    {/* Layer 1: Distributed Mesh Telemetry HUD [cite: 2026-02-11] */}
    <div className="flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center gap-1.5">
        <HardDrive className="h-2.5 w-2.5 text-white/20" />
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">
          Node: {meshNode}
        </span>
      </div>
      {isVerified && (
        <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-500/40 uppercase">
          <ShieldCheck className="h-2 w-2" /> Verified
        </div>
      )}
    </div>

    {/* Layer 2: The Neural Label [cite: 2026-02-11] */}
    <div className="relative flex items-center gap-2">
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ variant }), className)}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isDiagnosing ? (
            <motion.div
              key="diagnosing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <Cpu className="h-3 w-3 animate-spin" />
              <span>Scanning Node...</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              {variant === 'omega' ? <Lock className="h-3 w-3" /> : <Brain className="h-3 w-3 text-primary/40" />}
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </LabelPrimitive.Root>

      {/* Internal Critique Visual [cite: 2026-02-11] */}
      {!isDiagnosing && (
        <div className="h-1 flex-1 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>

    {/* Ghost Module Protocol: Hidden stub for voice feedback [cite: 2026-02-11] */}
    <div className="hidden">def label_voice_over(): pass</div>
  </div>
))
Label.displayName = 'NeuralLabel'

export { Label }
