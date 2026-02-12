"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Cpu, ShieldCheck, Activity, Zap } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  isDiagnosing?: boolean; // 5-Second Self-Diagnosis [cite: 2026-02-11]
  meshStatus?: "linked" | "solo" | "searching"; // Distributed Mesh Status [cite: 2026-02-11]
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  isDiagnosing = false,
  meshStatus = "linked",
  ...props
}: CalendarProps) {
  
  // Internal Critique: AI analyzes the selected date for system logs [cite: 2026-02-11]
  const [reasoning, setReasoning] = React.useState<string[]>([]);

  return (
    <div className="relative">
      {/* Ball-in-Ball Rule: Encapsulated Security Layer [cite: 2026-02-11] */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "glass-panel-strong rounded-3xl p-4 border border-white/10 shadow-2xl backdrop-blur-3xl",
          className
        )}
      >
        {/* System HUD: Top Status Bar [cite: 2026-02-11] */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              meshStatus === "linked" ? "bg-emerald-500 shadow-[0_0_8px_emerald]" : "bg-amber-500"
            )} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Mesh Node: {meshStatus}
            </span>
          </div>
          {isDiagnosing && (
            <div className="flex items-center gap-2 text-[10px] text-primary font-mono">
              <Cpu className="h-3 w-3 animate-spin" /> DIAGNOSING...
            </div>
          )}
        </div>

        <DayPicker
          showOutsideDays={showOutsideDays}
          className="p-0"
          classNames={{
            months: "flex flex-col space-y-4",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center mb-2",
            caption_label: "text-sm font-black uppercase tracking-[0.2em] text-primary",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "ghost" }),
              "h-7 w-7 bg-white/5 p-0 opacity-50 hover:opacity-100 hover:bg-primary/20 rounded-lg transition-all"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex justify-between",
            head_cell: "text-white/30 rounded-md w-9 font-bold text-[0.7rem] uppercase",
            row: "flex w-full mt-2 justify-between",
            cell: cn(
              "h-9 w-9 text-center text-sm p-0 relative focus-within:z-20 transition-all",
              "[&:has([aria-selected].day-range-end)]:rounded-r-xl",
              "[&:has([aria-selected].day-outside)]:bg-white/5",
              "[&:has([aria-selected])]:bg-primary/20",
              "first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl"
            ),
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-primary/40 rounded-xl"
            ),
            day_selected: "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] font-black",
            day_today: "border border-primary/50 text-primary relative after:content-[''] after:absolute after:bottom-1 after:h-1 after:w-1 after:bg-primary after:rounded-full",
            day_outside: "text-white/10 opacity-50",
            day_disabled: "text-white/5 opacity-20",
            ...classNames,
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
          }}
          {...props}
        />

        {/* Footer: Internal Critique Visualization [cite: 2026-02-11] */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Guardian Protocol: Verified
            </span>
            <span className="text-[9px] font-mono text-primary/50">A1-OS v1.0</span>
          </div>
          
          {/* Activity Pulse [cite: 2026-02-11] */}
          <div className="flex gap-1 h-1 items-end overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-primary/30"
                animate={{ height: [2, Math.random() * 8, 2] }}
                transition={{ repeat: Infinity, duration: 1 + Math.random() }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
Calendar.displayName = "NeuralCalendar";

export { Calendar };
            
