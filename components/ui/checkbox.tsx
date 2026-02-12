"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldAlert, Cpu, Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project A1: Neural Logic Switch [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: Guardian Protocol (Ethical Hard-Coding).
 */

interface NeuralCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  isHighRisk?: boolean; // Critical for Kill Switch integration [cite: 2026-02-11]
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis Rule [cite: 2026-02-11]
  expertVerified?: boolean; // Council of Experts check [cite: 2026-02-11]
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  NeuralCheckboxProps
>(({ className, isHighRisk = false, isDiagnosing = false, expertVerified = true, ...props }, ref) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Layer 1: Ball-in-Ball Security Ring [cite: 2026-02-11] */}
      <AnimatePresence>
        {props.checked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.15 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={cn(
              "absolute h-6 w-6 rounded-full blur-md",
              isHighRisk ? "bg-red-500" : "bg-primary"
            )}
          />
        )}
      </AnimatePresence>

      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer relative h-6 w-6 shrink-0 rounded-lg border-2 transition-all duration-300",
          "glass-panel-strong backdrop-blur-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-20",
          // Guardian Protocol Color Logic [cite: 2026-02-11]
          isHighRisk 
            ? "border-red-500/50 data-[state=checked]:bg-red-500 data-[state=checked]:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
            : "border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.2)]",
          className
        )}
        {...props}
      >
        {/* Layer 2: Self-Diagnosis Loading State [cite: 2026-02-11] */}
        {isDiagnosing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="h-3 w-3 animate-spin text-primary" />
          </div>
        )}

        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          {isHighRisk ? (
            <ShieldAlert className="h-4 w-4" />
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check className="h-4 w-4 stroke-[3px]" />
            </motion.div>
          )}
        </CheckboxPrimitive.Indicator>

        {/* Ghost Module Placeholder for future Neural Pulse [cite: 2026-02-11] */}
        <div className="hidden">def neural_pulse_feedback(): pass</div>
      </CheckboxPrimitive.Root>

      {/* Layer 3: Expert Council Verification Badge [cite: 2026-02-11] */}
      {expertVerified && props.checked && (
        <motion.div 
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -right-6 top-0"
        >
          <Zap className="h-3 w-3 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
        </motion.div>
      )}
    </div>
  );
});
Checkbox.displayName = "NeuralLogicSwitch";

export { Checkbox };
