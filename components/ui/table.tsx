'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Cpu, Activity, 
  HardDrive, Zap, Lock, ShieldAlert, Database, Search 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Data Ledger [cite: 2026-02-11]
 * Rule: Onion Architecture (Nested Encapsulation).
 * Rule: Distributed Mesh Telemetry.
 */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { meshNode?: string }
>(({ className, meshNode = "Drive-D", ...props }, ref) => (
  <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/5 bg-black/40 backdrop-blur-3xl glass-panel-strong group/table">
    {/* Layer 1: Mesh Connectivity HUD [cite: 2026-02-11] */}
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <Database className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">
          Neural_Ledger: Node_{meshNode} Active
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[8px] font-bold text-emerald-500/50 uppercase">
          <ShieldCheck className="h-3 w-3" /> Guardian_Verified
        </span>
        <Activity className="h-3 w-3 text-primary/30" />
      </div>
    </div>

    <div className="relative w-full overflow-auto custom-scrollbar">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>

    {/* Layer 2: 5-Second Diagnosis Scan Line [cite: 2026-02-11] */}
    <motion.div 
      className="absolute inset-x-0 h-[1px] bg-primary/30 z-50 pointer-events-none"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </div>
))
Table.displayName = 'NeuralTable'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-white/[0.03] [&_tr]:border-b border-white/5', className)} {...props} />
))

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { isCritical?: boolean }
>(({ className, isCritical = false, ...props }, ref) => (
  <motion.tr
    ref={ref}
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={cn(
      'border-b border-white/5 transition-all duration-500 hover:bg-white/[0.04] group/row data-[state=selected]:bg-primary/10',
      isCritical && 'bg-red-500/[0.02] hover:bg-red-500/[0.05]',
      className,
    )}
    {...props}
  />
))

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-14 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px] text-white/40 [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
))

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { hasLogicCheck?: boolean }
>(({ className, hasLogicCheck = false, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-6 align-middle font-medium text-white/80 [&:has([role=checkbox])]:pr-0 relative', className)}
    {...props}
  >
    {children}
    {hasLogicCheck && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity">
        <Zap className="h-3 w-3 text-primary/40" />
      </div>
    )}
  </td>
))

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-6 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 px-6 pb-4 text-left', className)}
    {...props}
  >
    {/* Internal Critique Branding [cite: 2026-02-11] */}
    <div className="flex items-center gap-2">
      <Cpu className="h-3 w-3" /> System_Log_Critique: All_Data_Verified_By_Council
    </div>
  </caption>
))

export {
  Table,
  TableHeader,
  TableBody: React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
  TableFooter: React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t border-white/5 bg-white/[0.02] font-medium', className)} {...props} />
  ),
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  }
