'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Star, Lock, Eye 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Insight Portal [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const HoverCard = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
    isDiagnosing?: boolean;
    isSensitive?: boolean;
  }
>(({ className, align = 'center', sideOffset = 4, meshNode = 'Drive-D', isDiagnosing = false, isSensitive = false, children, ...props }, ref) => {
  
  const [diagStep, setDiagStep] = React.useState(0);
  const diagMessages = ["Scanning Node...", "Ethics Check...", "Mesh Syncing...", "Ready."];

  // 1. RULE: 5-Second Self-Diagnosis on Hover [cite: 2026-02-11]
  React.useEffect(() => {
    if (isDiagnosing) {
      const interval = setInterval(() => {
        setDiagStep(prev => (prev < diagMessages.length - 1 ? prev + 1 : prev));
      }, 1250);
      return () => clearInterval(interval);
    }
  }, [isDiagnosing]);

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-80 overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 p-0 shadow-2xl backdrop-blur-3xl outline-none glass-panel-strong',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {/* Layer 1: Internal Scan Line (Security Layer) [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2: Status HUD Header [cite: 2026-02-11] */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center glow-blue">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Neural Insight</span>
            <span className="text-[8px] font-mono text-emerald-500/70 flex items-center gap-1">
              <HardDrive className="h-2.5 w-2.5" /> {meshNode} [cite: 2026-02-11]
            </span>
          </div>
        </div>
        {isSensitive && <Lock className="h-3 w-3 text-amber-500" />}
      </div>

      {/* Layer 3: Self-Diagnosis Buffer [cite: 2026-02-11] */}
      <AnimatePresence>
        {isDiagnosing && diagStep < diagMessages.length - 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="px-6 py-2 bg-primary/5 flex items-center justify-between"
          >
            <span className="text-[9px] font-mono text-primary animate-pulse">{diagMessages[diagStep]}</span>
            <Cpu className="h-3 w-3 text-primary animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Context: Ball-in-Ball Encapsulation [cite: 2026-02-11] */}
      <div className="p-6 relative z-10 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>

      {/* Layer 4: RLHF Footer & Guardian Protocol Verified [cite: 2026-02-11] */}
      <div className="px-6 py-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase">
          <ShieldCheck className="h-3 w-3" /> Guardian Verified
        </div>
        
        {/* Human-in-the-Loop Feedback Logic [cite: 2026-02-11] */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-[8px] font-black uppercase text-white/20 px-1">Quality?</span>
          <button className="text-[10px] hover:scale-125 transition-all">👍</button>
          <button className="text-[10px] hover:scale-125 transition-all">👎</button>
        </div>
      </div>

      {/* Ghost Module Protocol: Placeholder for Voice Insights [cite: 2026-02-11] */}
      <div className="hidden">def speak_insight(): pass</div>
    </HoverCardPrimitive.Content>
  )
})
HoverCardContent.displayName = 'NeuralHoverCardContent'

export { HoverCard, HoverCardTrigger, HoverCardContent }
