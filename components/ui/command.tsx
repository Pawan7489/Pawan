'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Brain, ShieldCheck, Activity, 
  Cpu, HardDrive, Zap, Lock, Terminal 
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'

/**
 * Project A1: Neural Command Gateway [cite: 2026-02-11]
 * Rule: Intent over Syntax (Hinglish Support).
 * Rule: Ball-in-Ball (Nested Encapsulation).
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-black/80 text-foreground backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]',
      className
    )}
    {...props}
  />
))

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl border-none max-w-2xl bg-transparent">
        {/* Layered Security: Ball-in-Ball Rule [cite: 2026-02-11] */}
        <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
          <Command className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:font-black [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-primary/50 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-4 [&_[cmdk-item]]:rounded-2xl">
            {children}
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { isDiagnosing?: boolean }
>(({ className, isDiagnosing = false, ...props }, ref) => (
  <div className="relative flex items-center border-b border-white/5 px-4" cmdk-input-wrapper="">
    <Brain className="mr-3 h-5 w-5 shrink-0 text-primary animate-pulse" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-14 w-full rounded-md bg-transparent py-4 text-sm font-medium outline-none placeholder:text-muted-foreground/40 disabled:cursor-not-allowed',
        className
      )}
      placeholder="Ek naya folder banao aur images move kar do... (Intent Mode)"
      {...props}
    />
    
    {/* 5-Second Self-Diagnosis Pulse [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
        >
          <Cpu className="h-3 w-3 text-primary animate-spin" />
          <span className="text-[9px] font-mono text-primary uppercase">Self-Diagnosis...</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { 
    meshNode?: 'D' | 'E' | 'Cloud';
    isVerified?: boolean;
  }
>(({ className, meshNode = 'D', isVerified = true, children, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-3 px-3 py-3 outline-none transition-all",
      "data-[selected='true']:bg-white/5 data-[selected=true]:text-primary data-[disabled=true]:opacity-30",
      className
    )}
    {...props}
  >
    <div className="flex-1 flex items-center gap-3">
      {children}
    </div>

    {/* Distributed Mesh & Expert Council Badge [cite: 2026-02-11] */}
    <div className="flex items-center gap-2">
      {isVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/50" />}
      <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/5 flex items-center gap-1">
        <HardDrive className="h-2.5 w-2.5 text-muted-foreground" />
        <span className="text-[8px] font-mono text-muted-foreground uppercase">{meshNode}</span>
      </div>
    </div>
  </CommandPrimitive.Item>
))

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:mt-2',
      className
    )}
    {...props}
  />
))

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-12 flex flex-col items-center justify-center gap-3"
    {...props}
  >
    <div className="p-4 rounded-2xl bg-white/5">
      <Zap className="h-8 w-8 text-primary/20" />
    </div>
    <div className="text-center">
      <p className="text-sm font-bold text-white/80">Intent Not Recognized</p>
      <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">Check registry.py for active modules</p>
    </div>
  </CommandPrimitive.Empty>
))

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
