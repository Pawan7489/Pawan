'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, ShieldAlert, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural System Event [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis HUD.
 */

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-6 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-[2rem] p-6 shadow-2xl transition-all border border-white/10 backdrop-blur-3xl glass-panel-strong',
  {
    variants: {
      variant: {
        default: 'bg-black/80 text-foreground',
        neural: 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_30px_rgba(59,130,246,0.2)]',
        guardian: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', // Rules 1-75 Verified [cite: 2026-02-11]
        omega: 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse', // Emergency / Kill Switch [cite: 2026-02-11]
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & { meshNode?: string; isDiagnosing?: boolean }
>(({ className, variant, meshNode = 'Drive-D', isDiagnosing = false, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      {/* Layer 1: Internal Scan Line (Security Check) [cite: 2026-02-11] */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-primary/40 z-50 pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2: Distributed Mesh Telemetry [cite: 2026-02-11] */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
            Node: {meshNode} | Status: Verified
          </span>
        </div>
        {children}
      </div>

      {/* Layer 3: 5-Second Self-Diagnosis Indicator [cite: 2026-02-11] */}
      {isDiagnosing && (
        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: '100%' }}
            className="h-full bg-primary" transition={{ duration: 5 }}
          />
        </div>
      )}
    </ToastPrimitives.Root>
  )
})

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2', className)}
    {...props}
  >
    <Brain className="h-3.5 w-3.5 opacity-50" />
    {props.children}
  </ToastPrimitives.Title>
))

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-[10px] font-mono opacity-60 leading-relaxed uppercase mt-1', className)}
    {...props}
  />
))

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-[10px] font-black uppercase tracking-tighter transition-all hover:bg-white/10 focus:ring-2 focus:ring-primary',
      className
    )}
    {...props}
  />
))

export {
  type ToastProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose: ToastPrimitives.Close,
  ToastAction,
   }
        
