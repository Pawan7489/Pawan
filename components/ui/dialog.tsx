'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, ShieldCheck, Cpu, Activity, HardDrive, Zap, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Access Portal
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[#020202]/90 backdrop-blur-2xl transition-all duration-500',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud';
    showDiagnosis?: boolean;
  }
>(({ className, children, meshNode = 'Drive-D', showDiagnosis = true, ...props }, ref) => {
  const [diagStep, setDiagStep] = React.useState(0);
  const diagMessages = ["Scanning Drive Mesh...", "Verifying Guardian Protocol...", "Neural Syncing...", "Ready."];

  // 1. RULE: 5-Second Self-Diagnosis on Portal Entry
  React.useEffect(() => {
    if (showDiagnosis) {
      const interval = setInterval(() => {
        setDiagStep(prev => (prev < diagMessages.length - 1 ? prev + 1 : prev));
      }, 1250); // Total ~5 seconds
      return () => clearInterval(interval);
    }
  }, [showDiagnosis]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden',
          'glass-panel-strong border border-white/10 p-0 shadow-2xl transition-all duration-500 rounded-[2.5rem]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
      >
        {/* Layer 1: Security Scan (Internal Critique Visual) */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan" />

        <div className="relative flex flex-col h-full max-h-[85vh]">
          {/* Header HUD: Distributed Mesh Status */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center glow-blue">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Portal Active</h2>
                <p className="text-[10px] font-mono text-emerald-500/70 flex items-center gap-2">
                  <HardDrive className="h-3 w-3" /> Linked to {meshNode}
                </p>
              </div>
            </div>
            <DialogPrimitive.Close className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-red-500/20 transition-all group">
              <X className="h-4 w-4 text-white/50 group-hover:text-red-500" />
            </DialogPrimitive.Close>
          </div>

          {/* Diagnosis Progress Bar */}
          {showDiagnosis && diagStep < diagMessages.length - 1 && (
            <div className="px-8 py-2 bg-primary/5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-primary animate-pulse">{diagMessages[diagStep]}</span>
              <Cpu className="h-3 w-3 text-primary animate-spin" />
            </div>
          )}

          {/* Main Content: Ball-in-Ball Encapsulation */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
            {children}
          </div>

          {/* Footer: Human-in-the-Loop Feedback (RLHF) */}
          <div className="px-8 py-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
            <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                 <Lock className="h-3 w-3" /> Core Encapsulated
               </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-white/30 uppercase">Logic Quality?</span>
              <button className="h-6 w-6 rounded-md glass-panel flex items-center justify-center hover:text-emerald-400 transition-colors text-[10px]">👍</button>
              <button className="h-6 w-6 rounded-md glass-panel flex items-center justify-center hover:text-red-400 transition-colors text-[10px]">👎</button>
            </div>
          </div>
        </div>

        {/* Ghost Module Protocol: Future Neural Face Stub */}
        <div className="hidden">def trigger_facial_auth(): pass</div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
})

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 mb-6', className)} {...props} />
)

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-black tracking-tighter text-white uppercase', className)}
    {...props}
  />
))

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-xs font-medium text-white/40 leading-relaxed tracking-wide', className)}
    {...props}
  />
))

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
