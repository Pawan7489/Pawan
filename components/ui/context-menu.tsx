'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, ChevronRight, Circle, Brain, 
  ShieldCheck, Zap, Cpu, HardDrive, Lock 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Context Hub [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Distributed Mesh Connectivity.
 */

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

// Advanced Content with Self-Diagnosis Animation [cite: 2026-02-11]
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/80 p-2 text-foreground shadow-2xl backdrop-blur-2xl',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {/* 5-Second Self-Diagnosis Scan Line [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10">{props.children}</div>
    </ContextMenuPrimitive.Content>
  </ContextMenuPrimitive.Portal>
))

// Neural Menu Item with Node Source Tracking [cite: 2026-02-11]
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    riskLevel?: 'low' | 'high'; // For Guardian Protocol
    nodeOrigin?: 'Drive-D' | 'Drive-E' | 'Cloud';
  }
>(({ className, inset, riskLevel = 'low', nodeOrigin = 'Drive-D', ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-xl px-3 py-2.5 text-xs font-medium outline-none transition-all',
      'focus:bg-white/5 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-30',
      riskLevel === 'high' && 'text-red-400 focus:bg-red-500/10 focus:text-red-400',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    <div className="flex-1 flex items-center gap-2">
      {riskLevel === 'high' ? <ShieldCheck className="h-3 w-3" /> : <Zap className="h-3 w-3 opacity-50" />}
      {props.children}
    </div>

    {/* Distributed Mesh Node Tag [cite: 2026-02-11] */}
    <div className="flex items-center gap-1.5 ml-4">
      <span className="text-[8px] font-mono opacity-30 uppercase">{nodeOrigin}</span>
    </div>
  </ContextMenuPrimitive.Item>
))

// Header Label with System HUD [cite: 2026-02-11]
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    showStatus?: boolean
  }
>(({ className, showStatus = true, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn('px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 flex items-center justify-between', className)}
    {...props}
  >
    {props.children}
    {showStatus && (
      <div className="flex gap-1.5">
        <Cpu className="h-2.5 w-2.5 animate-pulse" />
        <HardDrive className="h-2.5 w-2.5" />
      </div>
    )}
  </ContextMenuPrimitive.Label>
))

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-white/5', className)}
    {...props}
  />
))

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
