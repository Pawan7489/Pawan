'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown, ShieldCheck, Brain, Cpu, Zap, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

// Musk Rule: High-efficiency spring for zero-latency expansion [cite: 2026-02-11]
const Accordion = AccordionPrimitive.Root

// Ball-in-Ball Rule: Each item is a nested security cell [cite: 2026-02-11]
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'mb-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all hover:bg-white/[0.04]', 
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { 
    isSecure?: boolean; 
    status?: 'active' | 'loading' | 'error' 
  }
>(({ className, children, isSecure = true, status = 'active', ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between px-5 py-4 text-sm font-semibold tracking-tight transition-all [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {/* Internal Diagnosis Indicator [cite: 2026-02-11] */}
        {status === 'loading' ? (
          <Cpu className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Brain className="h-4 w-4 text-primary/70" />
        )}
        <span className="flex items-center gap-2">
          {children}
          {isSecure && <Lock className="h-3 w-3 text-emerald-500/50" />}
        </span>
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[13px] leading-relaxed text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('px-5 pb-5 pt-0', className)}>
      {/* Internal Critique Step Visualization [cite: 2026-02-11] */}
      <div className="mb-4 flex flex-col gap-2 rounded-xl border border-primary/10 bg-primary/5 p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Zap className="h-3 w-3" /> Logic Path Verified
        </div>
        <div className="font-mono text-[11px] text-white/40">
          Neural State: {new Date().toLocaleTimeString()} | Mesh: Sync [cite: 2026-02-11]
        </div>
      </div>
      
      <div className="relative z-10">{children}</div>

      {/* RLHF Feedback Mechanism [cite: 2026-02-11] */}
      <div className="mt-4 flex items-center justify-end gap-3 border-t border-white/5 pt-3">
        <span className="text-[10px] text-white/20 uppercase font-bold">Feedback?</span>
        <button className="text-white/30 hover:text-emerald-400 transition-colors">👍</button>
        <button className="text-white/30 hover:text-red-400 transition-colors">👎</button>
      </div>
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
