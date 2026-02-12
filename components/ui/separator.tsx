'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { motion } from 'framer-motion'
import { Activity, ShieldCheck, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Logic Bridge [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Distributed Mesh Status Indicator.
 */

interface NeuralSeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  meshActive?: boolean; // Connection status between nodes [cite: 2026-02-11]
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis Visual [cite: 2026-02-11]
  loadIntensity?: 'low' | 'high'; // Musk Rule: Efficiency monitoring [cite: 2026-02-11]
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  NeuralSeparatorProps
>(
  (
    { className, orientation = 'horizontal', decorative = true, meshActive = true, isDiagnosing = false, loadIntensity = 'low', ...props },
    ref,
  ) => (
    <div className={cn(
      "relative flex items-center justify-center group/bridge",
      orientation === 'horizontal' ? 'w-full py-2' : 'h-full px-2'
    )}>
      {/* Layer 1: The Base Separator (Interface Layer) [cite: 2026-02-11] */}
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 transition-all duration-700',
          orientation === 'horizontal' 
            ? 'h-[1.5px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent' 
            : 'h-full w-[1.5px] bg-gradient-to-b from-transparent via-white/10 to-transparent',
          meshActive && (loadIntensity === 'high' ? 'via-amber-500/40' : 'via-primary/40'),
          className,
        )}
        {...props}
      />

      {/* Layer 2: Neural Data Pulse (Distributed Mesh Flow) [cite: 2026-02-11] */}
      <AnimatePresence>
        {meshActive && !isDiagnosing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "absolute pointer-events-none",
              orientation === 'horizontal' ? "inset-x-0 h-[2px]" : "inset-y-0 w-[2px]"
            )}
          >
            <motion.div
              animate={orientation === 'horizontal' ? { x: ['-100%', '100%'] } : { y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className={cn(
                "absolute rounded-full blur-[2px]",
                orientation === 'horizontal' ? "h-full w-24 bg-gradient-to-r" : "w-full h-24 bg-gradient-to-b",
                loadIntensity === 'high' ? "from-transparent via-amber-400 to-transparent" : "from-transparent via-primary to-transparent"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 3: Self-Diagnosis Scan Visual [cite: 2026-02-11] */}
      {isDiagnosing && (
        <motion.div 
          className={cn(
            "absolute z-10 shadow-[0_0_15px_white]",
            orientation === 'horizontal' ? "h-[1px] w-full bg-primary" : "w-[1px] h-full bg-primary"
          )}
          animate={orientation === 'horizontal' ? { scaleX: [0, 1, 0] } : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* HUD: Logic Bridge Status [cite: 2026-02-11] */}
      <div className={cn(
        "absolute opacity-0 group-hover/bridge:opacity-100 transition-opacity duration-500 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md",
        orientation === 'horizontal' ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2 rotate-90"
      )}>
        <Activity className={cn("h-2.5 w-2.5", loadIntensity === 'high' ? "text-amber-500" : "text-emerald-500")} />
        <span className="text-[7px] font-black uppercase tracking-widest text-white/50 font-mono">
          {loadIntensity === 'high' ? 'Heavy_Load' : 'Logic_Stable'}
        </span>
        <ShieldCheck className="h-2.5 w-2.5 text-primary/40" />
      </div>
    </div>
  ),
)
Separator.displayName = 'NeuralLogicBridge'

// Internal context to handle framer-motion AnimatePresence
import { AnimatePresence } from 'framer-motion'

export { Separator }
