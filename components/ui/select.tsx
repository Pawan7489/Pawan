'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, ChevronDown, ChevronUp, Brain, 
  ShieldCheck, Cpu, Activity, HardDrive, 
  Zap, Lock, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Choice Selector [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { isDiagnosing?: boolean }
>(({ className, children, isDiagnosing = false, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-12 w-full items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-widest outline-none transition-all glass-panel-strong',
      'focus:ring-2 focus:ring-primary/50 disabled:opacity-30',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-3">
      {isDiagnosing ? (
        <Cpu className="h-4 w-4 animate-spin text-primary" />
      ) : (
        <Brain className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
      )}
      <span className="truncate">{children}</span>
    </div>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-30" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { meshNode?: 'D' | 'E' | 'Cloud' }
>(({ className, children, position = 'popper', meshNode = 'D', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[12rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 text-foreground shadow-2xl backdrop-blur-3xl',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        position === 'popper' && 'data-[side=bottom]:translate-y-2',
        className
      )}
      position={position}
      {...props}
    >
      {/* 5-Second Self-Diagnosis Scan Line [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Distributed Mesh HUD [cite: 2026-02-11] */}
      <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
        <HardDrive className="h-2.5 w-2.5" />
        <span className="text-[7px] font-mono uppercase tracking-tighter">Node: {meshNode}</span>
      </div>

      <SelectPrimitive.Viewport className="p-2 relative z-10">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { isVerified?: boolean }
>(({ className, children, isVerified = true, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition-all',
      'focus:bg-white/5 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-30',
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-emerald-500" />
      </SelectPrimitive.ItemIndicator>
      <div className="group-data-[state=checked]:hidden">
        {isVerified ? <ShieldCheck className="h-3.5 w-3.5 opacity-20" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
      </div>
    </span>

    <SelectPrimitive.ItemText>
      <div className="flex items-center gap-2">
        {children}
        {isVerified && <Zap className="h-2.5 w-2.5 text-emerald-400 fill-emerald-400" />}
      </div>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-10 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary/50', className)}
    {...props}
  />
))

/**
 * Ghost Module Protocol: Hidden stub for voice-intent selection [cite: 2026-02-11]
 */
const GhostStub = () => <div className="hidden">def trigger_select_intent(): pass</div>

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator: SelectPrimitive.Separator,
  }
