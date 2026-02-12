'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Cpu, Activity, 
  HardDrive, Zap, Lock, AlertCircle 
} from 'lucide-react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/**
 * Project A1: Neural Input Gate [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const Form = FormProvider

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { meshNode?: 'D' | 'E' | 'Cloud' }
>(({ className, meshNode = 'D', ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id, meshNode }}>
      {/* Layer 1: Security Encapsulation (Onion Architecture) [cite: 2026-02-11] */}
      <div 
        ref={ref} 
        className={cn(
          'relative space-y-3 p-5 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all hover:border-primary/30 group',
          className
        )} 
        {...props} 
      />
    </FormItemContext.Provider>
  )
})

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { isCritical?: boolean }
>(({ className, isCritical = false, ...props }, ref) => {
  const { error, formItemId, meshNode } = useFormField()

  return (
    <div className="flex items-center justify-between mb-1.5 px-1">
      <Label
        ref={ref}
        className={cn(
          'text-[10px] font-black uppercase tracking-[0.2em]',
          error ? 'text-destructive' : 'text-primary/70',
          className
        )}
        htmlFor={formItemId}
        {...props}
      />
      
      {/* Mesh Node HUD & Guardian Indicator [cite: 2026-02-11] */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-mono text-white/20 uppercase">Node:{meshNode}</span>
        {isCritical ? (
          <Lock className="h-2.5 w-2.5 text-amber-500" />
        ) : (
          <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/50" />
        )}
      </div>
    </div>
  )
})

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & { isDiagnosing?: boolean }
>(({ isDiagnosing = false, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <div className="relative">
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        className={cn(
          "transition-all duration-500 rounded-xl bg-black/40 border-white/10",
          isDiagnosing && "opacity-50 blur-[1px] pointer-events-none"
        )}
        {...props}
      />
      
      {/* 5-Second Self-Diagnosis Progress Visual [cite: 2026-02-11] */}
      <AnimatePresence>
        {isDiagnosing && (
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: '100%' }} 
            exit={{ opacity: 0 }}
            className="absolute -bottom-1 left-0 h-[2px] bg-primary shadow-[0_0_15px_#3b82f6]"
            transition={{ duration: 5 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
})

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  return (
    <AnimatePresence mode="wait">
      {body && (
        <motion.p
          ref={ref}
          id={formMessageId}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn('text-[10px] font-bold text-destructive flex items-center gap-1.5 mt-2 pl-1 uppercase tracking-tighter', className)}
          {...props}
        >
          <AlertCircle className="h-3 w-3" />
          Internal Critique: {body}
        </motion.p>
      )}
    </AnimatePresence>
  )
})

/**
 * Ghost Module Protocol: Placeholder for Human-in-the-Loop Feedback [cite: 2026-02-11]
 */
const RLHF_Feedback_Stub = () => <div className="hidden">def register_rlhf_score(): pass</div>

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
