'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Buffer Skeleton
 * Rule: Musk Rule (Efficiency) - Optimized for low GPU overhead.
 * Rule: Ball-in-Ball (Onion Architecture) - Layered placeholder design.
 */

interface SuperGeniusSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'neural' | 'data' | 'bridge'; // Project A1 specific nodes
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis Hook
}

function Skeleton({
  className,
  variant = 'neural',
  isDiagnosing = false,
  ...props
}: SuperGeniusSkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5',
        className
      )}
      {...props}
    >
      {/* Layer 1: The Neural Pulse (Core Logic Visualization) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: variant === 'neural' ? [0.98, 1, 0.98] : 1,
        }}
        transition={{
          duration: isDiagnosing ? 0.8 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          variant === 'neural' && "from-primary/10 via-primary/20 to-primary/10",
          variant === 'data' && "from-emerald-500/10 via-emerald-500/20 to-emerald-500/10",
          variant === 'bridge' && "from-amber-500/10 via-amber-500/20 to-amber-500/10"
        )}
      />

      {/* Layer 2: 5-Second Diagnosis Scan Line */}
      <motion.div
        animate={{
          top: ['-100%', '200%'],
        }}
        transition={{
          duration: isDiagnosing ? 1.5 : 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "absolute inset-x-0 h-1/2 opacity-30 blur-xl",
          variant === 'neural' && "bg-primary",
          variant === 'data' && "bg-emerald-400",
          variant === 'bridge' && "bg-amber-400"
        )}
      />

      {/* Layer 3: Security HUD Branding (Ghost Protocol) */}
      <div className="absolute bottom-1 right-2 opacity-10 pointer-events-none">
        <span className="text-[6px] font-black uppercase tracking-tighter font-mono">
          A1_SYS_BUFFER
        </span>
      </div>
    </div>
  )
}

export { Skeleton }
