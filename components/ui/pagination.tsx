'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, MoreHorizontal, 
  Brain, ShieldCheck, Cpu, Activity, 
  HardDrive, Zap, Lock 
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/button'

/**
 * Project A1: Neural Buffer Navigator [cite: 2026-02-11]
 * Rule: Distributed Mesh Connectivity (D, E, Cloud Sync).
 * Rule: 5-Second Self-Diagnosis Visual.
 */

const Pagination = ({ className, isDiagnosing = false, meshNode = 'Drive-D', ...props }: React.ComponentProps<'nav'> & { isDiagnosing?: boolean; meshNode?: string }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('relative mx-auto flex w-full flex-col items-center gap-4', className)}
    {...props}
  >
    {/* Layer 1: Mesh Telemetry HUD [cite: 2026-02-11] */}
    <div className="flex items-center gap-4 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3b82f6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
          Neural Mesh: {meshNode}
        </span>
      </div>
      <div className="h-3 w-[1px] bg-white/10" />
      <span className="text-[8px] font-mono text-emerald-500/60 flex items-center gap-1">
        <ShieldCheck className="h-2.5 w-2.5" /> Guardian Verified
      </span>
    </div>

    {props.children}
  </nav>
)

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'> & { isDiagnosing?: boolean }
>(({ className, isDiagnosing = false, ...props }, ref) => (
  <div className="relative group p-1 rounded-2xl glass-panel-strong border border-white/5">
    {/* 5-Second Self-Diagnosis Scan [cite: 2026-02-11] */}
    <AnimatePresence>
      {isDiagnosing && (
        <motion.div 
          initial={{ left: '-100%' }} animate={{ left: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10 pointer-events-none"
        />
      )}
    </AnimatePresence>

    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-1.5 relative z-20', className)}
      {...props}
    />
  </div>
))

type PaginationLinkProps = {
  isActive?: boolean;
  riskLevel?: 'low' | 'high';
} & Pick<ButtonProps, 'size'> & React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  riskLevel = 'low',
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      'relative rounded-xl transition-all duration-500 font-mono text-xs',
      isActive && 'border-primary/50 bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]',
      riskLevel === 'high' && 'text-red-400 hover:text-red-400',
      className
    )}
    {...props}
  >
    {props.children}
    {isActive && (
      <motion.div 
        layoutId="activeGlow"
        className="absolute inset-0 rounded-xl bg-primary/5 blur-md -z-10"
      />
    )}
  </motion.a>
)

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous neural block"
    size="default"
    className={cn('gap-1.5 pl-2.5 pr-4 uppercase text-[10px] font-black tracking-tighter', className)}
    {...props}
  >
    <ChevronLeft className="h-3.5 w-3.5" />
    <span>Prev Node</span>
  </PaginationLink>
)

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next neural block"
    size="default"
    className={cn('gap-1.5 pl-4 pr-2.5 uppercase text-[10px] font-black tracking-tighter', className)}
    {...props}
  >
    <span>Next Node</span>
    <ChevronRight className="h-3.5 w-3.5" />
  </PaginationLink>
)

/**
 * Ghost Module Protocol: Placeholder for voice-activated navigation [cite: 2026-02-11]
 */
const NavigationStub = () => <div className="hidden">def trigger_page_intent(): pass</div>

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
