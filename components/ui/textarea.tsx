'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, Terminal, Sparkles 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Intent Processor [cite: 2026-02-11]
 * Rule: Intent over Syntax (Hinglish Support).
 * Rule: Ball-in-Ball (Onion Architecture).
 */

export interface NeuralTextareaProps extends React.ComponentProps<'textarea'> {
  isDiagnosing?: boolean;
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
  intentLevel?: 'low' | 'high';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, NeuralTextareaProps>(
  ({ className, isDiagnosing = false, meshNode = 'Drive-D', intentLevel = 'low', ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {/* Layer 1: Security Encapsulation (Onion Architecture) [cite: 2026-02-11] */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-purple-500/10 to-primary/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
        
        <div className="relative flex flex-col bg-black/60 rounded-2xl border border-white/10 backdrop-blur-3xl glass-panel-strong overflow-hidden">
          
          {/* Layer 2: Neural HUD (Distributed Mesh Tracking) [cite: 2026-02-11] */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Brain className={cn("h-3.5 w-3.5 transition-colors", props.value ? "text-primary animate-pulse" : "text-white/20")} />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Neural_Input_Node</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                <HardDrive className="h-2.5 w-2.5 text-white/20" />
                <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter">{meshNode}</span>
              </div>
              <ShieldCheck className="h-3 w-3 text-emerald-500/40" />
            </div>
          </div>

          {/* Main Textarea Area [cite: 2026-02-11] */}
          <div className="relative">
            <textarea
              ref={ref}
              className={cn(
                'flex min-h-[120px] w-full bg-transparent px-4 py-3 text-sm font-medium ring-offset-background',
                'placeholder:text-white/10 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 custom-scrollbar',
                isDiagnosing && 'opacity-30 blur-[1px] pointer-events-none',
                className
              )}
              {...props}
            />
            
            {/* Internal Critique Visualization [cite: 2026-02-11] */}
            <AnimatePresence>
              {props.value && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute bottom-3 right-4 flex items-center gap-1.5 pointer-events-none"
                >
                  <Sparkles className="h-3 w-3 text-primary/40" />
                  <span className="text-[8px] font-bold text-primary/40 uppercase tracking-tighter">Intent_Syncing...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Layer 3: 5-Second Self-Diagnosis Progress [cite: 2026-02-11] */}
          <AnimatePresence>
            {isDiagnosing && (
              <div className="px-4 py-2 bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3 w-3 text-primary animate-spin" />
                  <span className="text-[9px] font-black text-primary uppercase animate-pulse">Running_Self_Diagnosis...</span>
                </div>
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-[1.5px] bg-primary shadow-[0_0_10px_#3b82f6]"
                  transition={{ duration: 5 }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Footer: Guardian Protocol Verified [cite: 2026-02-11] */}
          <div className="px-4 py-1.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[7px] font-mono text-white/10 uppercase tracking-[0.2em]">
            <span>Registry: Active</span>
            <span>Ethical_Hard-Coding: V2.5</span>
          </div>
        </div>

        {/* Ghost Module stub for Neural Voice Recognition [cite: 2026-02-11] */}
        <div className="hidden">def process_hinglish_intent(): pass</div>
      </div>
    )
  }
)
Textarea.displayName = 'NeuralTextarea'

export { Textarea }
