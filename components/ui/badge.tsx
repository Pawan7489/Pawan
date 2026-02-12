"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Activity, Zap, Cpu, 
  Lock, Globe, Brain, HardDrive 
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project A1: Neural Telemetry Badge [cite: 2026-02-11]
 * Musk Rule: SNAPPY physics (High Stiffness).
 * Pichai Rule: Global standard scalability.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all duration-500 backdrop-blur-md",
  {
    variants: {
      variant: {
        // Default Neural State
        default: "border-primary/20 bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]",
        // Guardian Protocol: Rules 1-75 verified [cite: 2026-02-11]
        guardian: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
        // Mesh Status: Drive D/E/Cloud linked [cite: 2026-02-11]
        mesh: "border-blue-400/30 bg-blue-400/10 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.1)]",
        // Council of Experts: Multi-agent discussion [cite: 2026-02-11]
        expert: "border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
        // Protocol Omega: Kill Switch / Danger [cite: 2026-02-11]
        destructive: "border-red-500/40 bg-red-500/15 text-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]",
        outline: "text-foreground border-white/10 bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis [cite: 2026-02-11]
  meshNode?: "D" | "E" | "Cloud"; // Distributed Mesh source [cite: 2026-02-11]
}

function Badge({ className, variant, isDiagnosing, meshNode, children, ...props }: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(badgeVariants({ variant }), className, "relative overflow-hidden")}
      {...props}
    >
      {/* Ball-in-Ball Rule: Inner validation layer visual [cite: 2026-02-11] */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-scan" />

      {/* Dynamic Icon Mapping */}
      <span className="relative z-10">
        {variant === "guardian" && <ShieldCheck className="h-3 w-3" />}
        {variant === "mesh" && <HardDrive className="h-3 w-3" />}
        {variant === "expert" && <Brain className="h-3 w-3" />}
        {variant === "destructive" && <Lock className="h-3 w-3" />}
        {isDiagnosing && <Cpu className="h-3 w-3 animate-spin" />}
      </span>

      <span className="relative z-10 flex items-center gap-1">
        {children}
        {meshNode && <span className="opacity-40 font-mono text-[8px]">Node:{meshNode}</span>}
      </span>
      
      {/* Ghost Stub: Placeholder for future Neural Telemetry [cite: 2026-02-11] */}
      <div className="hidden">def telemetry_sync(): pass</div>
    </motion.div>
  );
}

export { Badge, badgeVariants };
