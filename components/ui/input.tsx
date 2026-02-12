'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, Search, Terminal 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Intent Input [cite: 2026-02-11]
 * Rule: Intent over Syntax (Hinglish Logic).
 * Rule: 5-Second Self-Diagnosis Integration.
 */

export interface NeuralInputProps extends React.ComponentProps<'input'> {
  isDiagnosing?: boolean;
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  intentActive?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, NeuralInputProps>(
  ({ className, type, isDiagnosing = false, meshNode = 'Drive-D', intentActive = true, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {/* Layer 1: Security Encapsulation (Ball-in-Ball Architecture) [cite: 2026-02-11] */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        
        <div className="relative flex items-center">
          {/* Neural HUD: Icon Indicator [cite: 2026-02-11] */}
          <div className="absolute left-4 flex items-center gap-2 z-10">
            {isDiagnosing ? (
              <Cpu className="h-4 w-4 text-primary animate-spin" />
            ) : intentActive ? (
              <Brain className="h-4 w-4 text-primary animate-pulse" />
            ) : (
              <Terminal className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <input
            type={type}
            className={cn(
              'flex h-14 w-full rounded-xl border border-white/10 bg-black/60 pl-12 pr-24 py-4 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-xl placeholder:text-white/20',
              isDiagnosing && 'opacity-50 pointer-events-none',
              className
            )}
            placeholder="Ek naya folder banao aur images move kar do..."
            ref={ref}
            {...props}
          />

          {/* Layer 2: Mesh Status & Verification Badge [cite: 2026-02-11] */}
          <div className="absolute right-4 flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Node: {meshNode}</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
                <span className="text-[7px] font-bold text-emerald-500/50 uppercase">Verified</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/5" />
            <Zap className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Layer 3: 5-Second Self-Diagnosis Progress [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-0 h-[2px] bg-primary shadow-[0_0_10px_#3b82f6]"
              transition={{ duration: 5 }}
            />
          )}
        </AnimatePresence>

        {/* Ghost Module Placeholder for future Voice Recognition [cite: 2026-02-11] */}
        <div className="hidden">def process_voice_intent(): pass</div>
      </div>
    )
  },
)
Input.displayName = 'NeuralInput'

export { Input }
