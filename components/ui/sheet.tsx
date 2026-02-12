'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Star, Lock, ShieldAlert 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Side-Panel [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Distributed Mesh Connectivity.
 */

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-[#020202]/80 backdrop-blur-xl transition-all duration-500',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))

const sheetVariants = cva(
  'fixed z-50 gap-4 glass-panel-strong border-white/10 p-0 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm rounded-r-[2.5rem]',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm rounded-l-[2.5rem]',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud'
  isDiagnosing?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, meshNode = 'Drive-D', isDiagnosing = false, ...props }, ref) => {
  const [feedback, setFeedback] = React.useState<number | null>(null)

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), 'overflow-hidden flex flex-col', className)}
        {...props}
      >
        {/* Layer 1: Internal Scan Line (Security Layer) [cite: 2026-02-11] */}
        <motion.div 
          className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Neural Header: Distributed Mesh HUD [cite: 2026-02-11] */}
        <div className="flex items-center justify-between px-8 py-6 bg-white/[0.02] border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center glow-blue">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Neural Hub</h2>
              <p className="text-[9px] font-mono text-emerald-500/70 flex items-center gap-1.5 uppercase">
                <HardDrive className="h-2.5 w-2.5" /> Source: {meshNode} [cite: 2026-02-11]
              </p>
            </div>
          </div>
          <SheetPrimitive.Close className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-red-500/20 transition-all group">
            <X className="h-4 w-4 text-white/50 group-hover:text-red-500" />
          </SheetPrimitive.Close>
        </div>

        {/* 5-Second Self-Diagnosis Progress [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-8 py-2 bg-primary/5 flex items-center justify-between overflow-hidden"
            >
              <span className="text-[9px] font-mono text-primary animate-pulse uppercase tracking-widest">
                Running_Self_Diagnosis...
              </span>
              <Cpu className="h-3 w-3 text-primary animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content: Ball-in-Ball Encapsulation [cite: 2026-02-11] */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          {children}
        </div>

        {/* RLHF Feedback Footer: Human-in-the-Loop [cite: 2026-02-11] */}
        <div className="px-8 py-6 bg-black/40 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
              <span className="text-[9px] font-bold text-white/30 uppercase">Guardian Protocol Active</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  onClick={() => setFeedback(i)}
                  className={cn(
                    "h-8 w-8 rounded-lg glass-panel flex items-center justify-center transition-all",
                    feedback && i <= feedback ? "text-primary shadow-glow scale-110" : "text-white/20 hover:text-white/60"
                  )}
                >
                  <Star className="h-3.5 w-3.5 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="text-[8px] font-mono text-white/10 uppercase text-center tracking-[0.3em]">
            Registry Sync: Stable | GPU Temp: Optimized
          </div>
        </div>

        {/* Ghost Module stub for Neural Face ID [cite: 2026-02-11] */}
        <div className="hidden">def trigger_biometric_auth(): pass</div>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-black tracking-tighter text-white uppercase', className)}
    {...props}
  />
))

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-xs font-medium text-white/40 leading-relaxed tracking-wide mt-2', className)}
    {...props}
  />
))

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
