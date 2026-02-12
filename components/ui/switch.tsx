'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Lock, ShieldAlert 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Gate Toggle [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

interface NeuralSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud'
  isDiagnosing?: boolean // 5-Second Diagnosis Hook
  isCritical?: boolean // Guardian Protocol Check
  label?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  NeuralSwitchProps
>(({ className, meshNode = 'Drive-D', isDiagnosing = false, isCritical = false, label, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.defaultChecked || false)

  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-3xl glass-panel-strong group">
      {/* Layer 1: Neural Status HUD [cite: 2026-02-11] */}
      <div className="flex flex-col gap-0.5 min-w-[80px]">
        <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-white/30">
          <Activity className="h-2.5 w-2.5" /> {meshNode}
        </div>
        <span className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
          {label || (checked ? 'Core_Active' : 'Core_Idle')}
        </span>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Layer 2: 5-Second Self-Diagnosis Ring [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-primary/40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <SwitchPrimitives.Root
          className={cn(
            'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-20',
            'data-[state=checked]:bg-primary/20 data-[state=unchecked]:bg-white/5',
            checked && (isCritical ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'),
            className
          )}
          onCheckedChange={(val) => {
            setChecked(val)
            props.onCheckedChange?.(val)
          }}
          {...props}
          ref={ref}
        >
          {/* Layer 3: Ball-in-Ball Thumb Logic [cite: 2026-02-11] */}
          <SwitchPrimitives.Thumb
            className={cn(
              'pointer-events-none flex h-5 w-5 items-center justify-center rounded-full shadow-lg ring-0 transition-all duration-500',
              'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
              checked 
                ? (isCritical ? 'bg-red-500 shadow-red-500/50' : 'bg-primary shadow-primary/50') 
                : 'bg-white/20'
            )}
          >
            {checked ? (
              isCritical ? <ShieldAlert className="h-3 w-3 text-white" /> : <Zap className="h-3 w-3 text-white" />
            ) : (
              <Brain className="h-3 w-3 text-white/40" />
            )}
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
      </div>

      {/* Layer 4: Guardian Protocol Status [cite: 2026-02-11] */}
      <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
        {isCritical ? (
          <div className="flex items-center gap-1 text-[8px] font-black text-red-500 uppercase tracking-tighter">
            <Lock className="h-2.5 w-2.5" /> High_Risk
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-tighter">
            <ShieldCheck className="h-2.5 w-2.5" /> Verified
          </div>
        )}
        <span className="text-[7px] font-mono text-white/20">v2.5_NODE_SYNC</span>
      </div>

      {/* Ghost Module stub for future Neural Intent [cite: 2026-02-11] */}
      <div className="hidden" aria-hidden="true">def trigger_intent_toggle(): pass</div>
    </div>
  )
})
Switch.displayName = 'NeuralGateToggle'

export { Switch }
