"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const springConfig = { stiffness: 260, damping: 20 };

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GlassButton({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: GlassButtonProps) {
  const variantClasses = {
    default:
      "glass-panel hover:bg-white/[0.08] text-foreground",
    primary:
      "bg-primary/20 border border-primary/30 hover:bg-primary/30 text-primary",
    ghost:
      "bg-transparent border-transparent hover:bg-white/[0.06] text-muted-foreground hover:text-foreground",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", ...springConfig }}
      className={cn(
        "rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
