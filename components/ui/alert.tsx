"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, AlertTriangle, Activity, 
  Cpu, Zap, Brain, Lock, Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Musk Rule: Maximize visual impact with minimum CPU cycles [cite: 2026-02-11]
const alertVariants = cva(
  "relative w-full rounded-2xl border p-5 shadow-2xl backdrop-blur-3xl transition-all duration-500 overflow-hidden",
  {
    variants: {
      variant: {
        // Default: Neural Thinking Mode
        default: "glass-panel-strong border-white/10 text-foreground bg-white/[0.02]",
        // Guardian Protocol: Ethical/Safety Alerts [cite: 2026-02-11]
        guardian: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]",
        // Diagnosis: Health Check Status [cite: 2026-02-11]
        diagnosis: "border-blue-500/30 bg-blue-500/5 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]",
        // Solo Mode: Offline/Local Mesh Alerts [cite: 2026-02-11]
        solo: "border-amber-500/30 bg-amber-500/5 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.1)]",
        // Protocol Omega: Critical/Kill Switch [cite: 2026-02-11]
        destructive: "border-red-500/40 bg-red-500/10 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface NeuralAlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  expertVerified?: boolean; // Council of Experts check [cite: 2026-02-11]
  meshStatus?: "linked" | "solo" | "searching"; // Distributed Mesh status [cite: 2026-02-11]
  showScanLine?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, NeuralAlertProps>(
  ({ className, variant, expertVerified = true, meshStatus = "linked", showScanLine = true, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      role="alert"
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {/* Ball-in-Ball Rule: Internal Security Layer Visual [cite: 2026-02-11] */}
      {showScanLine && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Distributed Mesh Status Badge [cite: 2026-02-11] */}
      <div className="absolute top-3 right-4 flex items-center gap-2">
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">
            Mesh Node: {meshStatus}
          </span>
          {expertVerified && (
            <span className="text-[8px] font-bold text-primary flex items-center gap-1">
              <Brain className="h-2 w-2" /> Expert Verified [cite: 2026-02-11]
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Dynamic Icon Logic based on Protocol [cite: 2026-02-11] */}
        <div className="mt-1 shrink-0">
          {variant === "guardian" && <ShieldCheck className="h-5 w-5 animate-pulse" />}
          {variant === "diagnosis" && <Activity className="h-5 w-5" />}
          {variant === "solo" && <Globe className="h-5 w-5" />}
          {variant === "destructive" && <AlertTriangle className="h-5 w-5 animate-bounce" />}
          {variant === "default" && <Zap className="h-5 w-5 text-primary" />}
        </div>
        
        <div className="flex-1 space-y-1">
          {children}
        </div>
      </div>
    </motion.div>
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("text-sm font-black uppercase tracking-widest text-foreground/90", className)}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-xs font-medium leading-relaxed text-muted-foreground/80", className)}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
