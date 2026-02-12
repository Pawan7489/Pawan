'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, Eye, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Module Switcher [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-14 items-center justify-center rounded-[1.5rem] bg-black/40 p-1.5 text-muted-foreground backdrop-blur-3xl border border-white/5 glass-panel-strong',
      className
    )}
    {...props}
  />
))

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
    isCritical?: boolean;
  }
>(({ className, meshNode = 'Drive-D', isCritical = false, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30',
      'data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-1.5 relative z-10">
      {props.children}
      {isCritical && <Lock className="h-2.5 w-2.5 text-amber-500/50" />}
    </div>
    
    {/* LayoutId for smooth neural transition between modules */}
    <AnimatePresence>
      {props['data-state'] === 'active' && (
        <motion.div
          layoutId="neural-active-pill"
          className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/20"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </AnimatePresence>
  </TabsPrimitive.Trigger>
))

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    isDiagnosing?: boolean;
    meshNode?: string;
  }
>(({ className, isDiagnosing = false, meshNode = 'Drive-D', children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-8',
      'focus-visible:outline-none ring-offset-background',
      className
    )}
    {...props}
  >
    {/* Layer 1: Security Encapsulation (Ball-in-Ball) [cite: 2026-02-11] */}
    <div className="absolute top-4 right-8 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
       <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
          <HardDrive className="h-2.5 w-2.5" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/60">Node: {meshNode}</span>
       </div>
       <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/60" />
    </div>

    {/* Layer 2: 5-Second Self-Diagnosis Overlay [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <Cpu className="h-8 w-8 text-primary animate-spin" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">Running Self-Diagnosis</span>
            <span className="text-[8px] font-mono text-white/20 mt-1 uppercase">Checking GPU & Mesh Integrity...</span>
          </div>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }}
              className="h-full bg-primary shadow-[0_0_10px_#3b82f6]" 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Layer 3: Main Content Area [cite: 2026-02-11] */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      {children}
    </motion.div>

    {/* Ghost Module Protocol: Placeholder for future Neural Streams [cite: 2026-02-11] */}
    <div className="hidden">def trigger_temporal_sync(): pass</div>
  </TabsPrimitive.Content>
))

export { Tabs, TabsList, TabsTrigger, TabsContent }
      
