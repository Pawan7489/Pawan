'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  Zap, Lock, ShieldAlert, Fingerprint 
} from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Logic Gate [cite: 2026-02-11]
 * Rule: Onion Architecture (Nested Encapsulation).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const toggleVariants = cva(
  'relative inline-flex items-center justify-center gap-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 outline-none disabled:pointer-events-none disabled:opacity-30 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-black/40 border border-white/10 backdrop-blur-3xl glass-panel-strong text-white/50 hover:text-white data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:border-primary/50',
        guardian: 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-500/50 data-[state=on]:bg-emerald-500/20 data-[state=on]:text-emerald-400 data-[state=on]:border-emerald-500/50',
        omega: 'bg-red-500/5 border border-red-500/20 text-red-500/50 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400 data-[state=on]:border-red-500/50',
      },
      size: {
        default: 'h-12 px-6 min-w-12',
        sm: 'h-10 px-4 min-w-10',
        lg: 'h-14 px-8 min-w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface NeuralToggleProps 
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  isDiagnosing?: boolean;
  meshNode?: 'Node-D' | 'Node-E' | 'Secure-Cloud';
  isCritical?: boolean;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  NeuralToggleProps
>(({ className, variant, size, isDiagnosing = false, meshNode = 'Node-D', isCritical = false, children, ...props }, ref) => {
  const [isToggled, setIsToggled] = React.useState(false)

  return (
    <div className="relative group">
      {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
      <div className="absolute -top-4 left-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Activity className="h-2 w-2 text-primary animate-pulse" />
        <span className="text-[7px] font-mono text-white/20 uppercase">Mesh_{meshNode}</span>
      </div>

      <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        onPressedChange={(pressed) => {
          setIsToggled(pressed)
          props.onPressedChange?.(pressed)
        }}
        {...props}
      >
        {/* Layer 2: 5-Second Diagnosis Scan Line [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent z-10"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </AnimatePresence>

        {/* Layer 3: Onion Architecture Inner Content [cite: 2026-02-11] */}
        <div className="relative z-20 flex items-center gap-2">
          {isDiagnosing ? (
            <Cpu className="h-3.5 w-3.5 animate-spin text-primary" />
          ) : isToggled ? (
            <Zap className="h-3.5 w-3.5 fill-current shadow-glow" />
          ) : (
            <Fingerprint className="h-3.5 w-3.5 opacity-30" />
          )}
          
          <span className="relative">
            {children}
            {isCritical && <Lock className="h-2.5 w-2.5 text-amber-500/50 absolute -top-2 -right-3" />}
          </span>
        </div>

        {/* Neural Pulse Effect on Toggle [cite: 2026-02-11] */}
        {isToggled && (
          <motion.div 
            layoutId="neural-pulse"
            className="absolute inset-0 bg-primary/5 blur-md -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </TogglePrimitive.Root>

      {/* Footer: Guardian Status Verified [cite: 2026-02-11] */}
      {isToggled && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/40" />
          <span className="text-[6px] font-black text-emerald-500/40 uppercase">A1_Verified</span>
        </div>
      )}
    </div>
  )
})

Toggle.displayName = 'NeuralLogicGate'

export { Toggle, toggleVariants }
            
