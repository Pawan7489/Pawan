"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Brain, ShieldCheck, 
  Cpu, Zap, HardDrive, Star 
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project A1: Neural Layer Expander [cite: 2026-02-11]
 * Rule: Ball-in-Ball Rule (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis Integration.
 */

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    expertLabel?: string;
    meshNode?: "D" | "E" | "Cloud";
  }
>(({ className, children, expertLabel = "Coder Node", meshNode = "D", ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between p-4 rounded-2xl transition-all duration-500",
      "glass-panel-strong border border-white/5 hover:border-primary/30 group",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-3">
      {/* Neural Hub Icon [cite: 2026-02-11] */}
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center glow-blue">
        <Brain className="h-5 w-5 text-primary group-data-[state=open]:animate-pulse" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm font-black text-white uppercase tracking-tight">{children}</span>
        <div className="flex gap-2 mt-0.5">
          <span className="text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-1">
            <ShieldCheck className="h-2.5 w-2.5" /> {expertLabel} Verified
          </span>
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">
            Node: {meshNode} [cite: 2026-02-11]
          </span>
        </div>
      </div>
    </div>
    <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-500 group-data-[state=open]:rotate-180" />
  </CollapsiblePrimitive.CollapsibleTrigger>
));

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & {
    isDiagnosing?: boolean;
  }
>(({ className, children, isDiagnosing = false, ...props }, ref) => {
  const [feedback, setFeedback] = React.useState<number | null>(null);

  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className="overflow-hidden transition-all"
      {...props}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "p-5 mt-2 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl relative",
            className
          )}
        >
          {/* Internal Scan Line for Self-Diagnosis [cite: 2026-02-11] */}
          {isDiagnosing && (
            <motion.div 
              className="absolute inset-x-0 h-[1px] bg-primary/50 shadow-[0_0_10px_white] z-20"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Ball-in-Ball Nested Encapsulation [cite: 2026-02-11] */}
          <div className="relative z-10 text-sm leading-relaxed text-foreground/80">
            {children}
          </div>

          {/* Human-in-the-Loop (RLHF) Mechanism [cite: 2026-02-11] */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20">
                 <Cpu className="h-3 w-3" /> Processing...
               </span>
               <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/20">
                 <HardDrive className="h-3 w-3" /> Drive Sync: 100%
               </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-white/30 uppercase mr-1">Logic Quality?</span>
              {[1, 2, 3].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setFeedback(star)}
                  className={cn(
                    "transition-all",
                    feedback && star <= feedback ? "text-primary scale-110" : "text-white/10 hover:text-white/40"
                  )}
                >
                  <Star className="h-3.5 w-3.5 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </CollapsiblePrimitive.CollapsibleContent>
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
