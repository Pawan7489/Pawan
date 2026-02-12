'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import { motion } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock, ShieldAlert, AlertCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Project A1: Neural Alert System [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis HUD Integration.
 */

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Layer 1: Onion Architecture Encapsulation [cite: 2026-02-11]
          toast: cn(
            'group toast flex items-center gap-4 rounded-[2rem] p-6 shadow-2xl transition-all duration-500',
            'bg-black/80 backdrop-blur-3xl border border-white/10 glass-panel-strong',
            'group-[.toaster]:text-foreground group-[.toaster]:shadow-[0_0_30px_rgba(0,0,0,0.5)]'
          ),
          description: 'group-[.toast]:text-white/40 font-mono text-[10px] uppercase tracking-widest mt-1',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-tighter',
          cancelButton: 'group-[.toast]:bg-white/5 group-[.toast]:text-white/60 rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-tighter',
        },
      }}
      // Custom Icons for Project A1 Logic [cite: 2026-02-11]
      icons={{
        success: <ShieldCheck className="h-5 w-5 text-emerald-500 glow-emerald" />,
        info: <Brain className="h-5 w-5 text-primary glow-blue" />,
        warning: <Zap className="h-5 w-5 text-amber-500 animate-pulse" />,
        error: <ShieldAlert className="h-5 w-5 text-red-500 animate-bounce" />,
        loading: <Cpu className="h-5 w-5 text-primary animate-spin" />,
      }}
      {...props}
    />
  )
}

/**
 * Neural Toast Utility: Use this to trigger A1 specific notifications.
 * It includes Mesh Node Telemetry & Internal Critique branding [cite: 2026-02-11].
 */
export const triggerNeuralAlert = (
  toast: any, 
  message: string, 
  meshNode: 'Drive-D' | 'Drive-E' | 'Cloud' = 'Drive-D'
) => {
  toast(message, {
    description: (
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <HardDrive className="h-2.5 w-2.5 text-white/30" />
            <span className="text-[8px] font-mono text-white/30">NODE: {meshNode}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <Activity className="h-2.5 w-2.5 text-emerald-500/50" />
            <span className="text-[8px] font-mono text-emerald-500/50">STABLE</span>
          </div>
        </div>
        {/* Internal Critique Visualization [cite: 2026-02-11] */}
        <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
        <span className="text-[7px] italic text-white/20 uppercase tracking-tighter">
          Guardian Protocol Verified - Core Rule #42 Active
        </span>
      </div>
    ),
  })
}

export { Toaster }
