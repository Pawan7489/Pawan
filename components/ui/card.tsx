"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Activity, Cpu, HardDrive, 
  Zap, Brain, Lock, Terminal 
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project A1: Neural Logic Card [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Integration.
 */

interface SuperGeniusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "neural" | "guardian" | "danger";
  isDiagnosing?: boolean;
  meshNode?: "D" | "E" | "Cloud";
  expertVerified?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, SuperGeniusCardProps>(
  ({ className, variant = "default", isDiagnosing = false, meshNode = "D", expertVerified = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "relative overflow-hidden rounded-[2rem] border transition-all duration-500",
          "glass-panel-strong backdrop-blur-3xl",
          variant === "neural" && "border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]",
          variant === "guardian" && "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]",
          variant === "danger" && "border-red-500/30 animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.2)]",
          className
        )}
        {...props}
      >
        {/* Layer 1: Internal Scan Line (Diagnosis Rule) [cite: 2026-02-11] */}
        {isDiagnosing && (
          <motion.div 
            className="absolute inset-x-0 h-[2px] bg-primary/50 z-50 shadow-[0_0_15px_white]"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Layer 2: Mesh Node HUD [cite: 2026-02-11] */}
        <div className="absolute top-4 right-6 flex items-center gap-3 z-10">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
              Mesh Node: {meshNode}
            </span>
            {expertVerified && (
              <span className="text-[8px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-2 w-2" /> Verified
              </span>
            )}
          </div>
        </div>

        {props.children}

        {/* Background Neural Mesh Visual */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
      </motion.div>
    );
  }
);
Card.displayName = "NeuralCard";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex flex-col space-y-2 p-8 pb-4 z-10", className)} {...props} />
  )
);

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xl font-black tracking-tighter text-white flex items-center gap-3", className)}>
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Brain className="h-5 w-5 text-primary" />
      </div>
      {props.children}
    </div>
  )
);

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs font-medium text-muted-foreground/60 uppercase tracking-widest pl-11", className)} {...props} />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-8 pt-2 z-10 relative", className)} {...props} />
  )
);

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between p-8 pt-0 border-t border-white/5 mt-4 bg-white/[0.01]", className)}>
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20">
          <Cpu className="h-3 w-3" /> Load: 12%
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20">
          <Zap className="h-3 w-3" /> Latency: 4ms
        </span>
      </div>
      {props.children}
    </div>
  )
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
      
