'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, Brain, ShieldCheck, Cpu, 
  Activity, HardDrive, Zap, Lock, Globe 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Pathway System [cite: 2026-02-11]
 * Rule: Distributed Mesh Connectivity (Bridge between Nodes).
 * Rule: 5-Second Self-Diagnosis Visual Integration.
 */

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-50 flex max-w-max flex-1 items-center justify-center glass-panel-strong rounded-2xl p-1 border border-white/5',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-12 w-max items-center justify-center rounded-xl bg-transparent px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/5 hover:text-primary focus:bg-white/5 focus:outline-none disabled:pointer-events-none disabled:opacity-30 data-[active]:bg-white/5 data-[state=open]:bg-white/5'
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    isDiagnosing?: boolean;
    expertVerified?: boolean;
  }
>(({ className, children, isDiagnosing = false, expertVerified = true, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group relative', className)}
    {...props}
  >
    <div className="flex items-center gap-2">
      {isDiagnosing ? (
        <Cpu className="h-3 w-3 animate-spin text-primary" />
      ) : (
        <Brain className="h-3 w-3 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
      )}
      {children}
      {expertVerified && <Zap className="h-2 w-2 fill-emerald-500 text-emerald-500 absolute -top-1 -right-1" />}
    </div>
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180 opacity-30"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Cloud';
  }
>(({ className, meshNode = 'Drive-D', ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full md:absolute md:w-auto overflow-hidden rounded-[2rem] bg-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl',
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
      className
    )}
    {...props}
  >
    {/* Layer 1: Internal Scan Line (Security Check) [cite: 2026-02-11] */}
    <motion.div 
      className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />

    {/* Layer 2: Mesh HUD Tracking [cite: 2026-02-11] */}
    <div className="absolute top-2 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
      <HardDrive className="h-2.5 w-2.5 text-white/20" />
      <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter">NODE: {meshNode}</span>
    </div>

    <div className="relative z-10 p-6">{props.children}</div>
  </NavigationMenuPrimitive.Content>
))

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center perspective-[2000px]')}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'origin-top relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl text-popover-foreground shadow-2xl transition-[width,height] duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      {...props}
    />
  </div>
))

/**
 * Ghost Module Protocol: Placeholder for future Neural Voice Intent [cite: 2026-02-11]
 */
const NavigationGhostStub = () => <div className="hidden">def trigger_pathway_intent(): pass</div>

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink: NavigationMenuPrimitive.Link,
  NavigationMenuList: NavigationMenuPrimitive.List,
  NavigationMenuItem: NavigationMenuPrimitive.Item,
  }
