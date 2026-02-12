"use client";

import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Activity, ShieldAlert, Zap } from "lucide-react"; // Icons for status

// Musk Rule: First-principles physics for maximum CPU efficiency [cite: 2026-02-11]
const springConfig = { stiffness: 300, damping: 25 };

interface SuperGeniusButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "primary" | "ghost" | "danger" | "neural";
  size?: "sm" | "md" | "lg" | "xl";
  isSystemHealthy?: boolean; // Diagnosis check [cite: 2026-02-11]
  isModuleRegistered?: boolean; // Registry scan check [cite: 2026-02-11]
  intent?: string; // Hinglish intent recognition visual [cite: 2026-02-11]
}

export function GlassButton({
  children,
  className,
  variant = "default",
  size = "md",
  isSystemHealthy = true,
  isModuleRegistered = true,
  intent,
  ...props
}: SuperGeniusButtonProps) {
  
  // Zuckerberg Rule: Fast conditional mapping for speed [cite: 2026-02-11]
  const variantClasses = {
    default: "glass-panel hover:bg-white/[0.08] text-foreground border-white/10",
    primary: "bg-primary/20 border border-primary/40 hover:bg-primary/30 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    neural: "bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    danger: "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
    ghost: "bg-transparent border-transparent hover:bg-white/[0.06] text-muted-foreground",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg font-bold gap-3 tracking-tight",
  };

  // Solo Mode Check: Button disables itself if module is missing [cite: 2026-02-11]
  const isDisabled = !isModuleRegistered || !isSystemHealthy || props.disabled;

  return (
    <motion.button
      whileTap={{ scale: isDisabled ? 1 : 0.96 }}
      whileHover={{ scale: isDisabled ? 1 : 1.03 }}
      transition={{ type: "spring", ...springConfig }}
      className={cn(
        "relative flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none overflow-hidden",
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && "opacity-50 cursor-not-allowed grayscale",
        className
      )}
      {...props}
      disabled={isDisabled}
    >
      {/* Visual Indicator for Intent Processing [cite: 2026-02-11] */}
      {intent && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Internal Diagnosis Alert Logic [cite: 2026-02-11] */}
      {!isSystemHealthy && <ShieldAlert className="h-4 w-4 text-red-500 animate-pulse" />}
      {!isModuleRegistered && <Activity className="h-4 w-4 text-yellow-500" />}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "neural" && <Zap className="h-4 w-4 animate-glow" />}
      </span>

      {/* Neural Glow for Genius Mode [cite: 2026-02-11] */}
      <AnimatePresence>
        {variant === "neural" && !isDisabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-purple-500/5 blur-xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
