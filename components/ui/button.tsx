"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ShieldCheck, Activity, Cpu, 
  Lock, AlertTriangle, Fingerprint 
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project A1: Neural Command System
 * Musk Rule: First-principles based physics for zero-lag response.
 * Ball-in-Ball Rule: Layered security encapsulation.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-30 overflow-hidden",
  {
    variants: {
      variant: {
        // Default Neural State
        default: "glass-panel-strong bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        // Omega Protocol: Kill Switch / Critical Action
        omega: "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]",
        // Guardian Protocol: Verified Safe Action
        guardian: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
        // Expert Council: Processing Logic
        expert: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
        ghost: "bg-transparent border-white/5 hover:bg-white/5 text-muted-foreground",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis
  isEncapsulated?: boolean; // Ball-in-Ball Rule
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isDiagnosing = false, isEncapsulated = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <motion.div 
        className="relative inline-block"
        whileHover={{ scale: props.disabled ? 1 : 1.02 }}
        whileTap={{ scale: props.disabled ? 1 : 0.96 }}
      >
        {/* Layer 1: Ball-in-Ball Security Glow */}
        {isEncapsulated && !props.disabled && (
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <Comp
          className={cn(buttonVariants({ variant, size, className }), "group")}
          ref={ref}
          {...props}
        >
          {/* Internal Scan Line for Diagnosis */}
          {isDiagnosing && (
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-primary/50 shadow-[0_0_10px_white]"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Dynamic Protocol Icons */}
          <span className="relative z-10 flex items-center gap-2">
            {variant === "omega" && <AlertTriangle className="h-4 w-4 animate-bounce" />}
            {variant === "guardian" && <ShieldCheck className="h-4 w-4" />}
            {isDiagnosing && <Cpu className="h-4 w-4 animate-spin" />}
            {!isDiagnosing && variant === "default" && <Zap className="h-4 w-4 group-hover:text-white transition-colors" />}
            
            {children}
          </span>

          {/* Logic Feedback for Intent over Syntax */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Comp>
      </motion.div>
    );
  }
);
Button.displayName = "NeuralButton";

export { Button, buttonVariants };
