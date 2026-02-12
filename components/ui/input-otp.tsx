'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldCheck, Cpu, Zap, Activity, HardDrive } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Access Gate [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Protocol.
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & { isDiagnosing?: boolean }
>(({ className, containerClassName, isDiagnosing = false, ...props }, ref) => (
  <div className="relative group">
    {/* Layer 1: Distributed Mesh HUD [cite: 2026-02-11] */}
    <div className="absolute -top-8 left-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
        Neural Gateway: Node Verification Active
      </span>
    </div>

    <OTPInput
      ref={ref}
      containerClassName={cn(
        'flex items-center gap-3 has-[:disabled]:opacity-50',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  </div>
))

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number; riskLevel?: 'low' | 'high' }
>(({ index, className, riskLevel = 'low', ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isActive ? { scale: 1.05, borderColor: 'var(--primary)' } : { scale: 1 }}
      className={cn(
        'relative flex h-14 w-12 items-center justify-center border-2 transition-all duration-500 rounded-xl',
        'glass-panel-strong backdrop-blur-xl border-white/10 text-lg font-black font-mono',
        isActive && 'z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)] border-primary/50',
        char && 'text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
        className
      )}
      {...props}
    >
      {/* Ball-in-Ball: Inner Security Layer [cite: 2026-02-11] */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>

      <span className="relative z-10">{char}</span>

      {hasFakeCaret && (
        <motion.div 
          className="absolute bottom-2 w-4 h-1 bg-primary rounded-full"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
})

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
))

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" className="px-2" {...props}>
    <Zap className="h-4 w-4 text-primary/30 animate-pulse" />
  </div>
))

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
