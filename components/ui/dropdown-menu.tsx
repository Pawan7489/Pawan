'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, ChevronRight, Circle, Brain, 
  ShieldCheck, Zap, Cpu, HardDrive, Lock, Activity 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Logic Dropdown [cite: 2026-02-11]
 * Musk Rule: Optimized for maximum output with minimal CPU usage.
 * Zuckerberg Rule: Weekly micro-updates compatible architecture.
 */

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Advanced Content: Ball-in-Ball Layering [cite: 2026-02-11]
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/80 p-2 text-foreground shadow-2xl backdrop-blur-2xl',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {/* 5-Second Self-Diagnosis Scan Line Visual [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10">{props.children}</div>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
))

// Neural Menu Item: Guardian Protocol & Mesh Origin [cite: 2026-02-11]
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    isHighRisk?: boolean; // Guardian Protocol check [cite: 2026-02-11]
    nodeOrigin?: 'Drive-D' | 'Drive-E' | 'Cloud'; // Mesh Source [cite: 2026-02-11]
  }
>(({ className, inset, isHighRisk = false, nodeOrigin = 'Drive-D', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-xl px-3 py-2.5 text-xs font-medium outline-none transition-all',
      'focus:bg-white/5 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-30',
      isHighRisk && 'text-red-400 focus:bg-red-500/10 focus:text-red-400',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    <div className="flex-1 flex items-center gap-2">
      {isHighRisk ? <ShieldCheck className="h-3 w-3" /> : <Zap className="h-3 w-3 opacity-50" />}
      {props.children}
    </div>

    {/* Distributed Mesh Node Badge [cite: 2026-02-11] */}
    <div className="flex items-center gap-1.5 ml-4">
      <span className="text-[8px] font-mono opacity-30 uppercase tracking-tighter">{nodeOrigin}</span>
    </div>
  </DropdownMenuPrimitive.Item>
))

// Header Label: Expert Council Status [cite: 2026-02-11]
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 flex items-center justify-between',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {props.children}
    <div className="flex gap-1">
      <Activity className="h-2.5 w-2.5 animate-pulse" />
      <Cpu className="h-2.5 w-2.5" />
    </div>
  </DropdownMenuPrimitive.Label>
))

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-white/5', className)}
    {...props}
  />
))

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-[9px] font-mono tracking-widest text-white/20', className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
      }
  
