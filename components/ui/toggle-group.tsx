'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ShieldCheck, Cpu, Zap, Activity, HardDrive, Lock } from 'lucide-react'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

/**
 * Project A1: Neural Mode Switcher [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Nested Encapsulation).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & { isDiagnosing?: boolean }
>({
  size: 'default',
  variant: 'default',
  isDiagnosing: false,
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & { 
      isDiagnosing?: boolean; 
      meshNode?: 'Node-D' | 'Node-E' | 'Cloud';
    }
>(({ className, variant, size, isDiagnosing = false, meshNode = 'Node-D', children, ...props }, ref) => (
  <div className="relative p-2 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-3xl glass-panel-strong group">
    
    {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
    <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-white/10 shadow-2xl transition-all group-hover:border-primary/50">
      <Activity className="h-3 w-3 text-primary animate-pulse" />
      <span className="text-[8px] font-black uppercase tracking-widest text-white/50 font-mono">
        Neural_Path: {meshNode} [cite: 2026-02-11]
      </span>
    </div>

    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, isDiagnosing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>

    {/* Layer 2: Internal Critique Progress [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-10 pointer-events-none rounded-[inherit] border border-primary/20 bg-primary/[0.02]"
        >
          <motion.div 
            className="h-full w-2 bg-primary/20 blur-xl"
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> & { isCritical?: boolean }
>(({ className, children, variant, size, isCritical = false, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'relative overflow-hidden transition-all duration-500 rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-tighter',
        'data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
        'hover:bg-white/5 active:scale-95',
        className
      )}
      {...props}
    >
      {/* Ghost Module Stub for future Voice Intent [cite: 2026-02-11] */}
      <div className="flex items-center gap-2 relative z-20">
        {context.isDiagnosing ? (
          <Cpu className="h-3 w-3 animate-spin" />
        ) : (
          isCritical ? <Lock className="h-3 w-3 text-amber-500/50" /> : <Zap className="h-3 w-3 opacity-50" />
        )}
        {children}
      </div>

      {/* Internal Animation Layer (Musk Rule Efficiency) [cite: 2026-02-11] */}
      <AnimatePresence>
        {props['data-state'] === 'on' && (
          <motion.div
            layoutId="neural-switch-glow"
            className="absolute inset-0 bg-primary/5 border border-primary/20 rounded-[inherit]"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </ToggleGroupPrimitive.Item>
  )
})

export { ToggleGroup, ToggleGroupItem }
      
