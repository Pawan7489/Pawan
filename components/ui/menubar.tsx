'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, ChevronRight, Circle, Brain, 
  ShieldCheck, Cpu, Activity, HardDrive, 
  Zap, Lock, Globe 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Navigation Console [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-12 items-center space-x-1 rounded-2xl border border-white/10 bg-black/60 p-1 backdrop-blur-3xl shadow-2xl glass-panel-strong',
      className
    )}
    {...props}
  />
))

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & { isDiagnosing?: boolean }
>(({ className, isDiagnosing = false, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none transition-all',
      'focus:bg-white/5 focus:text-primary data-[state=open]:bg-white/10 data-[state=open]:text-primary',
      className
    )}
    {...props}
  >
    {isDiagnosing ? <Cpu className="h-3 w-3 animate-spin" /> : <Brain className="h-3 w-3 opacity-50" />}
    {props.children}
  </MenubarPrimitive.Trigger>
))

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[14rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/80 p-2 text-foreground shadow-2xl backdrop-blur-3xl',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {/* 5-Second Self-Diagnosis Scan Line [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10">{props.children}</div>
    </MenubarPrimitive.Content>
  </MenubarPrimitive.Portal>
))

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    riskLevel?: 'low' | 'high'; // For Guardian Protocol verification
    meshNode?: 'Drive-D' | 'Drive-E' | 'Cloud';
  }
>(({ className, inset, riskLevel = 'low', meshNode = 'Drive-D', ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium outline-none transition-all',
      'focus:bg-white/5 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-30',
      riskLevel === 'high' && 'text-red-400 focus:bg-red-500/10 focus:text-red-400',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    <div className="flex-1 flex items-center gap-2">
      {riskLevel === 'high' ? <ShieldCheck className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5 opacity-50" />}
      {props.children}
    </div>
    
    {/* Distributed Mesh Node HUD [cite: 2026-02-11] */}
    <span className="text-[8px] font-mono opacity-20 uppercase tracking-tighter">{meshNode}</span>
  </MenubarPrimitive.Item>
))

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 flex items-center justify-between',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {props.children}
    <div className="flex gap-1.5">
      <Activity className="h-2.5 w-2.5 animate-pulse" />
      <Globe className="h-2.5 w-2.5 opacity-30" />
    </div>
  </MenubarPrimitive.Label>
))

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-2 h-px bg-white/5', className)}
    {...props}
  />
))

/**
 * Ghost Module Protocol: Placeholder for future Neural Command Voice stubs [cite: 2026-02-11]
 */
const GhostStub = () => <div className="hidden" aria-hidden="true">def trigger_menubar_intent(): pass</div>

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
