'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Zap, Star 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Expansion Slot
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Human-in-the-Loop (RLHF).
 */

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[#020202]/60 backdrop-blur-xl transition-all duration-500',
      className
    )}
    {...props}
  />
))

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
    isDiagnosing?: boolean;
  }
>(({ className, children, meshNode = 'Drive-D', isDiagnosing = false, ...props }, ref) => {
  const [feedback, setFeedback] = React.useState<number | null>(null);

  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-[85vh] flex-col rounded-t-[2.5rem] border border-white/10 bg-black/90 shadow-2xl overflow-hidden glass-panel-strong',
          className
        )}
        {...props}
      >
        {/* Layer 1: Neural Handle & Scan Line */}
        <div className="mx-auto mt-4 h-1.5 w-[60px] rounded-full bg-primary/20" />
        {isDiagnosing && (
          <motion.div 
            className="absolute top-0 inset-x-0 h-0.5 bg-primary/50 shadow-[0_0_15px_white] z-50"
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Layer 2: System HUD (Mesh Connectivity) */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center glow-blue">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expansion Slot</span>
              <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
                <HardDrive className="h-2.5 w-2.5" /> Node: {meshNode}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[8px] font-bold text-white/30 uppercase">
              Encapsulated
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar relative">
          {children}
        </div>

        {/* Layer 3: RLHF Feedback Mechanism */}
        <div className="px-8 py-6 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white/20 uppercase">Guardian Status</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Ethics Verified
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-[9px] font-black uppercase text-white/30 px-2">Quality?</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setFeedback(star)}
                className={cn(
                  "transition-all",
                  feedback && star <= feedback ? "text-primary scale-110 shadow-glow" : "text-white/10 hover:text-white/40"
                )}
              >
                <Star className="h-4 w-4 fill-current" />
              </button>
            ))}
          </div>
        </div>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
})

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-black tracking-tighter text-white uppercase', className)}
    {...props}
  />
))

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-xs font-medium text-white/40 leading-relaxed tracking-wide', className)}
    {...props}
  />
))

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
          }
